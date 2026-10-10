'use client';
import { useEffect, useState } from 'react';
import { Recruit } from '@/types';
import { Video, CalendarPlus, Download, Clock } from 'lucide-react';
import { generateGoogleCalendarUrl } from '@/lib/utils';
import { generateSuperhumanPassPNG } from '@/lib/generatePassPNG';

export default function ResultCard({ candidate }: { candidate: Recruit }) {
  const [countdown, setCountdown] = useState('CALCULATING...');
  const [countdownClass, setCountdownClass] = useState('font-mono text-[13px] font-w540 text-[#421d24] bg-white px-2.5 py-1 rounded border border-[#e3e3e2]');

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
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[13px] font-w540 text-[#666666] uppercase tracking-wider">Candidate Dossier &amp; Admit Pass</div>
          <span className="text-[12px] px-2.5 py-0.5 rounded-full bg-[#d4c7ff] text-[#292827] font-medium">Slot Verified</span>
        </div>
        
        <div className="bg-white border border-[#e3e3e2] rounded-2xl p-8 sm:p-10 text-left">
          <div className="border-b border-[#e3e3e2] pb-6 mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <span className="text-[12px] font-w540 uppercase tracking-wider text-[#666666]">Applicant Name</span>
              <h2 className="text-3xl sm:text-4xl font-w460 text-[#292827] tracking-tight mt-1 mb-2">{candidate.name}</h2>
              <div className="flex items-center gap-3 text-[14px] text-[#666666]">
                <span className="font-mono text-[#292827] px-2 py-0.5 rounded bg-[#f2f0eb] border border-[#e3e3e2]">{candidate.reg_no}</span>
                <span>VIT Vellore</span>
              </div>
            </div>
            <div className="sm:text-right">
              <span className="text-[12px] font-w540 uppercase tracking-wider text-[#666666] block mb-1.5">Applied Domains</span>
              <div className="flex sm:flex-col items-start sm:items-end gap-1.5">
                <span className="text-[13px] font-w540 px-3 py-1 rounded-full bg-[#f2f0eb] text-[#292827] border border-[#e3e3e2]">{candidate.domain1}</span>
                <span className="text-[12px] text-[#666666] px-2.5 py-0.5">{candidate.domain2}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#f2f0eb] border border-[#e3e3e2] rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="text-[12px] font-w540 uppercase tracking-wider text-[#666666] block mb-1">Interview Date</span>
                <div className="text-[20px] font-w540 text-[#292827]">{candidate.day}</div>
                <div className="text-[14px] text-[#666666]">{candidate.date_display}</div>
              </div>
              <div>
                <span className="text-[12px] font-w540 uppercase tracking-wider text-[#666666] block mb-1">Allocated Time (5 Mins)</span>
                <div className="text-[22px] font-w540 text-[#421d24] font-mono">{candidate.slot_time}</div>
                <div className="text-[13px] text-[#666666] mt-0.5">Assigned: <span className="text-[#292827] font-medium">{candidate.panel}</span></div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e3e3e2] flex items-center justify-between flex-wrap gap-2 text-[13px]">
              <span className="text-[#666666] flex items-center gap-1.5 font-w460"><Clock className="w-3.5 h-3.5 text-[#714cb6]" /> Slot Countdown:</span>
              <span className={countdownClass}>{countdown}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
            <a href={candidate.meet_link} target="_blank" className="btn-midnight-wine flex-1 text-center"><Video className="w-4 h-4" /> Join Google Meet</a>
            <a href={generateGoogleCalendarUrl(candidate)} target="_blank" className="btn-lilac-outlined h-12 flex-1 justify-center rounded-2xl text-[15px]"><CalendarPlus className="w-4 h-4 text-[#714cb6]" /> Add to Calendar</a>
            <button onClick={() => generateSuperhumanPassPNG(candidate)} className="h-12 px-6 rounded-2xl border border-[#e3e3e2] hover:border-[#292827] bg-white text-[#292827] text-[15px] font-w460 flex items-center justify-center gap-2 transition cursor-pointer"><Download className="w-4 h-4 text-[#666666]" /> Save Pass (PNG)</button>
          </div>

          <div className="text-[12px] text-[#666666] flex items-center justify-between pt-4 border-t border-[#e3e3e2]">
            <span>Docket Reference: #PELS-{String(candidate.id).padStart(2, '0')}</span>
            <span className="text-[#421d24] font-medium">IEEE Power Electronics Society • VIT</span>
          </div>
        </div>
      </div>
    </section>
  );
}