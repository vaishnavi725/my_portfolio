import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Cpu, Workflow } from 'lucide-react';
import type { ProjectItem } from '../types/portfolio';
import { useCursor } from '../context/CursorContext';
import { GithubIcon } from './ui/Icons';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
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
          className="glass-modal rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 md:p-10 border border-[#D9AFC4]/40 relative text-left shadow-[0_25px_60px_rgba(22,15,27,0.9)] bg-[#24152A]"
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

          {/* Header metadata */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-[#4B2855]/60 text-[#D9AFC4] font-mono text-xs font-semibold border border-[#D9AFC4]/40">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#160F1B] text-[#C8B8D2] font-mono text-xs border border-[#4B2855]">
              ● {project.status}
            </span>
            {project.period && (
              <span className="text-xs font-mono text-[#A88FB5]">{project.period}</span>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-white mb-2">
            {project.title}
          </h3>

          {project.subtitle && (
            <p className="text-sm sm:text-base font-mono text-[#D9AFC4]/90 mb-6">
              {project.subtitle}
            </p>
          )}

          {/* Quick CTAs */}
          <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-[#4B2855]/60">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursor('GITHUB', 'button')}
                onMouseLeave={resetCursor}
                className="px-4 py-2 rounded-xl bg-[#160F1B] hover:bg-[#24152A] text-[#F4EDE7] border border-[#4B2855] hover:border-[#D9AFC4] text-xs font-mono font-medium transition-all flex items-center gap-2"
              >
                <GithubIcon className="w-4 h-4 text-[#D9AFC4]" />
                <span>View GitHub Repository</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursor('LIVE', 'button')}
                onMouseLeave={resetCursor}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#4B2855] to-[#6F4A78] hover:opacity-90 text-white border border-[#D9AFC4]/40 text-xs font-mono font-medium transition-all flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4 text-[#D9AFC4]" />
                <span>Live Project Demo</span>
              </a>
            )}
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass-panel p-5 rounded-2xl border border-[#4B2855]/60 bg-[#160F1B]/60">
              <h4 className="text-xs font-mono uppercase font-bold text-[#D9AFC4] mb-2">
                Problem Statement
              </h4>
              <p className="text-xs sm:text-sm text-[#F4EDE7]/90 leading-relaxed">
                {project.details.problem}
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-[#4B2855]/60 bg-[#160F1B]/60">
              <h4 className="text-xs font-mono uppercase font-bold text-[#C8B8D2] mb-2">
                Engineered Solution
              </h4>
              <p className="text-xs sm:text-sm text-[#F4EDE7]/90 leading-relaxed">
                {project.details.solution}
              </p>
            </div>
          </div>

          {/* System Architecture & Visual Workflow */}
          {project.details.workflowSteps && (
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase font-bold text-[#D9AFC4] mb-4 flex items-center gap-2">
                <Workflow className="w-4 h-4 text-[#D9AFC4]" />
                <span>SYSTEM PIPELINE ARCHITECTURE</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {project.details.workflowSteps.map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#160F1B]/90 border border-[#4B2855]/60">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-full bg-[#4B2855] text-[#D9AFC4] text-[10px] font-mono font-bold flex items-center justify-center border border-[#D9AFC4]/40">
                        {idx + 1}
                      </span>
                      <h5 className="text-xs font-bold font-display text-white">{step.title}</h5>
                    </div>
                    <p className="text-[11px] text-[#C8B8D2] leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase font-bold text-[#D9AFC4] mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D9AFC4]" />
              <span>KEY FEATURES & CAPABILITIES</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {project.details.keyFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F4EDE7]/90">
                  <CheckCircle2 className="w-4 h-4 text-[#D9AFC4] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase font-bold text-[#C8B8D2] mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#D9AFC4]" />
              <span>TECHNOLOGIES & TOOLS</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.details.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl bg-[#160F1B] border border-[#4B2855] text-[#D9AFC4] text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Contribution Note */}
          {project.details.contribution && (
            <div className="p-4 rounded-2xl bg-[#4B2855]/30 border border-[#A88FB5]/40 text-xs sm:text-sm text-[#F4EDE7]/90 leading-relaxed">
              <strong className="text-[#D9AFC4] font-mono">My Direct Engineering Role: </strong>
              {project.details.contribution}
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
