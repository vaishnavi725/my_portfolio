import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Award, CheckCircle2, Zap, Sparkles } from 'lucide-react';
import { experienceData } from '../data/portfolioData';
import { CloudPipelineVisual } from './CloudPipelineVisual';
import { useCursor } from '../context/CursorContext';
import { RotatingSectionBadge } from './ui/RotatingSectionBadge';

export const Experience: React.FC = () => {
  const [selectedExpId, setSelectedExpId] = useState(experienceData[0].id);
  const { setCursor, resetCursor } = useCursor();

  const selectedExp = experienceData.find((exp) => exp.id === selectedExpId) || experienceData[0];

  return (
    <section id="experience" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Circular Rotating Section Badge */}
      <div className="absolute top-8 right-6 lg:right-16 opacity-35 pointer-events-none hidden sm:block">
        <RotatingSectionBadge text="MY JOURNEY • MY JOURNEY • " size={145} />
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
            <Briefcase className="w-3.5 h-3.5 text-[#8CC9E8]" />
            <span>CORPORATE &amp; INDUSTRY EXPERIENCE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight"
          >
            EXPERIENCE &amp;{' '}
            <span className="bg-gradient-to-r from-[#FFFFFF] via-[#8CC9E8] to-[#A88FB5] bg-clip-text text-transparent">
              ROLES
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#C8B8D2] text-sm sm:text-base max-w-2xl mt-4 leading-relaxed"
          >
            Enterprise consulting immersion with PwC Advisory Launchpad and cloud infrastructure engineering at ToriiMinds.
          </motion.p>
        </div>

        {/* Experience Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          {experienceData.map((exp) => {
            const isSelected = selectedExpId === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => setSelectedExpId(exp.id)}
                onMouseEnter={() => setCursor(exp.company, 'button')}
                onMouseLeave={resetCursor}
                className={`relative px-5 sm:px-7 py-3 rounded-2xl font-mono text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-3 border cursor-pointer ${
                  isSelected
                    ? 'text-white border-[#8CC9E8]/60 shadow-[0_0_25px_rgba(140,201,232,0.4)] bg-gradient-to-r from-[#4B2855] to-[#6F4A78]'
                    : 'bg-[#24152A] text-[#C8B8D2]/80 hover:text-white border-[#4B2855] hover:border-[#8CC9E8]/60'
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    isSelected
                      ? 'bg-[#8CC9E8] animate-pulse shadow-[0_0_8px_#8CC9E8]'
                      : 'bg-[#6F4A78]'
                  }`}
                />
                <div className="text-left">
                  <div className="text-[10px] uppercase text-[#8CC9E8] tracking-wider font-semibold">
                    {exp.type}
                  </div>
                  <div>{exp.company}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Experience Detailed Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          <div className="lg:col-span-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedExp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl p-6 sm:p-10 border border-[#4B2855] bg-gradient-to-br from-[#24152A]/90 via-[#160F1B]/90 to-[#24152A]/90 shadow-[0_20px_50px_rgba(22,15,27,0.8)] relative overflow-hidden"
              >
                {/* Header info */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#4B2855]">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4B2855] border border-[#8CC9E8]/40 text-[#8CC9E8] text-xs font-mono mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-[#8CC9E8]" />
                      <span>{selectedExp.badge}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-2">
                      {selectedExp.role}
                    </h3>

                    <div className="text-lg font-bold font-display text-[#8CC9E8]">
                      {selectedExp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap lg:flex-col lg:items-end gap-3 text-xs sm:text-sm font-mono text-[#C8B8D2]">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#24152A] border border-[#4B2855]">
                      <Calendar className="w-4 h-4 text-[#8CC9E8]" />
                      <span>{selectedExp.period}</span>
                    </div>
                    {selectedExp.location && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#24152A] border border-[#4B2855]">
                        <MapPin className="w-4 h-4 text-[#A88FB5]" />
                        <span>{selectedExp.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Responsibilities & Key Contributions */}
                  <div className="lg:col-span-8 space-y-4">
                    <h4 className="text-xs uppercase tracking-widest font-mono text-[#8CC9E8] font-bold mb-3 flex items-center gap-2">
                      <span>KEY HIGHLIGHTS &amp; DELIVERABLES</span>
                    </h4>

                    <div className="space-y-3.5">
                      {selectedExp.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 text-xs sm:text-sm text-[#F8F5F2]/90 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#8CC9E8] shrink-0 mt-1" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Micro-Certifications if PwC */}
                    {selectedExp.microCerts && (
                      <div className="mt-8 pt-6 border-t border-[#4B2855]">
                        <h4 className="text-xs uppercase tracking-widest font-mono text-[#8CC9E8] font-bold mb-3 flex items-center gap-2">
                          <Award className="w-4 h-4 text-[#8CC9E8]" />
                          <span>5 PwC MICRO-CERTIFICATIONS EARNED:</span>
                        </h4>

                        <div className="flex flex-wrap gap-2">
                          {selectedExp.microCerts.map((cert) => (
                            <span
                              key={cert}
                              className="px-3 py-1.5 rounded-xl bg-[#4B2855] border border-[#8CC9E8]/40 text-[#F8F5F2] text-xs font-mono font-medium flex items-center gap-1.5 shadow-sm"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#8CC9E8]" />
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Key Metrics / Skills Applied */}
                  <div className="lg:col-span-4 space-y-6">
                    {selectedExp.metrics && (
                      <div className="p-5 rounded-2xl border border-[#4B2855] bg-[#24152A]/90">
                        <h4 className="text-xs uppercase tracking-widest font-mono text-[#8CC9E8] font-bold mb-4 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-[#8CC9E8]" />
                          <span>MEASURED IMPACT</span>
                        </h4>

                        <div className="grid grid-cols-2 gap-3">
                          {selectedExp.metrics.map((m, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-[#160F1B] border border-[#4B2855] text-center"
                            >
                              <div className="text-xl font-bold font-display text-white">
                                {m.metric}
                              </div>
                              <div className="text-[10px] text-[#C8B8D2] font-mono mt-0.5 leading-tight">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="p-5 rounded-2xl border border-[#4B2855] bg-[#24152A]/70">
                      <h4 className="text-xs uppercase tracking-widest font-mono text-[#C8B8D2] font-bold mb-3">
                        COMPETENCIES APPLIED
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedExp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg bg-[#160F1B] border border-[#4B2855] text-[#C8B8D2] text-[11px] font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Cloud Architecture Interactive Visualizer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <CloudPipelineVisual />
        </motion.div>
      </div>
    </section>
  );
};
