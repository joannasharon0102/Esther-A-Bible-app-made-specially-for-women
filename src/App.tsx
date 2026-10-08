/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { CoverScreen } from './components/CoverScreen';
import { Navigation } from './components/Navigation';
import { WhimsicalEffects } from './components/WhimsicalEffects';
import { OfflineIndicator } from './components/OfflineIndicator';
import { VerseArtModal } from './components/VerseArtModal';

import { HomeTab } from './components/tabs/HomeTab';
import { ReadTab } from './components/tabs/ReadTab';
import { PlansTab } from './components/tabs/PlansTab';
import { MoodTab } from './components/tabs/MoodTab';
import { TrackTab } from './components/tabs/TrackTab';
import { JournalTab } from './components/tabs/JournalTab';
import { ProfileTab } from './components/tabs/ProfileTab';
import { X, Sparkles } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { isCoverOpen, activeTab, activeNotificationToast, clearNotificationToast } = useApp();

  // If book cover is closed, show the blush-pink leather Bible cover
  if (!isCoverOpen) {
    return <CoverScreen />;
  }

  return (
    <div className="min-h-screen bg-quilted-fabric text-[#4A2831] dark:text-[#F6E9EC] transition-colors flex flex-col">
      <WhimsicalEffects />
      <OfflineIndicator />

      {/* Gentle Floating Notification Toast */}
      {activeNotificationToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm rounded-2xl bg-white/95 dark:bg-[#2A1B22]/95 border border-[#B76E79]/40 p-3.5 shadow-xl backdrop-blur-md flex items-start gap-3 animate-fade-in">
          <div className="p-1.5 rounded-full bg-[#FFF0F2] dark:bg-[#3D252E] text-[#B76E79] shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1 pr-1">
            <h4 className="font-serif text-xs font-bold text-[#50212C] dark:text-[#FFF8F0]">
              {activeNotificationToast.title}
            </h4>
            <p className="text-[11px] text-[#733543] dark:text-[#D99B9F] leading-snug mt-0.5">
              {activeNotificationToast.body}
            </p>
          </div>
          <button
            onClick={clearNotificationToast}
            className="text-gray-400 hover:text-[#50212C] p-0.5 rounded-full"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header and Bottom Navigation */}
      <Navigation />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 pt-3 relative z-10">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'read' && <ReadTab />}
        {activeTab === 'plans' && <PlansTab />}
        {activeTab === 'mood' && <MoodTab />}
        {activeTab === 'track' && <TrackTab />}
        {activeTab === 'journal' && <JournalTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </main>

      {/* Global Shareable Verse Art Modal */}
      <VerseArtModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
