import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`flex items-center gap-1.5 rounded-full border border-[#B76E79]/50 bg-[#FFF0F2] dark:bg-[#2A1C22] px-3 py-1.5 text-xs font-semibold text-[#8C4A55] dark:text-[#F6D8CE] shadow-sm hover:bg-[#FADCE0] dark:hover:bg-[#3D252E] transition-colors ${
          compact ? 'text-[11px] py-1 px-2.5' : ''
        }`}
        aria-label="Install ESTHER App"
      >
        <Download className="w-3.5 h-3.5 text-[#B76E79]" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`flex items-center gap-1.5 rounded-full border border-[#B76E79]/40 bg-[#FFF0F2] dark:bg-[#2A1C22] px-3 py-1.5 text-xs font-semibold text-[#8C4A55] dark:text-[#F6D8CE] shadow-sm hover:bg-[#FADCE0] dark:hover:bg-[#3D252E] transition-colors ${
            compact ? 'text-[11px] py-1 px-2.5' : ''
          }`}
          aria-label="Install ESTHER on iOS"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#B76E79]" />
          <span>Install on iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-3xl bg-[#FFF8F0] dark:bg-[#221319] p-6 shadow-2xl border border-[#F2D1C9] dark:border-[#8A4854]/40">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif text-lg font-bold text-[#6A323E] dark:text-[#F6D8CE]">
                  Install ESTHER on iPhone
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-full text-[#8C4A55] hover:bg-[#FADCE0]/50"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-[#7A3F4C] dark:text-[#D99B9F] leading-relaxed mb-4">
                1. Tap the <span className="font-semibold text-[#B76E79]">Share</span> button (box with upward arrow) in the Safari toolbar.<br />
                2. Scroll down and tap <span className="font-semibold text-[#B76E79]">Add to Home Screen</span>.<br />
                3. Tap <span className="font-semibold text-[#B76E79]">Add</span> in the top right.
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-full bg-[#B76E79] text-white font-medium text-xs tracking-wider uppercase shadow hover:bg-[#8C4A55] transition"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
