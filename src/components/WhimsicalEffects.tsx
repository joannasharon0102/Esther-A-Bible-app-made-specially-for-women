import React from 'react';
import { useApp } from '../context/AppContext';

export const WhimsicalEffects: React.FC = () => {
  const { settings } = useApp();

  if (!settings.whimsicalEffects) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none" aria-hidden="true">
      {/* Gentle Floating Bokeh Circles */}
      <div className="absolute top-[12%] -left-10 w-44 h-44 rounded-full bg-[#FADCE0]/20 dark:bg-[#B76E79]/5 blur-3xl" />
      <div className="absolute top-[45%] -right-12 w-52 h-52 rounded-full bg-[#E8B4B8]/20 dark:bg-[#8C4A55]/5 blur-3xl" />
      <div className="absolute bottom-[20%] left-10 w-36 h-36 rounded-full bg-[#FFF0F2]/30 dark:bg-[#3D252E]/10 blur-2xl" />

      {/* Floating Rose Petal 1 */}
      <div 
        className="absolute top-20 left-[15%] w-3.5 h-4.5 rounded-[50%_0%_50%_50%] bg-[#E8B4B8]/40 dark:bg-[#B76E79]/20 rotate-45 animate-float-slow"
        style={{ animationDuration: '9s' }}
      />
      {/* Floating Rose Petal 2 */}
      <div 
        className="absolute top-1/2 right-[12%] w-3 h-4 rounded-[0%_50%_50%_50%] bg-[#F4C2C2]/35 dark:bg-[#8C4A55]/20 -rotate-12 animate-float-slow"
        style={{ animationDuration: '11s', animationDelay: '2s' }}
      />
      {/* Floating Rose Petal 3 */}
      <div 
        className="absolute bottom-28 left-[25%] w-3 h-3.5 rounded-[50%_50%_0%_50%] bg-[#FADCE0]/40 dark:bg-[#B76E79]/20 rotate-30 animate-float-slow"
        style={{ animationDuration: '13s', animationDelay: '4s' }}
      />

      {/* Delicate Sparkles */}
      <span className="absolute top-28 right-[22%] text-[9px] text-[#B76E79]/40 dark:text-[#F2D1C9]/30 animate-sparkle">✦</span>
      <span className="absolute top-[68%] left-[8%] text-[8px] text-[#B76E79]/35 dark:text-[#F2D1C9]/25 animate-sparkle" style={{ animationDelay: '1.2s' }}>✧</span>
      <span className="absolute bottom-36 right-[28%] text-[10px] text-[#D99B9F]/40 dark:text-[#E5A8A0]/30 animate-sparkle" style={{ animationDelay: '2.5s' }}>✦</span>

      {/* Tiny Fairy Dust Drift */}
      <div className="absolute top-1/3 left-1/2 w-1.5 h-1.5 rounded-full bg-[#F2D1C9]/50 animate-fairy-dust" />
      <div className="absolute top-2/3 right-1/4 w-1 h-1 rounded-full bg-[#B76E79]/40 animate-fairy-dust" style={{ animationDelay: '3s' }} />
    </div>
  );
};
