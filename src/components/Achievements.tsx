import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Zap, Code2, Cloud, ExternalLink } from 'lucide-react';
import { achievementsData } from '../data/portfolioData';
import type { AchievementItem } from '../types/portfolio';
import { useCursor } from '../context/CursorContext';
import { RotatingSectionBadge } from './ui/RotatingSectionBadge';

export const Achievements: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  const renderVisual = (item: AchievementItem) => {
    switch (item.visualType) {
      case 'leetcode':
        return (
          <div className="p-3.5 rounded-2xl bg-[#160F1B] border border-[#8CC9E8]/40 text-xs font-mono">
            <div className="flex justify-between items-center text-[#8CC9E8] mb-2">
              <span className="flex items-center gap-1.5 font-bold">
                <Code2 className="w-4 h-4 text-[#8CC9E8]" /> 248+ Solved
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#4B2855] border border-[#8CC9E8]/40 text-[10px] text-[#F8F5F2]">
                50 Days Streak
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-[10px] text-center">
              <div className="p-1.5 rounded-xl bg-[#24152A] border border-[#4B2855] text-[#8CC9E8]">
                195 Easy
              </div>
              <div className="p-1.5 rounded-xl bg-[#24152A] border border-[#4B2855] text-[#C9A85E]">
                50 Med
              </div>
              <div className="p-1.5 rounded-xl bg-[#24152A] border border-[#4B2855] text-white">
                3 Hard
              </div>
            </div>
          </div>
        );
      case 'hyperapi':
        return (
          <div className="p-3.5 rounded-2xl bg-[#160F1B] border border-[#8CC9E8]/40 text-xs font-mono">
            <div className="flex justify-between items-center text-[#8CC9E8] mb-2">
              <span className="flex items-center gap-1.5 font-bold">
                <Zap className="w-4 h-4 text-[#8CC9E8]" /> AI Document Pipeline
              </span>
              <span className="text-[10px] text-white font-bold">98.4% Accuracy</span>
            </div>
            <div className="p-2 rounded-xl bg-[#24152A] border border-[#4B2855] text-[11px] text-[#F8F5F2] flex justify-between">
              <span>1,000 PDF Pages</span>
              <span className="text-[#8CC9E8] font-bold">&lt; 15 Minutes</span>
            </div>
          </div>
        );
      case 'sih':
        return (
          <div className="p-3.5 rounded-2xl bg-[#160F1B] border border-[#8CC9E8]/40 text-xs font-mono">
            <div className="flex justify-between items-center text-[#8CC9E8] mb-2">
              <span className="flex items-center gap-1.5 font-bold">
                <Trophy className="w-4 h-4 text-[#C9A85E]" /> SIH 2026
              </span>
              <span className="text-[10px] text-[#C8B8D2]">Top Finalist</span>
            </div>
            <div className="p-2 rounded-xl bg-[#24152A] border border-[#4B2855] text-[11px] text-[#F8F5F2] flex justify-between">
              <span>Nagarjuna CET</span>
              <span className="text-[#8CC9E8] font-bold">50+ Competing Teams</span>
            </div>
          </div>
        );
      case 'awssummit':
        return (
          <div className="p-3.5 rounded-2xl bg-[#160F1B] border border-[#8CC9E8]/40 text-xs font-mono">
            <div className="flex justify-between items-center text-[#8CC9E8] mb-2">
              <span className="flex items-center gap-1.5 font-bold">
                <Cloud className="w-4 h-4 text-[#8CC9E8]" /> Bengaluru 2026
              </span>
              <span className="text-[10px] text-[#C8B8D2]">Deep Dives</span>
            </div>
            <div className="p-2 rounded-xl bg-[#24152A] border border-[#4B2855] text-[11px] text-[#F8F5F2] flex justify-between">
              <span>Cloud Arch</span>
              <span className="text-[#8CC9E8]">Enterprise GenAI</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="achievements" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Circular Rotating Section Badge */}
      <div className="absolute top-8 right-6 lg:right-16 opacity-35 pointer-events-none hidden sm:block">
        <RotatingSectionBadge text="MILESTONES • MILESTONES • " size={145} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#24152A] border border-[#8CC9E8]/40 text-[#8CC9E8] text-xs font-mono mb-3"
          >
            <Trophy className="w-3.5 h-3.5 text-[#C9A85E]" />
            <span>MILESTONES &amp; HONORS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight"
          >
            NOTABLE{' '}
            <span className="bg-gradient-to-r from-[#FFFFFF] via-[#8CC9E8] to-[#A88FB5] bg-clip-text text-transparent">
              ACHIEVEMENTS
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#C8B8D2] text-sm sm:text-base max-w-2xl mt-4 leading-relaxed"
          >
            Competitive hackathon breakthroughs, algorithmic problem solving badges, and technical conferences.
          </motion.p>
        </div>

        {/* Horizontal Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievementsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setCursor(item.badge, 'card')}
              onMouseLeave={resetCursor}
              className="rounded-3xl p-6 sm:p-7 border border-[#4B2855] flex flex-col justify-between relative overflow-hidden group bg-[#24152A]/85 hover:border-[#8CC9E8]/60 transition-all duration-300 shadow-md hover:scale-105"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-[#4B2855] border border-[#8CC9E8]/40 text-[#8CC9E8] text-[10px] font-mono font-semibold">
                    {item.badge}
                  </span>
                  <Award className="w-4 h-4 text-[#C9A85E] group-hover:scale-110 transition-transform" />
                </div>

                <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-[#8CC9E8] transition-colors">
                  {item.title}
                </h3>

                <div className="text-xs font-mono text-[#8CC9E8] font-semibold mb-3">
                  {item.highlight}
                </div>

                <p className="text-xs text-[#F8F5F2]/90 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div>
                {renderVisual(item)}

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-[#8CC9E8] hover:text-white transition-colors"
                  >
                    <span>View LeetCode Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
