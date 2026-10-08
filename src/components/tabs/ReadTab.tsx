import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  Highlighter,
  MessageSquare,
  Search,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
  Check,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BIBLE_BOOKS, getChapterVerses } from '../../data/bibleData';
import { useAudioBible } from '../../hooks/useAudioBible';
import { BibleVerse, HighlightColor } from '../../types';

export const ReadTab: React.FC = () => {
  const {
    currentBook,
    setCurrentBook,
    currentChapter,
    setCurrentChapter,
    settings,
    updateSettings,
    highlights,
    addHighlight,
    removeHighlight,
    bookmarks,
    toggleBookmark,
    notes,
    addNote,
    setVerseArtVerse,
    showNotificationToast,
    addReadingMinutes
  } = useApp();

  const [isBookPickerOpen, setIsBookPickerOpen] = useState(false);
  const [bookSearchQuery, setBookSearchQuery] = useState('');
  const [selectedTestament, setSelectedTestament] = useState<'All' | 'OT' | 'NT'>('All');
  const [activeVerseForAction, setActiveVerseForAction] = useState<BibleVerse | null>(null);
  const [activeNoteText, setActiveNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [scriptureSearchQuery, setScriptureSearchQuery] = useState('');
  const [isSearchingScripture, setIsSearchingScripture] = useState(false);

  const { isPlaying, speak, stop, playbackRate, setPlaybackRate } = useAudioBible();

  const currentBookInfo = BIBLE_BOOKS.find(b => b.name === currentBook) || BIBLE_BOOKS[0];
  const verses = getChapterVerses(currentBook, currentChapter, settings.preferredTranslation);

  // Font size mapping
  const fontSizeClasses = {
    sm: 'text-sm leading-relaxed',
    md: 'text-base leading-relaxed',
    lg: 'text-lg leading-loose',
    xl: 'text-xl leading-loose'
  }[settings.fontSize];

  // Highlight color definitions
  const highlightStyles: Record<HighlightColor, { bg: string; border: string; label: string }> = {
    pink: { bg: 'bg-[#FADCE0]/70 dark:bg-[#662E3B]/60', border: 'border-b-2 border-[#E8B4B8]', label: 'Blush' },
    rosegold: { bg: 'bg-[#F2D1C9]/70 dark:bg-[#5E2B35]/60', border: 'border-b-2 border-[#B76E79]', label: 'Rose Gold' },
    sage: { bg: 'bg-[#E2EDE6]/70 dark:bg-[#20362A]/60', border: 'border-b-2 border-[#94B39F]', label: 'Sage' },
    lilac: { bg: 'bg-[#EFE8F4]/70 dark:bg-[#382645]/60', border: 'border-b-2 border-[#BCA5CE]', label: 'Lilac' },
    honey: { bg: 'bg-[#FFF3D6]/70 dark:bg-[#483B1B]/60', border: 'border-b-2 border-[#E6C67A]', label: 'Honey' }
  };

  const handleNextChapter = () => {
    if (currentChapter < currentBookInfo.chaptersCount) {
      setCurrentChapter(currentChapter + 1);
    } else {
      const idx = BIBLE_BOOKS.findIndex(b => b.name === currentBook);
      if (idx < BIBLE_BOOKS.length - 1) {
        setCurrentBook(BIBLE_BOOKS[idx + 1].name);
        setCurrentChapter(1);
      }
    }
    addReadingMinutes(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    } else {
      const idx = BIBLE_BOOKS.findIndex(b => b.name === currentBook);
      if (idx > 0) {
        setCurrentBook(BIBLE_BOOKS[idx - 1].name);
        setCurrentChapter(BIBLE_BOOKS[idx - 1].chaptersCount);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadAloudChapter = () => {
    if (isPlaying) {
      stop();
    } else {
      const fullText = verses.map(v => `${v.verse}. ${v.text}`).join(' ');
      speak(fullText, `${currentBook} Chapter ${currentChapter}`);
      addReadingMinutes(5);
    }
  };

  const handleSelectVerse = (verse: BibleVerse) => {
    if (activeVerseForAction?.verse === verse.verse) {
      setActiveVerseForAction(null);
      setIsAddingNote(false);
    } else {
      setActiveVerseForAction(verse);
      setIsAddingNote(false);
      // Pre-fill note if existing
      const existing = notes.find(
        n => n.book === verse.book && n.chapter === verse.chapter && n.verse === verse.verse
      );
      setActiveNoteText(existing ? existing.note : '');
    }
  };

  const handleSaveNote = () => {
    if (activeVerseForAction && activeNoteText.trim()) {
      addNote(activeVerseForAction, activeNoteText.trim());
      setIsAddingNote(false);
      showNotificationToast('✨ Note Saved', `Saved reflection on ${activeVerseForAction.book} ${activeVerseForAction.chapter}:${activeVerseForAction.verse}`);
    }
  };

  const filteredBooks = BIBLE_BOOKS.filter(b => {
    const matchTestament = selectedTestament === 'All' || b.testament === selectedTestament;
    const matchSearch = b.name.toLowerCase().includes(bookSearchQuery.toLowerCase());
    return matchTestament && matchSearch;
  });

  return (
    <div className="space-y-4 pb-24 pt-2">
      {/* Top Bible Navigation Bar */}
      <div className="sticky top-14 z-20 rounded-2xl bg-white/90 dark:bg-[#1E1418]/90 backdrop-blur-md border border-[#F2D1C9] dark:border-[#8A4854]/40 p-2.5 shadow-xs flex items-center justify-between">
        {/* Book & Chapter Selector Button */}
        <button
          onClick={() => setIsBookPickerOpen(true)}
          className="min-h-[44px] flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFF0F2] dark:bg-[#2F1B23] hover:bg-[#FADCE0] dark:hover:bg-[#3D252E] text-xs sm:text-sm font-serif font-bold text-[#6A323E] dark:text-[#F6D8CE] transition"
        >
          <BookOpen className="w-4 h-4 text-[#B76E79]" />
          <span>
            {currentBook} {currentChapter}
          </span>
          <span className="text-[10px] uppercase font-sans font-semibold text-[#8C4A55]/70 dark:text-[#D99B9F]/70 ml-1">
            ({settings.preferredTranslation})
          </span>
        </button>

        {/* Translation Switcher */}
        <div className="flex items-center gap-1">
          {(['KJV', 'WEB', 'BBE'] as const).map(tr => (
            <button
              key={tr}
              onClick={() => updateSettings({ preferredTranslation: tr })}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition ${
                settings.preferredTranslation === tr
                  ? 'bg-[#B76E79] text-white shadow-xs'
                  : 'text-[#8C4A55] dark:text-[#D99B9F] hover:bg-[#FADCE0]/50'
              }`}
            >
              {tr}
            </button>
          ))}
        </div>

        {/* Listen Along Audio & Search */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsSearchingScripture(!isSearchingScripture)}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-[#8C4A55] dark:text-[#E8B4B8] hover:bg-[#FFF0F2] dark:hover:bg-[#2F1B23] transition"
            title="Search scripture"
            aria-label="Search scripture"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={handleReadAloudChapter}
            className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl transition ${
              isPlaying
                ? 'bg-[#B76E79] text-white animate-pulse'
                : 'text-[#8C4A55] dark:text-[#E8B4B8] hover:bg-[#FFF0F2] dark:hover:bg-[#2F1B23]'
            }`}
            title={isPlaying ? 'Pause narration' : 'Listen along to chapter'}
            aria-label="Listen along"
          >
            {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* In-Chapter Scripture Search */}
      {isSearchingScripture && (
        <div className="p-3 rounded-2xl bg-white dark:bg-[#201419] border border-[#F2D1C9] dark:border-[#8A4854]/40 flex items-center gap-2">
          <Search className="w-4 h-4 text-[#B76E79]" />
          <input
            type="text"
            value={scriptureSearchQuery}
            onChange={e => setScriptureSearchQuery(e.target.value)}
            placeholder="Search keywords in this chapter (e.g. peace, love)..."
            className="w-full text-xs bg-transparent text-[#50212C] dark:text-[#FFF8F0] focus:outline-none"
          />
          {scriptureSearchQuery && (
            <button
              onClick={() => setScriptureSearchQuery('')}
              className="text-[#8C4A55] hover:text-[#50212C]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Font Size & Audio Rate Bar */}
      <div className="flex items-center justify-between text-xs px-2 text-[#8C4A55] dark:text-[#D99B9F]">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-[11px]">Font:</span>
          {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
            <button
              key={size}
              onClick={() => updateSettings({ fontSize: size })}
              className={`px-2 py-0.5 rounded uppercase text-[10px] font-bold ${
                settings.fontSize === size
                  ? 'bg-[#B76E79] text-white'
                  : 'bg-white/60 dark:bg-white/10 hover:bg-[#FADCE0]'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        {isPlaying && (
          <div className="flex items-center gap-1 text-[11px] font-medium text-[#B76E79]">
            <span className="w-2 h-2 rounded-full bg-[#B76E79] animate-ping" />
            <span>Narrating at {playbackRate}x</span>
          </div>
        )}
      </div>

      {/* Scripture Verses View */}
      <div className="rounded-3xl bg-white/90 dark:bg-[#1E1418]/90 border border-[#F2D1C9] dark:border-[#8A4854]/40 p-5 sm:p-7 shadow-sm">
        {/* Chapter Title Header */}
        <div className="text-center mb-6 pb-4 border-b border-[#F2D1C9]/50 dark:border-[#8A4854]/30">
          <span className="text-[11px] uppercase tracking-widest font-semibold text-[#8C4A55] dark:text-[#E8B4B8]">
            {currentBookInfo.category} · {settings.preferredTranslation}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#50212C] dark:text-[#FFF8F0] mt-1">
            {currentBook} {currentChapter}
          </h2>
        </div>

        {/* Verses Container */}
        <div className="space-y-4">
          {verses.map(v => {
            const verseId = `${v.book}-${v.chapter}-${v.verse}`;
            const highlight = highlights.find(h => h.id === verseId);
            const isBookmarked = bookmarks.some(b => b.id === verseId);
            const hasNote = notes.some(n => n.book === v.book && n.chapter === v.chapter && n.verse === v.verse);
            const isSelected = activeVerseForAction?.verse === v.verse;

            const matchesSearch = !scriptureSearchQuery || v.text.toLowerCase().includes(scriptureSearchQuery.toLowerCase());
            if (!matchesSearch) return null;

            return (
              <div
                key={v.verse}
                onClick={() => handleSelectVerse(v)}
                className={`group cursor-pointer rounded-xl p-2.5 transition-colors relative ${
                  isSelected
                    ? 'ring-2 ring-[#B76E79] bg-[#FFF0F2] dark:bg-[#2A1B22]'
                    : 'hover:bg-[#FFF9F7] dark:hover:bg-[#26181E]'
                } ${highlight ? highlightStyles[highlight.color].bg : ''}`}
              >
                <p className={`font-scripture ${fontSizeClasses} text-[#4A2831] dark:text-[#F2E5E8]`}>
                  <sup className="font-sans font-bold text-xs text-[#B76E79] dark:text-[#E5A8A0] mr-2 select-none">
                    {v.verse}
                  </sup>
                  {v.text}
                </p>

                {/* Verse Indicators (Bookmark, Note) */}
                <div className="mt-1 flex items-center gap-2 text-[11px] text-[#8C4A55] dark:text-[#E8B4B8]">
                  {isBookmarked && (
                    <span className="flex items-center gap-0.5 text-rose-500 font-semibold">
                      <Bookmark className="w-3 h-3 fill-rose-500" /> Bookmarked
                    </span>
                  )}
                  {hasNote && (
                    <span className="flex items-center gap-0.5 text-[#B76E79] font-medium">
                      <MessageSquare className="w-3 h-3" /> Note added
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Verse Action Drawer (Bottom Sticky on selection) */}
        {activeVerseForAction && (
          <div className="mt-6 pt-4 border-t border-[#F2D1C9] dark:border-[#8A4854]/40 space-y-3 animate-fade-in bg-[#FFF5F6] dark:bg-[#281A21] -mx-5 -mb-5 p-5 rounded-b-3xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-[#6A323E] dark:text-[#F6D8CE]">
                {activeVerseForAction.book} {activeVerseForAction.chapter}:{activeVerseForAction.verse} Selected
              </span>
              <button
                onClick={() => setActiveVerseForAction(null)}
                className="text-[#8C4A55] hover:text-[#50212C]"
                aria-label="Close action drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Pastel Highlighter Picker */}
            <div className="flex items-center gap-2 py-1">
              <span className="text-[11px] font-semibold text-[#8C4A55] dark:text-[#D99B9F]">
                Highlight:
              </span>
              {(['pink', 'rosegold', 'sage', 'lilac', 'honey'] as HighlightColor[]).map(c => {
                const isCurrent = highlights.some(
                  h => h.id === `${activeVerseForAction.book}-${activeVerseForAction.chapter}-${activeVerseForAction.verse}` && h.color === c
                );
                return (
                  <button
                    key={c}
                    onClick={() => {
                      if (isCurrent) {
                        removeHighlight(`${activeVerseForAction.book}-${activeVerseForAction.chapter}-${activeVerseForAction.verse}`);
                      } else {
                        addHighlight(activeVerseForAction, c);
                      }
                    }}
                    className={`w-6 h-6 rounded-full border border-black/10 transition-transform flex items-center justify-center ${
                      c === 'pink' ? 'bg-[#F4C2C2]' :
                      c === 'rosegold' ? 'bg-[#B76E79]' :
                      c === 'sage' ? 'bg-[#C2D4C8]' :
                      c === 'lilac' ? 'bg-[#D8CDE0]' : 'bg-[#F7E1B5]'
                    } ${isCurrent ? 'scale-125 ring-2 ring-black/30' : 'hover:scale-110'}`}
                    title={highlightStyles[c].label}
                    aria-label={`Highlight with ${highlightStyles[c].label}`}
                  >
                    {isCurrent && <Check className="w-3.5 h-3.5 text-white drop-shadow-xs" />}
                  </button>
                );
              })}
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <button
                onClick={() => toggleBookmark(activeVerseForAction)}
                className="min-h-[44px] flex flex-col items-center justify-center rounded-xl bg-white dark:bg-[#1E1418] border border-[#F2D1C9] dark:border-[#8A4854]/40 text-xs font-medium text-[#6A323E] dark:text-[#F6D8CE] hover:bg-[#FADCE0] transition"
              >
                <Bookmark className="w-4 h-4 text-[#B76E79]" />
                <span className="text-[10px] mt-0.5">Bookmark</span>
              </button>
              <button
                onClick={() => setIsAddingNote(!isAddingNote)}
                className="min-h-[44px] flex flex-col items-center justify-center rounded-xl bg-white dark:bg-[#1E1418] border border-[#F2D1C9] dark:border-[#8A4854]/40 text-xs font-medium text-[#6A323E] dark:text-[#F6D8CE] hover:bg-[#FADCE0] transition"
              >
                <MessageSquare className="w-4 h-4 text-[#B76E79]" />
                <span className="text-[10px] mt-0.5">Note</span>
              </button>
              <button
                onClick={() => {
                  speak(activeVerseForAction.text, `${activeVerseForAction.book} ${activeVerseForAction.chapter}:${activeVerseForAction.verse}`);
                }}
                className="min-h-[44px] flex flex-col items-center justify-center rounded-xl bg-white dark:bg-[#1E1418] border border-[#F2D1C9] dark:border-[#8A4854]/40 text-xs font-medium text-[#6A323E] dark:text-[#F6D8CE] hover:bg-[#FADCE0] transition"
              >
                <Volume2 className="w-4 h-4 text-[#B76E79]" />
                <span className="text-[10px] mt-0.5">Listen</span>
              </button>
              <button
                onClick={() => {
                  setVerseArtVerse({
                    reference: `${activeVerseForAction.book} ${activeVerseForAction.chapter}:${activeVerseForAction.verse}`,
                    text: activeVerseForAction.text
                  });
                }}
                className="min-h-[44px] flex flex-col items-center justify-center rounded-xl bg-gradient-to-r from-[#B76E79] to-[#8C4A55] text-white text-xs font-medium shadow hover:opacity-95 transition"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-[10px] mt-0.5">Create Art</span>
              </button>
            </div>

            {/* Add / Edit Note Input */}
            {isAddingNote && (
              <div className="pt-2 space-y-2">
                <textarea
                  value={activeNoteText}
                  onChange={e => setActiveNoteText(e.target.value)}
                  placeholder="Record what the Lord is speaking into your heart through this verse..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl border border-[#F2D1C9] dark:border-[#8A4854]/40 bg-white dark:bg-[#1E1418] text-[#50212C] dark:text-[#FFF8F0] focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsAddingNote(false)}
                    className="px-3 py-1.5 rounded-lg text-xs text-[#8C4A55]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNote}
                    className="px-4 py-1.5 rounded-lg bg-[#B76E79] text-white text-xs font-semibold"
                  >
                    Save Reflection
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Chapter Navigation Arrows */}
        <div className="mt-8 pt-4 border-t border-[#F2D1C9]/50 dark:border-[#8A4854]/30 flex items-center justify-between">
          <button
            onClick={handlePrevChapter}
            className="min-h-[44px] flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#8C4A55] dark:text-[#F6D8CE] hover:bg-[#FFF0F2] dark:hover:bg-[#2F1B23] transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <span className="font-serif text-xs font-medium text-[#8C4A55]/70 dark:text-[#D99B9F]/70">
            {currentBook} {currentChapter} of {currentBookInfo.chaptersCount}
          </span>
          <button
            onClick={handleNextChapter}
            className="min-h-[44px] flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#8C4A55] dark:text-[#F6D8CE] hover:bg-[#FFF0F2] dark:hover:bg-[#2F1B23] transition"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Book & Chapter Selection Modal / Drawer */}
      {isBookPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-3xl bg-[#FFF8F0] dark:bg-[#1E1418] p-5 shadow-2xl border border-[#F2D1C9] dark:border-[#8A4854]/40 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2D1C9]">
              <h3 className="font-serif text-lg font-bold text-[#6A323E] dark:text-[#F6D8CE]">
                Select Book &amp; Chapter
              </h3>
              <button
                onClick={() => setIsBookPickerOpen(false)}
                className="p-1 rounded-full text-[#8C4A55] hover:bg-[#FADCE0]/50"
                aria-label="Close picker"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Books & Filter */}
            <div className="my-3 space-y-2">
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#281A21] border border-[#F2D1C9] dark:border-[#8A4854]/40 flex items-center gap-2">
                <Search className="w-4 h-4 text-[#B76E79]" />
                <input
                  type="text"
                  value={bookSearchQuery}
                  onChange={e => setBookSearchQuery(e.target.value)}
                  placeholder="Find book (e.g. Esther, Ruth, Psalms)..."
                  className="w-full text-xs bg-transparent text-[#50212C] dark:text-[#FFF8F0] focus:outline-none"
                />
              </div>

              {/* Testament Segmented Control */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-[#FFF0F2] dark:bg-[#2A1C22] rounded-xl text-xs font-semibold">
                {(['All', 'OT', 'NT'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedTestament(t)}
                    className={`py-1.5 rounded-lg transition ${
                      selectedTestament === t
                        ? 'bg-white dark:bg-[#3D252E] text-[#8C4A55] dark:text-[#F6D8CE] shadow-xs'
                        : 'text-[#8C4A55]/70 dark:text-[#D99B9F]/70'
                    }`}
                  >
                    {t === 'All' ? 'All Books' : t === 'OT' ? 'Old Testament' : 'New Testament'}
                  </button>
                ))}
              </div>
            </div>

            {/* Books List Grid */}
            <div className="flex-1 overflow-y-auto no-scrollbar pr-1 grid grid-cols-2 sm:grid-cols-3 gap-1.5 py-1">
              {filteredBooks.map(b => (
                <button
                  key={b.name}
                  onClick={() => {
                    setCurrentBook(b.name);
                    setCurrentChapter(1);
                    setIsBookPickerOpen(false);
                  }}
                  className={`p-2.5 rounded-xl text-left border transition ${
                    currentBook === b.name
                      ? 'border-[#B76E79] bg-[#FFF0F2] dark:bg-[#3D252E] text-[#8C4A55] dark:text-[#F6D8CE] font-bold'
                      : 'border-transparent bg-white/70 dark:bg-[#25181E] text-[#6A323E] dark:text-[#E8B4B8] hover:bg-[#FFF0F2]'
                  }`}
                >
                  <p className="text-xs truncate font-medium">{b.name}</p>
                  <p className="text-[10px] text-[#8C4A55]/60 dark:text-[#D99B9F]/60">
                    {b.chaptersCount} {b.chaptersCount === 1 ? 'ch' : 'chs'}
                  </p>
                </button>
              ))}
            </div>

            {/* Quick Chapter Selector for Current Book */}
            <div className="mt-4 pt-3 border-t border-[#F2D1C9]">
              <p className="text-xs font-semibold text-[#8C4A55] dark:text-[#E8B4B8] mb-2">
                Chapters in {currentBook}:
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto no-scrollbar">
                {Array.from({ length: currentBookInfo.chaptersCount }, (_, i) => i + 1).map(ch => (
                  <button
                    key={ch}
                    onClick={() => {
                      setCurrentChapter(ch);
                      setIsBookPickerOpen(false);
                    }}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition ${
                      currentChapter === ch
                        ? 'bg-[#B76E79] text-white font-bold'
                        : 'bg-white dark:bg-[#25181E] text-[#6A323E] dark:text-[#E8B4B8] hover:bg-[#FADCE0]'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
