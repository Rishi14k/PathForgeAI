const SkillOrbitBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* 🌌 Cosmic Base Gradient */}
      <div className="absolute inset-0 bg-[#05010a]" />

      {/* 🔮 Massive Purple Energy Core */}
      <div className="absolute left-1/2 top-1/2 
        w-[180vw] h-[180vh]
        -translate-x-1/2 -translate-y-1/2
        bg-[radial-gradient(circle_at_center,#7c3aed33_0%,#4c1d9533_20%,transparent_60%)]
        blur-3xl animate-pulse"
      />

      {/* 🌀 Orbit Energy Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[1400px] h-[1400px] rounded-full border border-purple-500/10 animate-[spin_120s_linear_infinite]" />
        <div className="absolute w-[1000px] h-[1000px] rounded-full border border-purple-400/10 animate-[spin_90s_linear_infinite_reverse]" />
        <div className="absolute w-[700px] h-[700px] rounded-full border border-purple-300/10 animate-[spin_60s_linear_infinite]" />
      </div>

      {/* ✨ Floating Nebula Lights */}
      <div className="absolute inset-0">
        <div className="absolute top-[20%] left-[15%] w-[400px] h-[400px] bg-purple-600/20 blur-[160px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-fuchsia-500/20 blur-[140px] animate-pulse" />
        <div className="absolute top-[60%] left-[60%] w-[300px] h-[300px] bg-violet-500/20 blur-[140px] animate-pulse" />
      </div>

      {/* 🌐 Infinite Orbit Grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #9333ea 1px, transparent 1px),
            linear-gradient(to bottom, #9333ea 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: "perspective(1000px) rotateX(65deg) scale(1.6)",
          maskImage:
            "radial-gradient(circle at center, black 40%, transparent 85%)",
        }}
      />

      {/* 🌌 Legendary Grain Noise */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] mix-blend-overlay">
        <filter id="legendNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#legendNoise)" />
      </svg>

    </div>
  );
};

export default SkillOrbitBackground;