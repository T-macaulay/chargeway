"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatNaira } from "@/data/sampleData";

export default function Calculator() {
  const [fuelSpend, setFuelSpend] = useState("");
  const [calculated, setCalculated] = useState(false);

  const monthly = parseInt(fuelSpend.replace(/,/g, "")) || 0;
  // EV charging costs roughly 20-25% of petrol equivalent
  const evMonthlyCost = Math.round(monthly * 0.2);
  const monthlySaving = monthly - evMonthlyCost;
  const year1 = monthlySaving * 12;
  const year2 = monthlySaving * 24;
  const year5 = monthlySaving * 60;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (monthly > 0) setCalculated(true);
  };

  return (
    <section id="calculator" className="py-20 sm:py-28 bg-cream relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-coral/5 to-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-plum/5 to-coral/3 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-medium mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" />
            </svg>
            Savings Calculator
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-bark mb-4"
            
          >
            How Much Will You Save?
          </h2>
          <p className="text-warm-gray text-base sm:text-lg max-w-xl mx-auto">
            Enter your current monthly fuel spend and see how much switching to electric could save you.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-warm-lg p-6 sm:p-8 md:p-10"
          >
            <form onSubmit={handleCalculate} className="mb-8">
              <label className="text-lg font-semibold text-bark block mb-3" >
                How much do you spend on fuel monthly?
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-warm-gray" >
                    ₦
                  </span>
                  <input
                    type="text"
                    value={fuelSpend}
                    onChange={(e) => {
                      setFuelSpend(e.target.value.replace(/[^0-9,]/g, ""));
                      setCalculated(false);
                    }}
                    placeholder="150,000"
                    className="w-full pl-10 pr-4 py-4 rounded-2xl bg-cream border-2 border-bark/10 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all text-xl font-bold text-bark"
                    
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-coral to-coral-dark shadow-warm hover:shadow-warm-lg transition-all active:scale-[0.97] whitespace-nowrap"
                  
                >
                  Calculate
                </button>
              </div>
              <p className="text-xs text-warm-gray mt-2">
                Average Nigerian car owner spends ₦150,000 - ₦300,000/month on fuel
              </p>
            </form>

            <AnimatePresence>
              {calculated && monthly > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Monthly comparison */}
                  <div className="bg-cream rounded-2xl p-5 sm:p-6 mb-6">
                    <h4 className="text-sm font-medium text-warm-gray mb-4 uppercase tracking-wider">Monthly Breakdown</h4>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-1">
                        <div className="text-xs text-warm-gray mb-1">Petrol Cost</div>
                        <div className="text-lg font-bold text-bark" >
                          {formatNaira(monthly)}
                        </div>
                        <div className="mt-2 h-3 bg-red-400/30 rounded-full">
                          <div className="h-full bg-red-400 rounded-full" style={{ width: "100%" }} />
                        </div>
                      </div>
                      <div className="text-warm-gray font-bold">vs</div>
                      <div className="flex-1">
                        <div className="text-xs text-warm-gray mb-1">EV Charging</div>
                        <div className="text-lg font-bold text-mint" >
                          {formatNaira(evMonthlyCost)}
                        </div>
                        <div className="mt-2 h-3 bg-mint/30 rounded-full">
                          <div className="h-full bg-mint rounded-full" style={{ width: "20%" }} />
                        </div>
                      </div>
                    </div>
                    <div className="text-center pt-3 border-t border-bark/5">
                      <span className="text-sm text-warm-gray">Monthly savings: </span>
                      <span className="text-xl font-bold text-coral" >
                        {formatNaira(monthlySaving)}
                      </span>
                    </div>
                  </div>

                  {/* Savings timeline */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                    {[
                      { period: "1 Year", amount: year1, color: "coral" },
                      { period: "2 Years", amount: year2, color: "plum" },
                      { period: "5 Years", amount: year5, color: "gold" },
                    ].map((item, i) => (
                      <motion.div
                        key={item.period}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.15 }}
                        className={`text-center p-4 sm:p-5 rounded-2xl ${
                          item.color === "coral"
                            ? "bg-coral/5 border border-coral/10"
                            : item.color === "plum"
                            ? "bg-plum/5 border border-plum/10"
                            : "bg-gold/5 border border-gold/10"
                        }`}
                      >
                        <div className="text-xs text-warm-gray mb-1">{item.period}</div>
                        <div
                          className={`text-lg sm:text-2xl font-extrabold ${
                            item.color === "coral" ? "text-coral" : item.color === "plum" ? "text-plum" : "text-gold"
                          }`}
                          
                        >
                          {formatNaira(item.amount)}
                        </div>
                        <div className="text-xs text-warm-gray mt-1">saved</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Insight */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-gradient-to-r from-coral/5 to-plum/5 rounded-2xl p-5 text-center border border-coral/10"
                  >
                    <p className="text-bark font-medium" >
                      In 5 years, your fuel savings of{" "}
                      <span className="font-bold text-coral">{formatNaira(year5)}</span>{" "}
                      could cover {year5 >= 12000000 ? "the full cost of a budget EV!" : year5 >= 5000000 ? "a significant part of an EV purchase!" : "major maintenance and more!"}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
