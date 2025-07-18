export interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  isDark: boolean;
}

export const THEMES: Theme[] = [
  {
    id: 'pastel',
    name: 'Pastel Dream',
    description: 'Soft and dreamy',
    preview: '🌸',
    primary: 'from-purple-500 to-pink-500',
    secondary: 'from-blue-400 to-cyan-400',
    accent: 'from-yellow-400 to-orange-400',
    background: 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50',
    surface: 'bg-white/70 backdrop-blur-sm',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    border: 'border-purple-100',
    isDark: false
  },
  {
    id: 'sunset',
    name: 'Sunset Vibes',
    description: 'Warm and energetic',
    preview: '🌅',
    primary: 'from-orange-500 to-pink-500',
    secondary: 'from-red-400 to-orange-400',
    accent: 'from-yellow-400 to-red-400',
    background: 'bg-gradient-to-br from-orange-50 via-pink-50 to-red-50',
    surface: 'bg-white/70 backdrop-blur-sm',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    border: 'border-orange-100',
    isDark: false
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    description: 'Cool and refreshing',
    preview: '🌊',
    primary: 'from-blue-500 to-teal-500',
    secondary: 'from-cyan-400 to-blue-400',
    accent: 'from-teal-400 to-green-400',
    background: 'bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50',
    surface: 'bg-white/70 backdrop-blur-sm',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    border: 'border-blue-100',
    isDark: false
  },
  {
    id: 'forest',
    name: 'Forest Zen',
    description: 'Natural and calming',
    preview: '🌿',
    primary: 'from-green-500 to-emerald-500',
    secondary: 'from-lime-400 to-green-400',
    accent: 'from-emerald-400 to-teal-400',
    background: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
    surface: 'bg-white/70 backdrop-blur-sm',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    border: 'border-green-100',
    isDark: false
  },
  {
    id: 'midnight',
    name: 'Midnight Aurora',
    description: 'Dark and mystical',
    preview: '🌌',
    primary: 'from-purple-400 to-pink-400',
    secondary: 'from-blue-400 to-purple-400',
    accent: 'from-green-400 to-blue-400',
    background: 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900',
    surface: 'bg-gray-800/70 backdrop-blur-sm',
    text: 'text-gray-100',
    textSecondary: 'text-gray-300',
    border: 'border-gray-700',
    isDark: true
  },
  {
    id: 'cosmic',
    name: 'Cosmic Night',
    description: 'Deep space vibes',
    preview: '🚀',
    primary: 'from-indigo-400 to-purple-400',
    secondary: 'from-purple-400 to-pink-400',
    accent: 'from-cyan-400 to-blue-400',
    background: 'bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900',
    surface: 'bg-slate-800/70 backdrop-blur-sm',
    text: 'text-slate-100',
    textSecondary: 'text-slate-300',
    border: 'border-slate-700',
    isDark: true
  }
];

export const getThemeById = (id: string): Theme => {
  return THEMES.find(theme => theme.id === id) || THEMES[0];
};