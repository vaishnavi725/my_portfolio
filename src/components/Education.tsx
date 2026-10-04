import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { educationData } from '../data/portfolioData';
import { useCursor } from '../context/CursorContext';

export const Education: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="education" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#D9AFC4]/40 text-[#D9AFC4] text-xs font-mono mb-3"
          >
            <GraduationCap className="w-3 h-3 text-[#D9AFC4]" />
            <span>ACADEMIC FOUNDATION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight"
          >
            EDUCATION & <span className="bg-gradient-to-r from-[#FFFFFF] via-[#C8B8D2] to-[#D9AFC4] bg-clip-text text-transparent">QUALIFICATIONS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#C8B8D2] text-sm sm:text-base max-w-2xl mt-4 leading-relaxed"
          >
            Consistent academic excellence from Pre-University through Computer Science Engineering at NCET Bangalore.
          </motion.p>
        </div>

        {/* Vertical Timeline */}
        <div className="max-w-4xl mx-auto relative pl-6 sm:pl-10 border-l-2 border-[#A88FB5]/40 space-y-12">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onMouseEnter={() => setCursor(edu.score, 'card')}
              onMouseLeave={resetCursor}
              className="relative group"
            >
              {/* Timeline Glowing Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-0 w-8 h-8 rounded-full bg-[#160F1B] border-2 border-[#D9AFC4] flex items-center justify-center shadow-[0_0_15px_rgba(217,175,196,0.8)] group-hover:scale-125 group-hover:border-white transition-all duration-300">
                <GraduationCap className="w-4 h-4 text-[#D9AFC4] group-hover:text-white" />
              </div>

              {/* Card */}
              <div className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 border border-[#4B2855]/60 relative overflow-hidden bg-[#24152A]/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-[#4B2855]/60">
                  <div>
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono text-[#D9AFC4] mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{edu.period}</span>
                      {edu.isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-[#4B2855] text-[#D9AFC4] text-[10px] border border-[#D9AFC4]/40">
                          Current
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                      {edu.institution}
                    </h3>
                  </div>

                  <div className="px-4 py-2 rounded-2xl bg-[#4B2855]/60 border border-[#D9AFC4]/40 text-[#FFFFFF] font-mono text-sm sm:text-base font-bold shadow-inner self-start sm:self-auto">
                    {edu.score}
                  </div>
                </div>

                <div className="text-sm font-semibold text-[#F4EDE7] font-display mb-3 flex items-center gap-2">
                  <span>{edu.degree}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#C8B8D2] mb-5">
                  <MapPin className="w-3.5 h-3.5 text-[#A88FB5]" />
                  <span>{edu.location}</span>
                </div>

                <div className="space-y-2.5">
                  {edu.highlights.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F4EDE7]/90 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#D9AFC4] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
