"use client";
import { motion } from "framer-motion";

export default function BottomCTA({ onQuizOpen }: { onQuizOpen: () => void }) {
  return (
    <section className="py-20 sm:py-28 bg-bark relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-coral/8 via-plum/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-coral/10 flex items-center justify-center mx-auto mb-8">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-coral sm:w-10 sm:h-10">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mb-6 leading-tight">
            Your Perfect EV
            <br />
            <span className="bg-gradient-to-r from-coral via-coral-light to-gold bg-clip-text text-transparent">
              Is Waiting.
            </span>
          </h2>
          <p className="text-cream/50 text-base sm:text-lg max-w-md mx-auto mb-10 leading-relaxed">
            30 seconds. That&apos;s all it takes. Answer a few questions and
            we&apos;ll match you with verified EVs and the lowest prices in
            Nigeria — delivered to your door.
          </p>

          <button
            onClick={onQuizOpen}
            className="group relative px-10 py-5 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-coral to-coral-dark shadow-[0_0_40px_rgba(255,107,53,0.3)] hover:shadow-[0_0_60px_rgba(255,107,53,0.4)] transition-all duration-300 active:scale-[0.97] overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Discover My Perfect EV
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-coral-dark to-plum-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-cream/30">
            <span>Free. No obligations.</span>
            <span className="w-1 h-1 rounded-full bg-cream/20" />
            <span>Response within 2 hours.</span>
            <span className="w-1 h-1 rounded-full bg-cream/20" />
            <span className="text-mint/70 font-medium">₦200K/mo savings</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
