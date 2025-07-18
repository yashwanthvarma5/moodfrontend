import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/card';
import { Palette, Check } from 'lucide-react';

export const ThemeSelector: React.FC = () => {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  const lightThemes = availableThemes.filter(theme => !theme.isDark);
  const darkThemes = availableThemes.filter(theme => theme.isDark);

  return (
    <Card className={`p-6 ${currentTheme.surface} ${currentTheme.border}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Palette className="w-5 h-5 text-purple-600" />
        <h2 className={`text-xl font-semibold ${currentTheme.text}`}>Choose Your Theme</h2>
      </div>

      {/* Current Theme */}
      <div className="mb-6">
        <div className={`p-4 rounded-lg bg-gradient-to-r ${currentTheme.primary} text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">{currentTheme.name}</h4>
              <p className="text-white/80 text-sm">{currentTheme.description}</p>
            </div>
            <span className="text-2xl">{currentTheme.preview}</span>
          </div>
        </div>
      </div>

      {/* Light Themes */}
      <div className="mb-6">
        <h3 className={`text-lg font-medium ${currentTheme.text} mb-3`}>Light Themes</h3>
        <div className="grid grid-cols-2 gap-3">
          {lightThemes.map((theme) => (
            <div
              key={theme.id}
              className={`relative cursor-pointer transition-all duration-200 hover:scale-105 rounded-lg ${
                currentTheme.id === theme.id ? 'ring-2 ring-purple-400' : ''
              }`}
              onClick={() => setTheme(theme.id)}
            >
              <div className={`p-3 rounded-lg bg-gradient-to-r ${theme.primary} text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">{theme.name}</h4>
                    <p className="text-white/80 text-xs">{theme.description}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg">{theme.preview}</span>
                    {currentTheme.id === theme.id && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dark Themes */}
      <div>
        <h3 className={`text-lg font-medium ${currentTheme.text} mb-3`}>Dark Themes</h3>
        <div className="grid grid-cols-2 gap-3">
          {darkThemes.map((theme) => (
            <div
              key={theme.id}
              className={`relative cursor-pointer transition-all duration-200 hover:scale-105 rounded-lg ${
                currentTheme.id === theme.id ? 'ring-2 ring-purple-400' : ''
              }`}
              onClick={() => setTheme(theme.id)}
            >
              <div className={`p-3 rounded-lg bg-gradient-to-r ${theme.primary} text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">{theme.name}</h4>
                    <p className="text-white/80 text-xs">{theme.description}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg">{theme.preview}</span>
                    {currentTheme.id === theme.id && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};