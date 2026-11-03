import { Code2, MonitorSmartphone, Server, Zap } from "lucide-react";

interface ServiceItem {
  number: string;
  icon: typeof Code2;
  title: string;
  description: string;
  tags: string[];
  accentColor: string;
  glowColor: string;
  borderColor: string;
}

const services: ServiceItem[] = [
  {
    number: "01",
    icon: Code2,
    title: "Full-Stack Development",
    description: "End-to-end web apps with strict TypeScript, clean architecture & maintainable patterns.",
    tags: ["React 18", "Node.js", "FastAPI"],
    accentColor: "text-cyan-400",
    glowColor: "from-cyan-500/10 via-transparent to-transparent",
    borderColor: "hover:border-cyan-500/30",
  },
  {
    number: "02",
    icon: MonitorSmartphone,
    title: "Interactive UI/UX",
    description: "Responsive, accessible interfaces with fluid 60fps micro-animations and polish.",
    tags: ["Framer Motion", "Tailwind CSS"],
    accentColor: "text-purple-400",
    glowColor: "from-purple-500/10 via-transparent to-transparent",
    borderColor: "hover:border-purple-500/30",
  },
  {
    number: "03",
    icon: Server,
    title: "API & Backend Arch",
    description: "Resilient RESTful microservices, real-time WebSockets, and secure JWT auth.",
    tags: ["PostgreSQL", "Socket.IO", "REST"],
    accentColor: "text-emerald-400",
    glowColor: "from-emerald-500/10 via-transparent to-transparent",
    borderColor: "hover:border-emerald-500/30",
  },
  {
    number: "04",
    icon: Zap,
    title: "Performance & Scale",
    description: "Sub-100ms database queries, automated pipelines, and zero-downtime deploys.",
    tags: ["Query Indexing", "Docker", "n8n"],
    accentColor: "text-amber-400",
    glowColor: "from-amber-500/10 via-transparent to-transparent",
    borderColor: "hover:border-amber-500/30",
  },
];

export const ServicesBox = () => {
  return (
    <div className="flex flex-col h-full justify-between p-4 sm:p-5 relative overflow-hidden group">
      {/* Ambient background glow */}
      <div className="absolute -top-10 right-1/3 w-72 h-36 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="p-1 rounded-md bg-white/[0.06] border border-white/10 text-white/70">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">
            Core Engineering Disciplines
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>Production-Ready Delivery Across Full Lifecycle</span>
        </div>
      </div>

      {/* 4 Services Grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.number}
              className={`group/card relative flex flex-col justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.07] ${service.borderColor} hover:bg-white/[0.04] transition-all duration-300 overflow-hidden`}
            >
              {/* Subtle card internal gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${service.glowColor} opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none`}
              />

              <div className="relative z-10">
                {/* Number & Icon Row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover/card:scale-105 transition-transform duration-300">
                    <Icon className={`w-3.5 h-3.5 ${service.accentColor}`} />
                  </div>
                  <span className="text-[10px] font-mono text-white/30 font-semibold">
                    {service.number}
                  </span>
                </div>

                <h4 className="text-xs font-semibold text-white/90 mb-1 group-hover/card:text-white transition-colors">
                  {service.title}
                </h4>

                <p className="text-[11px] text-white/50 leading-snug mb-2 line-clamp-2">
                  {service.description}
                </p>
              </div>

              {/* Tags */}
              <div className="relative z-10 pt-1.5 border-t border-white/[0.06] flex flex-wrap gap-1">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
