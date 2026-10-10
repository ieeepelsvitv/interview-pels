'use client';
import { Calendar, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

export default function Header({ onOpenRoster }: { onOpenRoster: () => void }) {
  const [audioEnabled, setAudioEnabled] = useState(true);

  return (
    <header className="sticky top-0 z-40 bg-[#f2f0eb]/80 backdrop-blur-md border-b border-[#e3e3e2] transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto h-16 px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 no-underline group">
          <div className="w-8 h-8 rounded-lg bg-[#421d24] text-white flex items-center justify-center font-bold text-sm tracking-tighter">P</div>
          <div className="flex flex-col">
            <span className="font-w540 text-[15px] tracking-tight text-[#292827] flex items-center gap-1.5">
              IEEE PELS <span className="text-[11px] font-normal text-[#666666] px-1.5 py-0.5 rounded bg-[#e3e3e2]/60">VIT VELLORE</span>
            </span>
            <span className="text-[10px] text-[#666666] tracking-wider uppercase font-medium">Power Electronics Society</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-[15px] font-w460 text-[#292827]">
          <a href="#portalSection" className="hover:text-[#421d24] transition">Dispatch Portal</a>
          <button onClick={onOpenRoster} className="hover:text-[#421d24] transition bg-transparent border-none cursor-pointer font-w460 text-[15px] text-[#292827]">Candidate Roster</button>
          <a href="#editorialBand" className="hover:text-[#421d24] transition">What We Look For</a>
          <a href="#checklistSection" className="hover:text-[#421d24] transition">Guidelines</a>
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => setAudioEnabled(!audioEnabled)} title="Audio feedback" className="p-2 text-[#666666] hover:text-[#292827] rounded-lg transition bg-transparent border-none cursor-pointer">
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button onClick={onOpenRoster} className="btn-lilac-outlined">
            <Calendar className="w-3.5 h-3.5" />
            <span>Master Roster (51)</span>
          </button>
        </div>
      </div>
    </header>
  );
}