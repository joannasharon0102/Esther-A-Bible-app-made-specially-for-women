import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-[#8C4A55] text-white px-4 py-1.5 text-xs font-medium shadow-lg border border-[#F2D1C9]/40 backdrop-blur-md animate-fade-in">
      <WifiOff className="w-3.5 h-3.5 text-[#FADCE0] animate-pulse" />
      <span>Offline Mode — Your Bible & prayers are cached</span>
    </div>
  );
};
