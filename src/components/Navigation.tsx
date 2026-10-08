import React from 'react';
import { Home, BookOpen, Calendar, Heart, Flame, BookHeart, User, BookMarked } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, closeCover, isCoverOpen } = useApp();

  const navItems: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'read', label: 'Read', icon: BookOpen },
    { id: 'plans', label: 'Plans', icon: Calendar },
    { id: 'mood', label: 'Feeling', icon: Heart },
    { id: 'track', label: 'Habits', icon: Flame },
    { id: 'journal', label: 'Prayers', icon: BookHeart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Top Header App Bar (Sticky, <15% viewport height) */}
      <header className="sticky top-0 z-30 w-full border-b border-[#F4C2C2]/40 dark:border-[#8A4854]/30 bg-[#FFF8F0]/90 dark:bg-[#1A1215]/90 backdrop-blur-md px-4 py-2.5 transition-colors">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Brand Wordmark (Single text element) */}
          <div className="flex items-center gap-2">
            <button
              onClick={closeCover}
              title="Return to Bible Cover"
              className="flex items-center gap-1.5 group text-left"
              aria-label="View Bible Leather Cover"
            >
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FCE8EB] to-[#E3A3A9] dark:from-[#3D252E] dark:to-[#221319] border border-[#B76E79]/50 flex items-center justify-center text-[#8C4A55] dark:text-[#F6D8CE] text-xs font-serif font-bold shadow-xs group-hover:scale-105 transition-transform">
                E
              </span>
              <span className="font-serif text-xl font-bold tracking-[0.16em] uppercase text-rose-gold drop-shadow-xs">
                ESTHER
              </span>
            </button>
          </div>

          {/* Desktop/Tablet Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? 'bg-[#FADCE0] dark:bg-[#3D252E] text-[#8C4A55] dark:text-[#F6D8CE]'
                      : 'text-[#8C4A55]/70 dark:text-[#D99B9F]/70 hover:text-[#50212C] dark:hover:text-[#FFF8F0]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            <PWAInstallButton compact />
            <button
              onClick={closeCover}
              className="p-1.5 rounded-full text-[#8C4A55] dark:text-[#E8B4B8] hover:bg-[#FADCE0]/50 dark:hover:bg-[#3D252E]/50 transition"
              title="Close to Pink Leather Cover"
              aria-label="Close to Leather Cover"
            >
              <BookMarked className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Fixed Bottom Tab Bar for Mobile Ergonomics */}
      <nav
        aria-label="Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFF8F0]/95 dark:bg-[#1A1215]/95 backdrop-blur-lg border-t border-[#F2D1C9]/50 dark:border-[#8A4854]/40 md:hidden pb-[max(env(safe-area-inset-bottom),8px)] pt-1.5 shadow-lg"
      >
        <div className="grid grid-cols-7 items-center max-w-md mx-auto px-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`min-h-[48px] flex flex-col items-center justify-center py-1 transition-colors relative ${
                  isActive
                    ? 'text-[#8C4A55] dark:text-[#F6D8CE]'
                    : 'text-[#9E6570] dark:text-[#B2828C] hover:text-[#733543]'
                }`}
                aria-label={item.label}
              >
                <div
                  className={`relative p-1 rounded-full transition-transform ${
                    isActive ? 'scale-110 bg-[#FADCE0]/70 dark:bg-[#3D252E]' : ''
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  {isActive && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#B76E79]" />
                  )}
                </div>
                <span className="text-[10px] font-semibold tracking-tight mt-0.5 truncate max-w-full">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
