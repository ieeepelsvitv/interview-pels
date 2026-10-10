'use client';
import { Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { setAudioEnabled } from '@/lib/sound';

export default function Header() {
  const [audioOn, setAudioOn] = useState(true);

  const toggleAudio = () => {
    const next = !audioOn;
    setAudioOn(next);
    setAudioEnabled(next);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#f2f0eb]/80 backdrop-blur-md border-b border-[#e3e3e2] transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto h-16 px-6 flex items-center justify-between">
        {/* Brand text only (P logo removed) */}
        <a href="#" className="flex flex-col no-underline group">
          <span className="font-w540 text-[15px] tracking-tight text-[#292827] flex items-center gap-1.5">
            IEEE PELS <span className="text-[11px] font-normal text-[#666666] px-1.5 py-0.5 rounded bg-[#e3e3e2]/60">VIT VELLORE</span>
          </span>
          <span className="text-[10px] text-[#666666] tracking-wider uppercase font-medium">Power Electronics Society</span>
        </a>

        {/* Nav (Dispatch Portal removed) */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-w460 text-[#292827]">
          <a href="#editorialBand" className="hover:text-[#421d24] transition">What We Look For</a>
          <a href="#checklistSection" className="hover:text-[#421d24] transition">Guidelines</a>
        </nav>

        <button
          onClick={toggleAudio}
          title={audioOn ? 'Mute sound effects' : 'Unmute sound effects'}
          className="p-2 text-[#666666] hover:text-[#292827] rounded-lg transition bg-transparent border-none cursor-pointer"
        >
          {audioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}