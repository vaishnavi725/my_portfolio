import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cloud, Code, Database, Layers, Cpu, Compass } from 'lucide-react';
import { techUniverseNodes } from '../data/portfolioData';
import { useCursor } from '../context/CursorContext';

export const TechUniverse: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('ai');
  const { setCursor, resetCursor } = useCursor();

  const activeNode = techUniverseNodes.find((n) => n.id === activeNodeId) || techUniverseNodes[0];

  const getNodeIcon = (category: string) => {
    switch (category) {
      case 'AI':
        return <Sparkles className="w-5 h-5 text-[#D9AFC4]" />;
      case 'CLOUD':
        return <Cloud className="w-5 h-5 text-[#C8B8D2]" />;
      case 'DEVELOPMENT':
        return <Code className="w-5 h-5 text-[#A88FB5]" />;
      case 'DATABASE':
        return <Database className="w-5 h-5 text-[#D9AFC4]" />;
      case 'SALESFORCE':
        return <Layers className="w-5 h-5 text-[#C8B8D2]" />;
      case 'IOT':
        return <Cpu className="w-5 h-5 text-[#A88FB5]" />;
      default:
        return <Compass className="w-5 h-5 text-[#D9AFC4]" />;
    }
  };

  return (
    <section id="tech-universe" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#D9AFC4]/40 text-[#D9AFC4] text-xs font-mono mb-3"
          >
            <Sparkles className="w-3 h-3 text-[#D9AFC4]" />
            <span>INTERACTIVE NETWORK GRAPH</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight"
          >
            MY TECH <span className="bg-gradient-to-r from-[#FFFFFF] via-[#C8B8D2] to-[#D9AFC4] bg-clip-text text-transparent">UNIVERSE</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#C8B8D2] text-sm sm:text-base max-w-2xl mt-4 leading-relaxed"
          >
            Interactive topology representing how core CS algorithms, cloud infrastructure, AI models, and enterprise software interconnect around my engineering core.
          </motion.p>
        </div>

        {/* Constellation Hub View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Center Interactive Node Web */}
          <div className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-10 border border-[#A88FB5]/30 relative min-h-[420px] sm:min-h-[500px] flex items-center justify-center overflow-hidden bg-[#24152A]/60">
            
            {/* Background circular radar tracks */}
            <div className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full border border-[#A88FB5]/20 pointer-events-none" />
            <div className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] rounded-full border border-[#D9AFC4]/20 pointer-events-none" />
            <div className="absolute w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] rounded-full border border-[#D9AFC4]/30 pointer-events-none animate-ping opacity-20" />

            {/* Central Node: VAISHNAVI */}
            <motion.div
              className="relative z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#4B2855] via-[#A88FB5] to-[#D9AFC4] p-[2px] shadow-[0_0_40px_rgba(168,143,181,0.5)] flex items-center justify-center cursor-pointer select-none"
              whileHover={{ scale: 1.1 }}
              onMouseEnter={() => setCursor('CORE', 'button')}
              onMouseLeave={resetCursor}
            >
              <div className="w-full h-full rounded-full bg-[#160F1B] flex flex-col items-center justify-center text-center p-1">
                <span className="text-[9px] font-mono text-[#D9AFC4] font-bold tracking-widest uppercase">
                  ENGINEER
                </span>
                <span className="text-xs sm:text-sm font-display font-extrabold text-white">
                  VAISHNAVI
                </span>
                <span className="text-[8px] font-mono text-[#C8B8D2]">
                  9.5 CGPA
                </span>
              </div>
            </motion.div>

            {/* Orbiting Tech Category Nodes */}
            {techUniverseNodes.map((node, index) => {
              const isActive = activeNodeId === node.id;
              // Calculate radial position
              const angle = (index * 360) / techUniverseNodes.length;
              const rad = (angle * Math.PI) / 180;
              const r = window.innerWidth < 640 ? 120 : 180;
              const x = Math.cos(rad) * r;
              const y = Math.sin(rad) * r;

              return (
                <motion.button
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  onMouseEnter={() => {
                    setActiveNodeId(node.id);
                    setCursor(node.name, 'button');
                  }}
                  onMouseLeave={resetCursor}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  whileHover={{ scale: 1.15 }}
                  className={`absolute z-10 px-3 py-2 rounded-2xl flex items-center gap-2 border text-xs font-mono font-semibold transition-all duration-300 shadow-md ${
                    isActive
                      ? 'bg-[#4B2855] border-[#D9AFC4] text-white shadow-[0_0_25px_rgba(217,175,196,0.4)] scale-110'
                      : 'glass-panel text-[#C8B8D2] border-[#4B2855]/60 hover:border-[#D9AFC4]/50 bg-[#160F1B]/80'
                  }`}
                >
                  <div className="p-1 rounded-lg bg-[#160F1B]">
                    {getNodeIcon(node.category)}
                  </div>
                  <span>{node.category}</span>
                </motion.button>
              );
            })}

          </div>

          {/* Right Detailed Node Inspector */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#A88FB5]/30 shadow-[0_20px_40px_rgba(22,15,27,0.7)] relative overflow-hidden bg-[#24152A]/80"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-[#160F1B] border border-[#4B2855]">
                    {getNodeIcon(activeNode.category)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#D9AFC4] uppercase tracking-wider">
                      ACTIVE ECOSYSTEM DOMAIN
                    </span>
                    <h3 className="text-xl font-bold font-display text-white">
                      {activeNode.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#F4EDE7]/90 leading-relaxed mb-6">
                  Connected technologies and architectural components deployed in Vaishnavi's projects and coursework.
                </p>

                <h4 className="text-xs font-mono uppercase text-[#D9AFC4] font-bold mb-3">
                  INTEGRATED TECHNOLOGIES & TOOLS:
                </h4>

                <div className="space-y-2 mb-6">
                  {activeNode.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="p-2.5 rounded-xl bg-[#160F1B]/90 border border-[#4B2855]/60 text-xs font-mono text-[#F4EDE7] flex items-center justify-between"
                    >
                      <span>{tech}</span>
                      <span className="w-2 h-2 rounded-full bg-[#D9AFC4]" />
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-[#4B2855]/30 border border-[#D9AFC4]/30 text-[11px] font-mono text-[#D9AFC4]">
                  Tip: Hover over or tap any satellite node to inspect interconnected dependencies.
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
