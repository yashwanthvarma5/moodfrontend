import React, { createContext, useContext, useState, useEffect } from 'react';
import { MoodEntry, MoodStats } from '@/types';
import { useAuth } from './AuthContext';
import { isSameDay, startOfDay } from 'date-fns';
import API from '@/utils/api';

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
  if (!context) throw new Error('useMood must be used within a MoodProvider');
  return context;
};

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Fetch moods from backend and cache locally
  const fetchMoodsFromBackend = async () => {
    if (!user) return;

    try {
      const res = await API.get('/moods');
      const moodsFromBackend = res.data.map((mood: any) => ({
        ...mood,
        date: new Date(mood.date),
        createdAt: new Date(mood.createdAt)
      }));
      setMoods(moodsFromBackend);
      localStorage.setItem('vibetrackr-moods', JSON.stringify(moodsFromBackend));
    } catch (err) {
      console.error('Failed to fetch moods from backend', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMoodsFromBackend();
  }, [user]);

  const canSubmitMood = () => {
    const latestMood = getLatestMood();
    if (!latestMood) return true;

    const now = new Date();
    const lastMoodTime = new Date(latestMood.date);
    const timeDifference = now.getTime() - lastMoodTime.getTime();
    return timeDifference >= 60 * 1000; // 1 min cooldown
  };

  const getTimeUntilNextSubmission = () => {
    if (canSubmitMood()) return 0;
    const latestMood = getLatestMood();
    const now = new Date();
    const last = new Date(latestMood!.date);
    return Math.ceil((60 * 1000 - (now.getTime() - last.getTime())) / 1000);
  };

  const addMood = async (emoji: string, mood: string, note?: string): Promise<boolean> => {
    if (!user || !canSubmitMood()) return false;

    try {
      const res = await API.post('/moods', { emoji, mood, note });
      const newMood = {
        ...res.data,
        date: new Date(res.data.date),
        createdAt: new Date(res.data.createdAt)
      };

      const updatedMoods = [...moods, newMood];
      setMoods(updatedMoods);
      localStorage.setItem('vibetrackr-moods', JSON.stringify(updatedMoods));
      return true;
    } catch (err) {
      console.error('Error saving mood:', err);
      return false;
    }
  };

  const getTodaysMoods = () =>
    moods
      .filter((mood) => isSameDay(new Date(mood.date), new Date()))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getLatestMood = () => {
    if (moods.length === 0) return null;
    return [...moods].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
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

    const moodsByDay = moods.reduce((acc, mood) => {
      const dayKey = startOfDay(new Date(mood.date)).toISOString();
      if (!acc[dayKey]) acc[dayKey] = [];
      acc[dayKey].push(mood);
      return acc;
    }, {} as Record<string, MoodEntry[]>);

    const daysWithMoods = Object.keys(moodsByDay).sort();
    let currentStreak = 0, longestStreak = 0, tempStreak = 0;

    const today = startOfDay(new Date()).toISOString();
    const yesterday = startOfDay(new Date(Date.now() - 86400000)).toISOString();

    if (moodsByDay[today] || moodsByDay[yesterday]) {
      currentStreak = 1;
      tempStreak = 1;
    }

    for (let i = daysWithMoods.length - 1; i > 0; i--) {
      const currentDay = new Date(daysWithMoods[i]);
      const previousDay = new Date(daysWithMoods[i - 1]);
      const diffDays = Math.ceil((currentDay.getTime() - previousDay.getTime()) / 86400000);

      if (diffDays === 1) {
        tempStreak++;
        if (i === daysWithMoods.length - 1) currentStreak = tempStreak;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }

    longestStreak = Math.max(longestStreak, tempStreak);

    const moodDistribution: Record<string, number> = {};
    moods.forEach((m) => {
      moodDistribution[m.mood] = (moodDistribution[m.mood] || 0) + 1;
    });

    const mostCommonMood =
      Object.entries(moodDistribution).sort(([, a], [, b]) => b - a)[0]?.[0] || '';

    return {
      currentStreak,
      longestStreak,
      totalEntries: moods.length,
      mostCommonMood,
      moodDistribution,
      todayEntries: getTodaysMoods().length,
      averageEntriesPerDay: Math.round((moods.length / daysWithMoods.length) * 10) / 10
    };
  };

  return (
    <MoodContext.Provider
      value={{
        moods,
        addMood,
        getMoodStats,
        getTodaysMoods,
        getLatestMood,
        canSubmitMood,
        getTimeUntilNextSubmission,
        isLoading
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};
