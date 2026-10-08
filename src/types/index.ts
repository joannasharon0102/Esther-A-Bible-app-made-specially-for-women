export type TabType = 'home' | 'read' | 'plans' | 'mood' | 'track' | 'journal' | 'profile';

export type Translation = 'KJV' | 'WEB' | 'BBE';

export type HighlightColor = 'pink' | 'rosegold' | 'sage' | 'lilac' | 'honey';

export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface HighlightedVerse {
  id: string; // e.g. "Esther-4-14"
  book: string;
  chapter: number;
  verse: number;
  text: string;
  color: HighlightColor;
  date: string;
}

export interface VerseBookmark {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  date: string;
}

export interface VerseNote {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  note: string;
  date: string;
}

export interface MoodVerseItem {
  id: string;
  mood: string;
  emoji: string;
  verseRef: string;
  verseText: string;
  womanContext: string; // Historical/Biblical woman connection (e.g. Hannah, Ruth, Esther, Mary)
  reflection: string;
  prayer: string;
  tags: string[];
}

export interface DevotionalDay {
  dayNumber: number;
  title: string;
  passageRef: string;
  passageText: string;
  reflection: string;
  reflectionQuestions: string[];
  prayer: string;
  completed?: boolean;
  userNotes?: string;
}

export interface DevotionalPlan {
  id: string;
  title: string;
  subtitle: string;
  durationDays: number;
  category: string;
  coverImage?: string;
  accentColor: string;
  description: string;
  author: string;
  days: DevotionalDay[];
}

export interface PrayerItem {
  id: string;
  title: string;
  content: string;
  tag: 'Family' | 'Health' | 'Guidance' | 'Gratitude' | 'Inner Peace' | 'Loved Ones' | 'Courage';
  dateCreated: string;
  isAnswered: boolean;
  dateAnswered?: string;
  answerTestimony?: string;
}

export interface HabitLog {
  date: string; // YYYY-MM-DD
  prayersCount: number;
  scriptureMinutes: number;
  completedDailyGoal: boolean;
}

export interface MilestoneBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
}

export interface UserSettings {
  name: string;
  avatar: string;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  twilightMode: boolean;
  whimsicalEffects: boolean;
  preferredTranslation: Translation;
  readingReminderTime: string;
  readingReminderEnabled: boolean;
  prayerReminderTime: string;
  prayerReminderEnabled: boolean;
  language: 'en' | 'es' | 'pt' | 'fr';
}
