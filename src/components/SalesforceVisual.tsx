import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, FileCheck, Zap, CheckCircle2, Network } from 'lucide-react';

export const SalesforceVisual: React.FC = () => {
  const [activeNode, setActiveNode] = useState<'candidate' | 'application' | 'position' | 'all'>('all');

  return (
    <div className="rounded-2xl bg-[#24152A]/95 border border-[#8CC9E8]/40 p-5 sm:p-6 relative overflow-hidden shadow-[0_0_35px_rgba(140,201,232,0.2)]">
      {/* Background Rotating CRM Network Rings */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <motion.div
        className="absolute -left-10 -top-10 w-44 h-44 rounded-full border border-dashed border-[#8CC9E8]/30 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 32, ease: 'linear' }}
      />
      <motion.div
        className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full border border-[#A88FB5]/20 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
      />

      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#4B2855] relative z-10">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-[#8CC9E8] animate-pulse" />
          <span className="text-xs font-mono uppercase font-bold text-[#8CC9E8] tracking-wider">
            SALESFORCE CRM SCHEMA TOPOLOGY
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#65BBD8] px-2.5 py-0.5 rounded-full bg-[#160F1B] border border-[#65BBD8]/40">
          Flow Builder Automated
        </span>
      </div>

      {/* Relational Node Workflow */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative mb-6 z-10">
        {/* Candidate Node */}
        <div
          onMouseEnter={() => setActiveNode('candidate')}
          onMouseLeave={() => setActiveNode('all')}
          className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
            activeNode === 'candidate' || activeNode === 'all'
              ? 'bg-[#4B2855]/70 border-[#8CC9E8] shadow-[0_0_20px_rgba(140,201,232,0.3)] ring-1 ring-[#8CC9E8]'
              : 'bg-[#160F1B]/70 border-[#4B2855]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-1.5 rounded-lg bg-[#4B2855] text-[#8CC9E8]">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-[#8CC9E8]">Custom Object 1</span>
          </div>
          <h5 className="text-xs font-bold font-display text-white mb-1">Candidate__c</h5>
          <p className="text-[10px] font-mono text-[#C8B8D2]">Profile, Skills, SOQL Dupe Prevention</p>
        </div>

        {/* Application Node (Junction) */}
        <div
          onMouseEnter={() => setActiveNode('application')}
          onMouseLeave={() => setActiveNode('all')}
          className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
            activeNode === 'application' || activeNode === 'all'
              ? 'bg-[#6F4A78]/70 border-[#A88FB5] shadow-[0_0_20px_rgba(168,143,181,0.3)] ring-1 ring-[#A88FB5]'
              : 'bg-[#160F1B]/70 border-[#4B2855]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-1.5 rounded-lg bg-[#6F4A78] text-[#F8F5F2]">
              <FileCheck className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-[#C8B8D2]">Junction Object 2</span>
          </div>
          <h5 className="text-xs font-bold font-display text-white mb-1">Job_Application__c</h5>
          <p className="text-[10px] font-mono text-[#C8B8D2]">Automated Scoring Matrix &amp; Status</p>
        </div>

        {/* Position Node */}
        <div
          onMouseEnter={() => setActiveNode('position')}
          onMouseLeave={() => setActiveNode('all')}
          className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
            activeNode === 'position' || activeNode === 'all'
              ? 'bg-[#4B2855]/70 border-[#65BBD8] shadow-[0_0_20px_rgba(101,187,216,0.3)] ring-1 ring-[#65BBD8]'
              : 'bg-[#160F1B]/70 border-[#4B2855]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-1.5 rounded-lg bg-[#4B2855] text-[#65BBD8]">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-[#65BBD8]">Custom Object 3</span>
          </div>
          <h5 className="text-xs font-bold font-display text-white mb-1">Position__c</h5>
          <p className="text-[10px] font-mono text-[#C8B8D2]">Open Requisitions &amp; Headcount</p>
        </div>
      </div>

      {/* Relational Flow Summary & Metric Pill */}
      <div className="p-3.5 rounded-xl bg-[#160F1B]/95 border border-[#4B2855] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono relative z-10">
        <div className="flex items-center gap-2 text-[#F8F5F2]/90">
          <Zap className="w-3.5 h-3.5 text-[#8CC9E8] shrink-0" />
          <span>Candidate &rarr; Lookup &rarr; Application &rarr; Lookup &rarr; Position</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#65BBD8] shrink-0 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>99.8% Data Integrity</span>
        </div>
      </div>
    </div>
  );
};
