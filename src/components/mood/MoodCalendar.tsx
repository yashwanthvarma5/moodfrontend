import { Card } from '@/components/ui/card';
import { MoodEntry } from '@/types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';


interface MoodCalendarProps {
  moods: MoodEntry[];
}

export const MoodCalendar: React.FC<MoodCalendarProps> = ({ moods }) => {
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getMoodForDate = (date: Date) => {
    return moods.find(mood => isSameDay(new Date(mood.date), date));
  };

  const getMoodColor = (mood: string) => {
    const colors: Record<string, string> = {
      'Happy': 'bg-green-200 border-green-300',
      'Sad': 'bg-blue-200 border-blue-300',
      'Anxious': 'bg-yellow-200 border-yellow-300',
      'Tired': 'bg-gray-200 border-gray-300',
      'Angry': 'bg-red-200 border-red-300',
      'Thoughtful': 'bg-purple-200 border-purple-300',
      'Confident': 'bg-orange-200 border-orange-300',
      'Loved': 'bg-pink-200 border-pink-300',
      'Down': 'bg-indigo-200 border-indigo-300',
      'Grateful': 'bg-emerald-200 border-emerald-300',
      'Stressed': 'bg-amber-200 border-amber-300',
      'Neutral': 'bg-slate-200 border-slate-300'
    };
    return colors[mood] || 'bg-gray-100 border-gray-200';
  };

  return (
    <Card className="p-6 bg-white/60 backdrop-blur-sm border-purple-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {format(currentDate, 'MMMM yyyy')}
      </h3>
      
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => {
          const mood = getMoodForDate(day);
          const isToday = isSameDay(day, currentDate);
          
          return (
            <div
              key={day.toISOString()}
              className={`
                aspect-square flex items-center justify-center text-sm border-2 rounded-lg
                ${mood ? getMoodColor(mood.mood) : 'bg-gray-50 border-gray-200'}
                ${isToday ? 'ring-2 ring-purple-400' : ''}
                transition-all duration-200 hover:scale-105
              `}
              title={mood ? `${mood.emoji} ${mood.mood}` : 'No mood recorded'}
            >
              <div className="flex flex-col items-center">
                <span className="text-xs font-medium text-gray-700">
                  {format(day, 'd')}
                </span>
                {mood && (
                  <span className="text-lg">{mood.emoji}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
