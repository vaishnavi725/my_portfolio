import React from 'react';
import { motion } from 'framer-motion';
import { Code2, ExternalLink, Flame, TrendingUp } from 'lucide-react';
import { leetcodeStats } from '../data/portfolioData';
import { useCursor } from '../context/CursorContext';

export const LeetCodeSection: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="leetcode" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#D9AFC4]/40 text-[#D9AFC4] text-xs font-mono mb-3"
          >
            <Code2 className="w-3 h-3 text-[#D9AFC4]" />
            <span>ALGORITHMIC PROBLEM SOLVING</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight"
          >
            CODE. SOLVE. <span className="bg-gradient-to-r from-[#FFFFFF] via-[#C8B8D2] to-[#D9AFC4] bg-clip-text text-transparent">REPEAT.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#C8B8D2] text-sm sm:text-base max-w-2xl mt-4 leading-relaxed"
          >
            Demonstrated algorithmic consistency and problem solving proficiency on LeetCode with high first-pass accuracy.
          </motion.p>
        </div>

        {/* LeetCode Main Visual Display */}
        <div className="max-w-5xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-[#A88FB5]/30 shadow-[0_20px_50px_rgba(22,15,27,0.8)] relative overflow-hidden bg-[#24152A]/50">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Overall Circular Progress & Solved Counter */}
            <div className="lg:col-span-5 flex flex-col items-center text-center p-6 rounded-2xl bg-[#160F1B]/90 border border-[#4B2855]">
              
              {/* Radial Donut Progress Ring */}
              <div className="relative w-44 h-44 flex items-center justify-center mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background ring */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#4B2855"
                    strokeWidth="8"
                  />
                  {/* Easy segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#A88FB5"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - 195 / 248 * 0.85)}
                    strokeLinecap="round"
                  />
                  {/* Medium segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#D9AFC4"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - 50 / 248 * 0.45)}
                    className="opacity-90"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black font-display text-white">
                    {leetcodeStats.totalSolved}
                  </span>
                  <span className="text-[11px] font-mono text-[#C8B8D2] uppercase tracking-wider">
                    Total Solved
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4B2855]/60 border border-[#D9AFC4]/40 text-[#D9AFC4] text-xs font-mono font-bold mb-3">
                <Flame className="w-3.5 h-3.5 text-[#D9AFC4] animate-pulse" />
                <span>{leetcodeStats.badge}</span>
              </div>

              <span className="text-xs font-mono text-[#C8B8D2]">
                User: <strong className="text-white">{leetcodeStats.username}</strong>
              </span>
            </div>

            {/* Right: Breakdown Cards & Acceptance Rate */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Acceptance metric card */}
              <div className="p-4 rounded-2xl bg-[#160F1B]/90 border border-[#4B2855]/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#4B2855] text-[#D9AFC4]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-display text-white">First-Pass Acceptance</h4>
                    <p className="text-xs font-mono text-[#C8B8D2]">High efficiency algorithmic submissions</p>
                  </div>
                </div>
                <div className="text-2xl font-black font-display text-[#D9AFC4]">
                  {leetcodeStats.acceptanceRate}
                </div>
              </div>

              {/* Difficulty Breakdown */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-[#160F1B]/90 border border-[#4B2855] text-center">
                  <span className="text-xs font-mono text-[#C8B8D2] font-bold block mb-1">EASY</span>
                  <span className="text-2xl font-black font-display text-white">{leetcodeStats.easy}</span>
                  <span className="text-[10px] font-mono text-[#A88FB5] block mt-1">Foundations</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#160F1B]/90 border border-[#6F4A78] text-center">
                  <span className="text-xs font-mono text-[#D9AFC4] font-bold block mb-1">MEDIUM</span>
                  <span className="text-2xl font-black font-display text-white">{leetcodeStats.medium}</span>
                  <span className="text-[10px] font-mono text-[#A88FB5] block mt-1">Trees/Graphs/DP</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#160F1B]/90 border border-[#D9AFC4]/50 text-center">
                  <span className="text-xs font-mono text-white font-bold block mb-1">HARD</span>
                  <span className="text-2xl font-black font-display text-white">{leetcodeStats.hard}</span>
                  <span className="text-[10px] font-mono text-[#A88FB5] block mt-1">Advanced Algo</span>
                </div>
              </div>

              {/* External LeetCode Profile Button */}
              <div className="pt-2">
                <a
                  href={leetcodeStats.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursor('LEETCODE', 'button')}
                  onMouseLeave={resetCursor}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#4B2855] via-[#6F4A78] to-[#A88FB5] text-white font-mono text-xs font-bold tracking-wider shadow-[0_0_20px_rgba(168,143,181,0.35)] hover:shadow-[0_0_30px_rgba(217,175,196,0.55)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Code2 className="w-4 h-4 text-[#D9AFC4]" />
                  <span>View LeetCode Profile ({leetcodeStats.username})</span>
                  <ExternalLink className="w-4 h-4 text-[#D9AFC4]" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
