"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────

type StepColor = "coral" | "plum" | "mint";

type Step = {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  stat: { label: string; value: number; prefix: string; suffix: string };
  color: StepColor;
  visual: "quiz" | "bids" | "delivery";
  icon: React.ReactNode;
};

// ── Color map ─────────────────────────────────────────────────────────────────

const COLOR = {
  coral: {
    text: "text-coral",
    panelBorder: "border-coral/15",
    panelBg: "bg-coral/[0.04]",
    nodeBg: "#FF6B35",
    nodeGlow:
      "0 0 0 5px rgba(255,107,53,0.18), 0 0 32px rgba(255,107,53,0.22)",
    lineColor: "from-coral",
  },
  plum: {
    text: "text-plum-light",
    panelBorder: "border-plum/15",
    panelBg: "bg-plum/[0.04]",
    nodeBg: "#7B2D8E",
    nodeGlow:
      "0 0 0 5px rgba(123,45,142,0.18), 0 0 32px rgba(123,45,142,0.22)",
    lineColor: "from-plum-light",
  },
  mint: {
    text: "text-mint",
    panelBorder: "border-mint/15",
    panelBg: "bg-mint/[0.04]",
    nodeBg: "#22C55E",
    nodeGlow: "0 0 0 5px rgba(34,197,94,0.18), 0 0 32px rgba(34,197,94,0.22)",
    lineColor: "from-mint",
  },
} satisfies Record<StepColor, object>;

// ── Animated counter ──────────────────────────────────────────────────────────

function CountUp({
  target,
  prefix = "",
  suffix = "",
  active,
  duration = 1300,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  active: boolean;
  duration?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let rafId: number;
    let startTime: number | null = null;

    const tick = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, target, duration]);

  return (
    <>
      {prefix}
      {value.toLocaleString("en-NG")}
      {suffix}
    </>
  );
}

// ── Live bid simulation ───────────────────────────────────────────────────────

