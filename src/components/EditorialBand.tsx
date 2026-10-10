export default function EditorialBand() {
  return (
    <section id="editorialBand" className="w-full bg-[#0c4243] text-white py-20 sm:py-24 my-12">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative flex flex-col gap-4">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 max-w-md transform -rotate-1">
            <div className="flex items-center gap-2 mb-2 text-[#d4c7ff] text-[12px] font-mono uppercase tracking-wider">
              <span>Domain Focus</span> • <span>Curiosity First</span>
            </div>
            <p className="text-[17px] font-w460 text-white/95 leading-relaxed">
              “We care far more about what you want to build and what you've broken trying to learn, than memorized textbook definitions.”
            </p>
          </div>
          <div className="bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/25 max-w-md ml-6 sm:ml-12 transform rotate-1 shadow-lg">
            <div className="flex items-center gap-2 mb-2 text-[#d4c7ff] text-[12px] font-mono uppercase tracking-wider">
              <span>Junior Core</span> • <span>PELS 2026</span>
            </div>
            <p className="text-[15px] font-w460 text-white/90 leading-relaxed">
              Whether you are applying for Technical &amp; Projects, Operations, Events, Design, or Finance—our junior core is built on proactive ownership.
            </p>
          </div>
        </div>
        <div className="max-w-xl">
          <span className="text-[13px] font-w540 uppercase tracking-widest text-[#d4c7ff] block mb-3">The Interview Experience</span>
          <h2 className="text-3xl sm:text-5xl font-w460 text-white tracking-tight leading-tight mb-6">Five minutes to share your curiosity.</h2>
          <p className="text-[17px] font-w460 text-white/80 leading-relaxed">
            Each candidate is allocated a dedicated 5-minute interaction with our panel leads. Be genuine, test your microphone and webcam ahead of time, and come ready to talk about your interests.
          </p>
        </div>
      </div>
    </section>
  );
}