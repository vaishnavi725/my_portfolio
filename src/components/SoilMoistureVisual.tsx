import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Activity, Waves, Sprout } from 'lucide-react';

export const SoilMoistureVisual: React.FC = () => {
  const [moistureLevel, setMoistureLevel] = useState(28); // percentage
  const isWatering = moistureLevel < 35; // Threshold for automatic relay actuation

  return (
    <div className="rounded-2xl bg-[#24152A]/95 border border-[#8CC9E8]/40 p-5 sm:p-6 relative overflow-hidden shadow-[0_0_35px_rgba(140,201,232,0.2)]">
      {/* Background Animated Water Particles / Flow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      {isWatering && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#8CC9E8]/10 via-transparent to-transparent pointer-events-none"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}

      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-5 border-b border-[#4B2855] relative z-10">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-[#8CC9E8] animate-pulse" />
          <span className="text-xs font-mono uppercase font-bold text-[#8CC9E8] tracking-wider">
            IoT TELEMETRY &amp; VALVE ACTUATION
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#65BBD8] px-2.5 py-0.5 rounded-full bg-[#160F1B] border border-[#65BBD8]/40 flex items-center gap-1">
          <Sprout className="w-3 h-3 text-[#65BBD8]" />
          SCINOVA 2024 Hardware Model
        </span>
      </div>

      {/* Interactive Moisture Slider */}
      <div className="p-4 rounded-xl bg-[#160F1B]/95 border border-[#4B2855] mb-5 relative z-10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-mono text-[#F8F5F2]/90 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#8CC9E8]" />
            Soil Moisture Probe Simulation:
          </span>
          <span
            className={`text-sm font-bold font-mono ${
              isWatering ? 'text-[#8CC9E8]' : 'text-[#C9A85E]'
            }`}
          >
            {moistureLevel}% {isWatering ? '(DRY - ACTUATION ACTIVE)' : '(OPTIMAL HYDRATION)'}
          </span>
        </div>

        <input
          type="range"
          min="5"
          max="95"
          value={moistureLevel}
          onChange={(e) => setMoistureLevel(Number(e.target.value))}
          className="w-full h-2 bg-[#24152A] rounded-lg appearance-none cursor-pointer accent-[#8CC9E8]"
        />
        <div className="flex justify-between text-[10px] font-mono text-[#A88FB5]/80 mt-1">
          <span>0% (Parched Soil)</span>
          <span className="text-[#8CC9E8] font-bold">Actuation Threshold: &lt;35%</span>
          <span>100% (Saturated)</span>
        </div>
      </div>

      {/* Embedded Hardware Dataflow: Water Particles -> Sensor -> Arduino -> Plant */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 relative z-10">
        {[
          {
            name: 'Analog Sensor Probe',
            val: `${Math.round(moistureLevel * 10.23)} ADC`,
            status: 'Sampled Raw',
          },
          {
            name: 'Arduino Controller',
            val: 'Embedded C Logic',
            status: 'Calibrated',
          },
          {
            name: '5V Relay Module',
            val: isWatering ? 'CLOSED (ON)' : 'OPEN (OFF)',
            status: isWatering ? 'Energized' : 'Standby',
          },
          {
            name: 'Solenoid Actuator',
            val: isWatering ? 'WATER FLOWING' : 'IDLE',
            status: isWatering ? 'Active Feed' : 'Closed',
          },
        ].map((item, idx) => (
          <div
            key={item.name}
            className={`p-2.5 rounded-xl border text-center transition-all duration-300 ${
              isWatering && idx >= 2
                ? 'bg-[#4B2855] border-[#8CC9E8] text-white ring-1 ring-[#8CC9E8] shadow-[0_0_15px_rgba(140,201,232,0.3)]'
                : 'bg-[#160F1B]/80 border-[#4B2855] text-[#C8B8D2]'
            }`}
          >
            <div className="text-[10px] font-mono text-[#A88FB5]">{item.name}</div>
            <div className="text-xs font-bold font-mono my-0.5 text-white">{item.val}</div>
            <div className="text-[9px] text-[#8CC9E8]/80 font-mono">{item.status}</div>
          </div>
        ))}
      </div>

      {/* Operational Footnote */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#C8B8D2] pt-2 border-t border-[#4B2855] relative z-10">
        <span className="flex items-center gap-1.5 text-[#8CC9E8]">
          <Waves className="w-3.5 h-3.5" />
          <span>35% Water Conserved via Closed-Loop Telemetry</span>
        </span>
        <span className="text-[#A88FB5]">Error Margin &lt;2%</span>
      </div>
    </div>
  );
};
