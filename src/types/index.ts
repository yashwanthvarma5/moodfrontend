export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  theme: 'light' | 'dark';
}

export interface MoodEntry {
  id: string;
  userId: string;
  emoji: string;
  mood: string;
  note?: string;
  date: Date;
  createdAt: Date;
}

export interface MoodStats {
  currentStreak: number;
  longestStreak: number;
  totalEntries: number;
  mostCommonMood: string;
  moodDistribution: Record<string, number>;
  todayEntries: number;
  averageEntriesPerDay: number;
}

export const MOODS = {
  '😊': 'Happy',
  '😢': 'Sad',
  '😰': 'Anxious',
  '😴': 'Tired',
  '😤': 'Angry',
  '🤔': 'Thoughtful',
  '😎': 'Confident',
  '🥰': 'Loved',
  '😔': 'Down',
  '🤗': 'Grateful',
  '😬': 'Stressed',
  '🙂': 'Neutral'
} as const;

export const MOTIVATIONAL_QUOTES = [
  "Every emotion is valid. You're doing great! 💙",
  "Small steps lead to big changes. Keep going! ✨",
  "Your feelings matter. Thank you for checking in! 🌟",
  "Progress over perfection. You've got this! 💪",
  "Taking care of your mental health is self-love! 🌸",
  "One day at a time. You're stronger than you know! 🌈",
  "Your journey is unique and beautiful! 🦋",
  "Emotions are temporary, but your strength is permanent! 💎",
  "Another mood logged! You're building great habits! 🎯",
  "Checking in with yourself shows real self-awareness! 🧠",
  "Every entry helps you understand yourself better! 📈",
  "You're creating a beautiful emotional story! 📖"
];