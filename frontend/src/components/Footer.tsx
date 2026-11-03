import { Globe, Mail, Phone, FileText } from "lucide-react";
import { GithubIcon } from "./Icons";

interface FooterProps {
  onOpenResume?: () => void;
}

export const Footer = ({ onOpenResume }: FooterProps) => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#050505] pt-10 sm:pt-14 pb-8 relative z-10 content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between gap-8 sm:gap-10">
        
        <div className="space-y-4 max-w-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0">
              <img
                src="/Harshraj_Image/Harshraj_thumb.jpg"
                alt="Harshraj Thakor"
                loading="lazy"
                decoding="async"
                width="40"
                height="40"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Harshraj Thakor</h2>
              <p className="text-xs text-white/50">Full-Stack Developer &amp; AI Integrator</p>
            </div>
          </div>
          <p className="text-xs text-white/50 leading-relaxed">
            B.Tech Information Technology undergraduate at Parul University. Focused on architecting scalable full-stack web platforms, REST APIs, and automated AI workflows.
          </p>
          <div className="flex items-center gap-4 pt-1">
            <a
              href="https://www.linkedin.com/in/harshrajthakor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
              title="LinkedIn"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/HarshrajThakor31"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:harshrajthakor31@gmail.com"
              className="text-white/40 hover:text-white transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="tel:+918238673505"
              className="text-white/40 hover:text-white transition-colors"
              title="Phone"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1.5 font-mono">Navigation</span>
            <a href="#home" className="text-sm text-white/70 hover:text-white transition-colors">Home</a>
            <a href="#about" className="text-sm text-white/70 hover:text-white transition-colors">About</a>
            <a href="#projects" className="text-sm text-white/70 hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="text-sm text-white/70 hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="text-sm text-white/70 hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1.5 font-mono">Projects</span>
            <a href="#projects" className="text-sm text-white/70 hover:text-white transition-colors">Crevio (Contract)</a>
            <a href="https://trainintern.tech/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">TrainIntern (Live)</a>
            <a href="#projects" className="text-sm text-white/70 hover:text-white transition-colors">CandidateAI</a>
          </div>

          <div className="flex flex-col gap-2 col-span-2 sm:col-span-1 pt-2 sm:pt-0 border-t border-white/5 sm:border-0">
            <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1.5 font-mono">Resume &amp; Contact</span>
            {onOpenResume ? (
              <button
                onClick={onOpenResume}
                className="text-sm text-left text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Resume</span>
              </button>
            ) : (
              <a
                href="/resume/F_I_Resume.pdf"
                download="Harshraj_Thakor_Resume.pdf"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Download Resume
              </a>
            )}
            <a
              href="/resume/F_I_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Resume PDF (Tab)
            </a>
            <a href="mailto:harshrajthakor31@gmail.com" className="text-sm text-white/70 hover:text-white transition-colors break-all">
              harshrajthakor31@gmail.com
            </a>
            <a href="tel:+918238673505" className="text-sm text-white/70 hover:text-white transition-colors">
              (+91) 8238673505
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 sm:mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40 text-center sm:text-left">
        <p>© 2026 Harshraj Thakor. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="https://harshraj-thakor.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            harshraj-thakor.vercel.app
          </a>
          <span>•</span>
          <span>B.Tech IT (2023 – 2027)</span>
        </div>
      </div>
    </footer>
  );
};
