import { useState, useEffect, useRef } from 'react';

export function useAudioBible() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [playbackRate, setPlaybackRate] = useState(0.9); // Calm, gentle pace
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      setIsSupported(true);
    }
  }, []);

  const speak = (text: string, title?: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const fullNarrative = title ? `${title}. ${text}` : text;
    setCurrentText(text);

    const utterance = new SpeechSynthesisUtterance(fullNarrative);
    utterance.rate = playbackRate;
    utterance.pitch = 1.05; // Slightly gentle, soothing tone

    // Try finding an expressive/female English voice if available
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(v => 
      (v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Karen') || 
       v.name.includes('Zira') || v.name.includes('Natural') || v.name.includes('Female')) && v.lang.startsWith('en')
    ) || voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentText('');
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setCurrentText('');
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const pause = () => {
    if (synthRef.current && isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resume = () => {
    if (synthRef.current && !isPlaying && synthRef.current.paused) {
      synthRef.current.resume();
      setIsPlaying(true);
    }
  };

  const stop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setCurrentText('');
    }
  };

  return {
    isSupported,
    isPlaying,
    currentText,
    playbackRate,
    setPlaybackRate,
    speak,
    pause,
    resume,
    stop
  };
}
