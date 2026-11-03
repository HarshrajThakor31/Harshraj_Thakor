import { motion } from "framer-motion";
import { ArrowRight, Download, FileText, CheckCircle2, Sparkles, MapPin } from "lucide-react";

interface AboutSectionProps {
  onOpenResume?: () => void;
}

export const AboutSection = ({ onOpenResume }: AboutSectionProps) => {
  return (
    <section id="about" className="py-14 sm:py-20 relative z-10 max-w-5xl mx-auto px-4 border-t border-white/5 mt-10 content-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 sm:mb-10">
        <span className="inline-block text-xs font-semibold text-white/90 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 uppercase tracking-wider shadow-sm">
          Know About Me
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-cyan-300 bg-black/60 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full shadow-sm font-medium">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          B.Tech IT • 2023–2027
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start">
        {/* Left Side: Personal Narrative & Resume Info */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white leading-[1.25] sm:leading-[1.2] [text-shadow:_0_2px_16px_rgba(0,0,0,0.8)]">
            Full-Stack Developer crafting scalable systems &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-emerald-300 italic font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              seamless digital experiences
            </span>
          </h2>

          <div className="rounded-2xl bg-[#0a0a14]/85 backdrop-blur-xl border border-white/10 p-5 sm:p-6 md:p-8 space-y-4 text-slate-100 leading-relaxed text-sm sm:text-base md:text-lg shadow-2xl shadow-black/50">
            <p>
              I'm <strong className="text-white font-semibold">Harshraj Thakor</strong>, an Information Technology undergraduate at <span className="text-cyan-300 font-medium">Parul University (CGPA: 7.0/10)</span> with hands-on experience engineering full-stack web applications using <span className="text-white font-medium">React.js, Node.js, Express.js, PostgreSQL, and TypeScript</span>.
            </p>
            <p>
              Skilled in architecting robust REST APIs, high-performance user interfaces, and scalable backend services with clean relational database schemas (Neon DB, MySQL, MongoDB). I emphasize rigorous OOP fundamentals, exception handling, and Agile methodologies.
            </p>
            <p>
              Beyond traditional full-stack work, I actively design AI-driven automation workflows with <span className="text-cyan-200 font-medium">OpenAI API, Google Cloud Gen AI Builder, custom NLP engines (spaCy), and self-hosted n8n</span> to build autonomous platforms that solve practical problems.
            </p>
          </div>
        </div>

        {/* Right Side: Photo Card */}
        <div className="w-full md:w-[420px] shrink-0 relative flex flex-col items-center">
          {/* Ambient radial glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-transparent blur-[80px] rounded-full pointer-events-none" />

          <motion.div
            className="w-full max-w-[320px] sm:max-w-[340px] relative rounded-3xl bg-[#0f0f18] border border-white/15 p-3.5 sm:p-4 shadow-[0_0_40px_rgba(0,0,0,0.8)] group overflow-hidden will-change-transform"
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {/* Top Photo Frame */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#181824] border border-white/10 shadow-inner">
              <img
                src="/Harshraj_Image/Harshraj_photo.jpg"
                alt="Harshraj Thakor"
                loading="lazy"
                decoding="async"
                width="800"
                height="1096"
                className="w-full h-full object-cover object-top filter brightness-95 contrast-105 transition-transform duration-500 group-hover:scale-105"
              />

              {/* Status pill on top-left of image */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] text-white font-medium shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for hire</span>
              </div>

              {/* Location pin on bottom-right */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] text-white/80 font-medium">
                <MapPin className="w-3 h-3 text-blue-400" />
                <span>India (IST)</span>
              </div>
            </div>

            {/* Bottom Card Info */}
            <div className="pt-4 px-2 pb-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-semibold text-lg">Harshraj Thakor</h4>
                  <p className="text-xs text-white/50">Full Stack Web &amp; AI Engineer</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">React 18</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">TypeScript</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Node.js</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-sky-500/10 text-sky-300 border border-sky-500/20">PostgreSQL</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-pink-500/10 text-pink-300 border border-pink-500/20">OpenAI API</span>
              </div>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <div className="w-full max-w-[320px] sm:max-w-[340px] mt-5 flex flex-col gap-2.5">
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all hover:scale-[1.02] shadow-[0_0_25px_rgba(59,130,246,0.4)] cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View Updated Resume</span>
              </button>
            )}

            <a
              href="/resume/F_I_Resume.pdf"
              download="Harshraj_Thakor_Resume.pdf"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white font-medium text-sm transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>

            <a
              href="#experience"
              className="inline-flex items-center justify-center gap-2 pt-1 text-sm font-medium text-white/70 hover:text-white transition-colors group cursor-pointer"
            >
              <span>See Work Experience</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
