import { useEffect, useRef, useState } from "react";

// WebGL Vertex Shader (Fullscreen Quad)
const VERTEX_SHADER = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// WebGL Fragment Shader:
// - Continuous fluid blend: dark purple, electric indigo, vibrant neon violet, bright deep blue
// - Subtle diagonal linear streak texture (distorted blinds / reeded glass refraction)
// - Raycast aesthetic: dark mode UI backdrop, cinematic lighting, soft grain texture
// - Seamless, ultra-smooth motion
const FRAGMENT_SHADER = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_opacity;

  // 2D rotation
  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  // Fast pseudo-random hash for film grain
  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    // Aspect-ratio corrected coordinate space centered at origin
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    // Subtle responsive mouse influence
    vec2 mouseNorm = (u_mouse * 2.0 - 1.0);
    p += mouseNorm * 0.06;

    // Time scaling for continuous, slow, hypnotic fluid motion
    float t = u_time * 0.16;

    // Fluid Domain Warping
    // Octave 1: Primary flow field
    vec2 q = vec2(
      sin(p.y * 1.35 + t * 0.72) + cos(p.x * 1.15 - t * 0.54),
      cos(p.x * 1.42 + t * 0.65) - sin(p.y * 1.25 + t * 0.81)
    );

    // Octave 2: Secondary fluid warping
    vec2 r = vec2(
      sin(q.y * 1.85 + t * 0.48 + p.x * 0.75),
      cos(q.x * 1.85 - t * 0.52 + p.y * 0.75)
    );

    // Octave 3: Micro fluid curl
    float fluidField = sin(p.x * 1.25 + r.x * 2.15 + t * 0.62) * 
                       cos(p.y * 1.25 + r.y * 2.15 - t * 0.45);

    // Color Palette Specification
    vec3 cObsidian       = vec3(0.020, 0.012, 0.040); // #05030a Deep void backdrop
    vec3 cDarkPurple     = vec3(0.125, 0.035, 0.235); // #20093c Rich dark purple
    vec3 cElectricIndigo = vec3(0.245, 0.085, 0.785); // #3f16c8 Electric indigo
    vec3 cNeonViolet     = vec3(0.640, 0.160, 0.945); // #a329f1 Vibrant neon violet
    vec3 cDeepBlue       = vec3(0.080, 0.360, 0.950); // #145cf2 Bright deep blue
    vec3 cCyanGleam      = vec3(0.180, 0.720, 0.980); // #2eb8fa Reeded glass glint accent

    // Fluid Mixing Functions
    float mix1 = smoothstep(-0.85, 0.90, q.x + r.y * 0.45);
    float mix2 = smoothstep(-0.75, 0.85, r.x - q.y * 0.55);
    float mix3 = smoothstep(-0.60, 1.05, fluidField);

    // Layered fluid composition
    vec3 fluidColor = mix(cObsidian, cDarkPurple, smoothstep(-1.2, 0.4, p.y + q.y * 0.5));
    fluidColor = mix(fluidColor, cElectricIndigo, mix1 * 0.82);
    fluidColor = mix(fluidColor, cDeepBlue, mix2 * 0.76);
    fluidColor = mix(fluidColor, cNeonViolet, mix3 * 0.88);

    // Subtle Diagonal Linear Streak Texture
    float angle = -0.60;
    mat2 rot = rotate2d(angle);
    vec2 rotP = rot * p;

    float streakDistortion = (r.x * 0.15 + q.y * 0.12 + fluidField * 0.08);
    float streakCoord = (rotP.x + streakDistortion) * 28.0;

    float flutePhase = fract(streakCoord);
    float caustic = pow(sin(flutePhase * 3.14159265), 5.5);
    float causticSoft = pow(sin(flutePhase * 3.14159265), 2.2) * 0.32;
    float microBlinds = sin(streakCoord * 2.0 + t * 0.28) * 0.5 + 0.5;

    float combinedStreaks = (caustic * 0.68 + causticSoft * 0.32 + microBlinds * 0.14);

    vec3 streakColor = mix(cElectricIndigo, cNeonViolet, mix3);
    streakColor = mix(streakColor, cCyanGleam, caustic * 0.48);

    fluidColor += streakColor * combinedStreaks * 0.36;

    // Cinematic Lighting: Soft top-center key illumination
    vec2 lightCenter = vec2(0.0, 0.60) + mouseNorm * 0.08;
    float spotlight = max(0.0, 1.0 - length(p - lightCenter) * 0.52);
    spotlight = smoothstep(0.0, 1.0, spotlight);
    fluidColor += (cNeonViolet * 0.14 + cDeepBlue * 0.12) * spotlight;

    // Subtle radial vignette
    float vignette = 1.0 - smoothstep(0.45, 1.55, length(p * vec2(0.85, 1.0)));
    fluidColor *= mix(0.70, 1.0, vignette);

    // Photographic tactile finish grain computed directly on GPU
    vec2 grainCoord = gl_FragCoord.xy + fract(u_time * 0.07) * 1000.0;
    float grain = hash21(grainCoord);
    fluidColor += (grain - 0.5) * 0.038;

    fluidColor = clamp(fluidColor, 0.0, 1.0);

    gl_FragColor = vec4(fluidColor, u_opacity);
  }
