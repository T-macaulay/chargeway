"use client";
import { motion } from "framer-motion";

export default function Hero({
  onQuizOpen,
}: {
  onQuizOpen: () => void;
}) {
  return (
    <section className="relative bg-bark">
      {/* Background gradient mesh — contained separately so it doesn't clip floating badges */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-coral/10 via-coral/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[60%] bg-gradient-to-tr from-plum/10 to-transparent" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-coral/5 blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24 sm:pb-32 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
          {/* Left — Copy */}
          <div className="max-w-xl">
            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/15 text-mint border border-mint/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-mint pulse-live" />
              <span className="text-sm font-semibold">
                Live deals available now
              </span>
            </motion.div>

            {/* Primary headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold leading-[1.05] tracking-tight text-white mb-6"
            >
              Switch to{" "}
              <span className="bg-gradient-to-r from-coral via-coral-light to-gold bg-clip-text text-transparent">
                Electric.
              </span>
            </motion.h1>

            {/* Supporting line */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-lg sm:text-xl text-cream/60 max-w-lg mb-10 leading-relaxed"
            >
              Stop burning cash on fuel. Compare prices from verified vendors
              and save up to{" "}
              <span className="font-semibold text-coral">
                ₦200,000/month
              </span>{" "}
              on Nigeria&apos;s smartest EV marketplace.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-14"
            >
              <button
                onClick={onQuizOpen}
                className="group relative px-10 py-5 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-coral to-coral-dark shadow-[0_0_40px_rgba(255,107,53,0.3)] hover:shadow-[0_0_60px_rgba(255,107,53,0.4)] transition-all duration-300 active:scale-[0.97] overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Match Me With an EV
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-coral-dark to-plum-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <a
                href="#marketplace"
                className="px-8 py-5 rounded-2xl text-lg font-semibold text-cream/70 border border-cream/10 hover:border-coral/30 hover:text-white hover:bg-cream/5 transition-all duration-200 text-center"
              >
                See Live Deals
              </a>
            </motion.div>

            {/* Trust signals — stacked vertically on each stat for better readability, with dividers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex items-center gap-5 sm:gap-8"
            >
              {[
                { value: "30+", label: "Vehicles" },
                { value: "₦200K+", label: "Monthly Savings" },
                { value: "<2hrs", label: "Response" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-2">
                  {i > 0 && (
                    <div className="w-px h-8 bg-cream/10 -ml-2.5 sm:-ml-4 mr-2.5 sm:mr-4" />
                  )}
                  <div>
                    <div className="text-xl font-bold text-white leading-none">
                      {stat.value}
                    </div>
                    <div className="text-xs text-cream/40 mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Deal card preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative w-[380px]"
          >
            {/* Extra padding wrapper so floating badges have room */}
            <div className="py-6 px-6">
              {/* Main card */}
              <div className="relative bg-white/[0.07] backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-[0_8px_60px_rgba(0,0,0,0.3)]">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-coral/20 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-coral">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Top Deal</div>
                      <div className="text-xs text-cream/40">Verified Vendor</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-mint/15 text-mint text-xs font-bold">
                    LIVE
                  </div>
                </div>

                {/* Car preview — cleaner single-tone, no multi-color noise */}
                <div className="relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-2xl p-6 mb-5 flex items-center justify-center h-36">
                  <svg width="200" height="100" viewBox="0 0 280 140" fill="none" className="opacity-90">
                    <ellipse cx="140" cy="120" rx="95" ry="7" fill="white" opacity="0.06" />
                    <path d="M55 95 C55 65 82 36 115 34 L165 34 C195 34 225 58 228 95 Z" fill="white" opacity="0.12" />
                    <path d="M115 50 L165 50 C172 50 190 62 196 78 L84 78 C90 62 108 50 115 50 Z" fill="white" opacity="0.06" />
                    <circle cx="88" cy="108" r="14" fill="white" opacity="0.1" />
                    <circle cx="192" cy="108" r="14" fill="white" opacity="0.1" />
                    <circle cx="88" cy="108" r="5" fill="#FF6B35" />
                    <circle cx="192" cy="108" r="5" fill="#FF6B35" />
                  </svg>
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-coral text-white text-[10px] font-bold rounded-md uppercase tracking-wide">
                    Hot Deal
                  </div>
                </div>

                {/* Car details */}
                <div className="mb-4">
                  <div className="text-base font-display font-bold text-white mb-1">
                    BYD Dolphin 2024
                  </div>
                  <div className="flex items-center gap-2 text-xs text-cream/40">
                    <span>420km range</span>
                    <span className="w-1 h-1 rounded-full bg-cream/20" />
                    <span>5 seats</span>
                    <span className="w-1 h-1 rounded-full bg-cream/20" />
                    <span>95HP</span>
                  </div>
                </div>

                {/* Price row */}
                <div className="flex items-end justify-between p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <div className="text-[10px] text-cream/40 mb-0.5 uppercase tracking-wider">Asking</div>
                    <div className="text-sm font-bold text-cream/50 line-through decoration-cream/20">
                      ₦12,500,000
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-mint mb-0.5 uppercase tracking-wider">Current Bid</div>
                    <div className="text-xl font-extrabold text-coral">
                      ₦11,800,000
                    </div>
                  </div>
                </div>

                {/* Bid count + timer */}
                <div className="mt-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-cream/40">
                    <div className="flex -space-x-2">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border-2 border-bark bg-gradient-to-br from-coral/40 to-plum/40"
                        />
                      ))}
                    </div>
                    <span className="text-xs">14 bids</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-coral">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-coral">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    47:55:17
                  </div>
                </div>
              </div>

              {/* Floating savings badge — inside padded wrapper so it's never clipped */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute bottom-0 left-0 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] p-3.5 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-mint">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] text-warm-gray uppercase tracking-wider">Savings</div>
                  <div className="text-base font-extrabold text-bark">
                    ₦200K+/mo
                  </div>
                </div>
              </motion.div>

              {/* Floating verified badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="absolute top-0 right-0 bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] px-3.5 py-2.5 flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-lg bg-mint/10 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-mint">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-bark">Verified</div>
                  <div className="text-[10px] text-warm-gray">5 Online</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* No hard fade — HowItWorks continues on the same dark bg */}
    </section>
  );
}
