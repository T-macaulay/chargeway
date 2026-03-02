"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyElectric from "@/components/WhyElectric";
import HowItWorks from "@/components/HowItWorks";
import Marketplace from "@/components/Marketplace";
import Quiz from "@/components/Quiz";
import Content from "@/components/Content";
import Calculator from "@/components/Calculator";
import BottomCTA from "@/components/BottomCTA";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

// Layout: 6 main sections
// 1. Hero (dark) → 2. HowItWorks (dark, seamless) → 3. Marketplace (cream, with trust signals)
// 4. Content (white) → 5. Calculator (cream) → 6. BottomCTA (dark)

export default function Home() {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      <Navbar onQuizOpen={() => setQuizOpen(true)} />
      <main>
        <Hero onQuizOpen={() => setQuizOpen(true)} />

        <section id="why-electric">
          <WhyElectric />
        </section>

        <section id="how-it-works">
          <HowItWorks />
        </section>

        {/* TrustBar merged into Marketplace header */}
        <Marketplace />

        <div id="quiz" />
        <Content />
        <Calculator />
        <BottomCTA onQuizOpen={() => setQuizOpen(true)} />
      </main>
      <Footer />
      <FloatingWhatsApp />

      <AnimatePresence>
        {quizOpen && (
          <Quiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
