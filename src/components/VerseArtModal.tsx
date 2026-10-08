import React, { useState, useRef } from 'react';
import { X, Download, Copy, Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VerseArtModal: React.FC = () => {
  const { verseArtVerse, setVerseArtVerse, showNotificationToast } = useApp();
  const [selectedBg, setSelectedBg] = useState<string>('ethereal');
  const [fontChoice, setFontChoice] = useState<'serif' | 'scripture' | 'script'>('serif');
  const [hasCopied, setHasCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!verseArtVerse) return null;

  const bgStyles: Record<string, { bgClass: string; bgImage?: string; textColor: string; frameColor: string }> = {
    ethereal: {
      bgClass: 'bg-cover bg-center',
      bgImage: '/src/assets/images/verse_ethereal_bg_1791476459906.jpg',
      textColor: 'text-[#4A202A]',
      frameColor: 'border-[#F2D1C9]'
    },
    roseGold: {
      bgClass: 'bg-gradient-to-br from-[#FFF0F2] via-[#FADCE0] to-[#E8B4B8]',
      textColor: 'text-[#50212C]',
      frameColor: 'border-[#B76E79]'
    },
    twilight: {
      bgClass: 'bg-gradient-to-br from-[#2D1B22] via-[#201217] to-[#170E12]',
      textColor: 'text-[#FFF8F0]',
      frameColor: 'border-[#E5A8A0]'
    },
    cream: {
      bgClass: 'bg-[#FFF8F0]',
      textColor: 'text-[#6A323E]',
      frameColor: 'border-[#D99B9F]'
    }
  };

  const currentTheme = bgStyles[selectedBg] || bgStyles.ethereal;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(`"${verseArtVerse.text}" — ${verseArtVerse.reference} (ESTHER Bible)`);
      setHasCopied(true);
      showNotificationToast('✨ Copied to Clipboard', 'Verse text copied with graceful reference');
      setTimeout(() => setHasCopied(false), 2500);
    } catch {
      showNotificationToast('Notice', 'Copied text');
    }
  };

  const handleDownloadImage = () => {
    // Generate canvas snapshot
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350; // Instagram story / portrait 4:5
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill background
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1350);
    if (selectedBg === 'twilight') {
      gradient.addColorStop(0, '#2D1B22');
      gradient.addColorStop(1, '#170E12');
    } else {
      gradient.addColorStop(0, '#FFF5F6');
      gradient.addColorStop(0.5, '#FADCE0');
      gradient.addColorStop(1, '#E8B4B8');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1350);

    // Rose gold filigree frame
    ctx.strokeStyle = '#B76E79';
    ctx.lineWidth = 6;
    ctx.strokeRect(60, 60, 960, 1230);
    ctx.lineWidth = 2;
    ctx.strokeRect(76, 76, 928, 1198);

    // App header
    ctx.fillStyle = selectedBg === 'twilight' ? '#E5A8A0' : '#8C4A55';
    ctx.font = 'bold 32px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('ESTHER · WOMEN’S BIBLE', 540, 240);

    // Verse text wrap
    ctx.fillStyle = selectedBg === 'twilight' ? '#FFF8F0' : '#50212C';
    ctx.font = 'italic 46px Georgia, serif';
    const words = verseArtVerse.text.split(' ');
    let line = '';
    let y = 480;
    const maxWidth = 800;
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, 540, y);
        line = words[i] + ' ';
        y += 75;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 540, y);

    // Reference
    ctx.fillStyle = selectedBg === 'twilight' ? '#F2D1C9' : '#8C4A55';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.fillText(verseArtVerse.reference, 540, y + 120);

    // Download trigger
    const link = document.createElement('a');
    link.download = `Esther-Verse-${verseArtVerse.reference.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    showNotificationToast('🌸 Verse Art Created', 'Saved sacred verse image to your device');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-sm sm:max-w-md rounded-3xl bg-[#FFF8F0] dark:bg-[#1E1418] p-5 shadow-2xl border border-[#F2D1C9] dark:border-[#8A4854]/40 my-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#B76E79]/20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B76E79]" />
            <h3 className="font-serif text-lg font-bold text-[#6A323E] dark:text-[#F6D8CE]">
              Shareable Verse Art
            </h3>
          </div>
          <button
            onClick={() => setVerseArtVerse(null)}
            className="p-1 rounded-full text-[#8C4A55] hover:bg-[#FADCE0]/50"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview Card */}
        <div
          ref={cardRef}
          style={{ backgroundImage: currentTheme.bgImage ? `url(${currentTheme.bgImage})` : undefined }}
          className={`mt-4 relative rounded-2xl p-6 sm:p-8 min-h-[280px] flex flex-col justify-between shadow-md border-4 ${currentTheme.frameColor} ${currentTheme.bgClass} overflow-hidden`}
        >
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-[1px] pointer-events-none" />

          {/* Inner filigree corner accents */}
          <div className="relative z-10 flex items-center justify-between text-xs tracking-widest uppercase font-serif text-[#8C4A55] dark:text-[#E5A8A0] opacity-80">
            <span>✦ ESTHER ✦</span>
            <span>HOLY SCRIPTURE</span>
          </div>

          <div className="relative z-10 my-4 text-center">
            <p
              className={`leading-relaxed text-base sm:text-lg font-medium ${currentTheme.textColor} ${
                fontChoice === 'serif'
                  ? 'font-serif'
                  : fontChoice === 'scripture'
                  ? 'font-scripture'
                  : 'font-script text-2xl'
              }`}
            >
              &ldquo;{verseArtVerse.text}&rdquo;
            </p>
            <p className="font-serif text-xs sm:text-sm font-bold tracking-wider uppercase mt-4 text-[#8C4A55] dark:text-[#F6D8CE]">
              — {verseArtVerse.reference} —
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-center text-[10px] tracking-widest uppercase text-[#8C4A55]/70 dark:text-[#E5A8A0]/70">
            A Woman&apos;s Devotional Companion
          </div>
        </div>

        {/* Customization Options */}
        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs font-semibold text-[#8C4A55] dark:text-[#E8B4B8] block mb-1.5">
              Theme Palette
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedBg('ethereal')}
                className={`py-1.5 px-2 rounded-xl text-xs font-medium border text-center transition ${
                  selectedBg === 'ethereal'
                    ? 'border-[#B76E79] bg-[#FFF0F2] text-[#8C4A55] font-semibold'
                    : 'border-transparent bg-white/80 dark:bg-[#2A1C22] text-[#7A3F4C] dark:text-[#D99B9F]'
                }`}
              >
                Ethereal
              </button>
              <button
                onClick={() => setSelectedBg('roseGold')}
                className={`py-1.5 px-2 rounded-xl text-xs font-medium border text-center transition ${
                  selectedBg === 'roseGold'
                    ? 'border-[#B76E79] bg-[#FFF0F2] text-[#8C4A55] font-semibold'
                    : 'border-transparent bg-white/80 dark:bg-[#2A1C22] text-[#7A3F4C] dark:text-[#D99B9F]'
                }`}
              >
                Rose Gold
              </button>
              <button
                onClick={() => setSelectedBg('twilight')}
                className={`py-1.5 px-2 rounded-xl text-xs font-medium border text-center transition ${
                  selectedBg === 'twilight'
                    ? 'border-[#B76E79] bg-[#FFF0F2] text-[#8C4A55] font-semibold'
                    : 'border-transparent bg-white/80 dark:bg-[#2A1C22] text-[#7A3F4C] dark:text-[#D99B9F]'
                }`}
              >
                Twilight
              </button>
              <button
                onClick={() => setSelectedBg('cream')}
                className={`py-1.5 px-2 rounded-xl text-xs font-medium border text-center transition ${
                  selectedBg === 'cream'
                    ? 'border-[#B76E79] bg-[#FFF0F2] text-[#8C4A55] font-semibold'
                    : 'border-transparent bg-white/80 dark:bg-[#2A1C22] text-[#7A3F4C] dark:text-[#D99B9F]'
                }`}
              >
                Ivory
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#8C4A55] dark:text-[#E8B4B8] block mb-1.5">
              Typography Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFontChoice('serif')}
                className={`py-1.5 px-2 rounded-xl text-xs font-serif text-center border transition ${
                  fontChoice === 'serif'
                    ? 'border-[#B76E79] bg-[#FFF0F2] text-[#8C4A55] font-bold'
                    : 'border-transparent bg-white/80 dark:bg-[#2A1C22] text-[#7A3F4C] dark:text-[#D99B9F]'
                }`}
              >
                Garamond
              </button>
              <button
                onClick={() => setFontChoice('scripture')}
                className={`py-1.5 px-2 rounded-xl text-xs font-scripture text-center border transition ${
                  fontChoice === 'scripture'
                    ? 'border-[#B76E79] bg-[#FFF0F2] text-[#8C4A55] font-bold'
                    : 'border-transparent bg-white/80 dark:bg-[#2A1C22] text-[#7A3F4C] dark:text-[#D99B9F]'
                }`}
              >
                Lora
              </button>
              <button
                onClick={() => setFontChoice('script')}
                className={`py-1.5 px-2 rounded-xl text-xs font-script text-base text-center border transition ${
                  fontChoice === 'script'
                    ? 'border-[#B76E79] bg-[#FFF0F2] text-[#8C4A55]'
                    : 'border-transparent bg-white/80 dark:bg-[#2A1C22] text-[#7A3F4C] dark:text-[#D99B9F]'
                }`}
              >
                Parisienne
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={handleCopyText}
            className="min-h-[44px] flex items-center justify-center gap-2 rounded-2xl border border-[#B76E79]/50 bg-white dark:bg-[#2A1C22] text-xs font-semibold text-[#8C4A55] dark:text-[#F6D8CE] hover:bg-[#FFF0F2] active:scale-95 transition"
          >
            {hasCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{hasCopied ? 'Copied!' : 'Copy Verse'}</span>
          </button>
          <button
            onClick={handleDownloadImage}
            className="min-h-[44px] flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#B76E79] to-[#8C4A55] text-white text-xs font-semibold shadow hover:opacity-95 active:scale-95 transition"
          >
            <Download className="w-4 h-4" />
            <span>Download Image</span>
          </button>
        </div>
      </div>
    </div>
  );
};
