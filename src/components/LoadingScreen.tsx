import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING PORTFOLIO...');

  useEffect(() => {
    const steps = [
      { p: 20, text: 'LOADING ASSETS...' },
      { p: 45, text: 'PREPARING TECH ECOSYSTEM...' },
      { p: 75, text: 'CONFIGURING 3D ENVIRONMENT...' },
      { p: 90, text: 'CALIBRATING ML PIPELINES...' },
      { p: 100, text: 'PORTFOLIO READY' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p);
        setStatusText(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 350);
      }
    }, 280);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712] overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Background glow effects */}
        <div className="absolute w-96 h-96 rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none animate-pulse-slow" />
        <div className="absolute w-80 h-80 rounded-full bg-violet-600/15 blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
          {/* Glowing Monogram Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-20 h-20 rounded-2xl glass-panel border border-cyan-400/40 p-1 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(6,182,212,0.3)] relative group"
          >
            <div className="w-full h-full rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
              <span className="font-display font-black text-2xl tracking-tighter bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
                VK
              </span>
            </div>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 opacity-20 blur-sm -z-10" />
          </motion.div>

          {/* Name Display */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl font-bold tracking-widest text-slate-100 font-display mb-2"
          >
            VAISHNAVI R KANNUR
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-xs uppercase tracking-widest text-cyan-400 font-mono mb-8"
          >
            {statusText}
          </motion.p>

          {/* Progress Bar Container */}
          <div className="w-full h-1.5 bg-slate-900/80 rounded-full overflow-hidden p-0.5 border border-slate-800 shadow-inner mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 rounded-full shadow-[0_0_15px_#38bdf8]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </div>

          {/* Percentage Counter */}
          <div className="flex justify-between w-full text-xs font-mono text-slate-500">
            <span>SYS_INIT</span>
            <span className="text-cyan-400 font-semibold">{progress}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
