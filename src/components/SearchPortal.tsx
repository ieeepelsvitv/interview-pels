'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Recruit } from '@/types';
import { X, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccess, playError } from '@/lib/sound';

interface Props {
  onCandidateFound: (candidate: Recruit) => void;
  onNotFound: (msg: string) => void;
}

export default function SearchPortal({ onCandidateFound, onNotFound }: Props) {
  const [regInput, setRegInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Empty entry → error sound + notice
    if (!regInput.trim()) {
      playError();
      onNotFound('Please enter your registration number.');
      return;
    }

    const clean = regInput.trim().toUpperCase().replace(/\s+/g, '');

    // Fetch ONLY the single matching row from Supabase (private lookup)
    setIsSearching(true);
    const { data, error } = await supabase.rpc('get_candidate_by_reg', {
      reg_input: clean,
    });
    setIsSearching(false);

    if (error) {
      playError();
      onNotFound('Failed to connect to the database. Please try again.');
      return;
    }

    const candidate = data && data.length > 0 ? (data[0] as Recruit) : null;
    const isFound = !!candidate;

    // 📝 Fire-and-forget log: records the search attempt without blocking the UI
    supabase
      .from('search_logs')
      .insert([{ searched_reg_no: clean, is_found: isFound }])
      .then(({ error: logError }) => {
        if (logError) console.warn('Failed to log search attempt:', logError);
      });

    if (candidate) {
      // ✅ Correct entry
      playSuccess();
      onCandidateFound(candidate);
      try {
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 }, colors: ['#421d24', '#714cb6', '#d4c7ff'] });
      } catch { /* ignore */ }
    } else {
      // ❌ Incorrect entry
      playError();
      onNotFound(`Registration number "${clean}" is not in the applicant roster.`);
    }
  };

  return (
    <div id="portalSection" className="paper-card shadow-sm border border-[#e3e3e2] p-6 sm:p-8">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="regInput" className="block text-[13px] font-w540 text-[#292827] tracking-tight uppercase">
            Student Registration Number
          </label>
          <div className="relative flex items-center">
            <input
              id="regInput"
              type="text"
              value={regInput}
              onChange={(e) => setRegInput(e.target.value.toUpperCase())}
              autoComplete="off"
              className="w-full bg-[#f2f0eb] border border-[#e3e3e2] focus:border-[#421d24] focus:bg-white text-[#292827] text-[17px] font-medium tracking-wide px-4 py-3.5 rounded-xl outline-none transition"
            />
            {regInput && (
              <button
                type="button"
                onClick={() => setRegInput('')}
                className="absolute right-3 text-[#666666] hover:text-[#292827] p-1 bg-transparent border-none cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        <button type="submit" disabled={isSearching} className="btn-midnight-wine w-full sm:w-auto px-8 disabled:opacity-70">
          <span>{isSearching ? 'Searching...' : 'Retrieve Interview Slot'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}