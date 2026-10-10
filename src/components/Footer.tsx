import { Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#421d24] text-white pt-16 pb-12 mt-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          <div>
            <div className="text-[16px] font-w540 text-white mb-2">IEEE PELS</div>
            <p className="text-[13px] text-white/70 leading-relaxed">
              Power Electronics Society Chapter at Vellore Institute of Technology, Vellore.
            </p>
          </div>
          <div>
            <div className="text-[13px] font-w540 uppercase tracking-wider text-white mb-3">Recruitment 2026</div>
            <ul className="space-y-2 text-[13px] text-white/70 list-none p-0">
              <li>Day 1: Sunday, 11 October</li>
              <li>Day 2: Monday, 12 October</li>
              <li>Duration: 5 Minutes / Participant</li>
              <li>Platform: Google Meet</li>
            </ul>
          </div>
          <div>
            <div className="text-[13px] font-w540 uppercase tracking-wider text-white mb-3">Domains</div>
            <ul className="space-y-2 text-[13px] text-white/70 list-none p-0">
              <li>Technical &amp; Projects</li>
              <li>Operations &amp; Outreach</li>
              <li>Events &amp; Editorial</li>
              <li>Design &amp; Media</li>
            </ul>
          </div>
          <div>
            <div className="text-[13px] font-w540 uppercase tracking-wider text-white mb-3">Contact</div>
            <p className="text-[13px] text-white/70 leading-relaxed mb-1">
              Technical Head: <strong className="text-white">Mohit Seth</strong>
            </p>
            <a
              href="https://www.linkedin.com/in/imohitseth"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[12px] text-white/70 hover:text-white transition mb-3"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn Profile</span>
            </a>
            <p className="text-[12px] text-white/50">VIT Vellore, Tamil Nadu, India</p>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/50">
          <div>© 2026 IEEE Power Electronics Society (PELS) — VIT Vellore. All rights reserved.</div>
          <div className="flex items-center gap-2 text-white/70">
            <span>Engineered with care by Mohit Seth</span>
            <a href="https://www.linkedin.com/in/imohitseth" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}