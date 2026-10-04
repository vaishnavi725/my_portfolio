import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Mail } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

export const FinalCTA: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl p-8 sm:p-14 text-center border border-[#D9AFC4]/40 relative overflow-hidden bg-gradient-to-br from-[#24152A]/95 via-[#160F1B]/90 to-[#24152A]/95 shadow-[0_20px_50px_rgba(22,15,27,0.8)]"
        >
          {/* Background aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4B2855]/25 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4B2855]/60 border border-[#D9AFC4]/40 text-[#D9AFC4] text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D9AFC4]" />
              <span>OPPORTUNITIES & COLLABORATION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white mb-4 leading-tight">
              Have an idea? <br />
              <span className="bg-gradient-to-r from-[#FFFFFF] via-[#C8B8D2] to-[#D9AFC4] bg-clip-text text-transparent">
                Let's turn it into reality.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#F4EDE7]/90 leading-relaxed mb-8">
              Whether you have an internship, engineering role, or innovative cloud/AI system to build, I'm ready to contribute.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                onMouseEnter={() => setCursor('CONNECT', 'button')}
                onMouseLeave={resetCursor}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#4B2855] via-[#6F4A78] to-[#A88FB5] text-white font-mono text-xs font-bold tracking-wider uppercase shadow-[0_0_25px_rgba(168,143,181,0.4)] hover:scale-105 transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#D9AFC4]" />
                <span>Let's Connect</span>
              </button>

              <button
                onClick={() => scrollToSection('projects')}
                onMouseEnter={() => setCursor('PROJECTS', 'button')}
                onMouseLeave={resetCursor}
                className="px-6 py-3.5 rounded-full glass-panel hover:bg-[#24152A] text-[#F4EDE7] border border-[#4B2855] hover:border-[#D9AFC4] font-mono text-xs tracking-wider transition-all flex items-center gap-2"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 text-[#D9AFC4]" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
