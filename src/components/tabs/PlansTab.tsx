import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Plus,
  BookOpen,
  Heart,
  ChevronRight,
  ArrowLeft,
  X,
  Sparkles,
  Edit3
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DevotionalPlan, DevotionalDay } from '../../types';

export const PlansTab: React.FC = () => {
  const {
    plans,
    userPlanProgress,
    toggleDayComplete,
    saveDayNote,
    addCustomPlan,
    showNotificationToast
  } = useApp();

  const [selectedPlan, setSelectedPlan] = useState<DevotionalPlan | null>(null);
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);

  // Custom Plan Form State
  const [customTitle, setCustomTitle] = useState('');
  const [customSubtitle, setCustomSubtitle] = useState('');
  const [customDaysCount, setCustomDaysCount] = useState(3);
  const [customCategory, setCustomCategory] = useState('Personal Devotion');
  const [customDescription, setCustomDescription] = useState('');

  // Reflection note temporary state
  const [reflectionInput, setReflectionInput] = useState('');

  const currentPlanProgress = selectedPlan ? userPlanProgress[selectedPlan.id] || { completedDays: [], userNotes: {} } : null;
  const currentDay = selectedPlan ? selectedPlan.days.find(d => d.dayNumber === selectedDayNumber) || selectedPlan.days[0] : null;

  const handleCreateCustomPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    const generatedDays: DevotionalDay[] = [];
    for (let i = 1; i <= customDaysCount; i++) {
      generatedDays.push({
        dayNumber: i,
        title: `Day ${i}: Dwelling with the Lord`,
        passageRef: `Psalm ${23 + i}:1-6`,
        passageText: 'The Lord is my light and my salvation; whom shall I fear? the Lord is the strength of my life.',
        reflection: `Take a quiet moment today to reflect on ${customTitle}. Rest in His sovereign goodness and let your soul breathe deeply.`,
        reflectionQuestions: [
          'What is God speaking to your heart in this season?',
          'How can you make space for quiet rest today?'
        ],
        prayer: 'Father, thank You for this personal study. Lead my thoughts and make Your presence real to me today. Amen.'
      });
    }

    const newPlan: DevotionalPlan = {
      id: `custom-${Date.now()}`,
      title: customTitle,
      subtitle: customSubtitle || 'My Custom Study Plan',
      durationDays: customDaysCount,
      category: customCategory,
      coverImage: '/src/assets/images/devotional_peace_1791476423630.jpg',
      accentColor: '#B76E79',
      author: 'Created by You',
      description: customDescription || 'A custom devotional created for personal spiritual growth and reflection.',
      days: generatedDays
    };

    addCustomPlan(newPlan);
    setIsCreatingCustom(false);
    setCustomTitle('');
    setCustomSubtitle('');
    setCustomDescription('');
    showNotificationToast('✨ Custom Plan Created', `Added "${newPlan.title}" to your study library`);
    setSelectedPlan(newPlan);
    setSelectedDayNumber(1);
  };

  return (
    <div className="space-y-5 pb-24 pt-2">
      {/* If a plan is selected, show detail view */}
      {selectedPlan && currentDay ? (
        <div className="space-y-4 animate-fade-in">
          {/* Back button header */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedPlan(null)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#8C4A55] dark:text-[#F6D8CE] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Plans</span>
            </button>
            <span className="text-xs font-semibold text-[#8C4A55] dark:text-[#E8B4B8]">
              Day {currentDay.dayNumber} of {selectedPlan.durationDays}
            </span>
          </div>

          {/* Plan Header Banner */}
          <div className="rounded-3xl bg-white/90 dark:bg-[#1E1418]/90 border border-[#F2D1C9] dark:border-[#8A4854]/40 p-5 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C4A55] dark:text-[#E8B4B8]">
                  {selectedPlan.category}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#50212C] dark:text-[#FFF8F0] mt-0.5">
                  {selectedPlan.title}
                </h2>
                <p className="text-xs text-[#7A3F4C] dark:text-[#D99B9F]">
                  {selectedPlan.subtitle}
                </p>
              </div>

              {/* Progress percentage */}
              <div className="text-right">
                <span className="font-serif text-lg font-bold text-[#B76E79]">
                  {Math.round(((currentPlanProgress?.completedDays.length || 0) / selectedPlan.durationDays) * 100)}%
                </span>
                <span className="block text-[10px] text-[#8C4A55]/70 dark:text-[#D99B9F]/70">Complete</span>
              </div>
            </div>

            {/* Horizontal Day Selector Carousel */}
            <div className="mt-4 pt-3 border-t border-[#F2D1C9]/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {selectedPlan.days.map(d => {
                const isCompleted = currentPlanProgress?.completedDays.includes(d.dayNumber);
                const isActive = d.dayNumber === selectedDayNumber;

                return (
                  <button
                    key={d.dayNumber}
                    onClick={() => {
                      setSelectedDayNumber(d.dayNumber);
                      setReflectionInput(currentPlanProgress?.userNotes[d.dayNumber] || '');
                    }}
                    className={`min-h-[44px] min-w-[44px] rounded-2xl flex flex-col items-center justify-center text-xs font-bold transition ${
                      isActive
                        ? 'bg-[#B76E79] text-white shadow-xs'
                        : isCompleted
                        ? 'bg-[#E2EDE6] text-[#20362A] dark:bg-[#20362A] dark:text-[#E2EDE6]'
                        : 'bg-white dark:bg-[#25181E] border border-[#F2D1C9] dark:border-[#8A4854]/40 text-[#6A323E] dark:text-[#F6D8CE]'
                    }`}
                  >
                    <span>D{d.dayNumber}</span>
                    {isCompleted && <span className="text-[9px]">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Day Devotional Content */}
          <div className="rounded-3xl bg-white/90 dark:bg-[#1E1418]/90 border border-[#F2D1C9] dark:border-[#8A4854]/40 p-5 sm:p-7 shadow-xs space-y-5">
            <div>
              <span className="text-xs font-semibold text-[#8C4A55] dark:text-[#E8B4B8]">
                {currentDay.passageRef}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#50212C] dark:text-[#FFF8F0] mt-0.5">
                {currentDay.title}
              </h3>
            </div>

            {/* Scripture Passage */}
            <div className="p-4 rounded-2xl bg-[#FFF9F7] dark:bg-[#281A21] border-l-4 border-[#B76E79]">
              <p className="font-scripture text-sm sm:text-base leading-relaxed italic text-[#50212C] dark:text-[#FFF8F0]">
                &ldquo;{currentDay.passageText}&rdquo;
              </p>
            </div>

            {/* Devotional Reflection */}
            <div className="space-y-2">
              <h4 className="font-serif text-base font-bold text-[#50212C] dark:text-[#FFF8F0]">
                Devotional Reading
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-[#733543] dark:text-[#D99B9F]">
                {currentDay.reflection}
              </p>
            </div>

            {/* Reflection Questions */}
            {currentDay.reflectionQuestions.length > 0 && (
              <div className="space-y-2.5 pt-3 border-t border-[#F2D1C9]/50">
                <h4 className="font-serif text-sm font-bold text-[#50212C] dark:text-[#FFF8F0] flex items-center gap-1.5">
                  <Edit3 className="w-4 h-4 text-[#B76E79]" />
                  <span>Heart Questions</span>
                </h4>
                <ul className="space-y-1.5 list-disc list-inside text-xs text-[#733543] dark:text-[#D99B9F]">
                  {currentDay.reflectionQuestions.map((q, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {q}
                    </li>
                  ))}
                </ul>

                {/* Journal Reflection Box */}
                <textarea
                  value={reflectionInput}
                  onChange={e => {
                    setReflectionInput(e.target.value);
                    saveDayNote(selectedPlan.id, currentDay.dayNumber, e.target.value);
                  }}
                  placeholder="Record your thoughts and quiet takeaways for today..."
                  rows={3}
                  className="w-full text-xs p-3 rounded-xl border border-[#F2D1C9] dark:border-[#8A4854]/40 bg-[#FFF9F7] dark:bg-[#26181E] text-[#50212C] dark:text-[#FFF8F0] focus:outline-none focus:ring-1 focus:ring-[#B76E79] mt-2"
                />
              </div>
            )}

            {/* Prayer */}
            <div className="p-4 rounded-2xl bg-[#FFF0F2] dark:bg-[#2A1B22] border border-[#F2D1C9]/60 text-xs text-[#50212C] dark:text-[#F6D8CE] italic flex items-start gap-2.5">
              <Heart className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5 fill-[#B76E79]/20" />
              <div>
                <strong className="not-italic block font-bold text-[#8C4A55] dark:text-[#E5A8A0] mb-0.5">
                  Today&apos;s Prayer:
                </strong>
                &ldquo;{currentDay.prayer}&rdquo;
              </div>
            </div>

            {/* Mark Complete CTA */}
            <div className="pt-2">
              <button
                onClick={() => toggleDayComplete(selectedPlan.id, currentDay.dayNumber)}
                className={`w-full min-h-[48px] rounded-2xl flex items-center justify-center gap-2 text-xs font-bold tracking-wider uppercase transition shadow-sm ${
                  currentPlanProgress?.completedDays.includes(currentDay.dayNumber)
                    ? 'bg-[#E2EDE6] text-[#20362A] dark:bg-[#20362A] dark:text-[#E2EDE6]'
                    : 'bg-[#B76E79] text-white hover:bg-[#8C4A55]'
                }`}
              >
                {currentPlanProgress?.completedDays.includes(currentDay.dayNumber) ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Completed · Tap to Undo</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4" />
                    <span>Mark Day {currentDay.dayNumber} Complete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Plans Library View */
        <div className="space-y-5 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-script text-2xl text-[#8C4A55] dark:text-[#F6D8CE]">
                Daily walking in the Word
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#50212C] dark:text-[#FFF8F0]">
                Study Plans
              </h2>
            </div>
            <button
              onClick={() => setIsCreatingCustom(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#B76E79] text-white text-xs font-bold hover:bg-[#8C4A55] shadow-xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Plan</span>
            </button>
          </div>

          {/* Plans Grid */}
          <div className="space-y-4">
            {plans.map(plan => {
              const progress = userPlanProgress[plan.id] || { completedDays: [], userNotes: {} };
              const percent = Math.round((progress.completedDays.length / plan.durationDays) * 100);

              return (
                <div
                  key={plan.id}
                  onClick={() => {
                    setSelectedPlan(plan);
                    setSelectedDayNumber(1);
                  }}
                  className="cursor-pointer group rounded-3xl bg-white/90 dark:bg-[#1E1418]/90 border border-[#F2D1C9] dark:border-[#8A4854]/40 overflow-hidden shadow-xs hover:shadow-md transition"
                >
                  {plan.coverImage && (
                    <div className="h-40 w-full overflow-hidden relative">
                      <img
                        src={plan.coverImage}
                        alt={plan.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#FADCE0]">
                          {plan.category}
                        </span>
                        <h3 className="font-serif text-lg sm:text-xl font-bold leading-tight drop-shadow-sm">
                          {plan.title}
                        </h3>
                        <p className="text-xs text-white/90 line-clamp-1">{plan.subtitle}</p>
                      </div>
                    </div>
                  )}

                  <div className="p-4 sm:p-5">
                    {!plan.coverImage && (
                      <div className="mb-2">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C4A55]">
                          {plan.category}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-[#50212C] dark:text-[#FFF8F0]">
                          {plan.title}
                        </h3>
                      </div>
                    )}
                    <p className="text-xs text-[#733543] dark:text-[#D99B9F] line-clamp-2 mb-3">
                      {plan.description}
                    </p>

                    {/* Progress Bar & Days */}
                    <div className="space-y-1.5 pt-2 border-t border-[#F2D1C9]/40">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#8C4A55] dark:text-[#E8B4B8]">
                          {progress.completedDays.length} of {plan.durationDays} days completed
                        </span>
                        <span className="font-bold text-[#B76E79]">{percent}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#FFF0F2] dark:bg-[#2A1B22] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#F4C2C2] to-[#B76E79] rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Create Custom Plan Modal */}
      {isCreatingCustom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-md rounded-3xl bg-[#FFF8F0] dark:bg-[#1E1418] p-5 shadow-2xl border border-[#F2D1C9] dark:border-[#8A4854]/40 my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2D1C9]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B76E79]" />
                <h3 className="font-serif text-lg font-bold text-[#6A323E] dark:text-[#F6D8CE]">
                  Design Your Study Plan
                </h3>
              </div>
              <button
                onClick={() => setIsCreatingCustom(false)}
                className="p-1 rounded-full text-[#8C4A55] hover:bg-[#FADCE0]/50"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomPlan} className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#8C4A55] dark:text-[#E8B4B8] block mb-1">
                  Plan Title *
                </label>
                <input
                  type="text"
                  required
                  value={customTitle}
                  onChange={e => setCustomTitle(e.target.value)}
                  placeholder="e.g. 7 Days of Morning Peace"
                  className="w-full text-xs p-3 rounded-xl border border-[#F2D1C9] dark:border-[#8A4854]/40 bg-white dark:bg-[#281A21] text-[#50212C] dark:text-[#FFF8F0] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8C4A55] dark:text-[#E8B4B8] block mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={customSubtitle}
                  onChange={e => setCustomSubtitle(e.target.value)}
                  placeholder="e.g. Walking with Jesus through transitions"
                  className="w-full text-xs p-3 rounded-xl border border-[#F2D1C9] dark:border-[#8A4854]/40 bg-white dark:bg-[#281A21] text-[#50212C] dark:text-[#FFF8F0] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#8C4A55] dark:text-[#E8B4B8] block mb-1">
                    Duration (Days)
                  </label>
                  <select
                    value={customDaysCount}
                    onChange={e => setCustomDaysCount(parseInt(e.target.value, 10))}
                    className="w-full text-xs p-3 rounded-xl border border-[#F2D1C9] dark:border-[#8A4854]/40 bg-white dark:bg-[#281A21] text-[#50212C] dark:text-[#FFF8F0] focus:outline-none"
                  >
                    <option value={3}>3 Days</option>
                    <option value={5}>5 Days</option>
                    <option value={7}>7 Days</option>
                    <option value={14}>14 Days</option>
                    <option value={30}>30 Days</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#8C4A55] dark:text-[#E8B4B8] block mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={customCategory}
                    onChange={e => setCustomCategory(e.target.value)}
                    placeholder="e.g. Healing, Family"
                    className="w-full text-xs p-3 rounded-xl border border-[#F2D1C9] dark:border-[#8A4854]/40 bg-white dark:bg-[#281A21] text-[#50212C] dark:text-[#FFF8F0] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8C4A55] dark:text-[#E8B4B8] block mb-1">
                  Personal Vision / Notes
                </label>
                <textarea
                  value={customDescription}
                  onChange={e => setCustomDescription(e.target.value)}
                  placeholder="What is your prayer and intention for this devotion?"
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl border border-[#F2D1C9] dark:border-[#8A4854]/40 bg-white dark:bg-[#281A21] text-[#50212C] dark:text-[#FFF8F0] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full min-h-[44px] rounded-2xl bg-gradient-to-r from-[#B76E79] to-[#8C4A55] text-white text-xs font-bold uppercase tracking-wider shadow hover:opacity-95 transition"
                >
                  Create and Start Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
