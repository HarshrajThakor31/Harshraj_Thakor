import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Sparkles, Terminal } from "lucide-react";

interface TechItem {
  name: string;
  category: "frontend" | "backend" | "ai" | "devops";
  accent: string;
  dotColor: string;
}

const techStack: TechItem[] = [
  { name: "React 18", category: "frontend", accent: "text-cyan-300", dotColor: "bg-cyan-400" },
  { name: "TypeScript", category: "frontend", accent: "text-blue-300", dotColor: "bg-blue-400" },
  { name: "Node.js", category: "backend", accent: "text-emerald-300", dotColor: "bg-emerald-400" },
  { name: "Express.js", category: "backend", accent: "text-slate-200", dotColor: "bg-slate-300" },
  { name: "PostgreSQL", category: "backend", accent: "text-indigo-300", dotColor: "bg-indigo-400" },
  { name: "FastAPI", category: "backend", accent: "text-teal-300", dotColor: "bg-teal-400" },
  { name: "OpenAI API", category: "ai", accent: "text-emerald-300", dotColor: "bg-emerald-400" },
  { name: "spaCy NLP", category: "ai", accent: "text-amber-300", dotColor: "bg-amber-400" },
  { name: "n8n (Self-Hosted)", category: "ai", accent: "text-pink-300", dotColor: "bg-pink-400" },
  { name: "Tailwind CSS", category: "frontend", accent: "text-cyan-300", dotColor: "bg-cyan-400" },
  { name: "Docker", category: "devops", accent: "text-sky-300", dotColor: "bg-sky-400" },
  { name: "AWS", category: "devops", accent: "text-amber-300", dotColor: "bg-amber-400" },
  { name: "Git & GitHub", category: "devops", accent: "text-purple-300", dotColor: "bg-purple-400" },
  { name: "Socket.IO", category: "backend", accent: "text-violet-300", dotColor: "bg-violet-400" },
  { name: "Google Cloud Gen AI", category: "ai", accent: "text-blue-300", dotColor: "bg-blue-400" },
  { name: "REST APIs", category: "backend", accent: "text-emerald-300", dotColor: "bg-emerald-400" },
  { name: "JWT Auth", category: "backend", accent: "text-rose-300", dotColor: "bg-rose-400" },
  { name: "MongoDB", category: "backend", accent: "text-green-300", dotColor: "bg-green-400" },
];

export const TechMarqueeBox = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Tech" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend & DB" },
    { id: "ai", label: "AI & Pipeline" },
    { id: "devops", label: "DevOps & Cloud" },
  ];

  const row1 = techStack.slice(0, 9);
  const row2 = techStack.slice(9);

  return (
    <div className="flex flex-col h-full justify-between p-6 sm:p-7 relative overflow-hidden group">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-72 h-44 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/15 transition-all duration-700" />
      <div className="absolute -bottom-10 left-10 w-60 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle tech grid background */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" 
      />

      {/* Top Header Row */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Cpu className="w-3.5 h-3.5" />
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">
              Full-Stack Architecture &amp; Tech Stack
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-white/95 tracking-tight leading-snug">
            Crafting scalable experiences powered by next-gen tech
          </h3>
          <p className="text-xs text-white/60 mt-1 max-w-lg">
            Modular React frontends, robust Node &amp; FastAPI backend microservices, relational schemas, and automated AI pipelines.
          </p>
        </div>

        {/* Live stack badge */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] text-white/70 shrink-0">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          <span className="font-mono">Production Ready</span>
        </div>
      </div>

      {/* Category selector pills */}
      <div className="relative z-10 flex flex-wrap items-center gap-1.5 my-3">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-[11px] font-medium px-3 py-1 rounded-full border transition-all cursor-pointer ${
                isActive
                  ? "bg-white/15 text-white border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                  : "bg-white/[0.03] text-white/50 border-white/[0.06] hover:text-white/80 hover:border-white/15"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Marquee Container with Mask */}
      <div className="relative z-10 flex flex-col gap-2.5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {/* Row 1 - Left */}
        <motion.div
          className="flex whitespace-nowrap gap-2.5 will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        >
          {[...row1, ...row1].map((tech, index) => {
            const isHighlighted = activeCategory === "all" || activeCategory === tech.category;
            return (
              <div
                key={`r1-${index}`}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium border shadow-sm transition-all duration-200 ${
                  isHighlighted
                    ? "bg-[#12121c]/90 text-white border-white/15 hover:border-cyan-400/50 hover:bg-[#181826] hover:scale-[1.03]"
                    : "bg-[#0d0d14]/50 text-white/30 border-white/[0.04] opacity-40"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${tech.dotColor} shrink-0`} />
                <span className="tracking-tight">{tech.name}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Row 2 - Right */}
        <motion.div
          className="flex whitespace-nowrap gap-2.5 will-change-transform"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        >
          {[...row2, ...row2].map((tech, index) => {
            const isHighlighted = activeCategory === "all" || activeCategory === tech.category;
            return (
              <div
                key={`r2-${index}`}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium border shadow-sm transition-all duration-200 ${
                  isHighlighted
                    ? "bg-[#12121c]/90 text-white border-white/15 hover:border-indigo-400/50 hover:bg-[#181826] hover:scale-[1.03]"
                    : "bg-[#0d0d14]/50 text-white/30 border-white/[0.04] opacity-40"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${tech.dotColor} shrink-0`} />
                <span className="tracking-tight">{tech.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom Architectural Highlights strip */}
      <div className="relative z-10 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between text-[11px] text-white/50">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono">Clean Architecture • Strict Types • High Reliability</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-white/40 font-mono text-[10px]">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>Interactive Stack View</span>
        </div>
      </div>
    </div>
  );
};
