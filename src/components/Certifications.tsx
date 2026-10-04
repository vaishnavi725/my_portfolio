import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Calendar, CheckCircle2, Eye, ShieldCheck } from 'lucide-react';
import { certificationsData } from '../data/portfolioData';
import type { CertificationItem } from '../types/portfolio';
import { CertificationModal } from './CertificationModal';
import { useCursor } from '../context/CursorContext';

export const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="certifications" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#D9AFC4]/40 text-[#D9AFC4] text-xs font-mono mb-3"
          >
            <ShieldCheck className="w-3 h-3 text-[#D9AFC4]" />
            <span>INDUSTRY CREDENTIALS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight"
          >
            LICENSES & <span className="bg-gradient-to-r from-[#FFFFFF] via-[#C8B8D2] to-[#D9AFC4] bg-clip-text text-transparent">CERTIFICATIONS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#C8B8D2] text-sm sm:text-base max-w-2xl mt-4 leading-relaxed"
          >
            Formally certified credentials from PwC India, Cisco Networking Academy, Red Hat, and NPTEL.
          </motion.p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {certificationsData.map((cert, index) => {
            const isFeatured = cert.featured;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={() => setCursor('DETAILS', 'card')}
                onMouseLeave={resetCursor}
                onClick={() => setSelectedCert(cert)}
                className={`glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 border cursor-pointer relative overflow-hidden group flex flex-col justify-between ${
                  isFeatured
                    ? 'border-[#D9AFC4]/40 bg-gradient-to-br from-[#24152A]/95 via-[#160F1B]/90 to-[#24152A]/95 shadow-[0_0_30px_rgba(168,143,181,0.25)]'
                    : 'border-[#4B2855]/60 bg-[#24152A]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#4B2855]/60 border border-[#D9AFC4]/40 text-[#D9AFC4] text-xs font-mono font-medium">
                      {cert.category}
                    </span>
                    <span className="text-xs font-mono text-[#C8B8D2] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#D9AFC4]" />
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2 group-hover:text-[#D9AFC4] transition-colors">
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#D9AFC4] font-semibold mb-4">
                    <Building2 className="w-4 h-4 text-[#A88FB5]" />
                    <span>{cert.issuer}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#F4EDE7]/90 leading-relaxed mb-6">
                    {cert.description}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    {cert.modules.slice(0, 4).map((mod, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#C8B8D2] font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D9AFC4] shrink-0" />
                        <span>{mod}</span>
                      </div>
                    ))}
                    {cert.modules.length > 4 && (
                      <div className="text-[11px] font-mono text-[#D9AFC4] pl-5">
                        +{cert.modules.length - 4} additional modules...
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#4B2855]/60 flex items-center justify-between text-xs font-mono text-[#D9AFC4] group-hover:text-white">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#D9AFC4]" />
                    <span>Click to View Full Credential</span>
                  </span>
                  <span className="text-[#A88FB5] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      <CertificationModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
};
