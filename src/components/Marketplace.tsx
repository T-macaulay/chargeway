"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sampleVehicles, formatNaira, type Vehicle } from "@/data/sampleData";

function CountdownTimer({ endTime }: { endTime: number }) {
  const [mounted, setMounted] = useState(false);
  const calc = useCallback(() => {
    const diff = Math.max(0, endTime - Date.now());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { h, m, s, expired: diff <= 0 };
  }, [endTime]);

  const [time, setTime] = useState({ h: 0, m: 0, s: 0, expired: false });

  useEffect(() => {
    setMounted(true);
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);

  if (!mounted) {
    return <span className="text-warm-gray text-sm font-medium">--:--:--</span>;
  }

  if (time.expired) {
    return <span className="text-warm-gray text-sm font-medium">Expired</span>;
  }

  return (
    <div className="flex items-center gap-1.5 text-sm font-mono font-bold">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-coral">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="text-bark timer-tick">
        {String(time.h).padStart(2, "0")}:{String(time.m).padStart(2, "0")}:
        {String(time.s).padStart(2, "0")}
      </span>
    </div>
  );
}

// Better car silhouette per vehicle type
function CarVisual({ hot, index }: { hot?: boolean; index: number }) {
  const accent = hot ? "#FF6B35" : "#7B2D8E";
  // Alternate between sedan, SUV, compact shapes
  const shapes = [
    // Sedan
    <g key="sedan">
      <ellipse cx="140" cy="118" rx="95" ry="7" fill="currentColor" opacity="0.08" />
      <path d="M55 92 C55 64 82 36 115 34 L165 34 C195 34 225 58 228 92 Z" fill="currentColor" opacity="0.12" />
      <path d="M115 50 L165 50 C172 50 190 62 196 78 L84 78 C90 62 108 50 115 50 Z" fill="currentColor" opacity="0.06" />
      <rect x="90" y="56" width="30" height="18" rx="3" fill="currentColor" opacity="0.04" />
      <rect x="160" y="56" width="30" height="18" rx="3" fill="currentColor" opacity="0.04" />
      <circle cx="88" cy="106" r="14" fill="currentColor" opacity="0.12" />
      <circle cx="192" cy="106" r="14" fill="currentColor" opacity="0.12" />
      <circle cx="88" cy="106" r="6" fill={accent} />
      <circle cx="192" cy="106" r="6" fill={accent} />
    </g>,
    // SUV
    <g key="suv">
      <ellipse cx="140" cy="118" rx="95" ry="7" fill="currentColor" opacity="0.08" />
      <path d="M55 95 C55 60 75 30 120 28 L160 28 C205 30 225 60 225 95 Z" fill="currentColor" opacity="0.12" />
      <path d="M120 40 L160 40 C168 40 185 52 192 72 L88 72 C95 52 112 40 120 40 Z" fill="currentColor" opacity="0.06" />
      <circle cx="88" cy="106" r="16" fill="currentColor" opacity="0.12" />
      <circle cx="192" cy="106" r="16" fill="currentColor" opacity="0.12" />
      <circle cx="88" cy="106" r="7" fill={accent} />
      <circle cx="192" cy="106" r="7" fill={accent} />
    </g>,
    // Compact
    <g key="compact">
      <ellipse cx="140" cy="116" rx="85" ry="6" fill="currentColor" opacity="0.08" />
      <path d="M65 90 C65 66 88 40 118 38 L162 38 C192 40 215 66 215 90 Z" fill="currentColor" opacity="0.12" />
      <path d="M118 48 L162 48 C170 48 182 58 188 74 L92 74 C98 58 110 48 118 48 Z" fill="currentColor" opacity="0.06" />
      <circle cx="92" cy="104" r="13" fill="currentColor" opacity="0.12" />
      <circle cx="188" cy="104" r="13" fill="currentColor" opacity="0.12" />
      <circle cx="92" cy="104" r="5" fill={accent} />
      <circle cx="188" cy="104" r="5" fill={accent} />
    </g>,
  ];

  return (
    <svg
      width="200"
      height="100"
      viewBox="0 0 280 130"
      fill="none"
      className="text-bark"
    >
      {shapes[index % shapes.length]}
    </svg>
  );
}

function VehicleCard({
  vehicle,
  onBid,
  index,
}: {
  vehicle: Vehicle;
  onBid: (v: Vehicle) => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group bg-white rounded-2xl overflow-hidden border border-bark/[0.06] hover:border-coral/20 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer"
      onClick={() => onBid(vehicle)}
    >
      {/* Image area */}
      <div className="relative h-48 sm:h-56 bg-gradient-to-br from-cream to-cream-dark flex items-center justify-center overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent z-[1]" />

        {vehicle.hot && (
          <div className="absolute top-3 left-3 z-10 px-3 py-1.5 bg-coral text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-[0_2px_12px_rgba(255,107,53,0.3)]">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.66 11.2C17.43 10.9 17.2 10.64 16.97 10.38C16.46 9.82 15.91 9.35 15.47 8.75C14.4 7.26 14.12 5.59 14.67 3.85C14.74 3.63 14.65 3.45 14.5 3.35C14.35 3.26 14.14 3.25 13.97 3.35C12.26 4.35 10.93 5.79 10.17 7.58C9.46 9.25 9.34 10.83 9.58 12.47C9.59 12.56 9.6 12.65 9.6 12.75C9.6 13.06 9.39 13.32 9.08 13.43C8.74 13.56 8.39 13.47 8.13 13.22C8.04 13.13 7.97 13.03 7.91 12.92C7.15 11.68 7.05 10.37 7.38 8.98C7.42 8.81 7.35 8.69 7.2 8.6C7.05 8.53 6.88 8.58 6.79 8.7C6.22 9.51 5.75 10.42 5.42 11.41C4.95 12.78 4.83 14.11 5.07 15.44C5.49 17.85 6.86 19.6 9.03 20.68C11.31 21.82 13.56 21.85 15.73 20.8C18.21 19.58 19.58 17.51 19.74 14.74C19.83 13.3 19.34 12.01 18.55 10.86C18.27 10.47 17.97 10.12 17.66 11.2Z" />
            </svg>
            HOT
          </div>
        )}

        <div className="relative z-[2] group-hover:scale-105 transition-transform duration-500">
          <CarVisual hot={vehicle.hot} index={index} />
        </div>

        <div className="absolute bottom-3 right-3 z-10 bg-bark/80 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-semibold text-white">
          {vehicle.year}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Name + Timer */}
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-display font-bold text-bark">
            {vehicle.name}
          </h3>
          <CountdownTimer endTime={vehicle.timerEnd} />
        </div>

        {/* Specs */}
        <div className="flex items-center gap-2 text-xs text-warm-gray mb-4">
          <span>{vehicle.specs.range} range</span>
          <span className="w-1 h-1 rounded-full bg-warm-gray/30" />
          <span>{vehicle.specs.seats} seats</span>
          <span className="w-1 h-1 rounded-full bg-warm-gray/30" />
          <span>{vehicle.specs.power}</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-bark/5 mb-4" />

        {/* Price row */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-warm-gray/70 font-medium mb-1">
              Asking Price
            </div>
            <div className="text-base font-bold text-bark/50 line-through decoration-bark/15">
              {formatNaira(vehicle.askingPrice)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-coral font-medium mb-1">
              Current Bid
            </div>
            <div className="text-xl font-extrabold text-coral">
              {formatNaira(vehicle.currentBid)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-bark-light">
            <div className="flex -space-x-1.5">
              {Array.from({ length: Math.min(3, vehicle.bidCount) }).map(
                (_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-coral/30 to-plum/30"
                  />
                )
              )}
            </div>
            <span className="font-semibold">{vehicle.bidCount}</span>
            <span className="text-warm-gray">bids</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBid(vehicle);
            }}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-bark hover:bg-coral shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_20px_rgba(255,107,53,0.2)] transition-all duration-200 active:scale-95"
          >
            Place Bid
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function BidModal({
  vehicle,
  onClose,
}: {
  vehicle: Vehicle;
  onClose: () => void;
}) {
  const [bidAmount, setBidAmount] = useState("");
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const leads = JSON.parse(localStorage.getItem("driveev_leads") || "[]");
    leads.push({
      id: "l" + Date.now(),
      name,
      whatsapp,
      source: "bid",
      status: "New",
      notes: "",
      interactions: [
        {
          type: "bid",
          detail: `Bid ${formatNaira(parseInt(bidAmount.replace(/,/g, "")))} on ${vehicle.name}`,
          date: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("driveev_leads", JSON.stringify(leads));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-bark/60 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full sm:max-w-lg bg-cream rounded-t-3xl sm:rounded-3xl shadow-[0_-8px_60px_rgba(0,0,0,0.2)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-bark px-6 pt-6 pb-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
          <h3 className="text-xl font-display font-bold text-white mb-1">
            {vehicle.name}
          </h3>
          <p className="text-sm text-cream/50">
            Asking: {formatNaira(vehicle.askingPrice)} · Current bid:{" "}
            {formatNaira(vehicle.currentBid)}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSubmit}
              className="p-6 flex flex-col gap-4"
            >
              <div>
                <label className="text-sm font-medium text-bark-light block mb-1.5">
                  Your Bid (₦)
                </label>
                <input
                  type="text"
                  required
                  value={bidAmount}
                  onChange={(e) =>
                    setBidAmount(e.target.value.replace(/[^0-9,]/g, ""))
                  }
                  placeholder="e.g. 12,000,000"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-bark/10 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all text-bark text-lg font-semibold"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-bark-light block mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-bark/10 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-bark-light block mb-1.5">
                  WhatsApp Number
                </label>
                <div className="flex gap-2">
                  <span className="flex items-center px-3 py-3 rounded-xl bg-white border border-bark/10 text-sm text-warm-gray font-medium">
                    +234
                  </span>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) =>
                      setWhatsapp(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="8012345678"
                    className="flex-1 px-4 py-3 rounded-xl bg-white border border-bark/10 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-2 px-6 py-4 rounded-2xl text-base font-bold text-white bg-bark hover:bg-coral shadow-warm-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Submit Bid
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-mint/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-mint"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-display font-bold text-bark mb-2">
                Bid Submitted!
              </h4>
              <p className="text-sm text-warm-gray mb-6">
                We&apos;ll send you a WhatsApp confirmation shortly.
                You&apos;ll be notified of any bid updates.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-coral border-2 border-coral/20 hover:bg-coral/5 transition-all"
              >
                Back to Deals
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ── Trust strip ──────────────────────────────────────────────────────────────

const TRUST_SIGNALS = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mint">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "Verified Vendors Only",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coral">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    label: "120-Point Inspection",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-plum-light">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    label: "Doorstep Delivery",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" />
      </svg>
    ),
    label: "Full Warranty Included",
  },
];

function TrustStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 py-5 px-6 rounded-2xl bg-white border border-bark/[0.05] shadow-[0_2px_20px_rgba(0,0,0,0.04)] mb-14 sm:mb-16"
    >
      {TRUST_SIGNALS.map((s, i) => (
        <div key={s.label} className="flex items-center gap-2">
          {i > 0 && (
            <span className="hidden sm:block w-px h-4 bg-bark/8 mr-2" />
          )}
          {s.icon}
          <span className="text-sm font-medium text-bark-light">{s.label}</span>
        </div>
      ))}
    </motion.div>
  );
}

export default function Marketplace() {
  const [vehicles] = useState<Vehicle[]>(sampleVehicles);
  const [bidVehicle, setBidVehicle] = useState<Vehicle | null>(null);
  const [filter, setFilter] = useState<"all" | "hot" | "featured">("all");

  const filtered = vehicles.filter((v) => {
    if (!v.active) return false;
    if (filter === "hot") return v.hot;
    if (filter === "featured") return v.featured;
    return true;
  });

  return (
    <section id="marketplace" className="py-20 sm:py-28 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-coral/10 text-coral text-sm font-semibold mb-5">
            <span className="w-2 h-2 rounded-full bg-coral pulse-live" />
            Live Marketplace
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-bark mb-4">
            Active Deals
          </h2>
          <p className="text-warm-gray text-base sm:text-lg max-w-xl mx-auto">
            Real-time bids on verified electric vehicles. Naira prices updated
            daily. Place your bid and get notified instantly.
          </p>
        </motion.div>

        {/* Integrated trust strip — replaces standalone TrustBar */}
        <TrustStrip />

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-10 sm:mb-14">
          {(["all", "hot", "featured"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                filter === f
                  ? "bg-bark text-white shadow-[0_2px_12px_rgba(0,0,0,0.12)]"
                  : "bg-white text-bark-light hover:bg-bark/5 border border-bark/[0.06]"
              }`}
            >
              {f === "all" ? "All Deals" : f === "hot" ? "Hot" : "Featured"}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((vehicle, index) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onBid={setBidVehicle}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Bid modal */}
      <AnimatePresence>
        {bidVehicle && (
          <BidModal
            vehicle={bidVehicle}
            onClose={() => setBidVehicle(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
