import { Video, Clock, Sparkles } from 'lucide-react';

export default function ChecklistSection() {
  const items = [
    { icon: Video, color: '#421d24', title: 'Audio & Camera Ready', desc: 'Ensure your microphone and webcam are functional. We conduct all junior core interviews face-to-face over Google Meet.' },
    { icon: Clock, color: '#714cb6', title: 'Punctual Entry', desc: 'Join the Google Meet 3 minutes prior to your allocated slot. Each slot is strictly 5 minutes to keep timing on schedule.' },
    { icon: Sparkles, color: '#0c4243', title: 'Confidence & Honesty', desc: "Don't worry if you don't know every technical term yet. We look for curiosity, initiative, and eagerness to learn together." }
  ];

  return (
    <section id="checklistSection" className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="max-w-2xl mb-8">
        <span className="text-[12px] font-w540 uppercase tracking-wider text-[#666666] block mb-2">Checklist &amp; Preparation</span>
        <h2 className="headline-sm">Everything you need before joining.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div key={i} className="paper-card">
            <div className="w-8 h-8 rounded-lg bg-[#f2f0eb] flex items-center justify-center mb-4" style={{ color: item.color }}>
              <item.icon className="w-4 h-4" />
            </div>
            <h3 className="text-[18px] font-w540 text-[#292827] mb-2">{item.title}</h3>
            <p className="text-[14px] text-[#666666] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}