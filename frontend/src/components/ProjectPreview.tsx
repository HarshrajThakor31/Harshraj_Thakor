import React, { useState, useEffect, useRef, useCallback } from "react";
import { Lock, ExternalLink, RefreshCw, MousePointer } from "lucide-react";

export interface ProjectPreviewProps {
  title: string;
  liveUrl: string;
  image: string;
  forceImage?: boolean;
}

export type PreviewStatus = "idle" | "loading" | "loaded" | "failed";

export const ProjectPreview: React.FC<ProjectPreviewProps> = ({
  title,
  liveUrl,
  image,
  forceImage = false,
}) => {
  const isEligibleForLive = !forceImage && Boolean(liveUrl) && liveUrl !== "#" && !liveUrl.includes(".demo");

  const [inView, setInView] = useState<boolean>(false);
  const [status, setStatus] = useState<PreviewStatus>(() => (isEligibleForLive ? "idle" : "failed"));
  const [scale, setScale] = useState<number>(0.3);
  const [isInteractive, setIsInteractive] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Extract clean domain for the browser address bar
  const getDomain = (url: string): string => {
    if (!url || url === "#") return "preview.internal";
    try {
      const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
      return parsed.hostname.replace(/^www\./, "");
    } catch {
      return url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] || url;
    }
  };

  // IntersectionObserver: start loading live preview when card approaches viewport
  useEffect(() => {
    if (inView) return;
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      if (isEligibleForLive) setStatus("loading");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setInView(true);
          if (isEligibleForLive) {
            setStatus("loading");
          }
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
        rootMargin: "300px", // Preload early so live preview is ready when scrolled into view
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [inView, isEligibleForLive]);

  // ResizeObserver: compute transform scale for 1440x900 iframe based on container width
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const updateScale = () => {
      const width = el.clientWidth;
      if (width > 0) {
        setScale(width / 1440);
      }
    };

    updateScale();

    if (typeof ResizeObserver === "undefined") return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) {
          setScale(width / 1440);
        }
      }
    });

    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Graceful timeout: if remote site takes longer than 15s, fall back to screenshot quietly
  useEffect(() => {
    if (status !== "loading") return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setStatus((s) => (s === "loaded" ? s : "failed"));
    }, 15000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [status]);

  const handleIframeLoad = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setStatus("loaded");
  };

  const handleIframeError = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setStatus("failed");
  };

  const handleReload = useCallback(() => {
    setStatus("loading");
    setIframeKey((k) => k + 1);
  }, []);

  const domain = getDomain(liveUrl);

  return (
    <div
      ref={containerRef}
      className="group/preview relative w-full rounded-2xl bg-[#0f0f16] border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 ease-out hover:border-white/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] will-change-transform"
    >
      {/* Fake Browser Window Top Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0a0a10] border-b border-white/10 select-none relative z-20">
        {/* 3 Window Control Dots */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/90 border border-[#e0443e]/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/90 border border-[#dea123]/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/90 border border-[#1aab29]/40" />
        </div>

        {/* Small Address Bar with Site Domain & Live Indicator */}
        <div className="flex-1 flex justify-center px-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-mono text-white/60 max-w-[200px] sm:max-w-[260px] truncate shadow-inner">
            <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
            <span className="truncate tracking-wide">{domain}</span>
          </div>
        </div>

        {/* Status indicator & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {isEligibleForLive && (
            <div className="flex items-center gap-1.5">
              {status === "loaded" ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live</span>
                </span>
              ) : status === "loading" ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-spin" />
                  <span>Connecting</span>
                </span>
              ) : null}

              {status === "loaded" && (
                <button
                  type="button"
                  onClick={handleReload}
                  title="Reload live preview"
                  className="p-1 rounded text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded text-white/40 hover:text-white transition-colors cursor-pointer"
            title={`Open ${liveUrl} in new tab`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Viewport container with 16/10 Aspect Ratio */}
      <div
        ref={viewportRef}
        className="relative w-full aspect-[16/10] overflow-hidden bg-[#0a0a0f]"
      >
        {/* Placeholder / Fallback Screenshot: Always present to guarantee zero blank flicker */}
        <img
          src={image}
          alt={`${title} website preview`}
          loading="lazy"
          decoding="async"
          width="1440"
          height="900"
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${
            status === "loaded" ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />

        {/* Live Site Iframe (rendered at 1440x900 and hardware scaled) */}
        {isEligibleForLive && inView && (status === "loading" || status === "loaded") && (
          <iframe
            key={iframeKey}
            src={liveUrl}
            title={`${title} live website preview`}
            loading="lazy"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            className={`absolute top-0 left-0 border-0 transition-opacity duration-700 ${
              status === "loaded" ? "opacity-100" : "opacity-0"
            } ${isInteractive ? "pointer-events-auto" : "pointer-events-none"}`}
            style={{
              width: "1440px",
              height: "900px",
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          />
        )}

        {/* Floating Toggle: Allow interaction or click-through to site */}
        {status === "loaded" && (
          <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => setIsInteractive((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold backdrop-blur-md border shadow-lg transition-all cursor-pointer ${
                isInteractive
                  ? "bg-blue-600 text-white border-blue-400/50 shadow-blue-500/20"
                  : "bg-black/75 hover:bg-black/90 text-white/80 hover:text-white border-white/15"
              }`}
              title={
                isInteractive
                  ? "Interaction enabled. Click to disable iframe capturing scroll."
                  : "Click to interact with the live website inside this window."
              }
            >
              <MousePointer className="w-3 h-3" />
              <span>{isInteractive ? "Interacting (Active)" : "Click to Interact"}</span>
            </button>
          </div>
        )}

        {/* Click Overlay (active when not in direct interaction mode so page scroll works normally) */}
        {!isInteractive && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10 cursor-pointer"
            aria-label={`Open ${title} live website in a new tab`}
            title={`Open ${title} live website (${liveUrl})`}
          />
        )}
      </div>
    </div>
  );
};
