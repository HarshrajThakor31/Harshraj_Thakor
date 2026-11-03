import { motion } from "framer-motion";
import { ArrowRight, Code2, ExternalLink } from "lucide-react";
import { ProjectPreview } from "./ProjectPreview";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  tags: string[];
  gradient: string;
  border: string;
  badgeColor: string;
  link: string;
  liveUrl: string;
  image: string;
  forceImage?: boolean;
}

const projects: Project[] = [
  {
    title: "Crevio",
    subtitle: "Contract Execution & Influencer Marketing Platform",
    description: "End-to-end contract automation and campaign marketplace connecting brands and creators with cryptographic immutability, automated decision verification, and real-time negotiations.",
    bullets: [
      "Designed a multi-stage contract lifecycle pipeline (Pending → Locked → Executed) with automated PDF term extraction, dual brand/creator e-signatures, and SHA-256 cryptographic terms hashing for immutability.",
      "Engineered an automated decision engine to evaluate deliverable verification status, deadline compliance, and FTC disclosure rules (#ad / #sponsor), generating confidence scores and blocker reason traces.",
      "Developed a Brand-Creator Campaign Marketplace allowing brands to publish multi-platform campaigns and creators to submit targeted pitches, deliverable proposals, and portfolio proofs.",
      "Implemented a 4-axis Creator Fit Scoring system (engagement_quality, content_quality, audience_fit, reliability) to evaluate application fit and streamline terms negotiations.",
      "Applied clean RESTful API design patterns and relational PostgreSQL migrations (Neon DB) with real-time Socket.IO event notifications to ensure system scalability and data integrity."
    ],
    tags: ["React 18", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Socket.IO", "OpenAI API", "Neon DB"],
    gradient: "from-purple-600/25 via-indigo-600/15 to-pink-600/10",
    border: "border-purple-500/30",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    link: "https://www.crevio.co.in/",
    liveUrl: "https://www.crevio.co.in/",
    image: "/projects/crevio.svg",
    forceImage: false
  },
  {
    title: "TrainIntern",
    subtitle: "Full-Stack Internship Management Platform",
    description: "Production-ready 3-tier web platform orchestrating real-world internship assignments, automated student applications, task management, and secure payment processing.",
    bullets: [
      "Built a full-stack internship management platform using a 3-tier architecture with React.js, Node.js, Express.js, and PostgreSQL.",
      "Designed a responsive, component-based UI achieving high performance and accessible UX using React 18 and Tailwind CSS.",
      "Developed REST APIs to manage secure user logins, internship applications, and task assignments, adhering to DRY principles and strict schema validation.",
      "Implemented robust JWT authentication and input sanitization, safeguarding the system against common security vulnerabilities.",
      "Integrated Cashfree Payment Gateway for secure transaction processing and configured automated CI/CD deployment pipelines using GitHub Actions.",
      "Executed relational CRUD operations with custom exception handling and database indexing for snappy query response times."
    ],
    tags: ["React.js", "TypeScript", "Node.js", "PostgreSQL", "n8n", "CashFree", "Resend", "OpenAI API"],
    gradient: "from-blue-600/25 via-cyan-600/15 to-indigo-600/10",
    border: "border-blue-500/30",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    link: "https://trainintern.tech/",
    liveUrl: "https://trainintern.tech",
    image: "/projects/trainintern.png",
    forceImage: false
  },
  {
    title: "CandidateAI",
    subtitle: "AI-Powered Placement & Candidate Evaluation Platform",
    description: "Smart recruitment system performing NLP-driven resume screening, skill normalization, and intelligent candidate matching against over 2,000 job profiles.",
    bullets: [
      "Built a full-stack AI-powered placement platform featuring resume screening and candidate evaluation workflows.",
      "Designed a 3-tier architecture to integrate a custom NLP engine (spaCy) and OpenAI APIs, managing complex business logic for resume matching.",
      "Developed an automated backend pipeline for database operations, normalizing datasets of over 2,000 job roles, utilizing PostgreSQL for data management.",
      "Implemented skill extraction and resume parsing workflows, significantly enhancing candidate-role matching accuracy.",
      "Applied architectural design patterns to improve code maintainability, API reusability, and backend scalability."
    ],
    tags: ["React.js", "FastAPI", "PostgreSQL", "spaCy NLP", "OpenAI API", "Python"],
    gradient: "from-emerald-600/25 via-teal-600/15 to-blue-600/10",
    border: "border-emerald-500/30",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    link: "https://github.com/HarshrajThakor31",
    liveUrl: "https://candidateai.demo",
    image: "/projects/candidateai.png",
    forceImage: true
  }
];

export const FeaturedHighlights = () => {
  return (
    <section id="projects" className="py-20 relative z-10 max-w-5xl mx-auto px-4 content-auto">
      <div className="text-center mb-14">
        <span className="inline-block text-xs font-semibold text-cyan-300 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 uppercase tracking-wider mb-4 shadow-sm">
          Featured Engineering Projects
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight [text-shadow:_0_2px_16px_rgba(0,0,0,0.8)]">
          Polished{" "}
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-emerald-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            work &amp; platforms
          </span>
        </h2>
        <p className="text-slate-200 text-sm md:text-base max-w-xl mx-auto mt-3 font-normal [text-shadow:_0_1px_8px_rgba(0,0,0,0.8)]">
          Production-grade applications built with React 18, TypeScript, Node.js, FastAPI, PostgreSQL, and AI automation.
        </p>
      </div>

      <div className="space-y-10">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
            className={`group relative overflow-hidden rounded-[26px] bg-[#0c0c14] border ${project.border} p-6 sm:p-8 md:p-9 transition-all hover:border-white/30 hover:shadow-[0_0_35px_rgba(59,130,246,0.15)]`}
          >
            {/* Ambient Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 pointer-events-none group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
              {/* Left Column: Project details */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${project.badgeColor}`}>
                    {project.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>

                <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>

                {/* Bullets List */}
                <div className="space-y-2 pt-1 border-t border-white/10">
                  {project.bullets.slice(0, 3).map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium text-white/75 bg-white/5 border border-white/10 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  {project.liveUrl && !project.forceImage && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg bg-white text-black hover:bg-white/90 transition-transform hover:scale-[1.02] shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}

                  <a
                    href="https://github.com/HarshrajThakor31"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs sm:text-sm font-medium px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-white/15 transition-all"
                  >
                    <Code2 className="w-4 h-4 text-white/70" /> Source &amp; Architecture
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Browser Window Mockup */}
              <div className="w-full lg:w-1/2">
                <ProjectPreview
                  title={project.title}
                  liveUrl={project.liveUrl}
                  image={project.image}
                  forceImage={project.forceImage}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-14 text-center">
        <a
          href="https://github.com/HarshrajThakor31"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors group px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
        >
          <span>Explore All Repositories on GitHub</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
};
