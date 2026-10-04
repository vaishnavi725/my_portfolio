import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Top' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'contact', label: 'Contact' },
];

export const SideScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top horizontal progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4B2855] via-[#A88FB5] via-[#8CC9E8] to-[#65BBD8] z-50 origin-left shadow-[0_0_12px_rgba(140,201,232,0.8)]"
        style={{ scaleX: scaleY }}
      />

      {/* Right side thin vertical cinematic progress tracker */}
      <div className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 select-none">
        {/* Track Line Background */}
        <div className="relative h-44 w-[2px] bg-[#24152A] rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-[#A88FB5] via-[#8CC9E8] to-[#65BBD8] shadow-[0_0_10px_#8CC9E8] origin-top"
            style={{ height: '100%', scaleY }}
          />
        </div>

        {/* Section Dots */}
        <div className="flex flex-col gap-2 mt-2">
          {sections.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="group relative flex items-center justify-end"
                aria-label={`Scroll to ${s.label}`}
              >
                {/* Tooltip on hover */}
                <span className="absolute right-6 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#24152A] border border-[#8CC9E8]/30 text-[#8CC9E8] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
                  {s.label}
                </span>

                {/* Dot */}
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-2 h-2 bg-[#8CC9E8] shadow-[0_0_10px_#8CC9E8] scale-125'
                      : 'bg-[#A88FB5]/40 group-hover:bg-[#8CC9E8]/80'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
