import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Trophy, Target, TrendingUp } from 'lucide-react';
import { MoodStats } from '@/types';

interface MoodStreakCardProps {
  stats: MoodStats;
}

export const MoodStreakCard: React.FC<MoodStreakCardProps> = ({ stats }) => {
  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'from-yellow-400 to-orange-500';
    if (streak >= 14) return 'from-orange-400 to-red-500';
    if (streak >= 7) return 'from-purple-400 to-pink-500';
    return 'from-blue-400 to-purple-500';
  };

  const getStreakBadge = (streak: number) => {
    if (streak >= 30) return { text: 'Mood Master!', icon: Trophy };
    if (streak >= 14) return { text: 'On Fire!', icon: Flame };
    if (streak >= 7) return { text: 'Week Warrior!', icon: Target };
    return { text: 'Getting Started!', icon: TrendingUp };
  };

  const streakBadge = getStreakBadge(stats.currentStreak);
  const IconComponent = streakBadge.icon;

  return (
    <Card className="p-6 bg-white/60 backdrop-blur-sm border-purple-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Your Streak</h3>
        <Badge className={`bg-gradient-to-r ${getStreakColor(stats.currentStreak)} text-white`}>
          <IconComponent className="w-3 h-3 mr-1" />
          {streakBadge.text}
        </Badge>
      </div>
      
      <div className="text-center">
        <div className={`text-6xl font-bold bg-gradient-to-r ${getStreakColor(stats.currentStreak)} bg-clip-text text-transparent mb-2`}>
          {stats.currentStreak}
        </div>
        <p className="text-gray-600 mb-4">
          {stats.currentStreak === 1 ? 'day' : 'days'} in a row
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.longestStreak}</div>
            <div className="text-gray-500">Longest Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">{stats.averageEntriesPerDay}</div>
            <div className="text-gray-500">Avg per Day</div>
          </div>
        </div>
      </div>
    </Card>
  );
};