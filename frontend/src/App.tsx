import { useState, lazy, Suspense } from "react";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { BentoGrid } from "./components/BentoGrid";
import { FeaturedHighlights } from "./components/FeaturedHighlights";
import { AboutSection } from "./components/AboutSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { CtaSection } from "./components/CtaSection";
import { Footer } from "./components/Footer";
import { Mail, Phone, Download, FileText, ExternalLink, Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./components/Icons";

// Code-split heavy Resume modal so PDF iframe and modal code don't block initial page load
const ResumeModal = lazy(() =>
  import("./components/ResumeModal").then((module) => ({ default: module.ResumeModal }))
);

function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <nav className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-40 max-w-[95vw]">
        {/* Desktop Navigation (>= md screens: perfectly unchanged original layout) */}
        <div className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
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

        {/* Mobile Navigation (< md screens: compact pill with expandable sleek menu) */}
        <div className="flex md:hidden flex-col items-center">
          <div className="flex items-center justify-between gap-2 p-1.5 pl-2 pr-2.5 rounded-full bg-black/75 backdrop-blur-2xl border border-white/15 shadow-2xl w-[92vw] max-w-[360px]">
            <a 
              href="#home" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 py-0.5 rounded-full text-white text-xs font-semibold"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20 shrink-0">
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
              <span className="text-xs font-semibold tracking-tight">Harshraj</span>
            </a>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsResumeOpen(true);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold shadow-sm cursor-pointer"
              >
                <FileText className="w-3 h-3" />
                <span>Resume</span>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle navigation menu"
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white/90 border border-white/10 transition-colors cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="mt-2 w-[92vw] max-w-[360px] rounded-2xl bg-[#0d0d14]/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-3 flex flex-col gap-1">
              <a
                href="#home"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3.5 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 text-xs font-medium transition-colors flex items-center justify-between"
              >
                <span>Home</span>
                <span className="text-[10px] text-white/40 font-mono">01</span>
              </a>
              <a
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3.5 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 text-xs font-medium transition-colors flex items-center justify-between"
              >
                <span>About</span>
                <span className="text-[10px] text-white/40 font-mono">02</span>
              </a>
              <a
                href="#projects"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3.5 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 text-xs font-medium transition-colors flex items-center justify-between"
              >
                <span>Projects</span>
                <span className="text-[10px] text-white/40 font-mono">03</span>
              </a>
              <a
                href="#experience"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3.5 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 text-xs font-medium transition-colors flex items-center justify-between"
              >
                <span>Experience</span>
                <span className="text-[10px] text-white/40 font-mono">04</span>
              </a>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3.5 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 text-xs font-medium transition-colors flex items-center justify-between"
              >
                <span>Contact</span>
                <span className="text-[10px] text-white/40 font-mono">05</span>
              </a>

              <div className="pt-2 mt-1 border-t border-white/10 flex items-center justify-around px-2 text-xs text-white/50">
                <a href="mailto:harshrajthakor31@gmail.com" className="hover:text-cyan-300 transition-colors">
                  Email
                </a>
                <span>•</span>
                <a href="https://github.com/HarshrajThakor31" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  GitHub
                </a>
                <span>•</span>
                <a href="https://www.linkedin.com/in/harshrajthakor" target="_blank" rel="noopener noreferrer" className="hover:text-sky-300 transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 flex flex-col items-center justify-center pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-white/15 bg-black/60 backdrop-blur-xl text-white text-[11px] sm:text-xs font-medium mb-6 sm:mb-8 shadow-xl shadow-black/40 max-w-[92vw]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)] shrink-0" />
          <span className="text-emerald-300 font-semibold truncate sm:whitespace-normal">Available for Full-Time Roles &amp; Engineering Opportunities</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-semibold text-white tracking-tight leading-[1.16] sm:leading-[1.12] [text-shadow:_0_2px_18px_rgba(0,0,0,0.8)]">
          I help founders turn ideas <br className="hidden md:block"/> into{" "}
          <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-emerald-300 drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
            seamless digital experiences
          </span>
        </h1>
        
        {/* Profile Card Header */}
        <div className="mt-7 sm:mt-9 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl sm:rounded-full bg-black/60 backdrop-blur-xl border border-white/15 shadow-xl shadow-black/40">
          <span className="text-slate-300 text-xs sm:text-sm">Hello, I'm</span>
          <span className="text-white font-bold text-base sm:text-lg">Harshraj Thakor</span>
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-cyan-400/50 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.5)] bg-[#101018]">
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
          <span className="text-cyan-300 text-xs sm:text-sm font-medium">a Full Stack Developer</span>
        </div>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-3.5 text-xs sm:text-sm font-medium w-full max-w-sm sm:max-w-none">
          <a
            href="#contact"
            className="w-full sm:w-auto text-center px-6 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-transform shadow-xl hover:scale-105 cursor-pointer"
          >
            Let's Connect
          </a>

          <button
            onClick={() => setIsResumeOpen(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-transform shadow-xl shadow-blue-900/40 hover:scale-105 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>View Resume</span>
          </button>

          <a
            href="/resume/F_I_Resume.pdf"
            download="Harshraj_Thakor_Resume.pdf"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white font-medium transition-transform shadow-xl shadow-black/40 hover:scale-105 cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyan-300" />
            <span>Download PDF</span>
          </a>
        </div>

        {/* Direct Contact & Social Links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-4 sm:px-6 py-3 rounded-2xl sm:rounded-full bg-black/60 backdrop-blur-xl border border-white/15 shadow-xl shadow-black/40 text-xs max-w-[95vw] sm:max-w-none">
          <a href="mailto:harshrajthakor31@gmail.com" className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors font-medium break-all">
            <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>harshrajthakor31@gmail.com</span>
          </a>

          <a href="tel:+918238673505" className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors font-medium whitespace-nowrap">
            <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>(+91) 8238673505</span>
          </a>

          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/harshrajthakor" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors font-medium">
              <LinkedinIcon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>LinkedIn</span>
            </a>

            <a href="https://github.com/HarshrajThakor31" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors font-medium">
              <GithubIcon className="w-3.5 h-3.5 text-purple-300 shrink-0" />
              <span>GitHub</span>
            </a>
          </div>

          <a href="https://harshraj-thakor.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors font-medium">
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>harshraj-thakor.vercel.app</span>
          </a>
        </div>
      </section>

      {/* Bento Grid */}
      <div className="relative z-10 pb-16 sm:pb-20">
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
