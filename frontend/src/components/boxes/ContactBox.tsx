import { useState } from "react";
import { Send, Loader2, Mail, User, MessageSquare, Check, Copy, AlertCircle } from "lucide-react";

export const ContactBox = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topics = [
    "Full-Stack MVP",
    "API & Backend",
    "AI Workflow",
  ];

  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic);
    if (!formData.message || topics.some((topicName) => formData.message.startsWith(`Hi, I'd like to discuss a ${topicName}`))) {
      setFormData((prev) => ({
        ...prev,
        message: `Hi, I'd like to discuss a ${topic} project. `,
      }));
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("harshrajthakor31@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Dynamic API URL: uses VITE_API_URL if configured, otherwise falls back to /api/contact or localhost in dev
    const apiBase = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
    const endpoint = apiBase 
      ? `${apiBase}/api/contact` 
      : import.meta.env.DEV 
        ? "http://localhost:5000/api/contact" 
        : "/api/contact";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setSelectedTopic(null);
        setTimeout(() => setStatus("idle"), 3500);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  // Direct mailto fallback if network/backend is unreachable
  const directMailHref = `mailto:harshrajthakor31@gmail.com?subject=Project Inquiry from ${encodeURIComponent(
    formData.name || "Portfolio Visitor"
  )}&body=${encodeURIComponent(formData.message || "Hi Harshraj,")}`;

  return (
    <div className="flex flex-col h-full justify-between p-4 xs:p-5 sm:p-6 relative overflow-hidden group">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/3 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/15 transition-all duration-700" />
      <div className="absolute bottom-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-1.5">
        <div className="flex items-center gap-1.5">
          <span className="p-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Mail className="w-3.5 h-3.5" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white/50">
            Let's Collaborate
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for Roles</span>
        </div>
      </div>

      {/* Headline */}
      <div className="relative z-10 my-1.5">
        <h3 className="text-base sm:text-lg font-serif italic text-white/95 leading-snug">
          Let's work together <br className="hidden sm:block" />
          <span className="not-italic font-sans font-medium text-white/80 text-xs sm:text-sm">on your next project</span>
        </h3>
      </div>

      {/* Interactive Quick Topics */}
      <div className="relative z-10 flex flex-wrap gap-1.5 mb-2">
        {topics.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleSelectTopic(t)}
            className={`text-[9.5px] font-medium px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
              selectedTopic === t
                ? "bg-blue-500/20 text-blue-300 border-blue-400/40 shadow-[0_0_8px_rgba(59,130,246,0.3)]"
                : "bg-white/[0.03] text-white/60 border-white/[0.08] hover:border-white/20 hover:text-white"
            }`}
          >
            + {t}
          </button>
        ))}
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-2.5">
        <div className="relative">
          <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
          <input
            type="text"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-[#101018]/90 border border-white/10 rounded-lg pl-8 pr-2.5 py-2 text-base sm:text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/60 focus:bg-[#151522] transition-all"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-[#101018]/90 border border-white/10 rounded-lg pl-8 pr-2.5 py-2 text-base sm:text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/60 focus:bg-[#151522] transition-all"
          />
        </div>

        <div className="relative">
          <MessageSquare className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-white/40" />
          <textarea
            placeholder="Project Details..."
            required
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-[#101018]/90 border border-white/10 rounded-lg pl-8 pr-2.5 py-2 text-base sm:text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/60 focus:bg-[#151522] transition-all resize-none"
          />
        </div>

        {status === "error" ? (
          <div className="flex flex-col gap-1.5">
            <a
              href={directMailHref}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium shadow-md transition-all cursor-pointer"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Send via Email App Instead</span>
            </a>
          </div>
        ) : (
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-medium shadow-md shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Sending...</span>
              </>
            ) : status === "success" ? (
              <>
                <Check className="w-3 h-3 text-emerald-300" />
                <span>Message Sent!</span>
              </>
            ) : (
              <>
                <Send className="w-3 h-3" />
                <span>Send Message</span>
              </>
            )}
          </button>
        )}
      </form>

      {/* Direct email quick-copy footer */}
      <div className="relative z-10 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-white/50">
        <span className="font-mono truncate max-w-[150px]">harshrajthakor31@gmail.com</span>
        <button
          type="button"
          onClick={copyEmail}
          className="flex items-center gap-1 text-[10px] text-cyan-300 hover:text-cyan-200 transition-colors font-medium cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-2.5 h-2.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-2.5 h-2.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
