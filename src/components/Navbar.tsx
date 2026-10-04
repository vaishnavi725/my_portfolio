import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileDown, Sparkles } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { personalData } from '../data/portfolioData';

const navItems = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'tech-universe', label: 'ECOSYSTEM' },
  { id: 'achievements', label: 'ACHIEVEMENTS' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'certifications', label: 'CERTIFICATIONS' },
  { id: 'leetcode', label: 'LEETCODE' },
  { id: 'terminal', label: 'TERMINAL' },
  { id: 'contact', label: 'CONTACT' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Section Spy
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 flex justify-center ${
          isScrolled ? 'py-3' : 'py-5'
        } px-4 sm:px-6 lg:px-8`}
      >
        <div
          className={`flex items-center justify-between w-full max-w-7xl rounded-full transition-all duration-500 ${
            isScrolled
              ? 'glass-modal py-2 px-5 shadow-[0_12px_35px_rgba(6,21,37,0.85)] border-[#2F9FEF]/30 bg-[#0B2340]/85'
              : 'glass-panel py-3 px-6 border-[#2F9FEF]/20 bg-[#0B2340]/60'
          }`}
        >
          {/* Logo / Monogram */}
          <button
            onClick={() => scrollToSection('home')}
            onMouseEnter={() => setCursor('VK', 'button')}
            onMouseLeave={resetCursor}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0B2340] via-[#1769AA] to-[#2F9FEF] p-[1px] shadow-[0_0_15px_rgba(47,159,239,0.4)]">
              <div className="w-full h-full bg-[#061525] rounded-[11px] flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                <span className="font-display font-extrabold text-sm text-[#FFFFFF] group-hover:text-[#FFFFFF]">
                  VK
                </span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-display font-bold text-xs tracking-wider text-[#FFFFFF] group-hover:text-[#78C8F5] transition-colors">
                VAISHNAVI R KANNUR
              </span>
              <span className="text-[10px] text-[#78C8F5] font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2F9FEF] animate-pulse" />
                CSE • CGPA 9.5
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.slice(0, 9).map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => setCursor(item.label, 'button')}
                  onMouseLeave={resetCursor}
                  className={`relative px-3 py-1.5 text-[11px] font-medium tracking-wider uppercase transition-all duration-300 rounded-full font-mono ${
                    isActive
                      ? 'text-[#FFFFFF] font-semibold'
                      : 'text-[#D8E7F2] hover:text-[#FFFFFF] hover:bg-[#1769AA]/30'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-[#1769AA]/80 border border-[#2F9FEF]/50 shadow-[0_0_15px_rgba(47,159,239,0.35)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Resume Download & Contact */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={personalData.resumeUrl}
              download="Vaishnavi_R_Kannur_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursor('RESUME', 'button')}
              onMouseLeave={resetCursor}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0B2340]/70 hover:bg-[#1769AA]/60 text-[#D8E7F2] hover:text-[#FFFFFF] border border-[#2F9FEF]/30 text-xs font-mono font-medium hover:border-[#78C8F5] transition-all duration-300 hover:shadow-[0_0_15px_rgba(47,159,239,0.3)]"
            >
              <FileDown className="w-3.5 h-3.5 text-[#78C8F5]" />
              <span>Resume</span>
            </a>

            <button
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => setCursor('CONNECT', 'button')}
              onMouseLeave={resetCursor}
              className="relative group overflow-hidden px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0B2340] via-[#1769AA] to-[#2F9FEF] text-white text-xs font-semibold tracking-wider font-mono shadow-[0_0_20px_rgba(47,159,239,0.4)] hover:shadow-[0_0_25px_rgba(47,159,239,0.6)] transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#A9E7FF]" />
                <span>LET'S TALK</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#1769AA] to-[#2F9FEF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={() => setCursor('MENU', 'button')}
              onMouseLeave={resetCursor}
              className="xl:hidden p-2 rounded-xl glass-panel text-[#D8E7F2] hover:text-[#FFFFFF] border-[#2F9FEF]/20 hover:border-[#78C8F5]/50 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-30 xl:hidden rounded-2xl glass-modal p-6 border border-[#2F9FEF]/35 shadow-[0_20px_50px_rgba(6,21,37,0.9)] bg-[#0B2340]/95"
          >
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-[#1769AA] text-[#FFFFFF] border border-[#78C8F5]/50 font-semibold shadow-[0_0_12px_rgba(47,159,239,0.4)]'
                      : 'text-[#D8E7F2] hover:bg-[#1769AA]/30 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-[#1769AA]/40 flex items-center justify-between">
              <a
                href={personalData.resumeUrl}
                download="Vaishnavi_R_Kannur_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B2340] text-[#78C8F5] border border-[#2F9FEF]/30 text-xs font-mono font-medium"
              >
                <FileDown className="w-4 h-4 text-[#2F9FEF]" />
                <span>Download Resume</span>
              </a>
              <span className="text-[11px] text-[#78C8F5] font-mono">CGPA 9.5 • NCET</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};
