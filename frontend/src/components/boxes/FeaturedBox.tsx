import { useState } from "react";
import { Sparkles, ArrowUpRight, ShieldCheck, Database, Zap, Lock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface FeaturedProject {
  id: "crevio" | "trainintern";
  name: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  borderGlow: string;
  gradientBg: string;
  highlights: { icon: typeof ShieldCheck; text: string }[];
  metrics: { label: string; value: string };
  url: string;
}

const projects: FeaturedProject[] = [
  {
    id: "crevio",
    name: "Crevio",
    tagline: "Contract Lifecycle & Influencer Marketing Platform",
    badge: "Cryptographic Core",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    borderGlow: "hover:border-purple-400/50",
    gradientBg: "from-purple-950/30 via-indigo-950/15 to-transparent",
    highlights: [
      { icon: Lock, text: "SHA-256 PDF Terms Immutability" },
      { icon: Zap, text: "Automated Decision Verification" },
      { icon: Database, text: "Neon PostgreSQL & Socket.IO" },
    ],
    metrics: { label: "Architecture", value: "Event-Driven & Neon DB" },
    url: "https://www.crevio.co.in/",
  },
  {
    id: "trainintern",
    name: "TrainIntern",
    tagline: "Full-Stack Internship Management Ecosystem",
    badge: "Production 3-Tier",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    borderGlow: "hover:border-blue-400/50",
    gradientBg: "from-blue-950/30 via-cyan-950/15 to-transparent",
    highlights: [
      { icon: Zap, text: "CashFree Gateway Integration" },
      { icon: Database, text: "Normalized Relational DB CRUD" },
      { icon: ShieldCheck, text: "JWT Auth & n8n Automation" },
    ],
    metrics: { label: "Performance", value: "Sub-100ms Relational Queries" },
    url: "https://trainintern.tech/",
  },
];

export const FeaturedBox = () => {
  const [selectedId, setSelectedId] = useState<"crevio" | "trainintern">("crevio");
  const current = projects.find((p) => p.id === selectedId) || projects[0];

  return (
    <div className="flex flex-col h-full justify-between p-5 sm:p-6 relative overflow-hidden group">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-600/20 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="p-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">
            Featured Systems
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Production Live</span>
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10 my-2">
        <h3 className="text-base sm:text-lg font-medium text-white/95 leading-snug">
          Systems that stand out <br className="hidden sm:block"/>
          <span className="text-white/45 font-normal text-xs sm:text-sm">with speed &amp; cryptographic trust</span>
        </h3>
      </div>

      {/* Platform Switcher Tabs */}
      <div className="relative z-10 grid grid-cols-2 gap-1.5 mb-2.5 bg-white/[0.03] p-1 rounded-xl border border-white/[0.08]">
        {projects.map((proj) => {
          const isActive = proj.id === selectedId;
          return (
            <button
              key={proj.id}
              onClick={() => setSelectedId(proj.id)}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-white/10 text-white shadow-sm border border-white/15"
                  : "text-white/50 hover:text-white/80 hover:bg-white/[0.02]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  proj.id === "crevio" ? "bg-purple-400" : "bg-blue-400"
                }`}
              />
              <span>{proj.name}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Platform Card Showcase */}
      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className={`relative z-10 p-3.5 sm:p-4 rounded-xl bg-gradient-to-br ${current.gradientBg} border border-white/10 ${current.borderGlow} transition-all duration-200 flex flex-col justify-between will-change-transform`}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">{current.name}</h4>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${current.badgeColor}`}>
                {current.badge}
              </span>
            </div>
            <p className="text-xs text-white/70 mt-1 line-clamp-1">{current.tagline}</p>
          </div>

          <a
            href={current.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white/90 transition-transform shrink-0 hover:scale-105"
            title="Open Live Platform"
          >
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Feature Specs */}
        <div className="space-y-1.5 my-2 pt-2 border-t border-white/[0.08]">
          {current.highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-2 text-[11px] text-white/80">
                <span className="p-0.5 rounded bg-white/10 text-white/70">
                  <Icon className="w-3 h-3 text-cyan-300" />
                </span>
                <span className="truncate">{item.text}</span>
              </div>
            );
          })}
        </div>

        {/* Architecture KPI */}
        <div className="flex items-center justify-between text-[10px] text-white/50 pt-2 border-t border-white/[0.06] font-mono">
          <span>{current.metrics.label}:</span>
          <span className="text-cyan-300 font-medium">{current.metrics.value}</span>
        </div>
      </motion.div>

      {/* Bottom Quick Links to Explore */}
      <div className="relative z-10 flex items-center justify-between pt-2.5 border-t border-white/[0.06] mt-2">
        <a
          href="#projects"
          className="text-[10px] text-white/60 hover:text-white transition-colors flex items-center gap-1 font-mono"
        >
          <span>Deep-Dives</span>
          <ArrowUpRight className="w-2.5 h-2.5" />
        </a>

        <div className="flex items-center gap-1.5">
          <a
            href="https://www.crevio.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] px-2 py-0.5 rounded bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 transition-all font-semibold flex items-center gap-1"
          >
            <span>Crevio</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <a
            href="https://trainintern.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] px-2 py-0.5 rounded bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 transition-all font-semibold flex items-center gap-1"
          >
            <span>TrainIntern</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
