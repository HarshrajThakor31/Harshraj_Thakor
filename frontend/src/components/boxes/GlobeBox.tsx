import { useEffect, useRef, useState, useCallback } from "react";
import createGlobe from "cobe";
import { RotateCcw, Play, Pause } from "lucide-react";

interface LocationHub {
  id: string;
  label: string;
  city: string;
  country: string;
  coords: [number, number];
  phi: number;
  theta: number;
  timeZone: string;
  flag: string;
  utcOffset: string;
  availability: string;
}

// Spherical camera angles to center coordinates on the globe
const getCoordinatesAngles = (lat: number, lon: number): { phi: number; theta: number } => {
  const phi = ((1.5 * Math.PI - (lon * Math.PI) / 180) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  const theta = Math.max(-0.35, Math.min(0.35, ((lat * Math.PI) / 180) * 0.45));
  return { phi, theta };
};

const createHub = (
  id: string,
  label: string,
  city: string,
  country: string,
  coords: [number, number],
  timeZone: string,
  flag: string,
  utcOffset: string,
  availability: string
): LocationHub => {
  const { phi, theta } = getCoordinatesAngles(coords[0], coords[1]);
  return {
    id,
    label,
    city,
    country,
    coords,
    phi,
    theta,
    timeZone,
    flag,
    utcOffset,
    availability,
  };
};

const HUBS: Record<string, LocationHub> = {
  India: createHub(
    "India",
    "India",
    "Ahmedabad / HQ",
    "India",
    [23.0225, 72.5714],
    "Asia/Kolkata",
    "🇮🇳",
    "IST (UTC+5:30)",
    "Primary Base • Full Availability"
  ),
  "US-East": createHub(
    "US-East",
    "US East",
    "New York",
    "United States",
    [40.7128, -74.006],
    "America/New_York",
    "🇺🇸",
    "EDT (UTC-4)",
    "3–4 hrs daily direct afternoon overlap"
  ),
  "US-West": createHub(
    "US-West",
    "US West",
    "San Francisco",
    "United States",
    [37.7749, -122.4194],
    "America/Los_Angeles",
    "🇺🇸",
    "PDT (UTC-7)",
    "Flexible sync with Pacific tech teams"
  ),
  UK: createHub(
    "UK",
    "UK",
    "London",
    "United Kingdom",
    [51.5074, -0.1278],
    "Europe/London",
    "🇬🇧",
    "GMT (UTC+0)",
    "5+ hours daily direct overlap"
  ),
  Europe: createHub(
    "Europe",
    "Europe",
    "Milan / Berlin",
    "European Union",
    [45.4642, 9.19],
    "Europe/Rome",
    "🇪🇺",
    "CET (UTC+1)",
    "Seamless Central European alignment"
  ),
  Tokyo: createHub(
    "Tokyo",
    "Tokyo",
    "Tokyo / APAC",
    "Japan",
    [35.6762, 139.6503],
    "Asia/Tokyo",
    "🇯🇵",
    "JST (UTC+9)",
    "Full business day coverage & sync"
  ),
};

const CHIPS = ["India", "US-East", "US-West", "UK", "Europe", "Tokyo"];

const BASE_ARCS = [
  {
    id: "arc-uk",
    from: [23.0225, 72.5714] as [number, number],
    to: [51.5074, -0.1278] as [number, number],
    targetHubs: ["UK"],
  },
  {
    id: "arc-europe",
    from: [23.0225, 72.5714] as [number, number],
    to: [45.4642, 9.19] as [number, number],
    targetHubs: ["Europe"],
  },
  {
    id: "arc-us-east",
    from: [23.0225, 72.5714] as [number, number],
    to: [40.7128, -74.006] as [number, number],
    targetHubs: ["US-East"],
  },
  {
    id: "arc-us-west",
    from: [23.0225, 72.5714] as [number, number],
    to: [37.7749, -122.4194] as [number, number],
    targetHubs: ["US-West"],
  },
  {
    id: "arc-transatlantic",
    from: [51.5074, -0.1278] as [number, number],
    to: [40.7128, -74.006] as [number, number],
    targetHubs: ["UK", "US-East"],
  },
  {
    id: "arc-tokyo",
    from: [23.0225, 72.5714] as [number, number],
    to: [35.6762, 139.6503] as [number, number],
    targetHubs: ["Tokyo"],
  },
];

const BASE_MARKERS = [
  { id: "India", location: [23.0225, 72.5714] as [number, number], baseSize: 0.08, isHome: true },
  { id: "US-East", location: [40.7128, -74.006] as [number, number], baseSize: 0.05, isHome: false },
  { id: "US-West", location: [37.7749, -122.4194] as [number, number], baseSize: 0.05, isHome: false },
  { id: "UK", location: [51.5074, -0.1278] as [number, number], baseSize: 0.045, isHome: false },
  { id: "Europe", location: [45.4642, 9.19] as [number, number], baseSize: 0.045, isHome: false },
  { id: "Tokyo", location: [35.6762, 139.6503] as [number, number], baseSize: 0.045, isHome: false },
];

const getDynamicMarkers = (selectedHub: string) => {
  return BASE_MARKERS.map((m) => {
    const isSelected = selectedHub === m.id;
    if (m.isHome) {
      return {
        location: m.location,
        size: isSelected ? 0.095 : 0.08,
        color: (isSelected ? [0.35, 0.95, 1.0] : [0.25, 0.85, 1.0]) as [number, number, number],
        id: m.id,
      };
    }

    return {
      location: m.location,
      size: isSelected ? m.baseSize * 1.45 : m.baseSize,
      color: (isSelected ? [0.4, 0.95, 1.0] : [0.22, 0.48, 0.8]) as [number, number, number],
      id: m.id,
    };
  });
};

const getDynamicArcs = (selectedHub: string) => {
  const isIndia = selectedHub === "India";
  return BASE_ARCS.map((arc) => {
    const isArcActive = isIndia || arc.targetHubs.includes(selectedHub);
    const color: [number, number, number] = isArcActive
      ? [0.35, 0.85, 1.0]
      : [0.14, 0.3, 0.55];

    return {
      from: arc.from,
      to: arc.to,
      color,
      id: arc.id,
    };
  });
};

export const GlobeBox = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);

  const [activeHubKey, setActiveHubKey] = useState<string>("India");
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [liveTime, setLiveTime] = useState<string>("");

  // Animation & interactive physics state
  const phiRef = useRef<number>(HUBS["India"].phi);
  const thetaRef = useRef<number>(HUBS["India"].theta);
  const targetPhiRef = useRef<number | null>(null);
  const targetThetaRef = useRef<number | null>(null);

  const isDraggingRef = useRef<boolean>(false);
  const lastPointerPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const autoRotateRef = useRef<boolean>(true);
  const activeHubRef = useRef<string>("India");
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    autoRotateRef.current = isAutoRotate;
  }, [isAutoRotate]);

  useEffect(() => {
    activeHubRef.current = activeHubKey;
    if (globeRef.current) {
      globeRef.current.update({
        markers: getDynamicMarkers(activeHubKey),
        arcs: getDynamicArcs(activeHubKey),
      });
    }
  }, [activeHubKey]);

  // Live clock ticker
  useEffect(() => {
    const updateTime = () => {
      const hub = HUBS[activeHubKey] || HUBS["India"];
      try {
        const timeStr = new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: hub.timeZone,
        }).format(new Date());
        setLiveTime(timeStr);
      } catch {
        setLiveTime("");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [activeHubKey]);

  // Focus on specific hub with snappy transition
  const handleSelectHub = useCallback((key: string) => {
    setActiveHubKey(key);
    const hub = HUBS[key];
    if (hub) {
      targetPhiRef.current = hub.phi;
      targetThetaRef.current = hub.theta;
      velocityRef.current = { x: 0, y: 0 };
    }
  }, []);

  // Reset to India
  const handleResetToIndia = useCallback(() => {
    handleSelectHub("India");
    setIsAutoRotate(true);
  }, [handleSelectHub]);

  // Toggle rotation
  const handleToggleAutoRotate = useCallback(() => {
    setIsAutoRotate((prev) => !prev);
  }, []);

  // IntersectionObserver: Pause render loop when off-screen to save CPU/GPU during scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisibleRef.current = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05, rootMargin: "150px" }
    );

    observer.observe(container);

    const handleVisibility = () => {
      if (document.hidden) {
        isVisibleRef.current = false;
      } else if (container) {
        const rect = container.getBoundingClientRect();
        isVisibleRef.current = rect.bottom > -100 && rect.top < window.innerHeight + 100;
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // WebGL Cobe Canvas Setup & Render Loop
  useEffect(() => {
    if (!canvasRef.current) return;

    const width = 560;
    const height = 560;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
      width,
      height,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: 1,
      diffuse: 1.25,
      mapSamples: 12000, // Optimized from 16000 for 25% faster frame processing
      mapBrightness: 6,
      mapBaseBrightness: 0.05,
      baseColor: [0.1, 0.12, 0.18],
      markerColor: [0.2, 0.65, 1],
      glowColor: [0.1, 0.3, 0.7],
      arcColor: [0.25, 0.65, 1],
      arcWidth: 0.85,
      arcHeight: 0.35,
      markerElevation: 0.03,
      scale: 1.05,
      offset: [0, 0],
      markers: getDynamicMarkers(activeHubRef.current),
      arcs: getDynamicArcs(activeHubRef.current),
    });

    globeRef.current = globe;

    let animationFrameId: number;
    const startTime = performance.now();

    const render = () => {
      // If offscreen or tab hidden, skip render work entirely
      if (!isVisibleRef.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const now = performance.now();
      const elapsed = (now - startTime) * 0.001;

      // Pointer Dragging vs Target Lerping vs Auto-Rotation
      if (isDraggingRef.current) {
        targetPhiRef.current = null;
        targetThetaRef.current = null;
      } else if (targetPhiRef.current !== null) {
        const targetPhi = targetPhiRef.current;
        let diff = (targetPhi - phiRef.current) % (Math.PI * 2);
        if (diff > Math.PI) diff -= Math.PI * 2;
        if (diff < -Math.PI) diff += Math.PI * 2;

        phiRef.current += diff * 0.11; // Snappier interpolation

        if (targetThetaRef.current !== null) {
          thetaRef.current += (targetThetaRef.current - thetaRef.current) * 0.11;
        }

        if (Math.abs(diff) < 0.002) {
          phiRef.current = targetPhi;
          targetPhiRef.current = null;
          targetThetaRef.current = null;
        }
      } else {
        if (Math.abs(velocityRef.current.x) > 0.0001) {
          phiRef.current += velocityRef.current.x;
          velocityRef.current.x *= 0.94;
        } else if (autoRotateRef.current) {
          phiRef.current += 0.004; // Smooth rotation
        }

        if (Math.abs(velocityRef.current.y) > 0.0001) {
          thetaRef.current += velocityRef.current.y;
          velocityRef.current.y *= 0.94;
        } else {
          const targetTilt = 0.18 + 0.03 * Math.sin(elapsed * 0.8);
          thetaRef.current += (targetTilt - thetaRef.current) * 0.03;
        }
      }

      thetaRef.current = Math.max(-0.45, Math.min(0.45, thetaRef.current));

      globe.update({
        phi: phiRef.current,
        theta: thetaRef.current,
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      globe.destroy();
      globeRef.current = null;
    };
  }, []);

  // Pointer drag interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
    targetPhiRef.current = null;
    targetThetaRef.current = null;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastPointerPos.current.x;
    const deltaY = e.clientY - lastPointerPos.current.y;

    const dragSensitivity = 0.0055;
    phiRef.current += deltaX * dragSensitivity;
    thetaRef.current += deltaY * dragSensitivity;

    velocityRef.current = {
      x: deltaX * dragSensitivity,
      y: deltaY * dragSensitivity,
    };

    lastPointerPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {
        // pointer capture fallback
      }
    }
  };

  const currentHub = HUBS[activeHubKey] || HUBS["India"];

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full relative overflow-hidden p-5 sm:p-6 md:p-8 select-none"
    >
      {/* Background atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[480px] h-[360px] bg-gradient-to-t from-blue-600/20 via-blue-500/10 to-transparent blur-[80px] rounded-full" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-cyan-500/10 blur-[90px] rounded-full" />
      </div>

      {/* Header Info */}
      <div className="relative z-10 space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Global Collaboration
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleToggleAutoRotate}
              title={isAutoRotate ? "Pause auto-rotation" : "Resume auto-rotation"}
              className="p-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-white/50 hover:text-white transition-colors border border-white/5 cursor-pointer"
            >
              {isAutoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleResetToIndia}
              title="Reset view to India (HQ)"
              className="p-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-white/50 hover:text-white transition-colors border border-white/5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-serif italic text-white/95 leading-snug">
          I'm very flexible with time <br /> zone communications
        </h3>

        {/* Time Zone Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CHIPS.map((hubKey) => {
            const hub = HUBS[hubKey];
            const isSelected = activeHubKey === hubKey;
            return (
              <button
                key={hubKey}
                onClick={() => handleSelectHub(hubKey)}
                className={`text-xs px-2.5 py-1 rounded-md transition-all duration-200 font-medium cursor-pointer ${
                  isSelected
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.35)] scale-[1.03]"
                    : "bg-[#141414] text-white/50 border border-white/5 hover:text-white/90 hover:bg-white/[0.06]"
                }`}
              >
                {hub?.label || hubKey}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Cobe Globe Canvas Area */}
      <div
        className="absolute -bottom-20 sm:-bottom-24 md:-bottom-24 left-1/2 -translate-x-1/2 w-[320px] h-[320px] xs:w-[380px] xs:h-[380px] sm:w-[460px] sm:h-[460px] md:w-[520px] md:h-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y will-change-transform"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            aspectRatio: "1",
            objectFit: "contain",
          }}
          className="opacity-95 mix-blend-screen transition-opacity duration-300"
        />
      </div>

      {/* Live Local Time & Availability Readout Banner */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-[360px] pointer-events-none">
        <div className="flex flex-col gap-1.5 px-3.5 py-2 rounded-xl bg-black/80 border border-white/15 backdrop-blur-md shadow-2xl">
          {/* Top Row: Flag, City, Live Clock, and UTC badge */}
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 font-mono text-xs text-white/90 truncate">
              <span className="text-sm shrink-0">{currentHub.flag}</span>
              <span className="font-semibold text-white truncate">{currentHub.city}</span>
              <span className="text-white/40 shrink-0">•</span>
              <strong className="text-blue-400 font-semibold shrink-0">{liveTime || "--:--:--"}</strong>
            </div>
            <span className="text-[10px] text-blue-400 font-mono px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 whitespace-nowrap shrink-0">
              {currentHub.utcOffset}
            </span>
          </div>

          {/* Bottom Row: Active Availability Status */}
          <div className="flex items-center gap-1.5 text-[11px] text-white/70 font-sans border-t border-white/10 pt-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
            <span className="truncate text-white/80 font-medium">{currentHub.availability}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
