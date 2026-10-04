import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Shield, Zap, Cloud, Cpu, ArrowRight } from 'lucide-react';

export const CloudPipelineVisual: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const nodes = [
    {
      id: 'api-gateway',
      name: 'API Ingestion',
      service: 'Event Trigger',
      icon: <Zap className="w-5 h-5 text-[#D9AFC4]" />,
      color: 'border-[#D9AFC4]/40 text-[#D9AFC4] bg-[#4B2855]/30',
      description: 'Incoming REST request / CloudWatch cron event triggered',
    },
    {
      id: 'iam-auth',
      name: 'AWS IAM / RBAC',
      service: 'Security & Auth',
      icon: <Shield className="w-5 h-5 text-[#C8B8D2]" />,
      color: 'border-[#C8B8D2]/40 text-[#C8B8D2] bg-[#4B2855]/30',
      description: '100% compliant role-based authorization verification',
    },
    {
      id: 'lambda-compute',
      name: 'AWS Lambda',
      service: 'Serverless Compute',
      icon: <Cpu className="w-5 h-5 text-[#A88FB5]" />,
      color: 'border-[#A88FB5]/40 text-[#A88FB5] bg-[#4B2855]/30',
      description: 'Event-driven logic execution reducing latency by 40%',
    },
    {
      id: 's3-ec2',
      name: 'Amazon S3 & EC2',
      service: 'Storage & Workers',
      icon: <Database className="w-5 h-5 text-[#D9AFC4]" />,
      color: 'border-[#D9AFC4]/40 text-[#D9AFC4] bg-[#4B2855]/30',
      description: 'Immutable object storage & persistent compute instances',
    },
  ];

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#A88FB5]/30 relative overflow-hidden bg-[#24152A]/60">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#4B2855]/40">
        <div className="flex items-center gap-2.5">
          <Cloud className="w-5 h-5 text-[#D9AFC4] animate-pulse" />
          <h4 className="text-sm font-bold font-mono uppercase text-[#FFFFFF] tracking-wider">
            AWS Event-Driven Serverless Pipeline
          </h4>
        </div>
        <span className="text-[11px] font-mono text-[#D9AFC4] px-2.5 py-0.5 rounded-full bg-[#4B2855]/40 border border-[#D9AFC4]/30">
          99.9% Uptime Verified
        </span>
      </div>

      {/* Interactive Node Flowchart */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative mb-6">
        {nodes.map((node, index) => {
          const isActive = activeStep === index;
          return (
            <motion.div
              key={node.id}
              onClick={() => setActiveStep(index)}
              whileHover={{ scale: 1.03 }}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer relative ${
                isActive
                  ? `${node.color} shadow-[0_0_20px_rgba(168,143,181,0.35)] ring-1 ring-[#D9AFC4]`
                  : 'border-[#4B2855]/50 bg-[#160F1B]/70 hover:border-[#A88FB5]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-xl bg-[#24152A] border border-[#4B2855]">
                  {node.icon}
                </div>
                <span className="text-[10px] font-mono text-[#A88FB5]/80">0{index + 1}</span>
              </div>

              <h5 className="text-xs sm:text-sm font-bold font-display text-white mb-1">
                {node.name}
              </h5>
              <p className="text-[11px] font-mono text-[#D9AFC4]/90 mb-2">
                {node.service}
              </p>

              {/* Step indicator arrow */}
              {index < nodes.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-[#A88FB5]/60">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D9AFC4]/80" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Selected Step Deep Dive */}
      <div className="p-4 rounded-2xl bg-[#160F1B]/90 border border-[#4B2855]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#D9AFC4] animate-ping" />
          <span className="text-xs sm:text-sm text-[#F4EDE7]/90 font-mono">
            <strong>{nodes[activeStep].name}:</strong> {nodes[activeStep].description}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#C8B8D2] shrink-0">
          <Server className="w-3.5 h-3.5 text-[#D9AFC4]" />
          <span>Automated Provisioning</span>
        </div>
      </div>
    </div>
  );
};
