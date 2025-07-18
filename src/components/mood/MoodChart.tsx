import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MoodEntry, MOODS } from '@/types';

interface MoodChartProps {
  moods: MoodEntry[];
}

const COLORS = ['#A78BFA', '#FDBA74', '#86EFAC', '#7DD3FC', '#F87171', '#FDE047'];

export const MoodChart: React.FC<MoodChartProps> = ({ moods }) => {
  const moodDistribution = moods.reduce((acc, mood) => {
    acc[mood.mood] = (acc[mood.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(moodDistribution).map(([mood, count]) => ({
    mood,
    count,
    emoji: Object.keys(MOODS).find(key => MOODS[key as keyof typeof MOODS] === mood) || '😊'
  }));

  const pieData = chartData.map((item, index) => ({
    name: item.mood,
    value: item.count,
    color: COLORS[index % COLORS.length]
  }));

  if (moods.length === 0) {
    return (
      <Card className="p-6 bg-white/60 backdrop-blur-sm border-purple-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Mood Distribution</h3>
        <div className="text-center text-gray-500 py-8">
          Start tracking your moods to see your patterns!
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 bg-white/60 backdrop-blur-sm border-purple-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Mood Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="emoji" 
              tick={{ fontSize: 20 }}
              axisLine={{ stroke: '#d1d5db' }}
            />
            <YAxis axisLine={{ stroke: '#d1d5db' }} />
            <Tooltip 
              formatter={(value, name) => [value, 'Count']}
              labelFormatter={(label) => {
                const mood = chartData.find(item => item.emoji === label)?.mood;
                return `${label} ${mood}`;
              }}
            />
            <Bar dataKey="count" fill="#A78BFA" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 bg-white/60 backdrop-blur-sm border-purple-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Mood Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};