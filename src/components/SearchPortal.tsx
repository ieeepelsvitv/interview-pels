'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Recruit } from '@/types';
import { Search, X, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onCandidateFound: (candidate: Recruit) => void;
  onNotFound: (msg: string) => void;
}

export default function SearchPortal({ onCandidateFound, onNotFound }: Props) {
  const [regInput, setRegInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e?: React.FormEvent, query?: string) => {
    if (e) e.preventDefault();
    const searchQuery = query || regInput;
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    // Fetch all 51 rows (instant & cheap, allows client-side typo tolerance)
    const { data, error } = await supabase.from('recruits').select('*');
    setIsSearching(false);

    if (error || !data) {
      onNotFound('Failed to connect to the database. Please try again.');
      return;
    }

    const clean = searchQuery.trim().toUpperCase().replace(/\s+/g, '');
    const candidate = data.find((r: Recruit) => {
      const rNo = r.reg_no.replace(/\s+/g, '').toUpperCase();
      const nNo = (r.normalized_reg || '').replace(/\s+/g, '').toUpperCase();
      if (rNo === clean || nNo === clean) return true;
      
      // Tolerate 'O' vs '0' substitution
      const cleanReplaced = clean.replace(/O/g, '0');
      const rReplaced = rNo.replace(/O/g, '0');
      return rReplaced === cleanReplaced;
    });

    if (candidate) {
      onCandidateFound(candidate);
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 }, colors: ['#421d24', '#714cb6', '#d4c7ff'] });
    } else {
      onNotFound(`Registration number "${clean}" is not in the applicant roster.`);
    }
  };

  return (
    <div className="paper-card shadow-sm border border-[#e3e3e2] p-6 sm:p-8">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-[13px] font-w540 text-[#292827] tracking-tight uppercase">
            Student Registration Number
          </label>
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={regInput}
              onChange={(e) => setRegInput(e.target.value.toUpperCase())}
              placeholder="e.g. 25BEE0060 or 26BME0214"
              className="w-full bg-[#f2f0eb] border border-[#e3e3e2] focus:border-[#421d24] focus:bg-white text-[#292827] text-[17px] font-medium tracking-wide px-4 py-3.5 rounded-xl outline-none transition placeholder:text-[#999999]"
            />
            {regInput && (
              <button type="button" onClick={() => setRegInput('')} className="absolute right-3 text-[#666666] hover:text-[#292827] p-1">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        <button type="submit" disabled={isSearching} className="btn-midnight-wine w-full sm:w-auto px-8 cursor-pointer disabled:opacity-70">
          <span>{isSearching ? 'Searching...' : 'Retrieve Interview Slot'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-[#e3e3e2] flex flex-wrap items-center gap-2">
        <span className="text-[12px] text-[#666666] font-w460 mr-1">Quick preview:</span>
        {['25BEE0060', '26BLC0049', '26BBS0053', '25BEC0392'].map(reg => (
          <button key={reg} type="button" onClick={() => handleSearch(undefined, reg)} className="text-[12px] px-2.5 py-1 rounded-md bg-[#f2f0eb] hover:bg-[#e3e3e2] text-[#292827] border border-[#e3e3e2] transition">
            {reg}
          </button>
        ))}
      </div>
    </div>
  );
}