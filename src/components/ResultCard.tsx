'use client';
import { useEffect, useState } from 'react';
import { Recruit } from '@/types';
import { Video, CalendarPlus, Download, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { generateGoogleCalendarUrl } from '@/lib/utils';
import { generateSuperhumanPassPNG } from '@/lib/generatePassPNG';

export default function ResultCard({ candidate }: { candidate: Recruit }) {
  const [countdown, setCountdown] = useState('CALCULATING...');
  const [countdownClass, setCountdownClass] = useState('font-mono text-[13px] font-w540 text-[#421d24] bg-white px-2.5 py-1 rounded border border-[#e3e3e2]');

  const isDay1 = candidate.day.includes('Day 1');
  const accentColor = isDay1 ? '#421d24' : '#714cb6';

  useEffect(() => {
    const target = new Date(candidate.iso_start).getTime();
    const update = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        if (diff > -5 * 60 * 1000) {
          setCountdown('SLOT ACTIVE NOW — JOIN GMEET');
          setCountdownClass('font-mono text-[13px] font-w540 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300');
        } else {
          setCountdown('SLOT CONCLUDED');
          setCountdownClass('font-mono text-[13px] font-w540 text-[#666666] bg-white px-2.5 py-1 rounded border border-[#e3e3e2]');
        }
        return;
      }
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown(`${h}H ${m}M ${s}S REMAINING`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [candidate.iso_start]);

  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-20">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[13px] font-w540 text-[#666666] uppercase tracking-wider">Candidate Dossier</div>
          <span className="inline-flex items-center gap-1.5 text-[12px] px-2.5 py-0.5 rounded-full bg-[#d4c7ff] text-[#292827] font-medium">
            <CheckCircle2 className="w-3 h-3" /> Slot Verified
          </span>
        </div>

        {/* Creative Admit Pass */}
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(66,29,36,0.2)] border border-[#e3e3e2]">
          {/* Decorative Top Band */}
          <div className="relative h-3 bg-gradient-to-r from-[#421d24] via-[#714cb6] to-[#0c4243]" />

          {/* Corner Accent Pattern */}
          <svg className="absolute top-0 right-0 w-40 h-40 opacity-[0.04] pointer-events-none" viewBox="0 0 200 200" fill="none">
            <circle cx="200" cy="0" r="80" stroke="#421d24" strokeWidth="1" />
            <circle cx="200" cy="0" r="120" stroke="#421d24" strokeWidth="1" />
            <circle cx="200" cy="0" r="160" stroke="#421d24" strokeWidth="1" />
            <circle cx="200" cy="0" r="200" stroke="#421d24" strokeWidth="1" />
          </svg>

          <div className="p-8 sm:p-10 relative">
            {/* Header Row */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#f2f0eb] border border-[#e3e3e2] mb-4">
                  <Sparkles className="w-3 h-3" style={{ color: accentColor }} />
                  <span className="text-[11px] font-w540 uppercase tracking-wider" style={{ color: accentColor }}>
                    Admit Pass
                  </span>
                </div>
                <span className="block text-[11px] font-w540 uppercase tracking-[0.2em] text-[#666666] mb-1">Candidate</span>
                <h2 className="text-3xl sm:text-4xl font-w460 text-[#292827] tracking-tight leading-none mb-2" style={{ fontFamily: 'var(--font-editorial)' }}>
                  {candidate.name}
                </h2>
                <div className="flex items-center gap-3 text-[14px] text-[#666666]">
                  <span className="font-mono text-[#292827] px-2 py-0.5 rounded bg-[#f2f0eb] border border-[#e3e3e2] text-[13px]">
                    {candidate.reg_no}
                  </span>
                  <span className="text-[#666666]">VIT Vellore</span>
                </div>
              </div>

              {/* Day Badge */}
              <div className="text-right">
                <div className="inline-flex flex-col items-end">
                  <span className="text-[10px] font-w540 uppercase tracking-[0.2em] text-[#666666] mb-1">Interview Day</span>
                  <div
                    className="px-4 py-2 rounded-xl text-white font-w540 text-[14px]"
                    style={{ backgroundColor: accentColor }}
                  >
                    {isDay1 ? 'DAY 01' : 'DAY 02'}
                  </div>
                </div>
              </div>
            </div>

            {/* Domains as Pill Badges */}
            <div className="mb-8">
              <span className="block text-[10px] font-w540 uppercase tracking-[0.2em] text-[#666666] mb-2">Applied Domains</span>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 text-[12px] font-w540 px-3 py-1.5 rounded-full bg-white text-[#292827] border border-[#e3e3e2]">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
                  {candidate.domain1}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[12px] font-w540 px-3 py-1.5 rounded-full bg-[#f2f0eb] text-[#666666] border border-[#e3e3e2]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#999999]"></span>
                  {candidate.domain2}
                </span>
              </div>
            </div>

            {/* Schedule Block */}
            <div className="relative bg-[#f2f0eb] border border-[#e3e3e2] rounded-2xl p-6 mb-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none">
                <Clock className="w-full h-full" style={{ color: accentColor }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                <div>
                  <span className="block text-[10px] font-w540 uppercase tracking-[0.2em] text-[#666666] mb-1">Date</span>
                  <div className="text-[18px] font-w540 text-[#292827]">{candidate.day}</div>
                  <div className="text-[13px] text-[#666666] mt-0.5">{candidate.date_display}</div>
                </div>
                <div>
                  <span className="block text-[10px] font-w540 uppercase tracking-[0.2em] text-[#666666] mb-1">Allocated Slot</span>
                  <div className="text-[20px] font-w540 font-mono" style={{ color: accentColor }}>
                    {candidate.slot_time}
                  </div>
                  <div className="text-[12px] text-[#666666] mt-0.5">Panel: <span className="text-[#292827] font-medium">{candidate.panel}</span></div>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-[#e3e3e2] flex items-center justify-between flex-wrap gap-2">
                <span className="text-[#666666] flex items-center gap-1.5 font-w460 text-[12px]">
                  <Clock className="w-3.5 h-3.5" style={{ color: accentColor }} /> Countdown
                </span>
                <span className={countdownClass}>{countdown}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
              <a href={candidate.meet_link} target="_blank" rel="noopener noreferrer" className="btn-midnight-wine flex-1 justify-center">
                <Video className="w-4 h-4" /> Join Google Meet
              </a>
              <a href={generateGoogleCalendarUrl(candidate)} target="_blank" rel="noopener noreferrer" className="btn-lilac-outlined h-12 flex-1 justify-center rounded-2xl text-[15px]">
                <CalendarPlus className="w-4 h-4 text-[#714cb6]" /> Add to Calendar
              </a>
              <button onClick={() => generateSuperhumanPassPNG(candidate)} className="h-12 px-6 rounded-2xl border border-[#e3e3e2] hover:border-[#292827] bg-white text-[#292827] text-[15px] font-w460 flex items-center justify-center gap-2 transition cursor-pointer">
                <Download className="w-4 h-4 text-[#666666]" /> Save PNG
              </button>
            </div>

            {/* Ticket-style perforated footer */}
            <div className="relative pt-5 border-t border-dashed border-[#e3e3e2]">
              <div className="absolute -left-11 -top-3 w-6 h-6 rounded-full bg-[#f2f0eb] border border-[#e3e3e2]"></div>
              <div className="absolute -right-11 -top-3 w-6 h-6 rounded-full bg-[#f2f0eb] border border-[#e3e3e2]"></div>
              <div className="flex items-center justify-between text-[11px] text-[#666666]">
                <span className="font-mono uppercase tracking-wider">Ref: #PELS-{String(candidate.id).padStart(3, '0')}</span>
                <span className="font-w540 uppercase tracking-wider" style={{ color: accentColor }}>IEEE PELS • VIT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}