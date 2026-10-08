import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, BookOpen, Heart, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CoverScreen: React.FC = () => {
  const { openApp } = useApp();
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      openApp();
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-quilted-fabric overflow-hidden select-none">
      {/* Whimsical Floating Bokeh & Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-32 h-32 rounded-full bg-[#F4C2C2]/30 blur-2xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/6 w-40 h-40 rounded-full bg-[#E8B4B8]/25 blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-12 right-1/4 w-3 h-3 text-[#B76E79]/50 animate-sparkle">✦</div>
        <div className="absolute bottom-20 left-1/4 w-4 h-4 text-[#D99B9F]/60 animate-sparkle" style={{ animationDelay: '1.5s' }}>✦</div>
        <div className="absolute top-1/2 left-8 w-2.5 h-2.5 text-[#B76E79]/40 animate-sparkle" style={{ animationDelay: '0.8s' }}>✧</div>
        <div className="absolute top-1/3 right-8 w-3 h-3 text-[#F2D1C9] animate-sparkle" style={{ animationDelay: '2.2s' }}>✧</div>
      </div>

      {/* Main Leather Bible Container */}
      <motion.div
        className="relative z-10 w-full max-w-sm sm:max-w-md perspective-1000 cursor-pointer group"
        onClick={handleOpen}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={isOpening ? { rotateY: -75, x: -40, opacity: 0 } : { rotateY: 0, x: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          className="relative bg-gradient-to-br from-[#FCE8EB] via-[#F4C2C2] to-[#E3A3A9] dark:from-[#3D252E] dark:via-[#2F1B23] dark:to-[#221319] rounded-3xl p-7 sm:p-9 shadow-2xl embossed-border border border-[#F2D1C9]/80 dark:border-[#8A4854]/40 leather-grain transition-transform group-hover:scale-[1.01]"
        >
          {/* Leather Book Spine Illusion (Left Edge) */}
          <div className="absolute left-0 top-0 bottom-0 w-6 rounded-l-3xl bg-gradient-to-r from-[#944D59]/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute left-4 top-4 bottom-4 w-[1.5px] bg-[#FFFFFF]/40 dark:bg-[#8A4854]/40" />

          {/* Ornate Filigree Corner Borders (SVG Rose Gold) */}
          {/* Top-Left Filigree */}
          <svg className="absolute top-5 left-7 w-14 h-14 text-[#B76E79] dark:text-[#E5A8A0] opacity-85" viewBox="0 0 100 100" fill="currentColor">
            <path d="M 0 0 C 40 5 60 25 65 65 C 55 40 40 25 0 0 Z" />
            <circle cx="18" cy="18" r="4" />
            <path d="M 12 40 C 25 35 35 25 40 12 C 30 22 22 30 12 40 Z" />
            <circle cx="34" cy="34" r="3" />
          </svg>

          {/* Top-Right Filigree */}
          <svg className="absolute top-5 right-7 w-14 h-14 text-[#B76E79] dark:text-[#E5A8A0] opacity-85" viewBox="0 0 100 100" fill="currentColor" style={{ transform: 'scaleX(-1)' }}>
            <path d="M 0 0 C 40 5 60 25 65 65 C 55 40 40 25 0 0 Z" />
            <circle cx="18" cy="18" r="4" />
            <path d="M 12 40 C 25 35 35 25 40 12 C 30 22 22 30 12 40 Z" />
            <circle cx="34" cy="34" r="3" />
          </svg>

          {/* Bottom-Left Filigree */}
          <svg className="absolute bottom-5 left-7 w-14 h-14 text-[#B76E79] dark:text-[#E5A8A0] opacity-85" viewBox="0 0 100 100" fill="currentColor" style={{ transform: 'scaleY(-1)' }}>
            <path d="M 0 0 C 40 5 60 25 65 65 C 55 40 40 25 0 0 Z" />
            <circle cx="18" cy="18" r="4" />
            <path d="M 12 40 C 25 35 35 25 40 12 C 30 22 22 30 12 40 Z" />
            <circle cx="34" cy="34" r="3" />
          </svg>

          {/* Bottom-Right Filigree */}
          <svg className="absolute bottom-5 right-7 w-14 h-14 text-[#B76E79] dark:text-[#E5A8A0] opacity-85" viewBox="0 0 100 100" fill="currentColor" style={{ transform: 'scale(-1, -1)' }}>
            <path d="M 0 0 C 40 5 60 25 65 65 C 55 40 40 25 0 0 Z" />
            <circle cx="18" cy="18" r="4" />
            <path d="M 12 40 C 25 35 35 25 40 12 C 30 22 22 30 12 40 Z" />
            <circle cx="34" cy="34" r="3" />
          </svg>

          {/* Inner Embossed Gold Bezel Frame */}
          <div className="relative border-2 border-dashed border-[#B76E79]/50 dark:border-[#E5A8A0]/40 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center my-2 bg-gradient-to-b from-white/30 to-white/10 dark:from-white/5 dark:to-transparent backdrop-blur-[2px]">
            {/* Top Crown Emblem */}
            <div className="mb-4">
              <svg className="w-10 h-10 mx-auto text-[#B76E79] dark:text-[#F2D1C9] drop-shadow-sm" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 34L10 16L18 24L24 12L30 24L38 16L42 34H6Z" fill="currentColor" fillOpacity="0.25" />
                <circle cx="24" cy="10" r="2.5" fill="currentColor" />
                <circle cx="10" cy="14" r="2" fill="currentColor" />
                <circle cx="38" cy="14" r="2" fill="currentColor" />
                <line x1="12" y1="38" x2="36" y2="38" strokeWidth="2.5" />
              </svg>
            </div>

            {/* Holy Bible Title */}
            <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.22em] uppercase font-bold text-rose-gold text-rose-gold-glow mb-1">
              HOLY BIBLE
            </h1>

            {/* App Subtitle & Dedication */}
            <p className="font-script text-2xl sm:text-3xl text-[#8C4A55] dark:text-[#F6D8CE] mb-2 transform -rotate-1">
              Esther Edition
            </p>

            <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#B76E79] to-transparent my-3" />

            <p className="text-xs uppercase tracking-[0.16em] text-[#6A323E] dark:text-[#E8B4B8]/80 font-medium">
              Made with Grace for Women
            </p>

            {/* Verse Snippet */}
            <p className="font-scripture italic text-xs text-[#7A3F4C] dark:text-[#D99B9F] mt-4 max-w-[240px] leading-relaxed">
              &ldquo;For such a time as this...&rdquo;
              <span className="block not-italic font-sans text-[10px] uppercase tracking-wider text-[#A25F6C] mt-1 font-semibold">
                Esther 4:14
              </span>
            </p>

            {/* Tap to Open CTA Badge */}
            <div className="mt-8 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 dark:bg-[#1E1418]/70 border border-[#B76E79]/40 text-[#6A323E] dark:text-[#F6D8CE] shadow-sm hover:shadow transition-all group-hover:bg-white/90">
              <BookOpen className="w-4 h-4 text-[#B76E79]" />
              <span className="text-xs font-semibold tracking-wide uppercase">Tap to Open</span>
            </div>
          </div>

          {/* Hanging Satin Silk Bookmark Ribbon */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-7 h-10 bg-gradient-to-b from-[#B76E79] to-[#8C4A55] shadow-lg flex items-end justify-center rounded-b-sm">
            <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[8px] border-b-white/90 dark:border-b-[#171013]" />
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle Prompt Footer */}
      <p className="relative z-10 mt-14 text-xs font-medium text-[#8C4A55]/80 dark:text-[#D99B9F]/70 tracking-wide flex items-center gap-1.5">
        <span>Daily Devotions</span>
        <span>·</span>
        <span>Habit Tracking</span>
        <span>·</span>
        <span>Prayer Sanctuary</span>
      </p>
    </div>
  );
};
