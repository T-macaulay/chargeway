"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sampleOffers, sampleVendors, formatNaira } from "@/data/sampleData";

interface QuizAnswers {
  usage: string;
  budget: string;
  distance: string;
  priority: string;
  name: string;
  whatsapp: string;
  email: string;
}

const questions = [
  {
    key: "usage",
    question: "What will you mainly use the car for?",
    subtitle: "Pick the one that fits best",
    options: [
      { label: "Daily commute", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", color: "coral" },
      { label: "Family trips", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", color: "plum" },
      { label: "Business / Uber", icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 16H3m10 0h4a2 2 0 002-2v-3a2 2 0 00-1.5-1.94l-2-0.5A2 2 0 0013.5 10H13", color: "gold" },
      { label: "Weekend driving", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "mint" },
    ],
  },
  {
    key: "budget",
    question: "What's your budget range?",
    subtitle: "Don't worry, we'll find options that fit",
    options: [
      { label: "Under ₦5M", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "mint" },
      { label: "₦5M - ₦15M", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "coral" },
      { label: "₦15M - ₦25M", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "plum" },
      { label: "Above ₦25M", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "gold" },
    ],
  },
  {
    key: "distance",
    question: "How far do you drive daily?",
    subtitle: "This helps us match your range needs",
    options: [
      { label: "Under 50km", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", color: "mint" },
      { label: "50 - 100km", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", color: "coral" },
      { label: "100 - 200km", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", color: "plum" },
      { label: "200km+", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", color: "gold" },
    ],
  },
  {
    key: "priority",
    question: "What matters most to you?",
    subtitle: "We'll prioritize this in your matches",
    options: [
      { label: "Lowest price", icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z", color: "mint" },
      { label: "Longest range", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "coral" },
      { label: "Best features", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z", color: "plum" },
      { label: "Brand reputation", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", color: "gold" },
    ],
  },
];

type Phase = "quiz" | "contact" | "loading" | "results";

const colorClasses: Record<string, string> = {
  coral: "border-coral/20 hover:border-coral/40 hover:bg-coral/5 peer-checked:border-coral peer-checked:bg-coral/10 peer-checked:shadow-warm",
  plum: "border-plum/20 hover:border-plum/40 hover:bg-plum/5 peer-checked:border-plum peer-checked:bg-plum/10 peer-checked:shadow-warm",
  gold: "border-gold/20 hover:border-gold/40 hover:bg-gold/5 peer-checked:border-gold peer-checked:bg-gold/10 peer-checked:shadow-warm",
  mint: "border-mint/20 hover:border-mint/40 hover:bg-mint/5 peer-checked:border-mint peer-checked:bg-mint/10 peer-checked:shadow-warm",
};

const iconColorClasses: Record<string, string> = {
  coral: "text-coral bg-coral/10",
  plum: "text-plum bg-plum/10",
  gold: "text-gold bg-gold/10",
  mint: "text-mint bg-mint/10",
};

export default function Quiz({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("quiz");
  const [answers, setAnswers] = useState<QuizAnswers>({
    usage: "",
    budget: "",
    distance: "",
    priority: "",
    name: "",
    whatsapp: "",
    email: "",
  });
  const [visibleOffers, setVisibleOffers] = useState<number>(0);
  const [showLeadCapture, setShowLeadCapture] = useState(false);

  const matchedOffers = sampleOffers.filter((o) => {
    const budgetMatch = answers.budget ? o.budgetMatch.includes(answers.budget) : true;
    const usageMatch = answers.usage ? o.usageMatch.includes(answers.usage) : true;
    return budgetMatch || usageMatch;
  }).slice(0, 4);

  const staggerOffers = useCallback(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleOffers(count);
      if (count >= matchedOffers.length) {
        clearInterval(interval);
        setTimeout(() => setShowLeadCapture(true), 1000);
      }
    }, 900);
    return () => clearInterval(interval);
  }, [matchedOffers.length]);

  useEffect(() => {
    if (phase === "results") {
      return staggerOffers();
    }
  }, [phase, staggerOffers]);

  const handleSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setTimeout(() => setPhase("contact"), 300);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save lead
    const leads = JSON.parse(localStorage.getItem("driveev_leads") || "[]");
    leads.push({
      id: "l" + Date.now(),
      name: answers.name,
      whatsapp: answers.whatsapp,
      email: answers.email,
      quizAnswers: {
        usage: answers.usage,
        budget: answers.budget,
        distance: answers.distance,
        priority: answers.priority,
      },
      source: "quiz",
      status: "New",
      notes: "",
      interactions: [
        { type: "quiz", detail: "Completed car customizer quiz", date: new Date().toISOString() },
      ],
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("driveev_leads", JSON.stringify(leads));

    setPhase("loading");
    setTimeout(() => setPhase("results"), 3000);
  };

  const handleSkipContact = () => {
    setPhase("loading");
    setTimeout(() => setPhase("results"), 3000);
  };

  const resetQuiz = () => {
    setStep(0);
    setPhase("quiz");
    setAnswers({ usage: "", budget: "", distance: "", priority: "", name: "", whatsapp: "", email: "" });
    setVisibleOffers(0);
    setShowLeadCapture(false);
    onClose();
  };

  const totalSteps = questions.length + 1; // +1 for contact
  const currentProgress = phase === "quiz" ? step : phase === "contact" ? questions.length : totalSteps;
  const progressPercent = phase === "results" || phase === "loading" ? 100 : (currentProgress / totalSteps) * 100;

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-cream/98 backdrop-blur-md overflow-y-auto"
    >
      {/* Close button */}
      <button
        onClick={resetQuiz}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 rounded-full bg-bark/5 hover:bg-bark/10 flex items-center justify-center transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>

      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-16 min-h-[100dvh] flex flex-col">
        {/* Progress bar */}
        {(phase === "quiz" || phase === "contact") && (
          <div className="mb-8 sm:mb-12">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-warm-gray" >
                {phase === "quiz" ? `Step ${step + 1} of ${questions.length}` : "Almost done!"}
              </span>
              <span className="text-sm font-semibold text-coral">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="h-2 bg-bark/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-coral to-coral-dark rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {/* Quiz Questions */}
            {phase === "quiz" && (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-bark mb-2 text-center"
                  
                >
                  {questions[step].question}
                </h2>
                <p className="text-warm-gray text-center mb-8 sm:mb-10">
                  {questions[step].subtitle}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {questions[step].options.map((option) => (
                    <label key={option.label} className="cursor-pointer">
                      <input
                        type="radio"
                        name={questions[step].key}
                        value={option.label}
                        checked={answers[questions[step].key as keyof QuizAnswers] === option.label}
                        onChange={() => handleSelect(questions[step].key, option.label)}
                        className="peer sr-only"
                      />
                      <div
                        className={`relative p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 ${colorClasses[option.color]}`}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColorClasses[option.color]}`}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d={option.icon} />
                            </svg>
                          </div>
                          <span className="text-base sm:text-lg font-semibold text-bark" >
                            {option.label}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="mt-6 text-sm text-warm-gray hover:text-coral transition-colors flex items-center gap-1 mx-auto"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back
                  </button>
                )}
              </motion.div>
            )}

            {/* Contact Info */}
            {phase === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-bark mb-2 text-center"
                  
                >
                  Where should we send your matches?
                </h2>
                <p className="text-warm-gray text-center mb-8">
                  Get personalized vendor offers straight to your WhatsApp
                </p>

                <form onSubmit={handleContactSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
                  <div>
                    <label className="text-sm font-medium text-bark-light block mb-1.5">Name</label>
                    <input
                      type="text"
                      value={answers.name}
                      onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
                      placeholder="What should we call you?"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-bark/10 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-bark-light block mb-1.5">WhatsApp Number</label>
                    <div className="flex gap-2">
                      <span className="flex items-center px-3 py-3 rounded-xl bg-white border border-bark/10 text-sm text-warm-gray font-medium">
                        +234
                      </span>
                      <input
                        type="tel"
                        value={answers.whatsapp}
                        onChange={(e) => setAnswers({ ...answers, whatsapp: e.target.value.replace(/\D/g, "") })}
                        placeholder="8012345678"
                        className="flex-1 px-4 py-3 rounded-xl bg-white border border-bark/10 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-bark-light block mb-1.5">Email <span className="text-warm-gray">(optional)</span></label>
                    <input
                      type="email"
                      value={answers.email}
                      onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-bark/10 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-2 px-6 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-coral to-coral-dark shadow-warm-lg hover:shadow-warm-hover transition-all active:scale-[0.98]"
                    
                  >
                    Show My Matches
                  </button>
                </form>

                <button
                  onClick={handleSkipContact}
                  className="mt-4 text-sm text-warm-gray hover:text-coral transition-colors flex items-center gap-1 mx-auto"
                >
                  Skip for now, just show results
                </button>
              </motion.div>
            )}

            {/* Loading */}
            {phase === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-coral/20 to-plum/20 flex items-center justify-center mx-auto mb-6">
                  <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-coral"
                  >
                    <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-5.07l-2.83 2.83M9.76 14.24l-2.83 2.83m11.14 0l-2.83-2.83M9.76 9.76L6.93 6.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </motion.svg>
                </div>
                <h3
                  className="text-xl sm:text-2xl font-display font-bold text-bark mb-3"
                  
                >
                  Finding your perfect match...
                </h3>
                <p className="text-warm-gray text-sm sm:text-base">
                  Contacting verified vendors across Nigeria
                </p>

                <div className="mt-8 flex justify-center gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 rounded-full bg-coral"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Results */}
            {phase === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint/10 text-mint text-sm font-medium mb-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {matchedOffers.length} matches found
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl font-display font-bold text-bark mb-2"
                    
                  >
                    Your Vendor Offers
                  </h2>
                  <p className="text-warm-gray text-sm">
                    Based on your preferences, here are the best deals from our vendors
                  </p>
                </div>

                <div className="flex flex-col gap-4 mb-6">
                  {matchedOffers.slice(0, visibleOffers).map((offer, index) => {
                    const vendor = sampleVendors.find((v) => v.id === offer.vendorId);
                    return (
                      <motion.div
                        key={offer.id}
                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-white rounded-2xl p-5 sm:p-6 shadow-warm hover:shadow-warm-lg transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${
                              index % 3 === 0 ? "bg-coral" : index % 3 === 1 ? "bg-plum" : "bg-gold"
                            }`} >
                              {vendor?.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-bark" >
                                  {vendor?.name}
                                </span>
                                {vendor?.verified && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky/10 text-sky text-xs font-medium">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                    Verified
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-warm-gray">{vendor?.location} &middot; {vendor?.deliveries} deliveries</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                          <div className="bg-cream rounded-xl p-3">
                            <div className="text-xs text-warm-gray mb-0.5">Vehicle</div>
                            <div className="text-sm font-semibold text-bark">{offer.vehicleName}</div>
                          </div>
                          <div className="bg-cream rounded-xl p-3">
                            <div className="text-xs text-warm-gray mb-0.5">Price</div>
                            <div className="text-sm font-bold text-coral" >
                              {formatNaira(offer.price)}
                            </div>
                          </div>
                          <div className="bg-cream rounded-xl p-3">
                            <div className="text-xs text-warm-gray mb-0.5">Delivery</div>
                            <div className="text-sm font-semibold text-bark">{offer.deliveryDays} days</div>
                          </div>
                          <div className="bg-cream rounded-xl p-3">
                            <div className="text-xs text-warm-gray mb-0.5">Warranty</div>
                            <div className="text-sm font-semibold text-bark">{offer.warranty}</div>
                          </div>
                        </div>

                        <a
                          href={`https://wa.me/2348000000000?text=${encodeURIComponent(`Hi! I'm interested in the ${offer.vehicleName} from ${vendor?.name} at ${formatNaira(offer.price)}. I found this on DriveEV.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20BD5A] shadow-warm transition-all active:scale-[0.98]"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          Contact This Vendor
                        </a>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Lead capture after offers */}
                <AnimatePresence>
                  {showLeadCapture && !answers.whatsapp && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-br from-coral/5 to-plum/5 rounded-2xl p-6 border border-coral/10"
                    >
                      <h4 className="text-lg font-display font-bold text-bark mb-2" >
                        Get notified of new offers
                      </h4>
                      <p className="text-sm text-warm-gray mb-4">
                        New vendor matches come in daily. Drop your WhatsApp and we&apos;ll send them to you.
                      </p>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const leads = JSON.parse(localStorage.getItem("driveev_leads") || "[]");
                          leads.push({
                            id: "l" + Date.now(),
                            name: formData.get("name") as string,
                            whatsapp: formData.get("whatsapp") as string,
                            source: "lead-form",
                            status: "New",
                            notes: "",
                            interactions: [{ type: "lead-form", detail: "Submitted from quiz results page", date: new Date().toISOString() }],
                            createdAt: new Date().toISOString(),
                          });
                          localStorage.setItem("driveev_leads", JSON.stringify(leads));
                          setShowLeadCapture(false);
                        }}
                        className="flex flex-col sm:flex-row gap-2"
                      >
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Your name"
                          className="flex-1 px-4 py-3 rounded-xl bg-white border border-bark/10 focus:border-coral outline-none text-sm"
                        />
                        <input
                          type="tel"
                          name="whatsapp"
                          required
                          placeholder="WhatsApp number"
                          className="flex-1 px-4 py-3 rounded-xl bg-white border border-bark/10 focus:border-coral outline-none text-sm"
                        />
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-coral shadow-warm hover:shadow-warm-lg transition-all active:scale-95 whitespace-nowrap"
                        >
                          Notify Me
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-center mt-8">
                  <button
                    onClick={resetQuiz}
                    className="text-sm text-warm-gray hover:text-coral transition-colors"
                  >
                    Close and return to DriveEV
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
