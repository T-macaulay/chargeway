"use client";
import { motion } from "framer-motion";
import { sampleContent } from "@/data/sampleData";

const typeColors: Record<string, { bg: string; text: string }> = {
  Review: { bg: "bg-coral/10", text: "text-coral" },
  Guide: { bg: "bg-plum/10", text: "text-plum" },
  Comparison: { bg: "bg-gold/10", text: "text-gold" },
  Vlog: { bg: "bg-mint/10", text: "text-mint" },
};

const gradients = [
  "from-coral/15 to-gold/15",
  "from-plum/15 to-coral/15",
  "from-mint/10 to-sky/10",
  "from-gold/15 to-coral/10",
  "from-sky/10 to-plum/10",
  "from-coral/10 to-mint/10",
];

export default function Content() {
  return (
    <section id="content" className="py-20 sm:py-28 bg-white relative">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-20 adire-pattern pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-plum/10 text-plum text-sm font-medium mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" />
            </svg>
            Learn About EVs
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-bark mb-4"
            
          >
            EV Knowledge Hub
          </h2>
          <p className="text-warm-gray text-base sm:text-lg max-w-xl mx-auto">
            Real reviews, honest guides, and everything you need to know before going electric in Nigeria.
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sampleContent.map((item, index) => {
            const colors = typeColors[item.type] || typeColors.Guide;
            return (
              <motion.a
                key={item.id}
                href={item.link}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-white rounded-2xl overflow-hidden border border-bark/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
              >
                {/* Thumbnail placeholder */}
                <div className={`relative h-44 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center overflow-hidden`}>
                  {/* Play button */}
                  <div className="w-14 h-14 rounded-full bg-white/90 shadow-warm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-coral ml-0.5">
                      <path d="M5 3l14 9-14 9V3z" fill="currentColor" />
                    </svg>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-bark/70 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
                    {item.duration}
                  </div>

                  {/* Type badge */}
                  <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold ${colors.bg} ${colors.text}`}>
                    {item.type}
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3
                    className="text-base sm:text-lg font-bold text-bark mb-3 leading-snug group-hover:text-coral transition-colors"
                    
                  >
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-warm-gray">
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" />
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" />
                      </svg>
                      {item.views} views
                    </span>
                    <span className="w-1 h-1 rounded-full bg-warm-gray/40" />
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" />
                      </svg>
                      {item.duration}
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
