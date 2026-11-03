import { ArrowRight, Download, FileText, Mail } from "lucide-react";

interface CtaSectionProps {
  onOpenResume?: () => void;
}

export const CtaSection = ({ onOpenResume }: CtaSectionProps) => {
  return (
    <section id="contact" className="py-16 sm:py-24 relative z-10 w-full overflow-hidden flex flex-col items-center justify-center text-center px-4 mt-10 sm:mt-16 border-t border-white/5 content-auto">
      {/* Background swirl effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9InRyYW5zcGFyZW50Ii8+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSIvPjwvc3ZnPg==')] opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-[100%] pointer-events-none" />
      
      {/* Profile Avatar Badge */}
      <div className="relative mb-6 z-10">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full ring-4 ring-blue-500/20 overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.3)] bg-[#10101a]">
          <img
            src="/Harshraj_Image/Harshraj_thumb.jpg"
            alt="Harshraj Thakor"
            loading="lazy"
            decoding="async"
            width="80"
            height="80"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-400 ring-2 ring-black" />
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white tracking-normal sm:tracking-widest leading-tight relative z-10 mb-2 [text-shadow:_0_2px_18px_rgba(0,0,0,0.8)]">
        From Concept to <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-white">Creation</span>
      </h2>
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white tracking-normal sm:tracking-widest leading-tight relative z-10 mb-6 [text-shadow:_0_2px_18px_rgba(0,0,0,0.8)]">
        Let's Make It <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-teal-200">Happen!</span>
      </h2>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 relative z-10 w-full max-w-xs sm:max-w-none">
        <a 
          href="mailto:harshrajthakor31@gmail.com" 
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform shadow-xl hover:bg-slate-100 cursor-pointer"
        >
          <Mail className="w-5 h-5 text-blue-600" />
          <span>Get In Touch</span>
          <ArrowRight className="w-4 h-4" />
        </a>

        {onOpenResume ? (
          <button
            onClick={onOpenResume}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#0c0c16]/90 hover:bg-[#141424] backdrop-blur-md border border-white/25 text-white font-semibold hover:scale-105 transition-transform shadow-xl shadow-black/50 hover:border-white/40 cursor-pointer"
          >
            <FileText className="w-5 h-5 text-cyan-300" />
            <span>View Resume</span>
          </button>
        ) : (
          <a
            href="/resume/F_I_Resume.pdf"
            download="Harshraj_Thakor_Resume.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#0c0c16]/90 hover:bg-[#141424] backdrop-blur-md border border-white/25 text-white font-semibold hover:scale-105 transition-transform shadow-xl shadow-black/50 hover:border-white/40 cursor-pointer"
          >
            <Download className="w-5 h-5 text-cyan-300" />
            <span>Download Resume</span>
          </a>
        )}
      </div>

      <div className="mt-8 sm:mt-10 inline-block px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/60 relative z-10 max-w-2xl w-full sm:w-auto">
        <p className="text-sm sm:text-base md:text-lg font-semibold text-white leading-snug">
          I'm actively available for Full-Time Roles, Internships &amp; Freelance Projects.
        </p>
        <p className="text-slate-300 text-xs sm:text-sm mt-1.5 font-normal break-all sm:break-normal">
          harshrajthakor31@gmail.com • (+91) 8238673505 • Based in India (IST)
        </p>
      </div>
    </section>
  );
};
