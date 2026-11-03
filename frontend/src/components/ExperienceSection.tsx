import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, Calendar, MapPin, CheckCircle2, ChevronRight, Target } from "lucide-react";

export const ExperienceSection = ({ onOpenResume }: { onOpenResume?: () => void }) => {
  const experiences = [
    {
      role: "Web Design and Development Intern",
      company: "iStudio",
      location: "Remote",
      period: "Mar 2025 – Sep 2025",
      type: "Internship",
      points: [
        "Completed structured training in web design and development, focusing on modern frontend concepts and responsive design principles.",
        "Designed and developed a responsive e-commerce website using HTML, CSS, JavaScript, and best UI/UX practices.",
        "Performed testing, debugging, and application optimization to enhance usability and responsiveness, applying Agile methodologies throughout the process.",
        "Utilized Git and GitHub for version control, ensuring collaborative development and code management while documenting technical solutions."
      ],
      skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX", "Git", "GitHub", "Agile"]
    }
  ];

  const educations = [
    {
      degree: "B.Tech in Information Technology",
      institution: "Parul University",
      period: "2023 – 2027",
      score: "CGPA: 7/10.0",
      status: "Currently Pursuing",
      highlights: "Core focus on Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, and Web Engineering."
    },
    {
      degree: "SSC (X) & HSC (XII) - Higher Secondary",
      institution: "Vidyamangal Residential School",
      period: "2020 – 2022",
      score: "SSC: 72.00% | HSC: 63.23%",
      status: "Completed",
      highlights: "Strong foundational education in Mathematics, Computer Science, and Science fundamentals."
    }
  ];

  const certifications = [
    {
      title: "Full Stack Web Development",
      issuer: "Delta - Apna College",
      category: "Full Stack Development"
    },
    {
      title: "DSA with Java",
      issuer: "Alpha - Apna College",
      category: "Algorithms & Data Structures"
    },
    {
      title: "Python Programming",
      issuer: "Kodacy",
      category: "Programming & Scripting"
    },
    {
      title: "Generative AI",
      issuer: "Kodacy",
      category: "AI & Prompt Engineering"
    }
  ];

  return (
    <section id="experience" className="py-14 sm:py-20 relative z-10 max-w-5xl mx-auto px-4 border-t border-white/5 content-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
        <div>
          <span className="inline-block text-xs font-semibold text-white/90 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 uppercase tracking-wider mb-3 shadow-sm">
            Journey &amp; Track Record
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white tracking-tight [text-shadow:_0_2px_16px_rgba(0,0,0,0.8)]">
            Experience &amp;{" "}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-emerald-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Education
            </span>
          </h2>
        </div>

        {onOpenResume && (
          <button
            onClick={onOpenResume}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-transform hover:scale-105 shadow-xl shadow-black/40 cursor-pointer"
          >
            <span>View Full Resume</span>
            <ChevronRight className="w-4 h-4 text-cyan-300" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Work Experience (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2.5 text-white/90 font-medium text-lg border-b border-white/10 pb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <span>Work Experience</span>
          </div>

          <div className="space-y-5">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative rounded-2xl bg-[#0a0a10] border border-white/10 p-5 sm:p-6 md:p-8 hover:border-blue-500/30 transition-all group will-change-transform"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full pointer-events-none group-hover:bg-blue-500/10 transition-all" />

                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {exp.role}
                    </h4>
                    <p className="text-base font-medium text-blue-400 mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 border border-blue-500/20 text-blue-300">
                    {exp.type}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-white/50 mb-5">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-white/40" />
                    {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-white/40" />
                    {exp.location}
                  </span>
                </div>

                <ul className="space-y-2.5 mb-5">
                  {exp.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-white/70 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[11px] font-medium text-white/60 bg-white/5 border border-white/10 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Extracurricular Leadership Card */}
          <div className="rounded-2xl bg-[#0a0a10] border border-white/10 p-4 sm:p-5 md:p-6">
            <div className="flex items-center gap-2.5 mb-2">
              <Award className="w-4 h-4 text-purple-400" />
              <h4 className="text-white font-semibold text-base">Leadership &amp; Extracurricular</h4>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              <strong className="text-white font-medium">RC Car Engineering Project Lead:</strong> Led an engineering team coordinating mechanical design, parts assembly, telemetry wiring, and end-to-end execution activities.
            </p>
          </div>

          {/* IMPACT Placement Training Card */}
          <div className="rounded-2xl bg-[#0a0a10] border border-white/10 p-4 sm:p-5 md:p-6 hover:border-cyan-500/30 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5">
                <Target className="w-4 h-4 text-cyan-400" />
                <h4 className="text-white font-semibold text-base">IMPACT Placement Training</h4>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
                Parul University
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Successfully completed Parul University's <strong className="text-white font-medium">IMPACT Placement Training</strong>, developing skills in aptitude, logical reasoning, communication, problem-solving, interview preparation, and professional development to strengthen employability and enhance campus placement readiness.
            </p>
          </div>
        </div>

        {/* Right Column: Education & Certifications (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2.5 text-white/90 font-medium text-lg border-b border-white/10 pb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span>Education</span>
          </div>

          <div className="space-y-4">
            {educations.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
                className="rounded-2xl bg-[#0a0a10] border border-white/10 p-4 sm:p-5 hover:border-purple-500/30 transition-all will-change-transform"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                  <h4 className="text-base font-semibold text-white leading-snug">
                    {edu.degree}
                  </h4>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0">
                    {edu.score}
                  </span>
                </div>

                <p className="text-sm font-medium text-purple-400 mb-1.5">
                  {edu.institution}
                </p>

                <div className="flex items-center justify-between text-xs text-white/40 mb-2.5">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {edu.period}
                  </span>
                  <span className="text-white/60">{edu.status}</span>
                </div>

                <p className="text-xs text-white/60 leading-relaxed border-t border-white/5 pt-2.5">
                  {edu.highlights}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2.5 text-white/90 font-medium text-lg border-b border-white/10 pb-4 pt-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span>Certifications</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="rounded-xl bg-[#0e0e16] border border-white/10 p-3 sm:p-3.5 flex items-center justify-between gap-2 hover:border-white/20 transition-all group"
              >
                <div>
                  <h5 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {cert.title}
                  </h5>
                  <p className="text-xs text-emerald-400/90 font-medium mt-0.5">
                    {cert.issuer}
                  </p>
                </div>
                <span className="text-[10px] uppercase font-mono text-white/40 tracking-wider">
                  Verified
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
