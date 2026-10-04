import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Code2, Flame, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';
import { personalData, keyMetrics, journeyTimeline } from '../data/portfolioData';
import { useCursor } from '../context/CursorContext';
import { RotatingSectionBadge } from './ui/RotatingSectionBadge';

export const About: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  const getMetricIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-[#8CC9E8]" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-[#A88FB5]" />;
      case 'Award':
        return <Award className="w-5 h-5 text-[#C9A85E]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#8CC9E8]" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-[#C9A85E]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#8CC9E8]" />;
    }
  };

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Circular Rotating Section Badge */}
      <div className="absolute top-8 right-6 lg:right-16 opacity-35 pointer-events-none hidden sm:block">
        <RotatingSectionBadge text="WHO I AM • WHO I AM • WHO I AM • " size={145} />
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
            <Sparkles className="w-3.5 h-3.5 text-[#8CC9E8]" />
            <span>BACKGROUND &amp; ACADEMICS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight"
          >
            WHO I{' '}
            <span className="bg-gradient-to-r from-[#FFFFFF] via-[#8CC9E8] to-[#A88FB5] bg-clip-text text-transparent">
              AM
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#C8B8D2] text-sm sm:text-base max-w-2xl mt-4 leading-relaxed"
          >
            Computer Science Engineering student with an exceptional academic record of 9.5 CGPA, combining deep theoretical CS foundations with hands-on cloud architectures, AI systems, and enterprise problem solving.
          </motion.p>
        </div>

        {/* Top Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-20">
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setCursor(metric.value, 'card')}
              onMouseLeave={resetCursor}
              className="rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden group border border-[#4B2855] bg-[#24152A]/85 hover:border-[#8CC9E8]/60 transition-all duration-300 shadow-md"
            >
              <div className="w-12 h-12 rounded-full bg-[#160F1B] border border-[#8CC9E8]/40 flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 group-hover:border-[#8CC9E8] transition-all duration-300">
                {getMetricIcon(metric.icon)}
              </div>

              <span className="text-2xl sm:text-3xl font-extrabold font-display bg-gradient-to-r from-[#FFFFFF] via-[#8CC9E8] to-[#A88FB5] bg-clip-text text-transparent mb-1">
                {metric.value}
              </span>

              <span className="text-xs font-semibold text-[#F8F5F2] uppercase tracking-wider font-mono mb-1">
                {metric.label}
              </span>

              <span className="text-[11px] text-[#A88FB5] leading-tight">
                {metric.subtitle}
              </span>

              <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#8CC9E8]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Split Grid: Bio & Distinction Details + Vertical Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Bio card & Key Focus Areas */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl p-6 sm:p-8 border border-[#4B2855] shadow-[0_12px_35px_rgba(10,5,15,0.7)] relative overflow-hidden bg-[#24152A]/85"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-3 h-3 rounded-full bg-[#8CC9E8] animate-pulse" />
                <h3 className="text-lg font-bold font-display text-white tracking-wide uppercase">
                  Academic &amp; Engineering Profile
                </h3>
              </div>

              <p className="text-[#F8F5F2] text-sm sm:text-base leading-relaxed mb-6">
                Currently pursuing Bachelor of Engineering in Computer Science and Engineering at{' '}
                <strong className="text-[#8CC9E8] font-medium">{personalData.college}</strong> with a distinguished score of{' '}
                <strong className="text-white font-bold">{personalData.cgpa}</strong>.
              </p>

              <p className="text-[#C8B8D2] text-xs sm:text-sm leading-relaxed mb-6">
                Combining a rigorous understanding of computer science core subjects (Data Structures, Algorithms, DBMS, Operating Systems, Networks) with practical industry projects in AWS Serverless architecture, Salesforce CRM workflows, and machine learning models.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Consistent top academic rank with 9.5 / 10 CGPA',
                  '248+ LeetCode problems solved with 88% acceptance',
                  'PwC Advisory Launchpad graduate with 5 micro-credentials',
                  'Practical cloud internship experience optimizing serverless systems',
                  'Finalist in Smart India Hackathon & HyperAPI Global Hackathon',
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F8F5F2]">
                    <CheckCircle2 className="w-4 h-4 text-[#8CC9E8] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Vertical Journey Timeline */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl p-6 sm:p-8 border border-[#4B2855] relative bg-[#24152A]/85"
            >
              <h3 className="text-lg font-bold font-display text-white tracking-wide uppercase mb-8 flex items-center gap-2">
                <span className="text-[#8CC9E8] font-mono">&gt;</span>
                MY ENGINEERING JOURNEY
              </h3>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-[#4B2855] space-y-8">
                {journeyTimeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="relative group"
                  >
                    <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 rounded-full bg-[#160F1B] border-2 border-[#8CC9E8] flex items-center justify-center shadow-[0_0_15px_rgba(140,201,232,0.8)] group-hover:scale-125 group-hover:border-[#FFFFFF] transition-all duration-300">
                      <div className="w-2 h-2 rounded-full bg-[#8CC9E8] group-hover:bg-[#FFFFFF]" />
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl border border-[#4B2855] hover:border-[#8CC9E8]/60 transition-all duration-300 bg-[#160F1B]/70">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#4B2855] text-[#8CC9E8] font-mono text-xs font-bold border border-[#8CC9E8]/30">
                          {item.year}
                        </span>
                        <span className="text-[11px] font-mono text-[#C8B8D2]">
                          {item.tag}
                        </span>
                      </div>

                      <h4 className="text-base font-bold font-display text-white mb-2 group-hover:text-[#8CC9E8] transition-colors">
                        {item.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-[#C8B8D2] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
