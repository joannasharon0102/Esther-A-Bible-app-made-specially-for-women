import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  TabType,
  Translation,
  UserSettings,
  HighlightedVerse,
  VerseBookmark,
  VerseNote,
  PrayerItem,
  HabitLog,
  DevotionalPlan,
  BibleVerse
} from '../types';
import { DEVOTIONAL_PLANS } from '../data/devotionalPlans';

export interface MilestoneDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  targetStreak: number;
}

export const MILESTONES: MilestoneDef[] = [
  { id: 'seed', title: 'Mustard Seed of Faith', description: 'Log your first quiet time with God', icon: '🌱', targetStreak: 1 },
  { id: 'three_days', title: 'Grace in Bloom', description: '3 consecutive days of prayer and scripture', icon: '🌸', targetStreak: 3 },
  { id: 'seven_days', title: '7 Days of Faithfulness', description: 'A full week dwelling in His sacred presence', icon: '🕊️', targetStreak: 7 },
  { id: 'hannah', title: 'Hannah’s Devotion', description: 'Log 20 heartfelt prayers', icon: '🕯️', targetStreak: 14 },
  { id: 'esther_courage', title: 'Esther’s Courage', description: '21 days of steadfast kingdom pursuit', icon: '👑', targetStreak: 21 },
  { id: 'proverbs31', title: 'Proverbs 31 Morning Star', description: '30 days walking in grace, wisdom and peace', icon: '✨', targetStreak: 30 }
];

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isCoverOpen: boolean;
  setIsCoverOpen: (open: boolean) => void;
  openApp: () => void;
  closeCover: () => void;

  // Settings
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;

  // Reader State
  currentBook: string;
  setCurrentBook: (b: string) => void;
  currentChapter: number;
  setCurrentChapter: (c: number) => void;
  selectedVerse: BibleVerse | null;
  setSelectedVerse: (v: BibleVerse | null) => void;

  // Verse Art Generator Modal
  verseArtVerse: { reference: string; text: string } | null;
  setVerseArtVerse: (v: { reference: string; text: string } | null) => void;

  // Highlights & Notes
  highlights: HighlightedVerse[];
  addHighlight: (verse: BibleVerse, color: HighlightedVerse['color']) => void;
  removeHighlight: (verseId: string) => void;
  bookmarks: VerseBookmark[];
  toggleBookmark: (verse: BibleVerse) => void;
  notes: VerseNote[];
  addNote: (verse: BibleVerse, note: string) => void;
  deleteNote: (id: string) => void;

  // Habit Tracker
  todayPrayers: number;
  todayMinutes: number;
  incrementPrayers: () => void;
  decrementPrayers: () => void;
  addReadingMinutes: (mins: number) => void;
  resetTodayHabits: () => void;
  streakDays: number;
  bestStreak: number;
  habitLogs: HabitLog[];
  unlockedBadgeIds: string[];

  // Prayer Journal
  prayers: PrayerItem[];
  addPrayer: (title: string, content: string, tag: PrayerItem['tag']) => void;
  markPrayerAnswered: (id: string, testimony: string) => void;
  deletePrayer: (id: string) => void;

  // Devotional Plans
  plans: DevotionalPlan[];
  userPlanProgress: Record<string, { completedDays: number[]; userNotes: Record<number, string> }>;
  toggleDayComplete: (planId: string, dayNumber: number) => void;
  saveDayNote: (planId: string, dayNumber: number, note: string) => void;
  addCustomPlan: (plan: DevotionalPlan) => void;

  // Notifications
  requestNotificationPermission: () => Promise<boolean>;
  showNotificationToast: (title: string, body: string) => void;
  activeNotificationToast: { title: string; body: string } | null;
  clearNotificationToast: () => void;
}

const DEFAULT_SETTINGS: UserSettings = {
  name: 'Beloved Daughter',
  avatar: 'rose',
  fontSize: 'md',
  twilightMode: false,
  whimsicalEffects: true,
  preferredTranslation: 'KJV',
  readingReminderTime: '07:30',
  readingReminderEnabled: true,
  prayerReminderTime: '21:00',
  prayerReminderEnabled: true,
  language: 'en'
};

