import React, { useState } from 'react';
import {
  BookHeart,
  Plus,
  Heart,
  CheckCircle2,
  Trash2,
  Sparkles,
  Search,
  Filter,
  X,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PrayerItem } from '../../types';

export const JournalTab: React.FC = () => {
  const { prayers, addPrayer, markPrayerAnswered, deletePrayer, showNotificationToast } = useApp();

  const [filterTag, setFilterTag] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'answered'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // New Prayer Dialog
  const [isAddingPrayer, setIsAddingPrayer] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState<PrayerItem['tag']>('Family');

  // Answered Modal
  const [answeringPrayer, setAnsweringPrayer] = useState<PrayerItem | null>(null);
  const [testimonyInput, setTestimonyInput] = useState('');

  const tags: ('All' | PrayerItem['tag'])[] = [
    'All',
    'Family',
    'Health',
    'Guidance',
    'Gratitude',
    'Inner Peace',
    'Loved Ones',
    'Courage'
  ];

  const filteredPrayers = prayers.filter(p => {
    const matchTag = filterTag === 'All' || p.tag === filterTag;
    const matchStatus =
      filterStatus === 'all' ||
      (filterStatus === 'answered' && p.isAnswered) ||
      (filterStatus === 'active' && !p.isAnswered);
    const matchSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTag && matchStatus && matchSearch;
  });

  const handleSavePrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addPrayer(title.trim(), content.trim(), selectedTag);
    setTitle('');
    setContent('');
    setIsAddingPrayer(false);
    showNotificationToast('✨ Prayer Recorded', 'Lifted to heaven in holy faith');
  };

  const handleConfirmAnswered = () => {
    if (answeringPrayer) {
      markPrayerAnswered(answeringPrayer.id, testimonyInput.trim());
      setAnsweringPrayer(null);
      setTestimonyInput('');
      showNotificationToast('🎉 Praise God!', 'Answered prayer recorded with joy');
    }
  };

  return (
    <div className="space-y-5 pb-24 pt-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-script text-2xl text-[#8C4A55] dark:text-[#F6D8CE]">
            Sacred conversations with God
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#50212C] dark:text-[#FFF8F0]">
            Prayer Journal
          </h2>
        </div>
        <button
          onClick={() => setIsAddingPrayer(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#B76E79] text-white text-xs font-bold hover:bg-[#8C4A55] shadow-xs transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Prayer</span>
        </button>
      </div>

      {/* Search & Status Filters */}
      <div className="space-y-2">
        <div className="p-3 rounded-2xl bg-white/90 dark:bg-[#201419] border border-[#F2D1C9] dark:border-[#8A4854]/40 flex items-center gap-2 shadow-2xs">
          <Search className="w-4 h-4 text-[#B76E79]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search your prayers or testimonies..."
            className="w-full text-xs bg-transparent text-[#50212C] dark:text-[#FFF8F0] focus:outline-none"
          />
        </div>

        {/* Status segmented control */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-[#FFF0F2] dark:bg-[#281A21] rounded-2xl text-xs font-semibold">
          {(['all', 'active', 'answered'] as const).map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`py-1.5 rounded-xl capitalize transition ${
                filterStatus === st
                  ? 'bg-white dark:bg-[#3D252E] text-[#8C4A55] dark:text-[#F6D8CE] shadow-xs'
                  : 'text-[#8C4A55]/70 dark:text-[#D99B9F]/70'
              }`}
            >
              {st === 'all' ? 'All Prayers' : st === 'active' ? 'Active' : 'Answered 🌸'}
            </button>
          ))}
        </div>

        {/* Horizontal Tag Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {tags.map(t => (
            <button
              key={t}
              onClick={() => setFilterTag(t)}
              className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                filterTag === t
                  ? 'bg-[#B76E79] text-white'
                  : 'bg-white/80 dark:bg-[#25181E] border border-[#F2D1C9] dark:border-[#8A4854]/40 text-[#6A323E] dark:text-[#F6D8CE]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Prayers Feed */}
      <div className="space-y-4">
        {filteredPrayers.length === 0 ? (
          <div className="text-center py-12 rounded-3xl bg-white/60 dark:bg-white/5 border border-dashed border-[#F2D1C9] p-6">
            <Heart className="w-8 h-8 text-[#B76E79] mx-auto mb-2 opacity-60" />
            <p className="text-xs text-[#8C4A55] dark:text-[#E8B4B8] font-medium">
              No prayers found in this view. Pour out your heart to the Lord!
            </p>
          </div>
        ) : (
          filteredPrayers.map(item => (
            <div
              key={item.id}
              className={`rounded-3xl border p-5 sm:p-6 transition shadow-xs ${
                item.isAnswered
                  ? 'bg-[#FFF9F7] dark:bg-[#20181D] border-emerald-300 dark:border-emerald-800/40'
                  : 'bg-white/90 dark:bg-[#1E1418]/90 border-[#F2D1C9] dark:border-[#8A4854]/40'
              }`}
            >
              {/* Card Meta Top */}
              <div className="flex items-center justify-between mb-2 text-xs text-[#8C4A55] dark:text-[#D99B9F]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#B76E79]">{item.tag}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.dateCreated}</span>
                </div>

                <div className="flex items-center gap-2">
                  {item.isAnswered ? (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Answered
                    </span>
                  ) : (
                    <button
                      onClick={() => setAnsweringPrayer(item)}
                      className="px-2.5 py-1 rounded-full bg-[#FFF0F2] dark:bg-[#2F1B23] border border-[#B76E79]/40 text-xs font-semibold text-[#8C4A55] dark:text-[#F6D8CE] hover:bg-[#FADCE0] transition"
                    >
                      Mark Answered
                    </button>
                  )}
                  <button
                    onClick={() => deletePrayer(item.id)}
                    className="p-1 rounded-full text-gray-400 hover:text-rose-600 transition"
                    title="Delete prayer"
                    aria-label="Delete prayer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Title & Body */}
              <h3 className="font-serif text-lg font-bold text-[#50212C] dark:text-[#FFF8F0] mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#733543] dark:text-[#D99B9F] leading-relaxed whitespace-pre-line">
                {item.content}
              </p>

              {/* Answered Testimony Box */}
              {item.isAnswered && item.answerTestimony && (
                <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-900 dark:text-emerald-200">
                  <div className="flex items-center gap-1.5 font-bold mb-1 text-emerald-700 dark:text-emerald-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Praise Testimony ({item.dateAnswered}):</span>
                  </div>
                  <p className="italic leading-relaxed">&ldquo;{item.answerTestimony}&rdquo;</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* New Prayer Modal */}
      {isAddingPrayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-md rounded-3xl bg-[#FFF8F0] dark:bg-[#1E1418] p-5 shadow-2xl border border-[#F2D1C9] dark:border-[#8A4854]/40 my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2D1C9]">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#B76E79]" />
                <h3 className="font-serif text-lg font-bold text-[#6A323E] dark:text-[#F6D8CE]">
                  Pour Out Your Heart
                </h3>
              </div>
              <button
                onClick={() => setIsAddingPrayer(false)}
                className="p-1 rounded-full text-[#8C4A55] hover:bg-[#FADCE0]/50"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePrayer} className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#8C4A55] dark:text-[#E8B4B8] block mb-1">
                  Prayer Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Protection for my children, Peace at work"
                  className="w-full text-xs p-3 rounded-xl border border-[#F2D1C9] dark:border-[#8A4854]/40 bg-white dark:bg-[#281A21] text-[#50212C] dark:text-[#FFF8F0] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8C4A55] dark:text-[#E8B4B8] block mb-1">
                  Prayer Category
                </label>
                <select
                  value={selectedTag}
                  onChange={e => setSelectedTag(e.target.value as PrayerItem['tag'])}
                  className="w-full text-xs p-3 rounded-xl border border-[#F2D1C9] dark:border-[#8A4854]/40 bg-white dark:bg-[#281A21] text-[#50212C] dark:text-[#FFF8F0] focus:outline-none"
                >
                  <option value="Family">Family</option>
                  <option value="Health">Health</option>
                  <option value="Guidance">Guidance</option>
                  <option value="Gratitude">Gratitude</option>
                  <option value="Inner Peace">Inner Peace</option>
                  <option value="Loved Ones">Loved Ones</option>
                  <option value="Courage">Courage</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8C4A55] dark:text-[#E8B4B8] block mb-1">
                  Your Prayer *
                </label>
                <textarea
                  required
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Father God, I bring before You this longing of my heart..."
                  rows={4}
                  className="w-full text-xs p-3 rounded-xl border border-[#F2D1C9] dark:border-[#8A4854]/40 bg-white dark:bg-[#281A21] text-[#50212C] dark:text-[#FFF8F0] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full min-h-[44px] rounded-2xl bg-gradient-to-r from-[#B76E79] to-[#8C4A55] text-white text-xs font-bold uppercase tracking-wider shadow hover:opacity-95 transition"
                >
                  Save and Offer Prayer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Answered Prayer Celebration Modal */}
      {answeringPrayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-md rounded-3xl bg-[#FFF8F0] dark:bg-[#1E1418] p-5 shadow-2xl border border-emerald-300 dark:border-emerald-800/40 my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2D1C9]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <h3 className="font-serif text-lg font-bold text-[#6A323E] dark:text-[#F6D8CE]">
                  Celebrate God&apos;s Faithfulness
                </h3>
              </div>
              <button
                onClick={() => setAnsweringPrayer(null)}
                className="p-1 rounded-full text-[#8C4A55] hover:bg-[#FADCE0]/50"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-xs text-[#733543] dark:text-[#D99B9F]">
                How did God answer your prayer for <strong className="font-semibold text-[#50212C] dark:text-[#FFF8F0]">{answeringPrayer.title}</strong>?
              </p>
              <textarea
                value={testimonyInput}
                onChange={e => setTestimonyInput(e.target.value)}
                placeholder="Write your praise testimony here to remember His kindness..."
                rows={3}
                className="w-full text-xs p-3 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-[#281A21] text-[#50212C] dark:text-[#FFF8F0] focus:outline-none"
              />
              <button
                onClick={handleConfirmAnswered}
                className="w-full min-h-[44px] rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold uppercase tracking-wider shadow hover:opacity-95 transition"
              >
                Record Answer &amp; Praise God
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
