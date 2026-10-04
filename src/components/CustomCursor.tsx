import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

export const CustomCursor: React.FC = () => {
  const { cursorText, cursorVariant } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 26, stiffness: 360, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if touch device
    const checkTouch = () => {
      if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
        setIsTouchDevice(true);
      }
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible || cursorVariant === 'hidden') {
    return null;
  }

  const isTextMode = cursorText.length > 0;

  return (
    <>
      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div
          className={`rounded-full bg-[#2F9FEF] transition-all duration-150 ${
            isTextMode ? 'w-2 h-2 opacity-0' : cursorVariant === 'button' ? 'w-3 h-3 bg-[#FFFFFF]' : 'w-2.5 h-2.5 shadow-[0_0_12px_#2F9FEF]'
          }`}
        />
      </motion.div>

      {/* Trailing follower / expanded indicator */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center font-display"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isTextMode ? 1 : cursorVariant === 'button' ? 1.4 : cursorVariant === 'card' ? 1.8 : 1,
          opacity: 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {isTextMode ? (
          <div className="px-3.5 py-1.5 rounded-full bg-[#0B2340]/90 text-[#FFFFFF] font-bold text-[11px] tracking-wider uppercase backdrop-blur-md shadow-[0_0_25px_rgba(47,159,239,0.6)] flex items-center gap-1.5 whitespace-nowrap border border-[#2F9FEF]/50">
            <span>{cursorText}</span>
          </div>
        ) : (
          <div
            className={`rounded-full border transition-all duration-200 ${
              cursorVariant === 'button'
                ? 'w-10 h-10 border-[#2F9FEF]/70 bg-[#1769AA]/20 shadow-[0_0_20px_rgba(47,159,239,0.4)]'
                : cursorVariant === 'card'
                ? 'w-14 h-14 border-[#78C8F5]/60 bg-[#0B2340]/25 shadow-[0_0_25px_rgba(47,159,239,0.3)]'
                : 'w-8 h-8 border-[#2F9FEF]/40 bg-[#0B2340]/15 shadow-[0_0_12px_rgba(47,159,239,0.2)]'
            }`}
          />
        )}

      </motion.div>
    </>
  );
};
