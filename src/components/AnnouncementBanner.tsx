'use client';
import { Zap } from 'lucide-react';

export default function AnnouncementBanner({ onOpenRoster }: { onOpenRoster: () => void }) {
  return (
    <aside className="w-full bg-[#421d24] text-white py-2.5 px-4 text-center text-[13px] font-w460 tracking-tight flex items-center justify-center gap-2 relative z-50">
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/10 text-[#d4c7ff]">
        <Zap className="w-3 h-3" />
      </span>
      <span>Junior Core Recruitment Tenure 2026–27: <strong>51 Candidate Interview Slots Scheduled</strong> across Oct 11 &amp; 12.</span>
      <button onClick={onOpenRoster} className="ml-2 text-[#d4c7ff] hover:text-white underline underline-offset-2 transition text-[12px] font-w540 cursor-pointer">
        View Master Roster →
      </button>
    </aside>
  );
}