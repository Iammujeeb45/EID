import { useState, useEffect, useRef } from "react";

// ─── Crescent + Star SVG ─────────────────────────────────────────────────────
function CrescentMoon() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_30px_rgba(201,162,39,0.6)]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd95c" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="55" fill="url(#glow)" />
      <path d="M60 12 A48 48 0 1 1 60 108 A32 32 0 1 0 60 12Z" fill="#e8c96a" />
      <circle cx="84" cy="30" r="5" fill="#fff8dc" opacity="0.9" />
    </svg>
  );
}

// ─── Islamic geometric pattern tile ──────────────────────────────────────────
const PATTERN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30Z' fill='none' stroke='%23c9a22718' stroke-width='0.7'/%3E%3Cpath d='M30 15 L45 30 L30 45 L15 30Z' fill='none' stroke='%23c9a22714' stroke-width='0.5'/%3E%3C/svg%3E")`;
const GOAT_BG_IMAGE =
  "https://static.vecteezy.com/system/resources/previews/055/104/845/non_2x/cute-cartoon-goat-icon-design-ideal-for-kids-illustrations-and-digital-art-clip-art-png.png";

type GoatImageProps = {
  flip?: boolean;
  size?: number;
  opacity?: number;
  className?: string;
};

// ─── Shared goat PNG used across the page ────────────────────────────────────
function GoatImage({
  flip = false,
  size,
  opacity = 0.18,
  className = "",
}: GoatImageProps) {
  return (
    <img
      src={GOAT_BG_IMAGE}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={className}
      style={{
        width: size,
        height: size,
        opacity,
        transform: flip ? "scaleX(-1)" : "none",
        filter: "drop-shadow(0 4px 14px rgba(201,162,39,0.16))",
        objectFit: "contain",
      }}
    />
  );
}

