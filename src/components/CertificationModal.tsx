import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Calendar, Sparkles, Building2 } from 'lucide-react';
import type { CertificationItem } from '../types/portfolio';
import { useCursor } from '../context/CursorContext';

interface CertificationModalProps {
  cert: CertificationItem | null;
  onClose: () => void;
}

export const CertificationModal: React.FC<CertificationModalProps> = ({ cert, onClose }) => {
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!cert) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#160F1B]/85 backdrop-blur-md -z-10"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="glass-modal rounded-3xl max-w-2xl w-full p-6 sm:p-8 md:p-10 border border-[#D9AFC4]/40 relative text-left shadow-[0_25px_60px_rgba(22,15,27,0.9)] bg-[#24152A]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            onMouseEnter={() => setCursor('CLOSE', 'button')}
            onMouseLeave={resetCursor}
            className="absolute top-6 right-6 p-2 rounded-full glass-panel hover:bg-white/10 text-[#C8B8D2] hover:text-white border border-[#4B2855] hover:border-[#D9AFC4] transition-all focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-[#D9AFC4]" />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-[#4B2855]/60 text-[#D9AFC4] font-mono text-xs font-semibold border border-[#D9AFC4]/40">
              {cert.category}
            </span>
            <span className="text-xs font-mono text-[#C8B8D2] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#D9AFC4]" />
              {cert.year}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-2">
            {cert.title}
          </h3>

          <div className="flex items-center gap-2 text-sm font-mono text-[#D9AFC4] mb-6">
            <Building2 className="w-4 h-4 text-[#A88FB5]" />
            <span>Issuing Organization: {cert.issuer}</span>
          </div>

          <p className="text-sm text-[#F4EDE7]/90 leading-relaxed mb-6">
            {cert.description}
          </p>

          {/* Modules covered */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase font-bold text-[#D9AFC4] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D9AFC4]" />
              <span>CORE MODULES & CURRICULUM:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cert.modules.map((module, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#160F1B]/90 border border-[#4B2855]/60 text-xs font-mono text-[#F4EDE7] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D9AFC4] shrink-0" />
                  <span>{module}</span>
                </div>
              ))}
            </div>
          </div>

          {cert.skillsGained && (
            <div>
              <h4 className="text-xs font-mono uppercase font-bold text-[#C8B8D2] mb-2.5">
                VERIFIED SKILLS GAINED:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {cert.skillsGained.map((sk) => (
                  <span
                    key={sk}
                    className="px-2.5 py-1 rounded-lg bg-[#160F1B] border border-[#4B2855] text-[#D9AFC4] text-[11px] font-mono"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
