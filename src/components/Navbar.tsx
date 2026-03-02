"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ onQuizOpen }: { onQuizOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Deals", href: "#marketplace" },
    { label: "Learn", href: "#content" },
    { label: "Calculator", href: "#calculator" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bark/95 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.2)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center shadow-[0_2px_12px_rgba(255,107,53,0.3)]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white sm:w-6 sm:h-6"
                >
                  <path
                    d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-display font-bold tracking-tight">
                <span className="text-white">Drive</span>
                <span className="text-coral">EV</span>
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 rounded-full text-sm font-medium text-cream/60 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Single Desktop CTA */}
            <div className="hidden md:flex items-center">
              <button
                onClick={onQuizOpen}
                className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-coral to-coral-dark hover:from-coral-dark hover:to-coral shadow-[0_2px_16px_rgba(255,107,53,0.25)] hover:shadow-[0_4px_24px_rgba(255,107,53,0.35)] transition-all duration-200 active:scale-95"
              >
                Find My Deal
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${
                    menuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${
                    menuOpen ? "opacity-0 scale-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden bg-bark/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-medium text-cream/60 hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-white/5 mt-2">
                <button
                  onClick={() => {
                    onQuizOpen();
                    setMenuOpen(false);
                  }}
                  className="w-full px-5 py-3 rounded-xl text-base font-bold text-white bg-gradient-to-r from-coral to-coral-dark shadow-[0_2px_16px_rgba(255,107,53,0.25)]"
                >
                  Find My Deal
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