const INITIAL_PRAYERS: PrayerItem[] = [
  {
    id: 'pr-1',
    title: 'Peace Over My Family',
    content: 'Father, surround our home with Your holy angels and gentle quietness. Shield my loved ones from harm and anxiety.',
    tag: 'Family',
    dateCreated: '2026-10-06',
    isAnswered: false
  },
  {
    id: 'pr-2',
    title: 'Clarity for My Calling',
    content: 'Lord, make plain the steps ahead. Give me wisdom like Deborah and courage like Queen Esther.',
    tag: 'Guidance',
    dateCreated: '2026-10-05',
    isAnswered: true,
    dateAnswered: '2026-10-07',
    answerTestimony: 'Felt a deep supernatural peace and received confirmation through Psalm 32:8!'
  },
  {
    id: 'pr-3',
    title: 'Healing for Weary Body & Mind',
    content: 'Jesus, restore my sleep, calm my thoughts, and replenish my strength with Your living water.',
    tag: 'Health',
    dateCreated: '2026-10-04',
    isAnswered: false
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isCoverOpen, setIsCoverOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('esther_cover_opened') === 'true';
    } catch {
      return false;
    }
  });

  // Settings
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem('esther_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Reader State
  const [currentBook, setCurrentBook] = useState<string>('Esther');
  const [currentChapter, setCurrentChapter] = useState<number>(4);
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);
  const [verseArtVerse, setVerseArtVerse] = useState<{ reference: string; text: string } | null>(null);

  // Highlights & Notes
  const [highlights, setHighlights] = useState<HighlightedVerse[]>(() => {
    try {
      const saved = localStorage.getItem('esther_highlights');
      return saved ? JSON.parse(saved) : [
        {
          id: 'Esther-4-14',
          book: 'Esther',
          chapter: 4,
          verse: 14,
          text: '...and who knoweth whether thou art come to the kingdom for such a time as this?',
          color: 'rosegold',
          date: '2026-10-07'
        }
      ];
    } catch {
      return [];
    }
  });

  const [bookmarks, setBookmarks] = useState<VerseBookmark[]>(() => {
    try {
      const saved = localStorage.getItem('esther_bookmarks');
      return saved ? JSON.parse(saved) : [
        {
          id: 'Proverbs-31-25',
          book: 'Proverbs',
          chapter: 31,
          verse: 25,
          text: 'Strength and honour are her clothing; and she shall rejoice in time to come.',
          date: '2026-10-06'
        }
      ];
    } catch {
      return [];
    }
  });

  const [notes, setNotes] = useState<VerseNote[]>(() => {
    try {
      const saved = localStorage.getItem('esther_notes');
      return saved ? JSON.parse(saved) : [
        {
          id: 'note-1',
          book: 'Esther',
          chapter: 4,
          verse: 14,
          text: 'for such a time as this',
          note: 'God placed me in this season intentionally. I will not hide in fear.',
          date: '2026-10-07'
        }
      ];
    } catch {
      return [];
    }
  });

  // Habits
  const todayStr = getTodayString();
  const [todayPrayers, setTodayPrayers] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`esther_prayers_${todayStr}`);
      return saved ? parseInt(saved, 10) : 2;
    } catch {
      return 2;
    }
  });

  const [todayMinutes, setTodayMinutes] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`esther_minutes_${todayStr}`);
      return saved ? parseInt(saved, 10) : 10;
    } catch {
      return 10;
    }
  });

  const [habitLogs, setHabitLogs] = useState<HabitLog[]>(() => {
    try {
      const saved = localStorage.getItem('esther_habit_logs');
      if (saved) return JSON.parse(saved);
      // Demo past logs for rich charts
      return [
        { date: '2026-10-03', prayersCount: 3, scriptureMinutes: 15, completedDailyGoal: true },
        { date: '2026-10-04', prayersCount: 2, scriptureMinutes: 12, completedDailyGoal: true },
        { date: '2026-10-05', prayersCount: 4, scriptureMinutes: 20, completedDailyGoal: true },
        { date: '2026-10-06', prayersCount: 3, scriptureMinutes: 15, completedDailyGoal: true },
        { date: '2026-10-07', prayersCount: 3, scriptureMinutes: 18, completedDailyGoal: true }
      ];
    } catch {
      return [];
    }
  });

  const [streakDays, setStreakDays] = useState<number>(5);
  const [bestStreak, setBestStreak] = useState<number>(12);
  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>(['seed', 'three_days']);

  // Prayers
  const [prayers, setPrayers] = useState<PrayerItem[]>(() => {
    try {
      const saved = localStorage.getItem('esther_prayers_list');
      return saved ? JSON.parse(saved) : INITIAL_PRAYERS;
    } catch {
      return INITIAL_PRAYERS;
    }
  });

  // Devotional Plans
  const [plans, setPlans] = useState<DevotionalPlan[]>(() => {
    try {
      const saved = localStorage.getItem('esther_custom_plans');
      if (saved) {
        return [...DEVOTIONAL_PLANS, ...JSON.parse(saved)];
      }
      return DEVOTIONAL_PLANS;
    } catch {
      return DEVOTIONAL_PLANS;
    }
  });

  const [userPlanProgress, setUserPlanProgress] = useState<
    Record<string, { completedDays: number[]; userNotes: Record<number, string> }>
  >(() => {
    try {
      const saved = localStorage.getItem('esther_plan_progress');
      return saved
        ? JSON.parse(saved)
        : {
            'women-of-the-bible': { completedDays: [1, 2], userNotes: { 1: 'Such a reminder of divine timing.' } }
          };
    } catch {
      return {};
    }
  });

  // Notifications
  const [activeNotificationToast, setActiveNotificationToast] = useState<{ title: string; body: string } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('esther_cover_opened', String(isCoverOpen));
    } catch (e) {
      console.warn(e);
    }
  }, [isCoverOpen]);

  useEffect(() => {
    try {
      localStorage.setItem('esther_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn(e);
    }
    // Handle twilight dark mode on body root
    if (settings.twilightMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('esther_highlights', JSON.stringify(highlights));
    } catch (e) {
      console.warn(e);
    }
  }, [highlights]);

  useEffect(() => {
    try {
      localStorage.setItem('esther_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.warn(e);
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('esther_notes', JSON.stringify(notes));
    } catch (e) {
      console.warn(e);
    }
  }, [notes]);

  useEffect(() => {
    try {
      localStorage.setItem('esther_prayers_list', JSON.stringify(prayers));
    } catch (e) {
      console.warn(e);
    }
  }, [prayers]);

  useEffect(() => {
    try {
      localStorage.setItem('esther_plan_progress', JSON.stringify(userPlanProgress));
    } catch (e) {
      console.warn(e);
    }
  }, [userPlanProgress]);

  useEffect(() => {
    try {
      localStorage.setItem(`esther_prayers_${todayStr}`, String(todayPrayers));
      localStorage.setItem(`esther_minutes_${todayStr}`, String(todayMinutes));
    } catch (e) {
      console.warn(e);
    }
  }, [todayPrayers, todayMinutes, todayStr]);

  const openApp = () => {
    setIsCoverOpen(true);
  };

  const closeCover = () => {
    setIsCoverOpen(false);
  };

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addHighlight = (verse: BibleVerse, color: HighlightedVerse['color']) => {
    const id = `${verse.book}-${verse.chapter}-${verse.verse}`;
    const newHighlight: HighlightedVerse = {
      id,
      book: verse.book,
      chapter: verse.chapter,
      verse: verse.verse,
      text: verse.text,
      color,
      date: getTodayString()
    };
    setHighlights(prev => [...prev.filter(h => h.id !== id), newHighlight]);
  };

  const removeHighlight = (verseId: string) => {
    setHighlights(prev => prev.filter(h => h.id !== verseId));
  };

  const toggleBookmark = (verse: BibleVerse) => {
    const id = `${verse.book}-${verse.chapter}-${verse.verse}`;
    setBookmarks(prev => {
      const exists = prev.some(b => b.id === id);
      if (exists) {
        return prev.filter(b => b.id !== id);
      } else {
        return [
          ...prev,
          {
            id,
            book: verse.book,
            chapter: verse.chapter,
            verse: verse.verse,
            text: verse.text,
            date: getTodayString()
          }
        ];
      }
    });
  };

  const addNote = (verse: BibleVerse, noteText: string) => {
    const newNote: VerseNote = {
      id: `note-${Date.now()}`,
      book: verse.book,
      chapter: verse.chapter,
      verse: verse.verse,
      text: verse.text,
      note: noteText,
      date: getTodayString()
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const incrementPrayers = () => {
    setTodayPrayers(prev => prev + 1);
    checkHabitGoals(todayPrayers + 1, todayMinutes);
  };

  const decrementPrayers = () => {
    setTodayPrayers(prev => Math.max(0, prev - 1));
  };

  const addReadingMinutes = (mins: number) => {
    setTodayMinutes(prev => prev + mins);
    checkHabitGoals(todayPrayers, todayMinutes + mins);
  };

  const resetTodayHabits = () => {
    setTodayPrayers(0);
    setTodayMinutes(0);
  };

  const checkHabitGoals = (prayersNow: number, minsNow: number) => {
    if (prayersNow >= 3 && minsNow >= 15) {
      if (!unlockedBadgeIds.includes('seed')) {
        setUnlockedBadgeIds(prev => [...prev, 'seed']);
        triggerCelebration('Mustard Seed of Faith Unlocked!');
      }
    }
  };

  const triggerCelebration = (title: string) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E8B4B8', '#B76E79', '#FFF8F0', '#F2D1C9']
    });
    showNotificationToast('✨ Graceful Milestone!', title);
  };

  const addPrayer = (title: string, content: string, tag: PrayerItem['tag']) => {
    const item: PrayerItem = {
      id: `prayer-${Date.now()}`,
      title,
      content,
      tag,
      dateCreated: getTodayString(),
      isAnswered: false
    };
    setPrayers(prev => [item, ...prev]);
    incrementPrayers();
  };

  const markPrayerAnswered = (id: string, testimony: string) => {
    setPrayers(prev =>
      prev.map(p =>
        p.id === id
          ? {
              ...p,
              isAnswered: true,
              dateAnswered: getTodayString(),
              answerTestimony: testimony || 'Praise God for His faithful answer!'
            }
          : p
      )
    );
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F4C2C2', '#B76E79', '#FADCE0']
    });
  };

  const deletePrayer = (id: string) => {
    setPrayers(prev => prev.filter(p => p.id !== id));
  };

  const toggleDayComplete = (planId: string, dayNumber: number) => {
    setUserPlanProgress(prev => {
      const current = prev[planId] || { completedDays: [], userNotes: {} };
      const exists = current.completedDays.includes(dayNumber);
      const newDays = exists
        ? current.completedDays.filter(d => d !== dayNumber)
        : [...current.completedDays, dayNumber];

      if (!exists) {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.8 },
          colors: ['#E8B4B8', '#B76E79', '#FFF8F0']
        });
      }

      return {
        ...prev,
        [planId]: {
          ...current,
          completedDays: newDays
        }
      };
    });
  };

  const saveDayNote = (planId: string, dayNumber: number, note: string) => {
    setUserPlanProgress(prev => {
      const current = prev[planId] || { completedDays: [], userNotes: {} };
      return {
        ...prev,
        [planId]: {
          ...current,
          userNotes: {
            ...current.userNotes,
            [dayNumber]: note
          }
        }
      };
    });
  };

  const addCustomPlan = (newPlan: DevotionalPlan) => {
    setPlans(prev => [...prev, newPlan]);
    try {
      const existing = localStorage.getItem('esther_custom_plans');
      const list = existing ? JSON.parse(existing) : [];
      localStorage.setItem('esther_custom_plans', JSON.stringify([...list, newPlan]));
    } catch (e) {
      console.warn(e);
    }
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        return perm === 'granted';
      } catch {
        return false;
      }
    }
    return false;
  };

  const showNotificationToast = (title: string, body: string) => {
    setActiveNotificationToast({ title, body });
    // Also try system notification if granted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/icon.svg'
        });
      } catch {
        // Fallback handled by in-app toast
      }
    }
    setTimeout(() => {
      setActiveNotificationToast(null);
    }, 5000);
  };

  const clearNotificationToast = () => {
    setActiveNotificationToast(null);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isCoverOpen,
        setIsCoverOpen,
        openApp,
        closeCover,
        settings,
        updateSettings,
        currentBook,
        setCurrentBook,
        currentChapter,
        setCurrentChapter,
        selectedVerse,
        setSelectedVerse,
        verseArtVerse,
        setVerseArtVerse,
        highlights,
        addHighlight,
        removeHighlight,
        bookmarks,
        toggleBookmark,
        notes,
        addNote,
        deleteNote,
        todayPrayers,
        todayMinutes,
        incrementPrayers,
        decrementPrayers,
        addReadingMinutes,
        resetTodayHabits,
        streakDays,
        bestStreak,
        habitLogs,
        unlockedBadgeIds,
        prayers,
        addPrayer,
        markPrayerAnswered,
        deletePrayer,
        plans,
        userPlanProgress,
        toggleDayComplete,
        saveDayNote,
        addCustomPlan,
        requestNotificationPermission,
        showNotificationToast,
        activeNotificationToast,
        clearNotificationToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
