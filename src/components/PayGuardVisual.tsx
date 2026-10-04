import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Cpu, Zap, Database, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const PayGuardVisual: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [sampleTxn, setSampleTxn] = useState({
    amount: '₹ 4,850',
    type: 'P2P UPI Transfer',
    time: '23:42 IST',
    location: 'Bangalore, IN',
    riskScore: 12,
    status: 'GENUINE',
  });
  const [stage, setStage] = useState<'idle' | 'preprocessing' | 'features' | 'ml' | 'complete'>('idle');

  const runDemoAnalysis = (isAnomalous = false) => {
    if (analyzing) return;
    setAnalyzing(true);
    setStage('preprocessing');

    setTimeout(() => {
      setStage('features');
      setTimeout(() => {
        setStage('ml');
        setTimeout(() => {
          setStage('complete');
          setAnalyzing(false);
          if (isAnomalous) {
            setSampleTxn({
              amount: '₹ 89,500',
              type: 'High-Velocity Rapid Pull',
              time: '03:15 IST (Anomalous Hour)',
              location: 'Unverified Proxy IP',
              riskScore: 94,
              status: 'FLAGGED SUSPICIOUS',
            });
          } else {
            setSampleTxn({
              amount: '₹ 4,850',
              type: 'Verified Merchant Pay',
              time: '14:20 IST (Normal Velocity)',
              location: 'Bangalore, IN (Matched Device)',
              riskScore: 8,
              status: 'GENUINE',
            });
          }
        }, 500);
      }, 500);
    }, 500);
  };

  const pipelineStages = [
    { label: 'UPI', color: '#8CC9E8' },
    { label: 'DATA', color: '#A88FB5' },
    { label: 'ML', color: '#65BBD8' },
    { label: 'RISK', color: '#C9A85E' },
    { label: 'FRAUD DETECTION', color: '#F8F5F2' },
  ];

  return (
    <div className="rounded-2xl bg-[#24152A]/95 border border-[#8CC9E8]/40 p-5 sm:p-6 relative overflow-hidden shadow-[0_0_35px_rgba(140,201,232,0.2)]">
      {/* Background Grid Pattern & Rotating Security Ring */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <motion.div
        className="absolute -right-12 -top-12 w-48 h-48 rounded-full border border-dashed border-[#8CC9E8]/30 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
      />
      <motion.div
        className="absolute -right-8 -top-8 w-40 h-40 rounded-full border border-[#A88FB5]/20 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
      />

      {/* Top Header & Simulation Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[#4B2855] relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8CC9E8] animate-ping" />
          <span className="text-xs font-mono uppercase font-bold text-[#8CC9E8] tracking-wider">
            TRANSACTION INFERENCE PIPELINE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => runDemoAnalysis(false)}
            disabled={analyzing}
            className="px-3 py-1 rounded-lg bg-[#4B2855]/70 hover:bg-[#6F4A78] text-[#8CC9E8] border border-[#8CC9E8]/40 text-[11px] font-mono transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#8CC9E8]" />
            <span>Normal Txn</span>
          </button>
          <button
            onClick={() => runDemoAnalysis(true)}
            disabled={analyzing}
            className="px-3 py-1 rounded-lg bg-[#6F4A78]/70 hover:bg-[#4B2855] text-white border border-[#C9A85E]/50 text-[11px] font-mono transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-sm"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-[#C9A85E]" />
            <span>Simulate Anomaly</span>
          </button>
        </div>
      </div>

      {/* Sequential Flow: UPI -> DATA -> ML -> RISK -> FRAUD DETECTION */}
      <div className="flex flex-wrap items-center justify-between gap-1 p-2.5 rounded-xl bg-[#160F1B]/80 border border-[#4B2855] mb-5 relative z-10">
        {pipelineStages.map((st, i) => (
          <React.Fragment key={st.label}>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#24152A] border border-[#A88FB5]/20">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: st.color }} />
              <span className="text-[10px] font-mono font-bold" style={{ color: st.color }}>
                {st.label}
              </span>
            </div>
            {i < pipelineStages.length - 1 && (
              <ArrowRight className="w-3 h-3 text-[#A88FB5]/60 hidden sm:block" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Pipeline Stage Visualizer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5 relative z-10">
        {[
          { key: 'preprocessing', label: '1. Preprocessing', icon: Database },
          { key: 'features', label: '2. Feature Extract', icon: Zap },
          { key: 'ml', label: '3. ML Classifier', icon: Cpu },
          { key: 'complete', label: '4. Risk Verdict', icon: ShieldCheck },
        ].map((step, idx) => {
          const StepIcon = step.icon;
          const isCurrent = stage === step.key;
          const isDone =
            stage === 'complete' ||
            (stage === 'ml' && idx < 2) ||
            (stage === 'features' && idx < 1);
          return (
            <div
              key={step.key}
              className={`p-2 rounded-xl border text-center transition-all duration-300 ${
                isCurrent
                  ? 'bg-[#4B2855] border-[#8CC9E8] text-white ring-1 ring-[#8CC9E8] shadow-[0_0_15px_rgba(140,201,232,0.4)]'
                  : isDone
                  ? 'bg-[#24152A] border-[#4B2855] text-[#F8F5F2]'
                  : 'bg-[#160F1B]/60 border-[#4B2855]/40 text-[#A88FB5]/60'
              }`}
            >
              <StepIcon
                className={`w-3.5 h-3.5 mx-auto mb-1 ${
                  isCurrent ? 'animate-bounce text-[#8CC9E8]' : 'text-[#C8B8D2]'
                }`}
              />
              <div className="text-[10px] font-mono font-medium">{step.label}</div>
            </div>
          );
        })}
      </div>

      {/* Transaction Output Card */}
      <div className="p-4 rounded-xl bg-[#160F1B]/95 border border-[#4B2855] mb-4 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <span className="text-[10px] font-mono text-[#A88FB5] uppercase">
              Incoming UPI Telemetry
            </span>
            <div className="text-xl sm:text-2xl font-bold font-display text-white">
              {sampleTxn.amount}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-[#A88FB5] uppercase">
              Security Evaluation
            </span>
            <div>
              {sampleTxn.status === 'GENUINE' ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#4B2855]/80 border border-[#8CC9E8]/60 text-[#8CC9E8] text-xs font-mono font-bold shadow-[0_0_12px_rgba(140,201,232,0.3)]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  GENUINE (Score: {sampleTxn.riskScore}%)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#6F4A78] border border-[#C9A85E] text-white text-xs font-mono font-bold shadow-[0_0_12px_rgba(201,168,94,0.4)]">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#C9A85E]" />
                  FLAGGED (Score: {sampleTxn.riskScore}%)
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-[#4B2855]/60 text-[11px] font-mono text-[#C8B8D2]">
          <div className="p-1.5 rounded-lg bg-[#24152A]/80">
            <span className="text-[9px] text-[#A88FB5] block">PATTERN</span>
            <span className="font-semibold text-white">{sampleTxn.type}</span>
          </div>
          <div className="p-1.5 rounded-lg bg-[#24152A]/80">
            <span className="text-[9px] text-[#A88FB5] block">TIMESTAMP</span>
            <span className="font-semibold text-white">{sampleTxn.time}</span>
          </div>
          <div className="p-1.5 rounded-lg bg-[#24152A]/80">
            <span className="text-[9px] text-[#A88FB5] block">GEOLOCATION</span>
            <span className="font-semibold text-white">{sampleTxn.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