// ─── Floating lantern ─────────────────────────────────────────────────────────
function Lantern({ delay = "0s", scale = 1 }) {
  return (
    <div
      className="flex flex-col items-center"
      style={{ animation: `sway 4s ease-in-out ${delay} infinite` }}
    >
      <div
        className="w-px bg-yellow-600 opacity-40"
        style={{ height: 56 * scale }}
      />
      <svg width={36 * scale} height={52 * scale} viewBox="0 0 36 52">
        <rect x="12" y="0" width="12" height="7" rx="3" fill="#c9a227" />
        <rect
          x="4"
          y="7"
          width="28"
          height="36"
          rx="9"
          fill="#c9a227"
          opacity="0.85"
        />
        <rect
          x="8"
          y="11"
          width="20"
          height="28"
          rx="7"
          fill="#ffd95c"
          opacity="0.45"
        />
        <rect
          x="11"
          y="43"
          width="14"
          height="9"
          rx="3"
          fill="#c9a227"
          opacity="0.7"
        />
        <line
          x1="18"
          y1="50"
          x2="18"
          y2="52"
          stroke="#c9a227"
          strokeWidth="1.5"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

// ─── Stars background ─────────────────────────────────────────────────────────
function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    top: `${(i * 37 + 13) % 100}%`,
    left: `${(i * 53 + 7) % 100}%`,
    size: (i % 3) + 1,
    opacity: 0.3 + (i % 7) * 0.1,
    duration: `${2 + (i % 3)}s`,
    delay: `${i % 4}s`,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animation: `twinkle ${s.duration} ease-in-out ${s.delay} infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Background goats scattered around ────────────────────────────────────────
function BackgroundGoats() {
  const goats = [
    {
      bottom: "2%",
      left: "1%",
      size: 70,
      flip: false,
      opacity: 0.16,
      delay: "0s",
      dur: "6s",
    },
    {
      bottom: "2%",
      left: "18%",
      size: 55,
      flip: true,
      opacity: 0.13,
      delay: "-2s",
      dur: "7s",
    },
    {
      bottom: "3%",
      right: "2%",
      size: 75,
      flip: true,
      opacity: 0.17,
      delay: "-1s",
      dur: "5.5s",
    },
    {
      bottom: "2%",
      right: "20%",
      size: 52,
      flip: false,
      opacity: 0.12,
      delay: "-3s",
      dur: "8s",
    },
    {
      bottom: "2%",
      left: "42%",
      size: 60,
      flip: true,
      opacity: 0.1,
      delay: "-4s",
      dur: "6.5s",
    },
    {
      bottom: "18%",
      left: "0%",
      size: 44,
      flip: false,
      opacity: 0.08,
      delay: "-1.5s",
      dur: "7s",
    },
    {
      bottom: "18%",
      right: "0%",
      size: 44,
      flip: true,
      opacity: 0.08,
      delay: "-2.5s",
      dur: "6s",
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {goats.map((g, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: g.bottom,
            left: g.left ?? undefined,
            right: g.right ?? undefined,
            animation: `goatBob ${g.dur} ease-in-out ${g.delay} infinite`,
          }}
        >
          <GoatImage flip={g.flip} size={g.size} opacity={g.opacity} />
        </div>
      ))}
    </div>
  );
}

// ─── Large goat emblem in the background ─────────────────────────────────────
function GoatBackdropEmblem() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] flex items-center justify-center overflow-hidden">
      <div
        className="absolute h-[18rem] w-[18rem] rounded-full blur-3xl sm:h-[26rem] sm:w-[26rem] lg:h-[34rem] lg:w-[34rem]"
        style={{
          background:
            "radial-gradient(circle, rgba(232,201,106,0.18) 0%, rgba(201,162,39,0.08) 42%, transparent 74%)",
        }}
      />

      <div className="goat-emblem">
        <GoatImage
          opacity={0.45}
          className="h-[20rem] w-[20rem] sm:h-[30rem] sm:w-[30rem] lg:h-[38rem] lg:w-[38rem]"
        />
      </div>
    </div>
  );
}

// ─── Burst confetti on click ──────────────────────────────────────────────────
type BurstParticle = {
  id: number;
  left: string;
  bottom: string;
  size: number;
  color: string;
  duration: string;
  delay: string;
};

function createBurstParticles(): BurstParticle[] {
  return Array.from({ length: 32 }, (_, i) => ({
    id: i,
    left: `${(i * 31 + 5) % 100}%`,
    bottom: `${(i * 17 + 3) % 35}%`,
    size: (i % 5) + 3,
    color: ["#e8c96a", "#ffd95c", "#c9a227", "#f5e6b8", "#fff8dc"][i % 5],
    duration: `${1.5 + (i % 3) * 0.5}s`,
    delay: `${(i % 6) * 0.1}s`,
  }));
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function EidMubarak() {
  const [clicked, setClicked] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [particles, setParticles] = useState<BurstParticle[]>([]);
  const playerRef = useRef<HTMLIFrameElement | null>(null);
  const musicRequestedRef = useRef(false);
  const musicPlayingRef = useRef(false);
  const playerLoadedRef = useRef(false);

  // YouTube video ID
  const YT_ID = "8q92-mgZaNw";
  const playerSrc = `https://www.youtube.com/embed/${YT_ID}?enablejsapi=1&playsinline=1&controls=0&rel=0&loop=1&playlist=${YT_ID}`;

  useEffect(() => {
    if (particles.length === 0) {
      return;
    }

    const timeoutId = setTimeout(() => setParticles([]), 4000);
    return () => clearTimeout(timeoutId);
  }, [particles]);

  const sendPlayerCommand = (func: string, args: unknown[] = []) => {
    playerRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*",
    );
  };

  const setMusicPlayingState = (value: boolean) => {
    musicPlayingRef.current = value;
    setIsMusicPlaying(value);
  };

  const playMusic = () => {
    if (!playerLoadedRef.current) {
      return;
    }

    sendPlayerCommand("unMute");
    sendPlayerCommand("setVolume", [100]);
    sendPlayerCommand("playVideo");
  };

  const pauseMusic = () => {
    if (!playerLoadedRef.current) {
      return;
    }

    sendPlayerCommand("pauseVideo");
  };

  const scheduleMusicStart = () => {
    [0, 160, 420].forEach((delay) => {
      window.setTimeout(playMusic, delay);
    });
  };

  const handlePlayerLoad = () => {
    playerLoadedRef.current = true;

    if (musicRequestedRef.current && musicPlayingRef.current) {
      scheduleMusicStart();
    }
  };

  const handleClick = () => {
    musicRequestedRef.current = true;
    setMusicPlayingState(true);
    setParticles(createBurstParticles());
    setClicked(true);
    scheduleMusicStart();
  };

  const handleMusicToggle = () => {
    const nextState = !musicPlayingRef.current;

    setMusicPlayingState(nextState);

    if (nextState) {
      musicRequestedRef.current = true;
      scheduleMusicStart();
      return;
    }

    pauseMusic();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Amiri:wght@400;700&family=Raleway:wght@300;400;600&display=swap');

        @keyframes twinkle {
          from { opacity: 0.2; transform: scale(0.8); }
          to   { opacity: 1;   transform: scale(1.2); }
        }
        @keyframes sway {
          0%,100% { transform: rotate(-5deg); }
          50%      { transform: rotate(5deg);  }
        }
        @keyframes floatMoon {
          0%,100% { transform: translateY(0);     }
          50%      { transform: translateY(-14px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes riseUp {
          0%   { transform: translateY(0) scale(1);     opacity: 0.9; }
          100% { transform: translateY(-90vh) scale(0); opacity: 0;   }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes pulseRing {
          0%   { box-shadow: 0 0 0 0    rgba(201,162,39,0.7); }
          70%  { box-shadow: 0 0 0 18px rgba(201,162,39,0);   }
          100% { box-shadow: 0 0 0 0    rgba(201,162,39,0);   }
        }
        @keyframes imageReveal {
          from { opacity: 0; transform: scale(0.93) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        @keyframes goatBob {
          0%,100% { transform: translateY(0);   }
          50%      { transform: translateY(-8px); }
        }
        @keyframes goatWalk {
          0%   { transform: translateX(0);    }
          100% { transform: translateX(110vw); }
        }
        @keyframes goatHalo {
          0%,100% { transform: translateY(0) scale(1); opacity: 0.42; }
          50%     { transform: translateY(-10px) scale(1.03); opacity: 0.58; }
        }

        .font-cinzel  { font-family: 'Cinzel Decorative', serif; }
        .font-amiri   { font-family: 'Amiri', serif; }
        .font-raleway { font-family: 'Raleway', sans-serif; }

        .moon-float   { animation: floatMoon 5s ease-in-out infinite; }
        .fade-up      { animation: fadeUp 0.9s ease forwards; }
        .image-reveal { animation: imageReveal 1s ease 0.4s both; }
        .goat-emblem  {
          animation: goatHalo 7s ease-in-out infinite;
          filter: drop-shadow(0 0 28px rgba(201,162,39,0.12));
        }

        .shimmer-btn {
          background: linear-gradient(120deg, #c9a227 0%, #ffd95c 40%, #e8c96a 60%, #c9a227 100%);
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        .shimmer-btn:hover {
          animation: shimmer 1.5s linear infinite, pulseRing 0.6s ease;
          filter: brightness(1.1);
        }

        /* WhatsApp-style profile image */
        .eid-profile-shell {
          width: min(72vw, 260px);
          margin: 0 auto;
          padding: 0.45rem;
          border-radius: 9999px;
          background: linear-gradient(145deg, rgba(255, 240, 184, 0.18), rgba(201, 162, 39, 0.08));
          box-shadow:
            0 0 0 1px rgba(201,162,39,0.22),
            0 0 34px rgba(201,162,39,0.16);
        }
        .eid-img-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 9999px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(201,162,39,0.35),
            0 0 30px rgba(201,162,39,0.2),
            0 0 60px rgba(201,162,39,0.08);
        }
        .eid-img-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border: 1px solid rgba(201,162,39,0.4);
          z-index: 2;
          pointer-events: none;
        }
        .eid-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .music-toggle-btn {
          border: 1px solid rgba(201,162,39,0.36);
          background: rgba(255,255,255,0.06);
          color: #f7e7b7;
          box-shadow: 0 0 24px rgba(201,162,39,0.12);
          backdrop-filter: blur(10px);
        }
        .music-toggle-btn:hover {
          background: rgba(255,255,255,0.12);
          filter: brightness(1.05);
        }

        /* Walking goat across screen after click */
        .goat-walk {
          position: fixed;
          bottom: 6%;
          left: -120px;
          z-index: 5;
          pointer-events: none;
          animation: goatWalk 12s linear 0.8s forwards;
        }
        .goat-walk-2 {
          position: fixed;
          bottom: 10%;
          left: -80px;
          z-index: 5;
          pointer-events: none;
          animation: goatWalk 16s linear 3s forwards;
        }

        .hidden-player {
          position: fixed;
          width: 1px;
          height: 1px;
          opacity: 0;
          pointer-events: none;
          bottom: 0;
          left: 0;
        }
      `}</style>

      <div
        className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center"
        style={{
          background:
            "linear-gradient(160deg, #070710 0%, #0d0d1f 50%, #0a0c18 100%)",
          fontFamily: "'Raleway', sans-serif",
        }}
      >
        {/* Stars */}
        <Stars />

        {/* Islamic pattern overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{ backgroundImage: PATTERN_SVG }}
        />

        {/* Radial gold glow */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(180,130,40,0.13) 0%, transparent 70%)",
          }}
        />

        {/* Large goat emblem in the background */}
        <GoatBackdropEmblem />

        {/* Background goats — always visible */}
        <BackgroundGoats />

        {/* Lanterns */}
        <div className="fixed top-0 left-0 right-0 hidden sm:flex justify-around px-[6%] pointer-events-none z-10">
          <Lantern delay="0s" scale={1} />
          <Lantern delay="-1.8s" scale={1.15} />
          <Lantern delay="-3.2s" scale={1} />
        </div>

        {/* Walking goats triggered on click */}
        {clicked && (
          <>
            <div className="goat-walk">
              <GoatImage flip={false} size={90} opacity={0.55} />
            </div>
            <div className="goat-walk-2">
              <GoatImage flip={false} size={65} opacity={0.4} />
            </div>
          </>
        )}

        {/* Burst particles */}
        <div className="fixed inset-0 pointer-events-none z-20">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.left,
                bottom: p.bottom,
                width: p.size,
                height: p.size,
                background: p.color,
                animation: `riseUp ${p.duration} ease-out ${p.delay} forwards`,
              }}
            />
          ))}
        </div>

        <iframe
          ref={playerRef}
          className="hidden-player"
          src={playerSrc}
          allow="autoplay; encrypted-media"
          title="Eid Nasheed background music"
          onLoad={handlePlayerLoad}
        />

        {/* ── Main content ── */}
        <main className="relative z-10 flex flex-col items-center px-4 py-16 w-full max-w-2xl mx-auto text-center">
          {/* ── PRE-CLICK screen ── */}
          {!clicked && (
            <div className="flex flex-col items-center gap-8 fade-up">
              <div className="moon-float">
                <CrescentMoon />
              </div>

              <div className="space-y-2">
                <p
                  className="font-amiri text-amber-200 text-lg tracking-widest opacity-60"
                  style={{ direction: "rtl" }}
                >
                  بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْم
                </p>
                <h1 className="font-cinzel text-amber-100 text-2xl sm:text-3xl tracking-wider">
                  Eid ul Adha
                </h1>
              </div>

              {/* Small goat hint on pre-click */}
              <div style={{ opacity: 0.35 }}>
                <GoatImage flip={false} size={52} opacity={1} />
              </div>

              <button
                onClick={handleClick}
                className="shimmer-btn font-cinzel text-stone-900 font-bold text-sm sm:text-base px-10 py-4 rounded-full tracking-widest transition-transform active:scale-95 cursor-pointer"
                style={{ letterSpacing: "0.12em" }}
              >
                ✦ Click Here ✦
              </button>

              <p className="font-raleway text-amber-200/35 text-xs tracking-widest uppercase">
                Tap to receive Eid blessings
              </p>
            </div>
          )}

          {/* ── POST-CLICK: Full Eid wishes ── */}
          {clicked && (
            <div className="flex flex-col items-center gap-6 w-full fade-up">
              {/* Moon */}
              <div className="moon-float">
                <CrescentMoon />
              </div>

              {/* Arabic title */}
              <h1
                className="font-amiri text-amber-300 leading-snug"
                style={{
                  fontSize: "clamp(2rem, 6vw, 3.6rem)",
                  direction: "rtl",
                  textShadow: "0 0 40px rgba(232,201,106,0.45)",
                }}
              >
                عيد الأضحى مبارك
              </h1>

              {/* Ornament divider */}
              <div className="flex items-center gap-3 w-full max-w-xs">
                <div
                  className="flex-1 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,#c9a227,transparent)",
                  }}
                />
                <div className="w-2 h-2 bg-amber-500 rotate-45 flex-shrink-0" />
                <div
                  className="flex-1 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,#c9a227,transparent)",
                  }}
                />
              </div>

              {/* English title */}
              <h2
                className="font-cinzel text-amber-100 tracking-widest"
                style={{
                  fontSize: "clamp(1.1rem, 3.5vw, 2.1rem)",
                  textShadow: "0 0 25px rgba(245,230,184,0.25)",
                }}
              >
                Eid ul Adha Mubarak
              </h2>

              <div className="w-full image-reveal flex flex-col items-center">
                <div className="eid-profile-shell">
                  <div className="eid-img-wrapper">
                    <img
                      src="/download.png"
                      alt="Shaik Khaleel Eid wishes portrait"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleMusicToggle}
                  className="music-toggle-btn mt-5 rounded-full px-6 py-3 font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase transition-transform active:scale-95 cursor-pointer"
                >
                  {isMusicPlaying
                    ? "Pause Takbeer-e-Tashreeq"
                    : "Play Takbeer-e-Tashreeq"}
                </button>

                <div
                  className="mt-4 w-full max-w-md rounded-2xl p-5 sm:p-6"
                  style={{
                    background: "rgba(9,11,22,0.68)",
                    border: "1px solid rgba(201,162,39,0.28)",
                    boxShadow: "0 0 32px rgba(201,162,39,0.08)",
                  }}
                >
                  <p className="font-cinzel text-amber-100 text-sm sm:text-base tracking-[0.2em] uppercase">
                    Eid Wishes From Shaik Khaleel
                  </p>
                  <p className="mt-3 font-raleway text-amber-100/75 text-sm sm:text-base leading-relaxed">
                    Wishing you peace, joy and barakah this Eid.
                  </p>
                </div>
              </div>

              {/* Three goats row */}
              <div className="flex items-end justify-center gap-4 sm:gap-8 w-full py-2">
                <GoatImage flip={true} size={56} opacity={0.55} />
                <GoatImage flip={false} size={72} opacity={0.65} />
                <GoatImage flip={true} size={56} opacity={0.55} />
              </div>

              {/* Dua */}
              <div className="fade-up" style={{ animationDelay: "0.4s" }}>
                <p
                  className="font-amiri text-amber-300 text-2xl sm:text-3xl mb-1"
                  style={{ direction: "rtl" }}
                >
                  تَقَبَّلَ اللّٰهُ مِنَّا وَمِنْكُم
                </p>
                <p className="font-raleway text-amber-100/50 text-xs sm:text-sm italic tracking-wide">
                  "May Allah accept it from us and from you"
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
