import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Share2,
  Volume2,
  VolumeX,
  Bookmark,
  Sparkles,
  ArrowRight,
  Search,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOOD_CATEGORIES, MOOD_VERSES } from '../../data/moodVerses';
import { useAudioBible } from '../../hooks/useAudioBible';
import { MoodVerseItem } from '../../types';

export const MoodTab: React.FC = () => {
  const {
    setVerseArtVerse,
    toggleBookmark,
    bookmarks,
    showNotificationToast,
    setCurrentBook,
    setCurrentChapter,
    setActiveTab
  } = useApp();

  const [selectedMood, setSelectedMood] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItem, setActiveItem] = useState<MoodVerseItem | null>(MOOD_VERSES[0]);

  const { isPlaying, speak, stop } = useAudioBible();

  const filteredVerses = MOOD_VERSES.filter(v => {
    const matchCategory = selectedMood === 'All' || v.mood === selectedMood;
    const matchQuery =
      !searchQuery ||
      v.verseText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.verseRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.womanContext.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.mood.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  const handleAudio = (item: MoodVerseItem) => {
    if (isPlaying) {
      stop();
    } else {
      speak(`${item.verseText}. Reflection: ${item.reflection}. Prayer: ${item.prayer}`, item.verseRef);
    }
  };

  const handleShare = (item: MoodVerseItem) => {
    setVerseArtVerse({
      reference: item.verseRef,
      text: item.verseText
    });
  };

  const handleGoToScripture = (ref: string) => {
    const parts = ref.split(' ');
    if (parts.length >= 2) {
      setCurrentBook(parts[0]);
      const chapter = parseInt(parts[1].split(':')[0], 10);
      if (!isNaN(chapter)) {
        setCurrentChapter(chapter);
      }
    }
    setActiveTab('read');
  };

  return (
    <div className="space-y-5 pb-24 pt-2">
      {/* Header */}
      <div>
        <p className="font-script text-2xl text-[#8C4A55] dark:text-[#F6D8CE]">
          A sanctuary for your heart
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#50212C] dark:text-[#FFF8F0]">
          I&apos;m Feeling...
        </h2>
        <p className="text-xs text-[#7A3F4C] dark:text-[#D99B9F] mt-1">
          Select what your soul is experiencing. Discover scripture and tender prayers inspired by the faithful women of the Bible.
        </p>
      </div>

      {/* Search Input */}
      <div className="p-3 rounded-2xl bg-white/90 dark:bg-[#201419] border border-[#F2D1C9] dark:border-[#8A4854]/40 flex items-center gap-2 shadow-2xs">
        <Search className="w-4 h-4 text-[#B76E79]" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by feeling, biblical woman (Esther, Hannah, Ruth)..."
          className="w-full text-xs bg-transparent text-[#50212C] dark:text-[#FFF8F0] focus:outline-none"
        />
      </div>

      {/* Mood Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {MOOD_CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedMood(category)}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedMood === category
                ? 'bg-[#B76E79] text-white shadow-xs'
                : 'bg-white/80 dark:bg-[#25181E] border border-[#F2D1C9] dark:border-[#8A4854]/40 text-[#6A323E] dark:text-[#F6D8CE] hover:bg-[#FADCE0]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Verses Feed */}
      <div className="space-y-4">
        {filteredVerses.length === 0 ? (
          <div className="text-center py-10 text-xs text-[#8C4A55]">
            No verses found matching this mood. Try another selection.
          </div>
        ) : (
          filteredVerses.map(item => {
            const isBookmarked = bookmarks.some(b => b.id.includes(item.verseRef.replace(/\s+/g, '-')));

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl bg-white/90 dark:bg-[#1E1418]/90 border border-[#F2D1C9] dark:border-[#8A4854]/40 p-5 sm:p-6 shadow-xs hover:shadow-sm transition"
              >
                {/* Mood Tag & Biblical Matriarch Adjacency */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{item.emoji}</span>
                    <span className="font-serif text-sm font-bold text-[#8C4A55] dark:text-[#E8B4B8]">
                      {item.mood}
                    </span>
                    <span className="text-[#B76E79]/40">·</span>
                    <span className="text-xs text-[#7A3F4C]/80 dark:text-[#D99B9F]/80">
                      {item.tags[0]}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleAudio(item)}
                      className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full text-[#8C4A55] dark:text-[#E8B4B8] hover:bg-[#FFF0F2] dark:hover:bg-[#2F1B23]"
                      title="Listen along"
                      aria-label="Listen along"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleShare(item)}
                      className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full text-[#8C4A55] dark:text-[#E8B4B8] hover:bg-[#FFF0F2] dark:hover:bg-[#2F1B23]"
                      title="Create verse art"
                      aria-label="Create verse art"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        toggleBookmark({
                          book: item.verseRef.split(' ')[0],
                          chapter: 1,
                          verse: 1,
                          text: item.verseText
                        });
                        showNotificationToast('✨ Saved', 'Added to your bookmarked verses');
                      }}
                      className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full text-[#8C4A55] dark:text-[#E8B4B8] hover:bg-[#FFF0F2] dark:hover:bg-[#2F1B23]"
                      title="Bookmark verse"
                      aria-label="Bookmark verse"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Biblical Woman Context Insight */}
                <div className="p-2.5 rounded-xl bg-[#FFF9F7] dark:bg-[#281A21] border border-[#FADCE0] dark:border-[#8A4854]/30 text-xs text-[#6A323E] dark:text-[#F6D8CE] mb-3 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#B76E79] shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    <strong className="font-semibold text-[#8C4A55] dark:text-[#E5A8A0]">Biblical Sister: </strong>
                    {item.womanContext}
                  </p>
                </div>

                {/* Scripture Quote */}
                <blockquote className="my-2">
                  <p className="font-scripture text-base sm:text-lg leading-relaxed text-[#50212C] dark:text-[#FFF8F0] italic">
                    &ldquo;{item.verseText}&rdquo;
                  </p>
                  <button
                    onClick={() => handleGoToScripture(item.verseRef)}
                    className="mt-2 font-serif text-xs font-bold text-[#8C4A55] dark:text-[#F6D8CE] hover:underline flex items-center gap-1"
                  >
                    <span>{item.verseRef}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </blockquote>

                {/* Devotional Reflection */}
                <p className="text-xs text-[#733543] dark:text-[#D99B9F] leading-relaxed mt-3 pt-3 border-t border-[#F2D1C9]/50 dark:border-[#8A4854]/30">
                  {item.reflection}
                </p>

                {/* Gentle Prayer Box */}
                <div className="mt-3 p-3 rounded-2xl bg-[#FFF0F2]/70 dark:bg-[#2F1B23]/70 border border-[#F2D1C9]/40 text-xs italic text-[#50212C] dark:text-[#F6D8CE] flex items-start gap-2">
                  <Heart className="w-3.5 h-3.5 text-[#B76E79] shrink-0 mt-0.5 fill-[#B76E79]/20" />
                  <div>
                    <span className="not-italic font-bold block text-[11px] text-[#8C4A55] dark:text-[#E5A8A0]">
                      Whispered Prayer:
                    </span>
                    &ldquo;{item.prayer}&rdquo;
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
