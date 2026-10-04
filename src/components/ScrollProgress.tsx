import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [showBackToTop, setShowBackToTop] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top glowing progress line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4B2855] via-[#A88FB5] to-[#D9AFC4] origin-left z-[100] shadow-[0_0_12px_rgba(217,175,196,0.6)]"
        style={{ scaleX }}
      />

      {/* Floating Back-to-Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          onMouseEnter={() => setCursor('TOP', 'button')}
          onMouseLeave={resetCursor}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full glass-panel border border-[#A88FB5]/40 text-[#D9AFC4] hover:text-[#FFFFFF] hover:bg-[#4B2855]/40 hover:border-[#D9AFC4] shadow-[0_0_20px_rgba(168,143,181,0.3)] transition-all duration-300 focus:outline-none group"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 text-[#D9AFC4]" />
        </motion.button>
      )}
    </>
  );
};
