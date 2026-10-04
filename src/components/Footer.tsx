import React from 'react';
import { personalData, socialLinks } from '../data/portfolioData';
import { useCursor } from '../context/CursorContext';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './ui/Icons';

export const Footer: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <footer className="relative py-12 border-t border-[#1976D2]/25 bg-[#061525] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left branding */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-sm sm:text-base text-white tracking-wider">
              {personalData.name}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#0B2340] border border-[#1976D2]/40 text-[#78C8F5] text-[10px] font-mono">
              CSE • 9.5 CGPA
            </span>
          </div>
          <p className="text-xs font-mono text-[#78C8F5]/90 mt-1">
            "Building • Learning • Creating"
          </p>
        </div>

        {/* Middle / Social links */}
        <div className="flex items-center gap-3">
          {socialLinks.slice(0, 3).map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursor(social.name, 'button')}
              onMouseLeave={resetCursor}
              className="p-2.5 rounded-full bg-[#0B2340]/80 hover:bg-[#10325A] text-[#78C8F5] hover:text-[#FFFFFF] border border-[#1976D2]/30 hover:border-[#2F9FEF] transition-all shadow-[0_2px_10px_rgba(25,118,210,0.12)]"
              aria-label={social.name}
            >
              {social.name === 'GitHub' && <GithubIcon className="w-4 h-4" />}
              {social.name === 'LinkedIn' && <LinkedinIcon className="w-4 h-4" />}
              {social.name === 'LeetCode' && <LeetCodeIcon className="w-4 h-4" />}
            </a>
          ))}
        </div>

        {/* Right copyright */}
        <div className="text-xs font-mono text-[#D8E7F2]/80 text-center sm:text-right">
          <div>© 2026 Vaishnavi R Kannur</div>
          <div className="text-[10px] text-[#78C8F5]/70 mt-0.5">Engineered with React, TypeScript & Tailwind</div>
        </div>

      </div>
    </footer>
  );
};