`;

export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Try WebGL2 first, then fallback to WebGL with optimal power preferences
    const gl =
      canvas.getContext("webgl2", { alpha: false, antialias: false, powerPreference: "high-performance", desynchronized: true }) ||
      (canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "high-performance" }) as WebGLRenderingContext | null);

    if (!gl) {
      console.warn("WebGL not supported; falling back to CSS fluid background.");
      setWebglFailed(true);
      return;
    }

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

    if (!vertShader || !fragShader) {
      setWebglFailed(true);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setWebglFailed(true);
      return;
    }

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      setWebglFailed(true);
      return;
    }

    gl.useProgram(program);

    // Fullscreen quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uOpacity = gl.getUniformLocation(program, "u_opacity");

    let targetMouse = { x: 0.5, y: 0.5 };
    let currentMouse = { x: 0.5, y: 0.5 };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight,
      };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationFrameId: number;
    let startTime = performance.now();
    let isTabVisible = true;

    // Optimized DPR: 1.0 is silky smooth and reduces shader load by up to 50%
    const resize = () => {
      if (!canvas) return;
      const dpr = 1.0;
      const width = Math.floor(window.innerWidth * dpr);
      const height = Math.floor(window.innerHeight * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    window.addEventListener("resize", resize, { passive: true });
    resize();

    const handleVisibility = () => {
      isTabVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let opacity = 0;
    setIsLoaded(true);

    const render = (time: number) => {
      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;

      if (opacity < 1) {
        opacity = Math.min(1, opacity + 0.04);
      }

      const elapsed = (time - startTime) * 0.001;

      gl.useProgram(program);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uMouse, currentMouse.x, currentMouse.y);
      gl.uniform1f(uOpacity, opacity);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationFrameId);

      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none will-change-transform">
      {/* 1. Primary Motion WebGL Canvas */}
      {!webglFailed && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 transform-gpu ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ width: "100vw", height: "100vh", transform: "translateZ(0)" }}
        />
      )}

      {/* 2. CSS & SVG Fallback (if WebGL disabled) */}
      {webglFailed && (
        <div className="absolute inset-0 bg-[#06040d]">
          <div
            className="absolute -top-1/4 -left-1/4 w-[90vw] h-[90vh] rounded-full blur-[140px] opacity-70 animate-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(63,22,200,0.45) 0%, rgba(32,9,60,0.3) 60%, transparent 80%)",
              animationDuration: "12s",
            }}
          />
          <div
            className="absolute top-1/3 -right-1/4 w-[80vw] h-[80vh] rounded-full blur-[150px] opacity-60 animate-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(163,41,241,0.45) 0%, rgba(79,70,229,0.25) 50%, transparent 80%)",
              animationDuration: "16s",
              animationDelay: "3s",
            }}
          />
          <div
            className="absolute bottom-[-10%] left-1/3 w-[70vw] h-[70vh] rounded-full blur-[130px] opacity-65 animate-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(20,92,242,0.4) 0%, rgba(14,165,233,0.15) 50%, transparent 75%)",
              animationDuration: "14s",
              animationDelay: "7s",
            }}
          />
        </div>
      )}

      {/* 3. Physical Reeded Glass / Fluted Distortion Diagonal Streak Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.20] mix-blend-screen pointer-events-none transform-gpu"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -34deg,
            transparent,
            transparent 10px,
            rgba(163, 41, 241, 0.08) 11px,
            rgba(46, 184, 250, 0.16) 12px,
            rgba(255, 255, 255, 0.22) 12.5px,
            rgba(46, 184, 250, 0.14) 13px,
            transparent 14px,
            transparent 24px
          )`,
          transform: "translateZ(0)",
        }}
      />

      {/* 4. Fine Raycast Dot-Matrix Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPjxyZWN0IHdpZHRoPSI2IiBoZWlnaHQ9IjYiIGZpbGw9InRyYW5zcGFyZW50Ii8+PGNpcmNsZSBjeD0iMyIgY3k9IjMiIHI9IjAuNzUiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xMikiLz48L3N2Zz4=')] opacity-25" />

      {/* 5. Cinematic Radial Vignette & Edge Shadow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 85% at 50% 40%, transparent 45%, rgba(5, 3, 10, 0.65) 85%, #05030a 100%)",
        }}
      />
    </div>
  );
}
