import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileDown, Sparkles, Mail } from 'lucide-react';
import { personalData, socialLinks } from '../data/portfolioData';
import { ProfileComposition } from './ProfileComposition';
import { useCursor } from '../context/CursorContext';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './ui/Icons';
import { MagneticButton } from './ui/MagneticButton';

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalData.roleSubtitles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

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

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github':
        return <GithubIcon className="w-4 h-4" />;
      case 'linkedin':
        return <LinkedinIcon className="w-4 h-4" />;
      case 'leetcode':
        return <LeetCodeIcon className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 md:pt-36 md:pb-28 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B2340] border border-[#2F9FEF]/50 text-[#78C8F5] text-xs font-mono font-medium mb-6 shadow-[0_0_20px_rgba(47,159,239,0.25)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2F9FEF] animate-spin-slow" />
              <span>HELLO WORLD • WELCOME TO MY PORTFOLIO</span>
            </motion.div>

            {/* Name with blur-to-focus & scale feel */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight font-display text-white leading-none mb-3"
            >
              VAISHNAVI <br />
              <span className="bg-gradient-to-r from-[#F8FCFF] via-[#78C8F5] to-[#2F9FEF] bg-clip-text text-transparent">
                R KANNUR
              </span>
            </motion.h1>

            {/* Rotating Subtitle */}
            <div className="h-10 sm:h-12 flex items-center mb-4">
              <span className="text-lg sm:text-xl md:text-2xl font-mono text-[#2F9FEF] mr-2">
                &gt;
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-lg sm:text-xl md:text-2xl font-mono font-semibold text-[#78C8F5] tracking-wide"
                >
                  {personalData.roleSubtitles[roleIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-[#F8FCFF] mb-5 leading-snug"
            >
              "{personalData.headline}"
            </motion.h2>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-[#D8E7F2] text-sm sm:text-base leading-relaxed max-w-2xl mb-8"
            >
              {personalData.bio}
            </motion.p>

            {/* Magnetic CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 w-full"
            >
              <MagneticButton>
                <button
                  onClick={() => scrollToSection('projects')}
                  onMouseEnter={() => setCursor('PROJECTS', 'button')}
                  onMouseLeave={resetCursor}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#0B2340] via-[#1769AA] via-[#2F9FEF] to-[#78C8F5] text-white font-semibold text-xs sm:text-sm font-mono tracking-wider shadow-[0_0_25px_rgba(47,159,239,0.4)] hover:shadow-[0_0_35px_rgba(47,159,239,0.7)] hover:scale-105 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </MagneticButton>

              <MagneticButton>
                <a
                  href={personalData.resumeUrl}
                  download="Vaishnavi_R_Kannur_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursor('DOWNLOAD', 'button')}
                  onMouseLeave={resetCursor}
                  className="px-5 py-3 rounded-full bg-[#0B2340] hover:bg-[#1769AA] text-[#F8FCFF] border border-[#2F9FEF]/50 hover:border-[#78C8F5] font-mono text-xs sm:text-sm tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <FileDown className="w-4 h-4 text-[#78C8F5]" />
                  <span>Download Resume</span>
                </a>
              </MagneticButton>

              <MagneticButton>
                <button
                  onClick={() => scrollToSection('contact')}
                  onMouseEnter={() => setCursor('CONTACT', 'button')}
                  onMouseLeave={resetCursor}
                  className="px-5 py-3 rounded-full bg-[#061525] hover:bg-[#0B2340] text-[#D8E7F2] hover:text-white border border-[#1769AA]/50 hover:border-[#2F9FEF] font-mono text-xs sm:text-sm tracking-wider transition-all duration-300 cursor-pointer"
                >
                  <span>Contact Me</span>
                </button>
              </MagneticButton>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs font-mono text-[#78C8F5] uppercase tracking-widest mr-1">
                Connect:
              </span>
              {socialLinks.map((social) => (
                <MagneticButton key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursor(social.name, 'button')}
                    onMouseLeave={resetCursor}
                    className="w-10 h-10 rounded-full bg-[#0B2340] border border-[#1769AA]/50 hover:border-[#2F9FEF] text-[#D8E7F2] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                    aria-label={social.name}
                  >
                    {getSocialIcon(social.name)}
                  </a>
                </MagneticButton>
              ))}
            </motion.div>
          </div>

          {/* Right 3-Ring Orbit Profile Composition */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ProfileComposition />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
