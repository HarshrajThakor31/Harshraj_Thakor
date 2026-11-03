import React, { useEffect } from "react";
import { X, Download, ExternalLink, FileText, CheckCircle2 } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resumePdfPath = "/resume/F_I_Resume.pdf";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Background click listener */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-5xl h-[92vh] flex flex-col bg-[#0d0d12] border border-white/15 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#12121c]/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold text-base sm:text-lg">Harshraj Thakor — Resume</h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Updated
                </span>
              </div>
              <p className="text-white/50 text-xs">B.Tech IT • Full Stack Developer (React, Node, PostgreSQL)</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <a
              href={resumePdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
              title="Open PDF in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Tab</span>
            </a>

            <a
              href={resumePdfPath}
              download="Harshraj_Thakor_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="flex-1 w-full bg-[#181822] relative overflow-hidden flex flex-col">
          <iframe
            src={`${resumePdfPath}#view=FitH`}
            title="Harshraj Thakor Resume"
            className="w-full h-full border-none"
          />

          {/* Fallback Banner for browsers that don't embed PDFs inline */}
          <div className="sm:hidden p-3 bg-black/60 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
            <span>Can't view PDF in your mobile browser?</span>
            <a
              href={resumePdfPath}
              download="Harshraj_Thakor_Resume.pdf"
              className="text-blue-400 font-medium underline"
            >
              Download File
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

