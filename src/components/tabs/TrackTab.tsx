import React from 'react';
import {
  Flame,
  Plus,
  Minus,
  Award,
  CheckCircle2,
  Calendar as CalendarIcon,
  Download,
  Share2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp, MILESTONES } from '../../context/AppContext';

export const TrackTab: React.FC = () => {
  const {
    todayPrayers,
    incrementPrayers,
    decrementPrayers,
    todayMinutes,
    addReadingMinutes,
    streakDays,
    bestStreak,
    habitLogs,
    unlockedBadgeIds,
    showNotificationToast
  } = useApp();

  const prayerGoal = 3;
  const minuteGoal = 15;

  const prayerPct = Math.min(100, Math.round((todayPrayers / prayerGoal) * 100));
  const minutePct = Math.min(100, Math.round((todayMinutes / minuteGoal) * 100));
  const overallPct = Math.round((prayerPct + minutePct) / 2);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallPct / 100) * circumference;

  const handleExportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      streak: streakDays,
      todayPrayers,
      todayMinutes,
      logs: habitLogs
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `esther_habits_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showNotificationToast('✨ Exported', 'Downloaded your habit records');
  };

  const handleCelebrateBadge = (title: string) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F4C2C2', '#B76E79', '#FFF8F0']
    });
    showNotificationToast('👑 Milestone Badge', `${title} unlocked in your journey!`);
  };

  return (
    <div className="space-y-6 pb-24 pt-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-script text-2xl text-[#8C4A55] dark:text-[#F6D8CE]">
            Faithful day by day
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#50212C] dark:text-[#FFF8F0]">
            Habit Tracker
          </h2>
        </div>
        <button
          onClick={handleExportData}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#B76E79]/40 bg-white dark:bg-[#201419] text-xs font-semibold text-[#8C4A55] dark:text-[#F6D8CE] shadow-2xs hover:bg-[#FFF0F2]"
          title="Export habit logs for sync"
          aria-label="Export habit logs"
        >
          <Download className="w-3.5 h-3.5 text-[#B76E79]" />
          <span>Export Sync</span>
        </button>
      </div>

      {/* Main Daily Ring & Streak Summary */}
      <div className="rounded-3xl bg-white/90 dark:bg-[#1E1418]/90 border border-[#F2D1C9] dark:border-[#8A4854]/40 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Progress Circular Ring */}
          <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
              {/* Background circle */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                className="text-[#FFF0F2] dark:text-[#2A1C22]"
                strokeWidth="11"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Animated Progress circle */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                className="text-[#B76E79] transition-all duration-700 ease-out"
                strokeWidth="11"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-serif text-3xl font-bold text-[#50212C] dark:text-[#FFF8F0] tabular-nums">
                {overallPct}%
              </span>
              <span className="text-[10px] uppercase font-semibold text-[#8C4A55] dark:text-[#D99B9F]">
                Daily Ring
              </span>
            </div>
          </div>

          {/* Stats & Streak Counters */}
          <div className="flex-1 space-y-3 w-full">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-[#FFF9F7] dark:bg-[#281A21] border border-[#FADCE0] dark:border-[#8A4854]/30">
                <div className="flex items-center gap-1.5 text-xs text-[#8C4A55] dark:text-[#D99B9F] font-semibold">
                  <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>Current Streak</span>
                </div>
                <p className="font-serif text-2xl font-bold text-[#50212C] dark:text-[#FFF8F0] mt-1 tabular-nums">
                  {streakDays} <span className="text-xs font-sans font-normal text-[#9E6570]">days</span>
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#FFF9F7] dark:bg-[#281A21] border border-[#FADCE0] dark:border-[#8A4854]/30">
                <div className="flex items-center gap-1.5 text-xs text-[#8C4A55] dark:text-[#D99B9F] font-semibold">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>Best Streak</span>
                </div>
                <p className="font-serif text-2xl font-bold text-[#50212C] dark:text-[#FFF8F0] mt-1 tabular-nums">
                  {bestStreak} <span className="text-xs font-sans font-normal text-[#9E6570]">days</span>
                </p>
              </div>
            </div>

            <p className="text-xs text-[#733543] dark:text-[#D99B9F] leading-relaxed">
              &ldquo;His compassions fail not. They are new every morning: great is thy faithfulness.&rdquo; — Lam 3:22-23
            </p>
          </div>
        </div>
      </div>

      {/* One-Tap Interactive Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Prayer Counter */}
        <div className="rounded-3xl bg-white/90 dark:bg-[#1E1418]/90 border border-[#F2D1C9] dark:border-[#8A4854]/40 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C4A55] dark:text-[#E8B4B8]">
              Prayers Logged
            </span>
            <span className="text-xs font-semibold text-[#9E6570]">
              Goal: {prayerGoal}/day
            </span>
          </div>

          <div className="flex items-center justify-between my-2">
            <button
              onClick={decrementPrayers}
              className="min-h-[48px] min-w-[48px] rounded-full border border-[#F2D1C9] dark:border-[#8A4854]/40 bg-[#FFF0F2] dark:bg-[#2F1B23] flex items-center justify-center text-[#8C4A55] hover:bg-[#FADCE0] active:scale-95 transition"
              aria-label="Decrease prayer count"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="font-serif text-4xl font-bold text-[#50212C] dark:text-[#FFF8F0] tabular-nums">
              {todayPrayers}
            </span>
            <button
              onClick={incrementPrayers}
              className="min-h-[48px] min-w-[48px] rounded-full bg-[#B76E79] text-white flex items-center justify-center hover:bg-[#8C4A55] active:scale-95 transition shadow-xs"
              aria-label="Increase prayer count"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#FFF0F2] dark:bg-[#2A1B22] overflow-hidden mt-3">
            <div
              className="h-full bg-[#B76E79] rounded-full transition-all duration-300"
              style={{ width: `${prayerPct}%` }}
            />
          </div>
        </div>

        {/* Scripture Reading Counter */}
        <div className="rounded-3xl bg-white/90 dark:bg-[#1E1418]/90 border border-[#F2D1C9] dark:border-[#8A4854]/40 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C4A55] dark:text-[#E8B4B8]">
              Scripture Time
            </span>
            <span className="text-xs font-semibold text-[#9E6570]">
              Goal: {minuteGoal}m/day
            </span>
          </div>

          <div className="flex items-center justify-between my-2">
            <div className="flex items-center gap-2">
              <span className="font-serif text-4xl font-bold text-[#50212C] dark:text-[#FFF8F0] tabular-nums">
                {todayMinutes}
              </span>
              <span className="text-xs text-[#8C4A55] font-semibold">minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => addReadingMinutes(5)}
                className="min-h-[44px] px-3.5 rounded-full bg-[#FADCE0] dark:bg-[#3D252E] text-[#8C4A55] dark:text-[#F6D8CE] text-xs font-bold hover:bg-[#E8B4B8] active:scale-95 transition"
              >
                +5m
              </button>
              <button
                onClick={() => addReadingMinutes(10)}
                className="min-h-[44px] px-3.5 rounded-full bg-[#B76E79] text-white text-xs font-bold hover:bg-[#8C4A55] active:scale-95 transition shadow-xs"
              >
                +10m
              </button>
            </div>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#FFF0F2] dark:bg-[#2A1B22] overflow-hidden mt-3">
            <div
              className="h-full bg-[#B76E79] rounded-full transition-all duration-300"
              style={{ width: `${minutePct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Weekly History Chart */}
      <div className="rounded-3xl bg-white/90 dark:bg-[#1E1418]/90 border border-[#F2D1C9] dark:border-[#8A4854]/40 p-5 sm:p-6 shadow-xs">
        <h3 className="font-serif text-base font-bold text-[#50212C] dark:text-[#FFF8F0] mb-3 flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-[#B76E79]" />
          <span>7-Day Faithfulness Rhythm</span>
        </h3>

        <div className="grid grid-cols-7 gap-2 pt-2 text-center">
          {['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Today'].map((day, idx) => {
            const isToday = idx === 6;
            const log = habitLogs[idx] || { prayersCount: 2, scriptureMinutes: 12 };
            const height = isToday ? Math.min(100, overallPct) : Math.min(100, (log.prayersCount * 20 + log.scriptureMinutes * 4));

            return (
              <div key={day} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-[#8C4A55]/70 dark:text-[#D99B9F]/70 font-semibold">
                  {day}
                </span>
                <div className="w-8 h-20 rounded-xl bg-[#FFF0F2] dark:bg-[#2A1B22] flex items-end p-1">
                  <div
                    className={`w-full rounded-lg transition-all duration-500 ${
                      isToday ? 'bg-gradient-to-t from-[#B76E79] to-[#F4C2C2]' : 'bg-[#E8B4B8] dark:bg-[#8C4A55]'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-[#50212C] dark:text-[#FFF8F0] tabular-nums">
                  {isToday ? todayPrayers : log.prayersCount}p
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Milestone Badges */}
      <div className="rounded-3xl bg-white/90 dark:bg-[#1E1418]/90 border border-[#F2D1C9] dark:border-[#8A4854]/40 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B76E79]" />
            <h3 className="font-serif text-base font-bold text-[#50212C] dark:text-[#FFF8F0]">
              Milestone Badges
            </h3>
          </div>
          <span className="text-xs text-[#8C4A55] dark:text-[#E8B4B8] font-semibold">
            {unlockedBadgeIds.length} of {MILESTONES.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {MILESTONES.map(badge => {
            const isUnlocked = unlockedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                onClick={() => {
                  if (isUnlocked) handleCelebrateBadge(badge.title);
                }}
                className={`p-3.5 rounded-2xl border transition text-left cursor-pointer ${
                  isUnlocked
                    ? 'border-[#B76E79]/50 bg-[#FFF9F7] dark:bg-[#2A1B22] shadow-2xs hover:scale-102'
                    : 'border-dashed border-gray-300 dark:border-gray-800 bg-gray-50/50 dark:bg-black/20 opacity-60'
                }`}
              >
                <div className="text-2xl mb-1">{badge.icon}</div>
                <p className="font-serif text-xs font-bold text-[#50212C] dark:text-[#FFF8F0] line-clamp-1">
                  {badge.title}
                </p>
                <p className="text-[10px] text-[#7A3F4C] dark:text-[#D99B9F] line-clamp-2 mt-0.5">
                  {badge.description}
                </p>
                <span className={`inline-block mt-2 text-[9px] uppercase tracking-wider font-semibold ${
                  isUnlocked ? 'text-[#B76E79]' : 'text-gray-400'
                }`}>
                  {isUnlocked ? '✦ Unlocked' : `${badge.targetStreak} Days`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
