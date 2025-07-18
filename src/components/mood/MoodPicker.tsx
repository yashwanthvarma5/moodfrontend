import React, { useState } from 'react';
import { MOODS } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MoodPickerProps {
  onMoodSelect: (emoji: string, mood: string) => void;
  selectedMood?: string;
}

export const MoodPicker: React.FC<MoodPickerProps> = ({ onMoodSelect, selectedMood }) => {
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);

  return (
    <Card className="p-6 bg-white/60 backdrop-blur-sm border-purple-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        How are you feeling today?
      </h3>
      
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-4">
        {Object.entries(MOODS).map(([emoji, mood]) => (
          <Button
            key={emoji}
            variant="ghost"
            onClick={() => onMoodSelect(emoji, mood)}
            onMouseEnter={() => setHoveredMood(mood)}
            onMouseLeave={() => setHoveredMood(null)}
            className={`
              h-16 w-16 p-0 rounded-2xl border-2 transition-all duration-200
              ${selectedMood === mood 
                ? 'border-purple-400 bg-purple-50 scale-105' 
                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 hover:scale-105'
              }
            `}
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl">{emoji}</span>
            </div>
          </Button>
        ))}
      </div>
      
      {(hoveredMood || selectedMood) && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 font-medium">
            {hoveredMood || selectedMood}
          </p>
        </div>
      )}
    </Card>
  );
};