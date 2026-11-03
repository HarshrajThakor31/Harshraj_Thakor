import { Terminal, GitBranch, CheckCircle2, ArrowUpRight, Cpu } from "lucide-react";

export const WorkspaceBox = () => {
  return (
    <div className="flex flex-col h-full justify-between p-4 sm:p-5 relative overflow-hidden group">
      {/* Background subtle glow */}
      <div className="absolute top-0 right-10 w-64 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/15 transition-all duration-700" />
      <div className="absolute -bottom-6 left-1/4 w-48 h-20 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Terminal Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          {/* Mac Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/70" />
            <span className="w-2 h-2 rounded-full bg-amber-500/70" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/50">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>workspace://active-sprint</span>
          </div>
        </div>

        {/* Live status indicators */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[9.5px] font-mono text-white/60">
            <GitBranch className="w-2.5 h-2.5 text-cyan-400" />
            <span>main</span>
          </div>

          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9.5px] font-mono text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active Sprint</span>
          </div>
        </div>
      </div>

      {/* Main Dev Status */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 my-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
              Current Engineering Focus:
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-white/95 mt-0.5">
            Building <strong className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 font-bold">Crevio</strong> — Contract Lifecycle &amp; Automated Decision Engine
          </p>
          <p className="text-[11px] text-white/55 mt-0.5 max-w-xl leading-relaxed">
            Integrating SHA-256 PDF cryptographic terms immutability, automated deliverable compliance scoring, and real-time Socket.IO brand negotiations.
          </p>
        </div>

        {/* Action Link to Project */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://www.crevio.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-xs font-semibold transition-all shadow-sm hover:scale-105"
          >
            <span>Crevio Live</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
          </a>
        </div>
      </div>

      {/* Telemetry Footer */}
      <div className="relative z-10 pt-2 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-[9.5px] font-mono text-white/40">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Build: Passing</span>
          </span>
          <span>•</span>
          <span>TypeScript: Strict</span>
          <span>•</span>
          <span>Neon PostgreSQL</span>
        </div>

        <div className="flex items-center gap-1 text-cyan-400/70">
          <Cpu className="w-3 h-3" />
          <span>Automated Verification Pipeline</span>
        </div>
      </div>
    </div>
  );
};
