import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useMood } from '@/contexts/MoodContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MoodStreakCard } from '@/components/mood/MoodStreakCard';
import { PlusCircle, BarChart3, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { currentTheme } = useTheme();
  const { getMoodStats, getTodaysMoods, getLatestMood, moods } = useMood();
  
  const stats = getMoodStats();
  const todaysMoods = getTodaysMoods();
  const latestMood = getLatestMood();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getRecentMoods = () => {
    return moods
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  };

  const getTimeSinceLastMood = () => {
    if (!latestMood) return null;
    
    const now = new Date();
    const moodTime = new Date(latestMood.date);
    const diffMinutes = Math.floor((now.getTime() - moodTime.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return 'Earlier';
  };

  return (
    <div className={`min-h-screen ${currentTheme.background} p-4`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold ${currentTheme.text} mb-2`}>
            {getGreeting()}, {user?.name}! ✨
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <p className={`${currentTheme.textSecondary} text-lg`}>
              {latestMood 
                ? `Last mood: ${latestMood.mood.toLowerCase()} ${latestMood.emoji}`
                : "Ready to track your first mood?"
              }
            </p>
            {latestMood && (
              <div className={`flex items-center text-sm ${currentTheme.textSecondary}`}>
                <Clock className="w-4 h-4 mr-1" />
                {getTimeSinceLastMood()}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/track-mood" className="block">
            <Card className={`p-6 ${currentTheme.surface} ${currentTheme.border} hover:shadow-lg transition-all duration-200 hover:scale-105`}>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <PlusCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className={`font-semibold ${currentTheme.text}`}>Track Your Mood</h3>
                  <p className={`${currentTheme.textSecondary} text-sm`}>How are you feeling?</p>
                </div>
              </div>
            </Card>
          </Link>

          <Card className={`p-6 bg-gradient-to-r ${currentTheme.secondary} text-white`}>
            <div className="flex items-center space-x-4">
              <div className="text-4xl">📊</div>
              <div>
                <h3 className="font-semibold">Today's Check-ins</h3>
                <p className="text-white/80 text-sm">
                  {stats.todayEntries} mood{stats.todayEntries === 1 ? '' : 's'} logged
                </p>
              </div>
            </div>
          </Card>

          <Link to="/history" className="block">
            <Card className={`p-6 ${currentTheme.surface} ${currentTheme.border} hover:shadow-lg transition-all duration-200 hover:scale-105`}>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-pink-100 rounded-full">
                  <BarChart3 className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className={`font-semibold ${currentTheme.text}`}>View History</h3>
                  <p className={`${currentTheme.textSecondary} text-sm`}>See your patterns</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Today's Moods */}
        {todaysMoods.length > 0 && (
          <Card className={`p-6 ${currentTheme.surface} ${currentTheme.border} mb-8`}>
            <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Today's Mood Journey</h3>
            <div className="space-y-3">
              {todaysMoods.slice(0, 5).map((mood, index) => (
                <div key={mood.id} className="flex items-center justify-between p-3 bg-white/40 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{mood.emoji}</span>
                    <div>
                      <p className={`font-medium ${currentTheme.text}`}>{mood.mood}</p>
                      <p className={`text-sm ${currentTheme.textSecondary}`}>
                        {format(new Date(mood.date), 'h:mm a')}
                      </p>
                    </div>
                  </div>
                  {mood.note && (
                    <p className={`text-sm ${currentTheme.textSecondary} italic max-w-xs truncate`}>
                      "{mood.note}"
                    </p>
                  )}
                  {index === 0 && (
                    <div className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                      Latest
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <MoodStreakCard stats={stats} />
          
          <Card className={`p-6 ${currentTheme.surface} ${currentTheme.border}`}>
            <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Recent Activity</h3>
            {getRecentMoods().length === 0 ? (
              <div className={`text-center ${currentTheme.textSecondary} py-8`}>
                <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No moods recorded yet!</p>
                <p className="text-sm">Start tracking to see your history here.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {getRecentMoods().map((mood) => (
                  <div key={mood.id} className="flex items-center justify-between p-3 bg-white/40 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{mood.emoji}</span>
                      <div>
                        <p className={`font-medium ${currentTheme.text} text-sm`}>{mood.mood}</p>
                        <p className={`text-xs ${currentTheme.textSecondary}`}>
                          {format(new Date(mood.date), 'MMM d, h:mm a')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className={`p-6 bg-gradient-to-r ${currentTheme.primary} text-white`}>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{stats.totalEntries}</div>
              <div className="text-sm text-white/80">Total Check-ins</div>
            </div>
          </Card>
          
          <Card className={`p-6 bg-gradient-to-r ${currentTheme.secondary} text-white`}>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{stats.averageEntriesPerDay}</div>
              <div className="text-sm text-white/80">Avg per Day</div>
            </div>
          </Card>
          
          <Card className={`p-6 bg-gradient-to-r ${currentTheme.accent} text-white`}>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{stats.todayEntries}</div>
              <div className="text-sm text-white/80">Today's Moods</div>
            </div>
          </Card>
        </div>

        {/* Motivational Section */}
        <Card className={`p-6 bg-gradient-to-r ${currentTheme.primary} text-white`}>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">
              You're doing amazing! 🌟
            </h3>
            <p className="text-white/80">
              {stats.totalEntries === 0 
                ? "Ready to start your mood tracking journey? Every check-in helps you understand yourself better!"
                : stats.todayEntries === 0
                ? "Haven't checked in today yet? Your mood matters - take a moment to reflect!"
                : `You've checked in ${stats.todayEntries} time${stats.todayEntries === 1 ? '' : 's'} today. Keep building that self-awareness!`
              }
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};