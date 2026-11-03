import { useState, lazy, Suspense } from "react";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { BentoGrid } from "./components/BentoGrid";
import { FeaturedHighlights } from "./components/FeaturedHighlights";
import { AboutSection } from "./components/AboutSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { CtaSection } from "./components/CtaSection";
import { Footer } from "./components/Footer";
import { Mail, Phone, Download, FileText, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./components/Icons";

// Code-split heavy Resume modal so PDF iframe and modal code don't block initial page load
const ResumeModal = lazy(() =>
  import("./components/ResumeModal").then((module) => ({ default: module.ResumeModal }))
);

function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen w-full relative overflow-x-clip bg-[#050505] selection:bg-blue-500/30">
      {/* Resume Modal (Lazy loaded on demand) */}
      <Suspense fallback={null}>
        {isResumeOpen && (
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        )}
      </Suspense>

      {/* Abstract motion gradient background */}
      <BackgroundEffects />
      
      {/* Top Floating Navigation */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-40 max-w-[95vw]">
        <div className="flex items-center gap-1 p-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
          <a 
            href="#home" 
            className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full hover:bg-white/10 transition-colors text-white text-xs font-semibold"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20">
              <img
                src="/Harshraj_Image/Harshraj_thumb.jpg"
                alt="Harshraj"
                width="24"
                height="24"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="hidden sm:inline">Harshraj</span>
          </a>

          <a href="#about" className="px-3.5 py-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors text-xs font-medium">About</a>
          <a href="#projects" className="px-3.5 py-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors text-xs font-medium">Projects</a>
          <a href="#experience" className="px-3.5 py-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors text-xs font-medium">Experience</a>
          <a href="#contact" className="px-3.5 py-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors text-xs font-medium">Contact</a>

          {/* Interactive Resume Button */}
          <button
            onClick={() => setIsResumeOpen(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-semibold transition-transform hover:scale-105 shadow-sm ml-1 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 flex flex-col items-center justify-center pt-32 md:pt-40 pb-16 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-black/60 backdrop-blur-xl text-white text-xs font-medium mb-8 shadow-xl shadow-black/40">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-emerald-300 font-semibold">Available for Full-Time Roles &amp; Engineering Opportunities</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-semibold text-white tracking-tight leading-[1.12] [text-shadow:_0_2px_18px_rgba(0,0,0,0.8)]">
          I help founders turn ideas <br className="hidden md:block"/> into{" "}
          <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-emerald-300 drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
            seamless digital experiences
          </span>
        </h1>
        
        {/* Profile Card Header */}
        <div className="mt-9 inline-flex flex-col sm:flex-row items-center gap-3 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 shadow-xl shadow-black/40">
          <span className="text-slate-300 text-sm">Hello, I'm</span>
          <span className="text-white font-bold text-lg">Harshraj Thakor</span>
          <div className="relative w-10 h-10 rounded-full ring-2 ring-cyan-400/50 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.5)] bg-[#101018]">
            <img
              src="/Harshraj_Image/Harshraj_thumb.jpg"
              alt="Harshraj Thakor"
              width="40"
              height="40"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <span className="text-cyan-300 text-sm font-medium">a Full Stack Developer</span>
        </div>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 text-sm font-medium">
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-transform shadow-xl hover:scale-105 cursor-pointer"
          >
            Let's Connect
          </a>

          <button
            onClick={() => setIsResumeOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-transform shadow-xl shadow-blue-900/40 hover:scale-105 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>View Resume</span>
          </button>

          <a
            href="/resume/F_I_Resume.pdf"
            download="Harshraj_Thakor_Resume.pdf"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white font-medium transition-transform shadow-xl shadow-black/40 hover:scale-105 cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyan-300" />
            <span>Download PDF</span>
          </a>
        </div>

        {/* Direct Contact & Social Links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-6 py-3 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 shadow-xl shadow-black/40 text-xs">
          <a href="mailto:harshrajthakor31@gmail.com" className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors font-medium">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>harshrajthakor31@gmail.com</span>
          </a>

          <a href="tel:+918238673505" className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors font-medium">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>(+91) 8238673505</span>
          </a>

          <a href="https://www.linkedin.com/in/harshrajthakor" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors font-medium">
            <LinkedinIcon className="w-3.5 h-3.5 text-sky-400" />
            <span>LinkedIn</span>
          </a>

          <a href="https://github.com/HarshrajThakor31" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors font-medium">
            <GithubIcon className="w-3.5 h-3.5 text-purple-300" />
            <span>GitHub</span>
          </a>

          <a href="https://harshraj-thakor.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors font-medium">
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            <span>harshraj-thakor.vercel.app</span>
          </a>
        </div>
      </section>

      {/* Bento Grid */}
      <div className="relative z-10 pb-20">
        <BentoGrid />
      </div>

      {/* Featured Projects Highlights */}
      <FeaturedHighlights />

      {/* Know About Me Section */}
      <AboutSection onOpenResume={() => setIsResumeOpen(true)} />

      {/* Experience, Education & Certifications Section */}
      <ExperienceSection onOpenResume={() => setIsResumeOpen(true)} />

      {/* Call to Action Section */}
      <CtaSection onOpenResume={() => setIsResumeOpen(true)} />

      {/* Footer */}
      <Footer onOpenResume={() => setIsResumeOpen(true)} />
    </div>
  );
}

export default App;
