"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Glowing wireframe EV ─────────────────────────────────────────────────────

function ElectricCarVisual({ inView }: { inView: boolean }) {
  // Car body outline path (side profile, modern EV hatchback)
  const bodyPath =
    "M105,242 L105,210 C105,198 112,180 125,168 C138,155 155,147 175,140 L220,132 C238,120 252,112 270,108 L375,106 C400,108 420,120 438,142 C450,158 458,180 460,205 L460,242";

  // Bottom with wheel wells
  const bottomPath =
    "M460,248 L448,248 C444,228 428,218 412,218 C396,218 380,228 376,248 L228,248 C224,228 208,218 192,218 C176,218 160,228 156,248 L105,248";

  // Window / glass area
  const windowPath =
    "M228,140 C240,126 254,116 270,112 L372,110 C392,112 408,122 418,138 L228,140 Z";

  // B-pillar
  const pillarPath = "M322,140 L324,112";

  return (
    <div className="relative flex items-center justify-center">
      {/* Ambient glow behind car */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[70%] h-[50%] rounded-full bg-coral/[0.06] blur-[80px]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[50%] h-[40%] rounded-full bg-plum/[0.04] blur-[60px] translate-x-12" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          animate={
            inView
              ? {
                  rotateY: [0, -3, 3, 0],
                  y: [0, -6, 0],
                }
              : {}
          }
          transition={{
            rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <svg
            viewBox="0 0 560 320"
            fill="none"
            className="w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradient for car outline */}
              <linearGradient
                id="carStroke"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
              >
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="45%" stopColor="#9B4DAE" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>

              {/* Subtle body fill */}
              <linearGradient
                id="carFill"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#9B4DAE" stopOpacity="0.03" />
              </linearGradient>

              {/* Window fill */}
              <linearGradient
                id="windowFill"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#9B4DAE" stopOpacity="0.04" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Stronger glow for accent elements */}
              <filter
                id="strongGlow"
                x="-40%"
                y="-40%"
                width="180%"
                height="180%"
              >
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Ground glow */}
              <radialGradient id="groundGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.2" />
                <stop offset="60%" stopColor="#9B4DAE" stopOpacity="0.06" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>

              {/* Headlight glow */}
              <radialGradient id="headlightGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#FF6B35" stopOpacity="0.3" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>

              {/* Taillight glow */}
              <radialGradient id="taillightGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#FF6B35" stopOpacity="0.2" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>

              {/* Rim gradient */}
              <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#9B4DAE" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* ── Ground reflection / glow ── */}
            <ellipse
              cx="280"
              cy="275"
              rx="200"
              ry="22"
              fill="url(#groundGlow)"
            />
            {/* Ground line */}
            <line
              x1="60"
              y1="262"
              x2="500"
              y2="262"
              stroke="url(#carStroke)"
              strokeWidth="0.5"
              opacity="0.15"
            />

            {/* ── Car body — glow layer ── */}
            <path
              d={bodyPath}
              stroke="url(#carStroke)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#strongGlow)"
              opacity="0.35"
            />

            {/* ── Car body — main outline ── */}
            <path
              d={bodyPath}
              fill="url(#carFill)"
              stroke="url(#carStroke)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
            />

            {/* ── Bottom line with wheel wells ── */}
            <path
              d={bottomPath}
              stroke="url(#carStroke)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#glow)"
            />

            {/* Close bottom of car */}
            <line
              x1="105"
              y1="242"
              x2="105"
              y2="248"
              stroke="url(#carStroke)"
              strokeWidth="1.8"
              filter="url(#glow)"
            />
            <line
              x1="460"
              y1="242"
              x2="460"
              y2="248"
              stroke="url(#carStroke)"
              strokeWidth="1.8"
              filter="url(#glow)"
            />

            {/* ── Window / Glass ── */}
            <path
              d={windowPath}
              fill="url(#windowFill)"
              stroke="url(#carStroke)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
            />

            {/* B-pillar */}
            <path
              d={pillarPath}
              stroke="url(#carStroke)"
              strokeWidth="1"
              opacity="0.5"
            />

            {/* ── Hood detail line ── */}
            <path
              d="M175,142 L220,135"
              stroke="url(#carStroke)"
              strokeWidth="0.8"
              opacity="0.3"
            />

            {/* ── Belt line (along body middle) ── */}
            <path
              d="M130,168 L440,155"
              stroke="url(#carStroke)"
              strokeWidth="0.6"
              opacity="0.2"
            />

            {/* ── Door line ── */}
            <path
              d="M320,142 L316,210"
              stroke="url(#carStroke)"
              strokeWidth="0.8"
              opacity="0.25"
            />

            {/* ── Headlight ── */}
            <ellipse
              cx="112"
              cy="195"
              rx="10"
              ry="14"
              fill="url(#headlightGlow)"
              filter="url(#strongGlow)"
            />
            <ellipse
              cx="112"
              cy="195"
              rx="4"
              ry="6"
              fill="#FF6B35"
              opacity="0.9"
            />

            {/* Headlight beam lines */}
            <line
              x1="100"
              y1="188"
              x2="70"
              y2="182"
              stroke="#FF6B35"
              strokeWidth="0.5"
              opacity="0.25"
            />
            <line
              x1="100"
              y1="195"
              x2="65"
              y2="195"
              stroke="#FF6B35"
              strokeWidth="0.5"
              opacity="0.2"
            />
            <line
              x1="100"
              y1="202"
              x2="70"
              y2="208"
              stroke="#FF6B35"
              strokeWidth="0.5"
              opacity="0.15"
            />

            {/* ── Taillight ── */}
            <ellipse
              cx="456"
              cy="200"
              rx="6"
              ry="12"
              fill="url(#taillightGlow)"
              filter="url(#strongGlow)"
            />
            <ellipse
              cx="456"
              cy="200"
              rx="3"
              ry="6"
              fill="#FF6B35"
              opacity="0.8"
            />

            {/* ── Front wheel ── */}
            <circle
              cx="192"
              cy="248"
              r="28"
              stroke="url(#carStroke)"
              strokeWidth="1.5"
              fill="rgba(255,255,255,0.02)"
              filter="url(#glow)"
            />
            <circle
              cx="192"
              cy="248"
              r="18"
              stroke="url(#rimGrad)"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="192" cy="248" r="4" fill="url(#rimGrad)" />
            {/* Rim spokes */}
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <line
                key={`fs-${angle}`}
                x1={192 + 6 * Math.cos((angle * Math.PI) / 180)}
                y1={248 + 6 * Math.sin((angle * Math.PI) / 180)}
                x2={192 + 17 * Math.cos((angle * Math.PI) / 180)}
                y2={248 + 17 * Math.sin((angle * Math.PI) / 180)}
                stroke="url(#rimGrad)"
                strokeWidth="0.8"
              />
            ))}

            {/* ── Rear wheel ── */}
            <circle
              cx="412"
              cy="248"
              r="28"
              stroke="url(#carStroke)"
              strokeWidth="1.5"
              fill="rgba(255,255,255,0.02)"
              filter="url(#glow)"
            />
            <circle
              cx="412"
              cy="248"
              r="18"
              stroke="url(#rimGrad)"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="412" cy="248" r="4" fill="url(#rimGrad)" />
            {/* Rim spokes */}
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <line
                key={`rs-${angle}`}
                x1={412 + 6 * Math.cos((angle * Math.PI) / 180)}
                y1={248 + 6 * Math.sin((angle * Math.PI) / 180)}
                x2={412 + 17 * Math.cos((angle * Math.PI) / 180)}
                y2={248 + 17 * Math.sin((angle * Math.PI) / 180)}
                stroke="url(#rimGrad)"
                strokeWidth="0.8"
              />
            ))}

            {/* ── Electric bolt symbol on door ── */}
            <path
              d="M290,168 L298,155 L294,166 L302,166 L292,182 L296,170 L290,170 Z"
              fill="#FF6B35"
              opacity="0.7"
              filter="url(#strongGlow)"
            />

            {/* ── Charge port indicator ── */}
            <circle
              cx="150"
              cy="172"
              r="4"
              fill="none"
              stroke="#22C55E"
              strokeWidth="1.2"
              filter="url(#glow)"
            />
            <circle cx="150" cy="172" r="1.5" fill="#22C55E" opacity="0.8" />

            {/* ── Energy flow particles (static positions, animated via CSS) ── */}
            {[
              { cx: 140, cy: 160, delay: 0 },
              { cx: 250, cy: 108, delay: 0.4 },
              { cx: 360, cy: 112, delay: 0.8 },
              { cx: 440, cy: 155, delay: 1.2 },
              { cx: 200, cy: 138, delay: 1.6 },
            ].map((p, i) => (
              <motion.circle
                key={i}
                cx={p.cx}
                cy={p.cy}
                r="2"
                fill="#FF6B35"
                filter="url(#strongGlow)"
                animate={{
                  opacity: [0, 0.8, 0],
                  r: [1, 3, 1],
                }}
                transition={{
                  duration: 2,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* ── Subtle grid lines on body suggesting tech/blueprint ── */}
            {[165, 180, 195, 210, 225].map((y) => (
              <line
                key={`grid-${y}`}
                x1="120"
                y1={y}
                x2="450"
                y2={y - 5}
                stroke="url(#carStroke)"
                strokeWidth="0.3"
                opacity="0.06"
              />
            ))}
          </svg>
        </motion.div>

        {/* "EV" badge floating below car */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm"
        >
          <div className="w-2 h-2 rounded-full bg-mint pulse-live" />
          <span className="text-xs font-semibold text-cream/50 tracking-wider uppercase">
            100% Electric
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ── Reason card ──────────────────────────────────────────────────────────────

type Reason = {
  icon: React.ReactNode;
  stat: string;
  statSuffix: string;
  title: string;
  desc: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
};

function ReasonCard({
  item,
  index,
  inView,
}: {
  item: Reason;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.12 + 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative flex items-start gap-5 p-5 rounded-2xl border bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-300 ${item.accentBorder}`}
    >
      {/* Icon */}
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${item.accentBg}`}
      >
        <div className={item.accent}>{item.icon}</div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className={`text-2xl font-display font-extrabold ${item.accent}`}>
            {item.stat}
          </span>
          <span className="text-sm font-semibold text-cream/35">
            {item.statSuffix}
          </span>
        </div>
        <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
        <p className="text-sm text-cream/45 leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

// ── Reasons data ─────────────────────────────────────────────────────────────

const REASONS: Reason[] = [
  {
    stat: "₦200K+",
    statSuffix: "/month saved",
    title: "Massive Fuel Savings",
    desc: "Electricity costs a fraction of petrol. The average Lagos driver saves over ₦200,000 every month after switching.",
    accent: "text-coral",
    accentBg: "bg-coral/10",
    accentBorder: "border-coral/10",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" />
      </svg>
    ),
  },
  {
    stat: "80%",
    statSuffix: "less maintenance",
    title: "Almost Zero Upkeep",
    desc: "No oil changes. No transmission repairs. Fewer moving parts means your wallet stays heavier, year after year.",
    accent: "text-plum-light",
    accentBg: "bg-plum/10",
    accentBorder: "border-plum/10",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    stat: "100%",
    statSuffix: "instant torque",
    title: "Silent, Instant Power",
    desc: "Electric motors deliver full torque from zero. Smooth acceleration, whisper-quiet ride, every single time.",
    accent: "text-sky",
    accentBg: "bg-sky/10",
    accentBorder: "border-sky/10",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    stat: "0g",
    statSuffix: "CO₂ emissions",
    title: "Cleaner Air for Nigeria",
    desc: "Zero tailpipe emissions. Every EV on Lagos roads means cleaner air for millions of people.",
    accent: "text-mint",
    accentBg: "bg-mint/10",
    accentBorder: "border-mint/10",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
];

// ── Main component ───────────────────────────────────────────────────────────

export default function WhyElectric() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} className="relative bg-bark overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-plum/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-coral/[0.03] blur-[100px] pointer-events-none" />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.75) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-cream/50 text-sm font-medium mb-6">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-mint"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            The Future Is Electric
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-[3.75rem] font-display font-extrabold text-white mb-5 leading-[1.05] tracking-tight">
            Why Go{" "}
            <span className="bg-gradient-to-r from-coral via-plum-light to-sky bg-clip-text text-transparent">
              Electric
            </span>
            ?
          </h2>
          <p className="text-cream/45 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Electric vehicles aren&apos;t just the future — they&apos;re saving
            Nigerian drivers real money today.
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Car visual */}
          <div className="order-2 lg:order-1">
            <ElectricCarVisual inView={inView} />
          </div>

          {/* Right: Reasons */}
          <div className="order-1 lg:order-2 space-y-4">
            {REASONS.map((item, i) => (
              <ReasonCard key={i} item={item} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
