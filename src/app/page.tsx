'use client';
import { useState } from 'react';
import WaterRippleCanvas from '@/components/WaterRippleCanvas';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection'; // Import this
import ResultCard from '@/components/ResultCard';
import ScheduleModal from '@/components/ScheduleModal';
import EditorialBand from '@/components/EditorialBand';
import ChecklistSection from '@/components/ChecklistSection';
import Footer from '@/components/Footer';
import { Recruit } from '@/types';

export default function Home() {
  const [candidate, setCandidate] = useState<Recruit | null>(null);
  const [notFoundMsg, setNotFoundMsg] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen">
      <WaterRippleCanvas />
      <div className="relative z-10">
        <AnnouncementBanner onOpenRoster={() => setIsModalOpen(true)} />
        <Header onOpenRoster={() => setIsModalOpen(true)} />
        
        {/* Replaced inline code with component */}
        <HeroSection 
          onCandidateFound={setCandidate} 
          onNotFound={setNotFoundMsg} 
          notFoundMsg={notFoundMsg} 
          candidate={candidate} 
        />

        {candidate && <ResultCard candidate={candidate} />}
        <EditorialBand onOpenRoster={() => setIsModalOpen(true)} />
        <ChecklistSection />
        <Footer />
        
        <ScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </main>
  );
}