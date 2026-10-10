'use client';
import { useState } from 'react';
import WaterRippleCanvas from '@/components/WaterRippleCanvas';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ResultCard from '@/components/ResultCard';
import EditorialBand from '@/components/EditorialBand';
import ChecklistSection from '@/components/ChecklistSection';
import Footer from '@/components/Footer';
import { Recruit } from '@/types';

export default function Home() {
  const [candidate, setCandidate] = useState<Recruit | null>(null);
  const [notFoundMsg, setNotFoundMsg] = useState<string | null>(null);

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
        {candidate && <ResultCard candidate={candidate} />}
        <EditorialBand />
        <ChecklistSection />
        <Footer />
      </div>
    </main>
  );
}