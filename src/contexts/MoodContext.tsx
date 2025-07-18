import React, { createContext, useContext, useState, useEffect } from 'react';
import { MoodEntry, MoodStats, MOODS } from '@/types';
import { useAuth } from './AuthContext';
import { isSameDay, startOfDay, endOfDay } from 'date-fns';

interface MoodContextType {
  moods: MoodEntry[];
  addMood: (emoji: string, mood: string, note?: string) => Promise<boolean>;
  getMoodStats: () => MoodStats;
  getTodaysMoods: () => MoodEntry[];
  getLatestMood: () => MoodEntry | null;
  canSubmitMood: () => boolean;
  getTimeUntilNextSubmission: () => number;
  isLoading: boolean;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const savedMoods = localStorage.getItem('vibetrackr-moods');
      if (savedMoods) {
        const parsedMoods = JSON.parse(savedMoods).map((mood: any) => ({
          ...mood,
          date: new Date(mood.date),
          createdAt: new Date(mood.createdAt)
        }));
        setMoods(parsedMoods);
      }
    }
    setIsLoading(false);
  }, [user]);

  const canSubmitMood = () => {
    if (moods.length === 0) return true;
    
    const latestMood = getLatestMood();
    if (!latestMood) return true;
    
    const now = new Date();
    const lastMoodTime = new Date(latestMood.date);
    const timeDifference = now.getTime() - lastMoodTime.getTime();
    const oneMinuteInMs = 60 * 1000; // 60 seconds * 1000 milliseconds
    
    return timeDifference >= oneMinuteInMs;
  };

  const getTimeUntilNextSubmission = () => {
    if (canSubmitMood()) return 0;
    
    const latestMood = getLatestMood();
    if (!latestMood) return 0;
    
    const now = new Date();
    const lastMoodTime = new Date(latestMood.date);
    const timeDifference = now.getTime() - lastMoodTime.getTime();
    const oneMinuteInMs = 60 * 1000;
    
    return Math.ceil((oneMinuteInMs - timeDifference) / 1000); // Return seconds remaining
  };

  const addMood = async (emoji: string, mood: string, note?: string): Promise<boolean> => {
    if (!user) return false;
    
    if (!canSubmitMood()) {
      return false; // Rate limit exceeded
    }

    const newMood: MoodEntry = {
      id: Date.now().toString(),
      userId: user.id,
      emoji,
      mood,
      note,
      date: new Date(),
      createdAt: new Date()
    };

    const updatedMoods = [...moods, newMood];
    setMoods(updatedMoods);
    localStorage.setItem('vibetrackr-moods', JSON.stringify(updatedMoods));
    return true;
  };

  const getTodaysMoods = () => {
    const today = new Date();
    return moods.filter(mood => isSameDay(new Date(mood.date), today))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const getLatestMood = () => {
    if (moods.length === 0) return null;
    return moods.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  };

  const getMoodStats = (): MoodStats => {
    if (moods.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        totalEntries: 0,
        mostCommonMood: '',
        moodDistribution: {},
        todayEntries: 0,
        averageEntriesPerDay: 0
      };
    }

    // Group moods by day
    const moodsByDay = moods.reduce((acc, mood) => {
      const dayKey = startOfDay(new Date(mood.date)).toISOString();
      if (!acc[dayKey]) {
        acc[dayKey] = [];
      }
      acc[dayKey].push(mood);
      return acc;
    }, {} as Record<string, MoodEntry[]>);

    const daysWithMoods = Object.keys(moodsByDay).sort();
    
    // Calculate current streak (consecutive days with at least one mood)
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    const today = startOfDay(new Date()).toISOString();
    const yesterday = startOfDay(new Date(Date.now() - 24 * 60 * 60 * 1000)).toISOString();
    
    // Check if there's a mood for today or yesterday to start the streak
    if (moodsByDay[today] || moodsByDay[yesterday]) {
      currentStreak = 1;
      tempStreak = 1;
    }

    // Calculate streaks based on consecutive days
    for (let i = daysWithMoods.length - 1; i > 0; i--) {
      const currentDay = new Date(daysWithMoods[i]);
      const previousDay = new Date(daysWithMoods[i - 1]);
      
      const diffTime = currentDay.getTime() - previousDay.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        tempStreak++;
        if (i === daysWithMoods.length - 1) currentStreak = tempStreak;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    
    longestStreak = Math.max(longestStreak, tempStreak);

    // Calculate mood distribution
    const moodDistribution: Record<string, number> = {};
    moods.forEach(mood => {
      moodDistribution[mood.mood] = (moodDistribution[mood.mood] || 0) + 1;
    });

    const mostCommonMood = Object.entries(moodDistribution)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || '';

    const todayEntries = getTodaysMoods().length;
    const averageEntriesPerDay = daysWithMoods.length > 0 ? moods.length / daysWithMoods.length : 0;

    return {
      currentStreak,
      longestStreak,
      totalEntries: moods.length,
      mostCommonMood,
      moodDistribution,
      todayEntries,
      averageEntriesPerDay: Math.round(averageEntriesPerDay * 10) / 10
    };
  };

  return (
    <MoodContext.Provider value={{ 
      moods, 
      addMood, 
      getMoodStats, 
      getTodaysMoods, 
      getLatestMood,
      canSubmitMood,
      getTimeUntilNextSubmission,
      isLoading 
    }}>
      {children}
    </MoodContext.Provider>
  );
};