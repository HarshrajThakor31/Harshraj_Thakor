import { ShieldCheck, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const TrustBox = () => {
  return (
    <div className="flex flex-col h-full justify-between p-5 sm:p-7 relative overflow-hidden group">
      {/* Ambient background glow */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all duration-700" />
      <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <ShieldCheck className="w-3.5 h-3.5" />
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">
            Trust &amp; Reliability
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>100% On-Time Delivery</span>
        </div>
      </div>

      {/* Centerpiece: High-Tech Verification Radar & Metric Badges */}
      <div className="relative z-10 my-auto py-4 flex items-center justify-center">
        {/* Concentric rings */}
        <div className="relative flex items-center justify-center w-48 h-40">
          {/* Outer Ring */}
          <div className="absolute w-44 h-44 rounded-full border border-white/[0.04] animate-pulse" />
          <div className="absolute w-32 h-32 rounded-full border border-cyan-500/15 border-dashed" />
          <div className="absolute w-20 h-20 rounded-full border border-white/[0.08]" />

          {/* Radar Sweep Effect */}
          <motion.div
            className="absolute w-36 h-36 rounded-full border border-transparent border-t-cyan-400/40 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          />

          {/* Central Verified Core */}
          <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/30 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.35)] backdrop-blur-md group-hover:scale-105 transition-transform duration-300">
            <CheckCircle2 className="w-7 h-7 text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          </div>

          {/* Floating Pill: Quick Turnaround */}
          <div className="absolute -top-1 -right-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 shadow-lg flex items-center gap-1.5 text-[10px] text-white/80">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span className="font-medium">&lt; 2h Fast Sync</span>
          </div>

          {/* Floating Pill: High Integrity */}
          <div className="absolute -bottom-2 -left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 shadow-lg flex items-center gap-1.5 text-[10px] text-white/80">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span className="font-medium">Zero-Debt Code</span>
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div className="relative z-10 pt-2 border-t border-white/[0.06]">
        <h3 className="text-[1.05rem] font-medium text-white/90 leading-snug">
          I deliver on time, communicate clearly, and ensure smooth progress.
        </h3>
        <div className="mt-2.5 flex flex-wrap gap-2 text-[10px] text-white/50">
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
            Clear Async Updates
          </span>
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
            Clean Architecture
          </span>
        </div>
      </div>
    </div>
  );
};
