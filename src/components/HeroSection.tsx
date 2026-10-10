'use client';
import SearchPortal from './SearchPortal';
import { Recruit } from '@/types';
import { Linkedin } from 'lucide-react';

export default function HeroSection({
  onCandidateFound, onNotFound, notFoundMsg, candidate
}: {
  onCandidateFound: (c: Recruit) => void;
  onNotFound: (m: string) => void;
  notFoundMsg: string | null;
  candidate: Recruit | null;
}) {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="flex flex-col max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#e3e3e2] text-[#421d24] text-[13px] font-w540 mb-6 self-start">
            <span className="w-2 h-2 rounded-full bg-[#714cb6]"></span>
            <span>Virtual Recruitment Portal • Online via Google Meet</span>
          </div>
          <h1 className="headline-display mb-6">
            Find your junior core<br />
            <span className="font-normal italic" style={{ fontFamily: 'var(--font-editorial)', color: 'var(--color-midnight-wine)' }}>
              interview schedule.
            </span>
          </h1>
          <p className="text-[18px] sm:text-[20px] font-w460 text-[#666666] leading-relaxed max-w-2xl mb-8">
            Welcome to the IEEE Power Electronics Society 2026 recruitment. Enter your registration number below to reveal your interview window.
          </p>
          <SearchPortal onCandidateFound={onCandidateFound} onNotFound={onNotFound} />
          {notFoundMsg && !candidate && (
            <div className="w-full mt-6 p-6 rounded-2xl bg-white border border-[#e3e3e2] text-left">
              <p className="text-[14px] text-[#666666]">{notFoundMsg}</p>
              <p className="text-[13px] text-[#666666] mt-2">
                Please ensure your registration number is typed exactly as registered.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center w-full lg:h-full lg:min-h-[400px]">
          <div className="relative overflow-hidden bg-white border border-[#421d24]/20 rounded-[24px] p-7 sm:p-10 shadow-[0_20px_40px_-12px_rgba(66,29,36,0.1)] transition-transform duration-300 hover:-translate-y-1">
            <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 opacity-10 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40" stroke="#714cb6" strokeWidth="1" strokeDasharray="2 4" />
                <circle cx="50" cy="50" r="25" stroke="#421d24" strokeWidth="1" strokeDasharray="1 3" />
                <circle cx="50" cy="50" r="10" fill="#714cb6" />
              </svg>
            </div>
            <div className="absolute top-5 left-5 sm:top-6 sm:left-6 text-[#421d24]/10 text-7xl sm:text-8xl leading-none select-none pointer-events-none" style={{ fontFamily: 'serif' }}>“</div>
            <div className="relative z-10">
              <blockquote className="text-[24px] sm:text-[28px] lg:text-[32px] leading-[1.25] text-[#292827] mb-6 sm:mb-8" style={{ fontFamily: 'var(--font-editorial)' }}>
                We don't recruit the best. We <span className="italic text-[#421d24]">build the best together.</span>
              </blockquote>
              <div className="w-12 h-[1px] bg-[#e3e3e2] mb-5 sm:mb-6"></div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[11px] font-w540 uppercase tracking-[0.15em] text-[#421d24] mb-1">Mohit Seth</span>
                  <span className="text-[12px] text-[#666666] font-medium">Technical Head · IEEE-PELS VIT Vellore</span>
                </div>
                <a
                  href="https://www.linkedin.com/in/imohitseth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f2f0eb] hover:bg-[#421d24] hover:text-white text-[#421d24] text-[12px] font-w540 transition border border-[#e3e3e2]"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Connect</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}