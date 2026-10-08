import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Share2,
  Volume2,
  VolumeX,
  Heart,
  Flame,
  ArrowRight,
  BookOpen,
  Calendar,
  Plus,
  Bookmark
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getDailyVerseForToday } from '../../data/dailyVerses';
import { useAudioBible } from '../../hooks/useAudioBible';
import { MOOD_CATEGORIES, MOOD_VERSES } from '../../data/moodVerses';

export const HomeTab: React.FC = () => {
  const {
    setActiveTab,
    setVerseArtVerse,
    todayPrayers,
    incrementPrayers,
    todayMinutes,
    addReadingMinutes,
    streakDays,
    plans,
    setCurrentBook,
    setCurrentChapter
  } = useApp();

  const dailyVerse = getDailyVerseForToday();
  const { isPlaying, speak, stop } = useAudioBible();
  const [selectedQuickMood, setSelectedQuickMood] = useState<string | null>(null);

  const handleAudioToggle = () => {
    if (isPlaying) {
      stop();
    } else {
      speak(`${dailyVerse.text}. Reflection: ${dailyVerse.reflection}`, dailyVerse.reference);
    }
  };

  const handleOpenVerseArt = () => {
    setVerseArtVerse({
      reference: dailyVerse.reference,
      text: dailyVerse.text
    });
  };

  const handleOpenScripture = () => {
    // Navigate to reader
    const parts = dailyVerse.reference.split(' ');
    if (parts.length >= 2) {
      setCurrentBook(parts[0]);
      const chapter = parseInt(parts[1].split(':')[0], 10);
      if (!isNaN(chapter)) {
        setCurrentChapter(chapter);
      }
    }
    setActiveTab('read');
  };

  // Find featured plan
  const featuredPlan = plans[0];

  return (
    <div className="space-y-6 pb-20 pt-2 animate-fade-in">
      {/* Welcome Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-script text-2xl text-[#8C4A55] dark:text-[#F6D8CE]">
            Good morning, beloved
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#50212C] dark:text-[#FFF8F0]">
            Grace for Today
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FADCE0] dark:bg-[#3D252E] text-xs font-semibold text-[#8C4A55] dark:text-[#F6D8CE] shadow-2xs">
          <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>{streakDays} Day Streak</span>
        </div>
      </div>

      {/* Hero Daily Verse Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF5F6] via-[#FFF0F2] to-[#FADCE0]/60 dark:from-[#26181E] dark:via-[#211419] dark:to-[#170E12] border border-[#F2D1C9] dark:border-[#8A4854]/40 p-6 sm:p-7 shadow-md"
      >
        {/* Subtle Rosette Pattern Background */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-36 h-36 rounded-full bg-gradient-to-br from-[#E8B4B8]/30 to-transparent blur-2xl pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B76E79] animate-pulse" />
            <span className="text-xs uppercase tracking-[0.18em] font-semibold text-[#8C4A55] dark:text-[#E8B4B8]">
              Verse of the Day
            </span>
            <span className="text-[#B76E79]/40">·</span>
            <span className="text-xs text-[#8C4A55]/80 dark:text-[#D99B9F]/80 font-medium">
              {dailyVerse.theme}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleAudioToggle}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full text-[#8C4A55] dark:text-[#E8B4B8] hover:bg-white/60 dark:hover:bg-white/10 transition"
              title={isPlaying ? 'Pause audio reading' : 'Listen to verse audio'}
              aria-label="Listen to verse audio"
            >
              {isPlaying ? <VolumeX className="w-4 h-4 text-[#B76E79]" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleOpenVerseArt}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full text-[#8C4A55] dark:text-[#E8B4B8] hover:bg-white/60 dark:hover:bg-white/10 transition"
              title="Create shareable image"
              aria-label="Create shareable verse art"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scripture Body */}
        <blockquote className="my-3">
          <p className="font-scripture text-lg sm:text-xl leading-relaxed text-[#50212C] dark:text-[#FFF8F0] font-normal italic">
            &ldquo;{dailyVerse.text}&rdquo;
          </p>
          <div className="mt-3 flex items-center justify-between">
            <button
              onClick={handleOpenScripture}
              className="font-serif text-sm font-bold tracking-wide text-[#8C4A55] dark:text-[#F6D8CE] hover:underline flex items-center gap-1"
            >
              <span>{dailyVerse.reference}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="font-script text-base text-[#8C4A55]/90 dark:text-[#E8B4B8]">
              {dailyVerse.author}
            </span>
          </div>
        </blockquote>

        {/* Reflection & Prayer Accordion */}
        <div className="mt-5 pt-4 border-t border-[#F2D1C9]/60 dark:border-[#8A4854]/30 space-y-3">
          <p className="text-xs sm:text-sm text-[#733543] dark:text-[#D99B9F] leading-relaxed">
            <strong className="font-semibold text-[#50212C] dark:text-[#F6D8CE]">Today&apos;s Encouragement: </strong>
            {dailyVerse.reflection}
          </p>
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#1E1418]/60 border border-[#F2D1C9]/40 text-xs italic text-[#6A323E] dark:text-[#F6D8CE] flex items-start gap-2.5">
            <Heart className="w-3.5 h-3.5 text-[#B76E79] shrink-0 mt-0.5" />
            <div>
              <span className="not-italic font-semibold block mb-0.5 text-[#8C4A55] dark:text-[#E5A8A0]">
                Heartfelt Prayer:
              </span>
              &ldquo;{dailyVerse.prayer}&rdquo;
            </div>
          </div>
        </div>
      </motion.div>

      {/* "I'm Feeling..." Mood Bar Shortcut */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#50212C] dark:text-[#FFF8F0]">
              How is your heart feeling?
            </h3>
            <p className="text-xs text-[#8C4A55]/80 dark:text-[#D99B9F]/80">
              Verses and prayers tailored for your emotional season
            </p>
          </div>
          <button
            onClick={() => setActiveTab('mood')}
            className="text-xs font-semibold text-[#8C4A55] dark:text-[#F6D8CE] hover:underline flex items-center gap-0.5"
          >
            <span>See all</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Horizontal Mood Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {MOOD_CATEGORIES.slice(1, 8).map(mood => (
            <button
              key={mood}
              onClick={() => {
                setActiveTab('mood');
              }}
              className="min-h-[44px] shrink-0 px-4 py-2 rounded-2xl bg-white/80 dark:bg-[#25191E] border border-[#F2D1C9] dark:border-[#8A4854]/40 text-xs font-medium text-[#6A323E] dark:text-[#F6D8CE] hover:bg-[#FADCE0] dark:hover:bg-[#3D252E] shadow-2xs transition active:scale-95"
            >
              {mood}
            </button>
          ))}
        </div>
      </section>

      {/* Daily Spiritual Rhythm Counter (Habits) */}
      <section className="rounded-3xl bg-white/80 dark:bg-[#201419] border border-[#F2D1C9] dark:border-[#8A4854]/40 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#B76E79]" />
            <h3 className="font-serif text-base font-bold text-[#50212C] dark:text-[#FFF8F0]">
              Today&apos;s Spiritual Rhythm
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('track')}
            className="text-xs font-semibold text-[#8C4A55] dark:text-[#F6D8CE] hover:underline"
          >
            View Rings &amp; Milestones
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Prayer Counter */}
          <div className="p-3.5 rounded-2xl bg-[#FFF9F7] dark:bg-[#2A1B22] border border-[#FADCE0]/70 dark:border-[#8A4854]/30 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-[#8C4A55] dark:text-[#D99B9F]">
                Prayers Logged
              </p>
              <p className="font-serif text-2xl font-bold text-[#50212C] dark:text-[#FFF8F0] mt-0.5">
                {todayPrayers} <span className="text-xs font-sans font-normal text-[#9E6570]">/ 3 goal</span>
              </p>
            </div>
            <button
              onClick={incrementPrayers}
              className="min-h-[44px] min-w-[44px] rounded-full bg-[#B76E79] text-white flex items-center justify-center hover:bg-[#8C4A55] active:scale-95 transition shadow-xs"
              aria-label="Add prayer"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Scripture Reading Minutes */}
          <div className="p-3.5 rounded-2xl bg-[#FFF9F7] dark:bg-[#2A1B22] border border-[#FADCE0]/70 dark:border-[#8A4854]/30 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-[#8C4A55] dark:text-[#D99B9F]">
                Scripture Time
              </p>
              <p className="font-serif text-2xl font-bold text-[#50212C] dark:text-[#FFF8F0] mt-0.5">
                {todayMinutes}m <span className="text-xs font-sans font-normal text-[#9E6570]">/ 15m goal</span>
              </p>
            </div>
            <button
              onClick={() => addReadingMinutes(5)}
              className="min-h-[44px] px-3 rounded-full bg-[#FADCE0] dark:bg-[#3D252E] text-[#8C4A55] dark:text-[#F6D8CE] text-xs font-bold flex items-center justify-center hover:bg-[#E8B4B8] active:scale-95 transition"
              aria-label="Add 5 minutes reading"
            >
              +5m
            </button>
          </div>
        </div>
      </section>

      {/* Featured Devotional Study Plan */}
      {featuredPlan && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#50212C] dark:text-[#FFF8F0]">
              Featured Study Plan
            </h3>
            <button
              onClick={() => setActiveTab('plans')}
              className="text-xs font-semibold text-[#8C4A55] dark:text-[#F6D8CE] hover:underline"
            >
              Browse All Plans
            </button>
          </div>

          <div
            onClick={() => setActiveTab('plans')}
            className="cursor-pointer group relative rounded-3xl overflow-hidden border border-[#F2D1C9] dark:border-[#8A4854]/40 bg-white dark:bg-[#201419] shadow-sm transition hover:shadow-md"
          >
            {featuredPlan.coverImage && (
              <div className="h-44 w-full overflow-hidden relative">
                <img
                  src={featuredPlan.coverImage}
                  alt={featuredPlan.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="text-[11px] uppercase tracking-wider font-semibold opacity-90 text-[#FADCE0]">
                    {featuredPlan.durationDays} Days · {featuredPlan.category}
                  </p>
                  <h4 className="font-serif text-xl font-bold leading-tight drop-shadow-sm">
                    {featuredPlan.title}
                  </h4>
                  <p className="text-xs text-white/90 line-clamp-1">{featuredPlan.subtitle}</p>
                </div>
              </div>
            )}
            <div className="p-4 flex items-center justify-between">
              <p className="text-xs text-[#733543] dark:text-[#D99B9F] line-clamp-2">
                {featuredPlan.description}
              </p>
              <span className="ml-3 px-3 py-1.5 rounded-full bg-[#FFF0F2] dark:bg-[#2F1B23] border border-[#B76E79]/30 text-xs font-semibold text-[#8C4A55] dark:text-[#F6D8CE] shrink-0">
                Continue
              </span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
