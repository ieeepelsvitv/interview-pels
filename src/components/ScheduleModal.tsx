'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Recruit } from '@/types';
import { X } from 'lucide-react';

export default function ScheduleModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [recruits, setRecruits] = useState<Recruit[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'Day 1' | 'Day 2'>('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isOpen && recruits.length === 0) {
      supabase.from('recruits').select('*').order('id').then(({ data }) => {
        if (data) setRecruits(data);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = recruits.filter(r => {
    const matchFilter = filter === 'ALL' ? true : r.day.includes(filter);
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.reg_no.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white border border-[#e3e3e2] w-full max-w-4xl max-h-[85vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-[#e3e3e2] flex items-center justify-between">
          <div>
            <h3 className="text-[20px] font-w540 text-[#292827] tracking-tight">Master Recruitment Roster</h3>
            <p className="text-[13px] text-[#666666]">51 applicants scheduled across Day 1 &amp; Day 2</p>
          </div>
          <button onClick={onClose} className="text-[#666666] hover:text-[#292827] p-2 rounded-lg hover:bg-[#f2f0eb] transition bg-transparent border-none cursor-pointer"><X className="w-5 h-5" /></button>
        </div>
        
        <div className="p-4 bg-[#f2f0eb] border-b border-[#e3e3e2] flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-1.5 bg-white p-1 rounded-xl border border-[#e3e3e2]">
            {(['ALL', 'Day 1', 'Day 2'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-lg text-xs font-medium ${filter === f ? 'bg-[#421d24] text-white' : 'text-[#666666] hover:text-[#292827] bg-transparent border-none cursor-pointer'}`}>
                {f === 'ALL' ? 'All (51)' : `${f} (${f === 'Day 1' ? 25 : 26})`}
              </button>
            ))}
          </div>
          <input type="text" placeholder="Filter candidate..." value={search} onChange={e => setSearch(e.target.value)} className="bg-white border border-[#e3e3e2] rounded-lg px-3 py-1.5 text-xs text-[#292827] outline-none focus:border-[#421d24] w-56" />
        </div>

        <div className="overflow-y-auto p-4 flex-1">
          <table className="w-full text-left text-xs font-sans">
            <thead className="sticky top-0 bg-[#f2f0eb] text-[#666666] uppercase text-[11px] font-w540 border-b border-[#e3e3e2]">
              <tr><th className="py-2.5 px-3">#</th><th className="py-2.5 px-3">Reg No</th><th className="py-2.5 px-3">Name</th><th className="py-2.5 px-3">Day</th><th className="py-2.5 px-3">Slot</th></tr>
            </thead>
            <tbody className="divide-y divide-[#e3e3e2] text-[#292827]">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-[#f2f0eb] transition">
                  <td className="py-2.5 px-3 text-[#666666]">{r.id}</td>
                  <td className="py-2.5 px-3 font-mono font-medium">{r.reg_no}</td>
                  <td className="py-2.5 px-3 font-w540">{r.name}</td>
                  <td className="py-2.5 px-3">{r.day}</td>
                  <td className="py-2.5 px-3 font-mono text-[#421d24] font-medium">{r.slot_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}