function BidSimulator({ active }: { active: boolean }) {
  const [bids, setBids] = useState<
    { vendor: string; amount: number; isTop: boolean }[]
  >([]);
  const [saved, setSaved] = useState(0);
  const START = 12_500_000;

  useEffect(() => {
    if (!active) {
      setBids([]);
      setSaved(0);
      return;
    }

    setBids([{ vendor: "Opening Ask", amount: START, isTop: true }]);

    const events = [
      { delay: 700, vendor: "AutoElectric Lagos", amount: 12_200_000 },
      { delay: 1800, vendor: "ChargeDrive NG", amount: 11_900_000 },
      { delay: 3100, vendor: "GreenDrive NG", amount: 11_650_000 },
      { delay: 4400, vendor: "AutoElectric Lagos", amount: 11_400_000 },
    ];

    const timers = events.map(({ delay, vendor, amount }) =>
      setTimeout(() => {
        setBids((prev) => [
          { vendor, amount, isTop: true },
          ...prev.slice(0, 2).map((b) => ({ ...b, isTop: false })),
        ]);
        setSaved(START - amount);
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [active]);

  return (
    <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-cream/40 mb-0.5">
            Live Auction
          </div>
          <div className="text-sm font-bold text-white">BYD Dolphin 2024</div>
          <div className="text-[11px] text-cream/35 mt-0.5">3 vendors competing</div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-mint/10 border border-mint/20 text-mint text-[11px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-mint pulse-live" />
          LIVE
        </div>
      </div>

      <div className="h-px bg-white/[0.06] mb-4" />

      {/* Bids */}
      <div className="space-y-2 min-h-[130px]">
        <AnimatePresence>
          {bids.map((bid) => (
            <motion.div
              key={`${bid.vendor}-${bid.amount}`}
              initial={{ opacity: 0, y: -14, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl ${
                bid.isTop
                  ? "bg-coral/15 border border-coral/25"
                  : "bg-white/[0.03] border border-white/5"
              }`}
            >
              <div className="flex items-center gap-2">
                {bid.isTop && (
                  <span className="w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" />
                )}
                <span
                  className={`text-xs font-medium ${
                    bid.isTop ? "text-white" : "text-cream/35"
                  }`}
                >
                  {bid.vendor}
                </span>
              </div>
              <span
                className={`text-sm font-bold font-mono ${
                  bid.isTop
                    ? "text-coral"
                    : "text-cream/25 line-through decoration-cream/15"
                }`}
              >
                ₦{bid.amount.toLocaleString("en-NG")}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Savings pill */}
      <AnimatePresence>
        {saved > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-between mt-3 bg-mint/10 border border-mint/20 rounded-xl px-4 py-2.5"
          >
            <span className="text-xs font-semibold text-mint/80">
              You&apos;re saving
            </span>
            <span className="text-sm font-extrabold text-mint">
              ₦{saved.toLocaleString("en-NG")}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Quiz preview ──────────────────────────────────────────────────────────────

function QuizPreview({ active }: { active: boolean }) {
  const rows = [
    { q: "Daily distance?", a: "50 – 100km" },
    { q: "Budget range?", a: "₦5M – ₦15M" },
    { q: "Primary use?", a: "Daily commute" },
  ];

  return (
    <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-5 space-y-3">
      <div className="text-[10px] uppercase tracking-widest text-cream/40 mb-4">
        Your Quick Profile
      </div>
      {rows.map((row, i) => (
        <motion.div
          key={row.q}
          initial={{ opacity: 0, x: -12 }}
          animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.18 + 0.05, duration: 0.4 }}
          className="flex items-center justify-between bg-white/[0.04] border border-white/5 rounded-xl px-4 py-3"
        >
          <span className="text-xs text-cream/50">{row.q}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white">{row.a}</span>
            <span className="w-4 h-4 rounded-full bg-mint/20 flex items-center justify-center flex-shrink-0">
              <svg
                width="8"
                height="8"
                viewBox="0 0 10 10"
                fill="none"
                className="text-mint"
              >
                <path
                  d="M2 5l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.65, duration: 0.4 }}
        className="flex items-center justify-center gap-2 bg-coral/15 border border-coral/25 rounded-xl px-4 py-3"
      >
        <span className="text-sm font-bold text-white">
          3 perfect EVs matched
        </span>
        <span className="text-coral text-sm">✓</span>
      </motion.div>
    </div>
  );
}

// ── Delivery checklist ────────────────────────────────────────────────────────

function DeliveryChecklist({ active }: { active: boolean }) {
  const items = [
    { label: "120-Point Inspection Done", color: "mint" as const },
    { label: "Paperwork & Registration", color: "mint" as const },
    { label: "Doorstep Delivery Scheduled", color: "coral" as const },
    { label: "₦200,000/month savings begins", color: "gold" as const },
  ];

  return (
    <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-5 space-y-3">
      <div className="text-[10px] uppercase tracking-widest text-cream/40 mb-4">
        Your Delivery Checklist
      </div>
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -12 }}
          animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.18, duration: 0.4 }}
          className="flex items-center gap-3 bg-white/[0.04] border border-white/5 rounded-xl px-4 py-3"
        >
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
              item.color === "mint"
                ? "bg-mint/15"
                : item.color === "coral"
                ? "bg-coral/15"
                : "bg-gold/15"
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={
                item.color === "mint"
                  ? "text-mint"
                  : item.color === "coral"
                  ? "text-coral"
                  : "text-gold"
              }
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <span className="text-sm font-medium text-cream/80">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ── Steps data ────────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    num: "01",
    title: "Tell Us What You Need",
    subtitle: "30-second quiz",
    desc: "Answer a quick quiz — budget, daily distance, driving style — and we instantly match you with verified EVs built for life in Nigeria.",
    stat: { label: "Matches found in", value: 30, prefix: "", suffix: " secs" },
    color: "coral",
    visual: "quiz",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Vendors Compete For You",
    subtitle: "Real-time bidding",
    desc: "Your request goes live to our verified vendor network. They bid against each other — driving the price down. You watch it happen in real time.",
    stat: {
      label: "Avg. saving per purchase",
      value: 700_000,
      prefix: "₦",
      suffix: "",
    },
    color: "plum",
    visual: "bids",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Drive Away. Save Every Month.",
    subtitle: "Doorstep delivery",
    desc: "Choose your winner. We handle the 120-point inspection and paperwork. Your EV arrives at your door — and the savings start immediately.",
    stat: {
      label: "Average monthly fuel savings",
      value: 200_000,
      prefix: "₦",
      suffix: "+",
    },
    color: "mint",
    visual: "delivery",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

// ── Single vertical step (used for both mobile and desktop) ──────────────────

function VerticalStep({
  step,
  index,
  isLast,
}: {
  step: Step;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const c = COLOR[step.color];

  return (
    <div ref={ref} className="relative">
      {/* Vertical timeline connector */}
      <div className="absolute left-5 md:left-8 top-0 bottom-0 flex flex-col items-center">
        {/* Node */}
        <motion.div
          animate={{
            backgroundColor: inView ? c.nodeBg : "rgba(255,255,255,0.04)",
            boxShadow: inView ? c.nodeGlow : "0 0 0 1px rgba(255,255,255,0.07)",
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-10 h-10 md:w-14 md:h-14 rounded-2xl border border-white/[0.08] flex items-center justify-center flex-shrink-0"
        >
          <motion.div
            animate={{ opacity: inView ? 1 : 0.2, scale: inView ? 1 : 0.75 }}
            transition={{ duration: 0.4 }}
            className="text-white"
          >
            {step.icon}
          </motion.div>
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <div className="flex-1 w-0.5 bg-white/[0.06] overflow-hidden mt-2">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-current to-transparent"
              style={{ color: c.nodeBg }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
          </div>
        )}
      </div>

      {/* Content area — offset right of the timeline */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="ml-16 md:ml-24 pb-12 md:pb-16"
      >
        {/* Step label */}
        <div
          className={`text-[10px] uppercase tracking-widest font-bold mb-2 transition-colors duration-500 ${
            inView ? c.text : "text-cream/20"
          }`}
        >
          Step {step.num} — {step.subtitle}
        </div>

        {/* Step card */}
        <div
          className={`rounded-2xl md:rounded-3xl border p-5 md:p-8 lg:p-10 ${c.panelBg} ${c.panelBorder}`}
        >
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-start">
            {/* Copy block */}
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white mb-4 leading-tight">
                {step.title}
              </h3>
              <p className="text-cream/50 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
                {step.desc}
              </p>

              {/* Animated stat */}
              <div>
                <div className="text-[10px] uppercase tracking-wider text-cream/35 mb-1.5">
                  {step.stat.label}
                </div>
                <div
                  className={`text-3xl md:text-4xl font-display font-extrabold ${c.text}`}
                >
                  <CountUp
                    target={step.stat.value}
                    prefix={step.stat.prefix}
                    suffix={step.stat.suffix}
                    active={inView}
                    duration={1350}
                  />
                </div>
              </div>
            </div>

            {/* Visual demo */}
            <div>
              {step.visual === "quiz" && <QuizPreview active={inView} />}
              {step.visual === "bids" && <BidSimulator active={inView} />}
              {step.visual === "delivery" && (
                <DeliveryChecklist active={inView} />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-12%" });

  return (
    <section ref={sectionRef} className="relative bg-bark overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-24 -left-32 w-[480px] h-[480px] rounded-full bg-coral/[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-48 -right-24 w-[400px] h-[400px] rounded-full bg-plum/[0.04] blur-[90px] pointer-events-none" />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.75) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-0">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-cream/50 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-coral" />
            Simple 3-Step Process
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-[3.75rem] font-display font-extrabold text-white mb-5 leading-[1.05] tracking-tight">
            Your Shortcut to{" "}
            <span className="bg-gradient-to-r from-coral via-coral-light to-gold bg-clip-text text-transparent">
              Electric
            </span>
          </h2>
          <p className="text-cream/45 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            From quiz to doorstep in days. No haggling, no hidden fees, no
            surprises.
          </p>
        </motion.div>

        {/* ── Vertical timeline ── */}
        <div className="max-w-4xl mx-auto">
          {STEPS.map((step, i) => (
            <VerticalStep
              key={step.num}
              step={step}
              index={i}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>
      </div>

      {/* ── Wave divider → cream ── */}
      <div className="relative mt-16 sm:mt-20 leading-none overflow-hidden">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          style={{ height: "80px" }}
        >
          <path
            d="M0,38 C180,76 360,4 540,38 C720,72 900,8 1080,42 C1260,76 1360,28 1440,38 L1440,80 L0,80 Z"
            fill="#FFFBF5"
          />
        </svg>
      </div>
    </section>
  );
}
