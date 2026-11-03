import { ArrowRight, Download } from "lucide-react";

export const HeroBox = () => {
  return (
    <div className="relative flex flex-col h-full justify-between p-8 z-10">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight">
          I help founders turn ideas into seamless <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 italic font-serif">digital experiences</span>
        </h1>
        <p className="text-xl text-white/70">
          Hello, I'm <span className="text-white font-medium">Harshraj Thakor</span>, a Full Stack Developer
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-8">
        <a href="mailto:harshrajthakor31@gmail.com" className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-all hover:scale-105">
          <span>Let's Connect</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
        <a 
          href="/resume/F_I_Resume.pdf" 
          download="Harshraj_Thakor_Resume.pdf"
          className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-transparent px-8 font-medium text-white transition-all hover:bg-white/10"
        >
          <Download className="mr-2 h-4 w-4" />
          <span>Resume</span>
        </a>
      </div>
    </div>
  );
};
