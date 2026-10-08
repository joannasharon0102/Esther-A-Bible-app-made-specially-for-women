import React, { useState } from 'react';
import {
  User,
  Moon,
  Sun,
  Bell,
  Sparkles,
  BookOpen,
  Volume2,
  Heart,
  Globe,
  ShieldCheck,
  Send,
  Flower2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PWAInstallButton } from '../PWAInstallButton';

export const ProfileTab: React.FC = () => {
  const {
    settings,
    updateSettings,
    requestNotificationPermission,
    showNotificationToast,
    closeCover
  } = useApp();

  const [communityNote, setCommunityNote] = useState('');
  const [communityWall, setCommunityWall] = useState([
    {
      id: 'c-1',
      name: 'Sarah M.',
      text: 'Praying for all the weary mothers today. May His peace flood your home like a tranquil stream! 🌸',
      time: '2 hours ago',
      likes: 12
    },
    {
      id: 'c-2',
      name: 'Esther Grace',
      text: 'Just finished Day 3 of Women of the Bible. Hannah’s prayers gave me so much courage to keep trusting.',
      time: '4 hours ago',
      likes: 19
    },
    {
      id: 'c-3',
      name: 'Hannah B.',
      text: 'God is on the throne, beloved sisters! No matter what this week looks like, you are deeply cherished.',
      time: 'Yesterday',
      likes: 27
    }
  ]);

  const avatarOptions = [
    { id: 'rose', label: 'Blush Rose', emoji: '🌸' },
    { id: 'crown', label: 'Esther Crown', emoji: '👑' },
    { id: 'dove', label: 'Peace Dove', emoji: '🕊️' },
    { id: 'sun', label: 'Morning Light', emoji: '✨' },
    { id: 'tulip', label: 'Wildflower', emoji: '🌷' }
  ];

  const handleTestReminder = () => {
    showNotificationToast(
      '✨ A Quiet Moment with God',
      'Beloved, your quiet sanctuary is waiting. Take a gentle breath in His Word today.'
    );
  };

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      showNotificationToast('🔔 Reminders Enabled', 'Gentle scripture reminders are now active on your device.');
    } else {
      showNotificationToast('Notice', 'In-app gentle notifications will continue to appear inside ESTHER.');
    }
  };

  const handlePostCommunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!communityNote.trim()) return;

    setCommunityWall(prev => [
      {
        id: `c-${Date.now()}`,
        name: settings.name || 'Beloved Sister',
        text: communityNote.trim(),
        time: 'Just now',
        likes: 1
      },
      ...prev
    ]);
    setCommunityNote('');
    showNotificationToast('🌸 Encouragement Shared', 'Sent to the sisterhood encouragement wall');
  };

  const handleSendFlower = (id: string) => {
    setCommunityWall(prev =>
      prev.map(item => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
    showNotificationToast('🌸 Flower of Grace Sent', 'Sent an encouraging blessing to your sister in faith');
  };

  return (
    <div className="space-y-6 pb-24 pt-2">
      {/* Header */}
      <div>
        <p className="font-script text-2xl text-[#8C4A55] dark:text-[#F6D8CE]">
          Your sacred sanctuary
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#50212C] dark:text-[#FFF8F0]">
          Profile &amp; Settings
        </h2>
      </div>

      {/* User Profile Card */}
      <div className="rounded-3xl bg-white/90 dark:bg-[#1E1418]/90 border border-[#F2D1C9] dark:border-[#8A4854]/40 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          {/* Avatar selector */}
          <div className="w-18 h-18 rounded-full bg-gradient-to-br from-[#FCE8EB] to-[#E3A3A9] dark:from-[#3D252E] dark:to-[#221319] border-2 border-[#B76E79] flex items-center justify-center text-3xl shadow-sm">
            {avatarOptions.find(a => a.id === settings.avatar)?.emoji || '🌸'}
          </div>

          <div className="flex-1">
            <input
              type="text"
              value={settings.name}
              onChange={e => updateSettings({ name: e.target.value })}
              className="font-serif text-xl sm:text-2xl font-bold text-[#50212C] dark:text-[#FFF8F0] bg-transparent border-b border-transparent hover:border-[#B76E79]/40 focus:border-[#B76E79] focus:outline-none text-center sm:text-left"
              title="Edit your name"
            />
            <p className="text-xs text-[#8C4A55] dark:text-[#E8B4B8] mt-0.5">
              Daughter of the King · Walking in Grace &amp; Truth
            </p>
          </div>

          <PWAInstallButton />
        </div>

        {/* Avatar choices */}
        <div className="mt-4 pt-3 border-t border-[#F2D1C9]/40 flex items-center justify-center sm:justify-start gap-2">
          <span className="text-xs text-[#8C4A55] font-semibold mr-1">Choose Symbol:</span>
          {avatarOptions.map(av => (
            <button
              key={av.id}
              onClick={() => updateSettings({ avatar: av.id })}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-lg border transition ${
                settings.avatar === av.id
                  ? 'border-[#B76E79] bg-[#FFF0F2] dark:bg-[#3D252E] scale-110 shadow-xs'
                  : 'border-transparent bg-white/60 dark:bg-white/10 hover:bg-[#FADCE0]'
              }`}
              title={av.label}
              aria-label={`Select ${av.label}`}
            >
              {av.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* App Appearance & Reading Preferences */}
      <div className="rounded-3xl bg-white/90 dark:bg-[#1E1418]/90 border border-[#F2D1C9] dark:border-[#8A4854]/40 p-5 sm:p-6 shadow-xs space-y-4">
        <h3 className="font-serif text-base font-bold text-[#50212C] dark:text-[#FFF8F0] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B76E79]" />
          <span>Appearance &amp; Sacred Atmosphere</span>
        </h3>

        {/* Twilight Mode Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-[#F2D1C9]/40">
          <div>
            <p className="text-xs font-bold text-[#50212C] dark:text-[#FFF8F0]">
              Twilight Pink Dark Mode
            </p>
            <p className="text-[11px] text-[#7A3F4C] dark:text-[#D99B9F]">
              Softer ambient palette for night and evening prayer
            </p>
          </div>
          <button
            onClick={() => updateSettings({ twilightMode: !settings.twilightMode })}
            className={`min-h-[44px] px-3.5 rounded-full flex items-center gap-1.5 text-xs font-semibold transition ${
              settings.twilightMode
                ? 'bg-[#B76E79] text-white'
                : 'bg-[#FFF0F2] text-[#8C4A55] border border-[#B76E79]/30'
            }`}
          >
            {settings.twilightMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            <span>{settings.twilightMode ? 'Twilight On' : 'Blush Light'}</span>
          </button>
        </div>

        {/* Whimsical Floating Petals & Sparkles Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-[#F2D1C9]/40">
          <div>
            <p className="text-xs font-bold text-[#50212C] dark:text-[#FFF8F0]">
              Whimsical Sparkles &amp; Petals
            </p>
            <p className="text-[11px] text-[#7A3F4C] dark:text-[#D99B9F]">
              Subtle fairy dust and floating rose petals
            </p>
          </div>
          <button
            onClick={() => updateSettings({ whimsicalEffects: !settings.whimsicalEffects })}
            className={`min-h-[44px] px-3.5 rounded-full text-xs font-semibold transition ${
              settings.whimsicalEffects
                ? 'bg-[#B76E79] text-white'
                : 'bg-[#FFF0F2] text-[#8C4A55] border border-[#B76E79]/30'
            }`}
          >
            {settings.whimsicalEffects ? 'Enabled' : 'Paused'}
          </button>
        </div>

        {/* Scripture Font Size */}
        <div className="flex items-center justify-between py-2 border-b border-[#F2D1C9]/40">
          <div>
            <p className="text-xs font-bold text-[#50212C] dark:text-[#FFF8F0]">
              Scripture Font Size
            </p>
            <p className="text-[11px] text-[#7A3F4C] dark:text-[#D99B9F]">
              Comfortable reading size for your eyes
            </p>
          </div>
          <div className="flex items-center gap-1">
            {(['sm', 'md', 'lg', 'xl'] as const).map(sz => (
              <button
                key={sz}
                onClick={() => updateSettings({ fontSize: sz })}
                className={`w-8 h-8 rounded-lg text-xs font-bold uppercase transition ${
                  settings.fontSize === sz
                    ? 'bg-[#B76E79] text-white shadow-2xs'
                    : 'bg-[#FFF0F2] dark:bg-[#2A1C22] text-[#8C4A55] dark:text-[#D99B9F]'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Default Translation */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-xs font-bold text-[#50212C] dark:text-[#FFF8F0]">
              Bible Translation
            </p>
            <p className="text-[11px] text-[#7A3F4C] dark:text-[#D99B9F]">
              Primary translation for daily reading
            </p>
          </div>
          <select
            value={settings.preferredTranslation}
            onChange={e => updateSettings({ preferredTranslation: e.target.value as any })}
            className="text-xs p-2 rounded-xl border border-[#F2D1C9] dark:border-[#8A4854]/40 bg-white dark:bg-[#281A21] text-[#50212C] dark:text-[#FFF8F0] focus:outline-none"
          >
            <option value="KJV">King James (KJV)</option>
            <option value="WEB">World English (WEB)</option>
            <option value="BBE">Basic English (BBE)</option>
          </select>
        </div>
      </div>

      {/* Gentle Reminders Setup */}
      <div className="rounded-3xl bg-white/90 dark:bg-[#1E1418]/90 border border-[#F2D1C9] dark:border-[#8A4854]/40 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#B76E79]" />
            <h3 className="font-serif text-base font-bold text-[#50212C] dark:text-[#FFF8F0]">
              Gentle Reminders
            </h3>
          </div>
          <button
            onClick={handleTestReminder}
            className="text-xs font-semibold text-[#B76E79] hover:underline"
          >
            Preview Tone ✨
          </button>
        </div>

        {/* Morning Bible Reading Reminder */}
        <div className="flex items-center justify-between py-2 border-b border-[#F2D1C9]/40">
          <div>
            <p className="text-xs font-bold text-[#50212C] dark:text-[#FFF8F0]">
              Morning Scripture Quiet Time
            </p>
            <p className="text-[11px] text-[#7A3F4C] dark:text-[#D99B9F]">
              Start your morning in green pastures
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="time"
              value={settings.readingReminderTime}
              onChange={e => updateSettings({ readingReminderTime: e.target.value })}
              className="text-xs p-1.5 rounded-lg border border-[#F2D1C9] bg-white dark:bg-[#281A21] text-[#50212C] dark:text-[#FFF8F0]"
            />
            <button
              onClick={() => {
                updateSettings({ readingReminderEnabled: !settings.readingReminderEnabled });
                handleEnableNotifications();
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                settings.readingReminderEnabled ? 'bg-[#B76E79] text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {settings.readingReminderEnabled ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        {/* Evening Prayer Reminder */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-xs font-bold text-[#50212C] dark:text-[#FFF8F0]">
              Evening Surrender &amp; Prayer
            </p>
            <p className="text-[11px] text-[#7A3F4C] dark:text-[#D99B9F]">
              Unburden your heart before resting
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="time"
              value={settings.prayerReminderTime}
              onChange={e => updateSettings({ prayerReminderTime: e.target.value })}
              className="text-xs p-1.5 rounded-lg border border-[#F2D1C9] bg-white dark:bg-[#281A21] text-[#50212C] dark:text-[#FFF8F0]"
            />
            <button
              onClick={() => {
                updateSettings({ prayerReminderEnabled: !settings.prayerReminderEnabled });
                handleEnableNotifications();
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                settings.prayerReminderEnabled ? 'bg-[#B76E79] text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {settings.prayerReminderEnabled ? 'On' : 'Off'}
            </button>
          </div>
        </div>
      </div>

      {/* Community & Sisters Encouragement Wall (YouVersion Style) */}
      <div className="rounded-3xl bg-white/90 dark:bg-[#1E1418]/90 border border-[#F2D1C9] dark:border-[#8A4854]/40 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#B76E79]" />
            <h3 className="font-serif text-base font-bold text-[#50212C] dark:text-[#FFF8F0]">
              Beloved Sisters in Faith
            </h3>
          </div>
          <span className="text-[11px] text-[#8C4A55] dark:text-[#E8B4B8] font-semibold">
            Community Wall
          </span>
        </div>
        <p className="text-xs text-[#7A3F4C] dark:text-[#D99B9F]">
          Leave an encouraging verse or prayer for other women walking in faith today.
        </p>

        {/* Input box */}
        <form onSubmit={handlePostCommunity} className="flex gap-2">
          <input
            type="text"
            value={communityNote}
            onChange={e => setCommunityNote(e.target.value)}
            placeholder="Share a word of encouragement..."
            className="flex-1 text-xs p-3 rounded-2xl border border-[#F2D1C9] dark:border-[#8A4854]/40 bg-[#FFF9F7] dark:bg-[#281A21] text-[#50212C] dark:text-[#FFF8F0] focus:outline-none"
          />
          <button
            type="submit"
            className="min-h-[44px] px-4 rounded-2xl bg-[#B76E79] text-white text-xs font-semibold flex items-center justify-center hover:bg-[#8C4A55] shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Wall feed */}
        <div className="space-y-3 pt-2">
          {communityWall.map(item => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-[#FFF9F7] dark:bg-[#26181E] border border-[#FADCE0] dark:border-[#8A4854]/30 space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-[#50212C] dark:text-[#FFF8F0]">
                  {item.name}
                </span>
                <span className="text-[10px] text-[#8C4A55]/70 dark:text-[#D99B9F]/70">
                  {item.time}
                </span>
              </div>
              <p className="text-xs text-[#733543] dark:text-[#D99B9F] leading-relaxed">
                {item.text}
              </p>
              <div className="flex items-center justify-end pt-1">
                <button
                  onClick={() => handleSendFlower(item.id)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-[#8C4A55] dark:text-[#F6D8CE] hover:text-[#B76E79] transition"
                >
                  <Flower2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Send Grace ({item.likes})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Return to Leather Bible Cover Button */}
      <div className="text-center pt-2">
        <button
          onClick={closeCover}
          className="text-xs font-semibold text-[#8C4A55] dark:text-[#E8B4B8] hover:underline"
        >
          View Pink Leather Bible Cover
        </button>
      </div>
    </div>
  );
};
