'use client';
import { useState, useRef, useEffect } from 'react';
import WaterRippleCanvas from '@/components/WaterRippleCanvas';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ResultCard from '@/components/ResultCard';
import EditorialBand from '@/components/EditorialBand';
import ChecklistSection from '@/components/ChecklistSection';
import Footer from '@/components/Footer';
import { Recruit } from '@/types';
import { Linkedin } from 'lucide-react';

export default function Home() {
  const [candidate, setCandidate] = useState<Recruit | null>(null);
  const [notFoundMsg, setNotFoundMsg] = useState<string | null>(null);
  
  // Ref to track the Result Card section for scrolling
  const resultRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to the result when a candidate is found
  useEffect(() => {
    if (candidate && resultRef.current) {
      // Small delay ensures the component has fully rendered before scrolling
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }, [candidate]);

  return (
    <main className="relative min-h-screen">
      <WaterRippleCanvas />
      <div className="relative z-10">
        <AnnouncementBanner />
        <Header />
        
        <HeroSection
          onCandidateFound={(c) => { setCandidate(c); setNotFoundMsg(null); }}
          onNotFound={(m) => { setNotFoundMsg(m); setCandidate(null); }}
          notFoundMsg={notFoundMsg}
          candidate={candidate}
        />

        {/* Wrapped in a ref-targeted div for smooth scrolling */}
        {candidate && (
          <div id="resultSection" ref={resultRef} className="scroll-mt-24">
            <ResultCard candidate={candidate} />
          </div>
        )}

        {notFoundMsg && !candidate && (
          <div className="max-w-2xl mx-auto px-6 mt-6">
            <div className="p-6 rounded-2xl bg-white border border-[#e3e3e2] text-left flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#f2f0eb] text-[#421d24] flex items-center justify-center shrink-0">
                <span className="font-bold">!</span>
              </div>
              <div className="flex-1">
                <p className="text-[14px] text-[#292827] font-w540 mb-1">Registration number not located</p>
                <p className="text-[14px] text-[#666666] mb-2">{notFoundMsg}</p>
                <p className="text-[13px] text-[#666666] flex flex-wrap items-center gap-2">
                  For assistance, reach out to
                  <strong className="text-[#292827]">Mohit Seth</strong>
                  (Technical Head)
                  <a href="https://www.linkedin.com/in/imohitseth" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#421d24] font-w540 hover:underline">
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        <EditorialBand />
        <ChecklistSection />
        <Footer />
      </div>
    </main>
  );
}