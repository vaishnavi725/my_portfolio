import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sparkles, Compass, Route, Globe } from 'lucide-react';

export const TravelPlannerVisual: React.FC = () => {
  const [selectedStop, setSelectedStop] = useState(0);

  const stops = [
    {
      name: 'Tokyo',
      tag: 'Day 1-3',
      desc: 'AI curated tech hubs & cultural itinerary',
      coords: '35.6762° N, 139.6503° E',
      accent: '#8CC9E8',
    },
    {
      name: 'Kyoto',
      tag: 'Day 4-5',
      desc: 'Historic temple route & transit vectors',
      coords: '35.0116° N, 135.7681° E',
      accent: '#A88FB5',
    },
    {
      name: 'Osaka',
      tag: 'Day 6-7',
      desc: 'Culinary map exploration & bookings',
      coords: '34.6937° N, 135.5023° E',
      accent: '#C9A85E',
    },
  ];

  return (
    <div className="rounded-2xl bg-[#24152A]/95 border border-[#8CC9E8]/40 p-5 sm:p-6 relative overflow-hidden shadow-[0_0_35px_rgba(140,201,232,0.2)]">
      {/* Background Rotating Globe Wireframe */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <motion.div
        className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full border border-dashed border-[#8CC9E8]/30 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
      />
      <motion.div
        className="absolute -right-4 -bottom-4 w-36 h-36 rounded-full border border-[#C9A85E]/20 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
      />

      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#4B2855] relative z-10">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#8CC9E8] animate-spin-slow" />
          <span className="text-xs font-mono uppercase font-bold text-[#8CC9E8] tracking-wider">
            AI GEOSPATIAL MAP &amp; ROUTE PIPELINE
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#C9A85E] px-2.5 py-0.5 rounded-full bg-[#24152A] border border-[#C9A85E]/40 flex items-center gap-1">
          <Globe className="w-3 h-3 text-[#C9A85E]" />
          Google Maps &amp; AI
        </span>
      </div>

      {/* Interactive Map Stops with Glowing Map Points */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5 relative z-10">
        {stops.map((stop, index) => {
          const isSelected = selectedStop === index;
          return (
            <motion.div
              key={stop.name}
              onClick={() => setSelectedStop(index)}
              whileHover={{ scale: 1.03 }}
              className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer relative ${
                isSelected
                  ? 'bg-[#4B2855]/70 border-[#8CC9E8] shadow-[0_0_20px_rgba(140,201,232,0.3)] ring-1 ring-[#8CC9E8]'
                  : 'bg-[#160F1B]/70 border-[#4B2855] hover:border-[#A88FB5]/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    {isSelected && (
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: stop.accent }}
                      />
                    )}
                    <span
                      className="relative inline-flex rounded-full h-2.5 w-2.5"
                      style={{ backgroundColor: stop.accent }}
                    />
                  </span>
                  <MapPin
                    className="w-3.5 h-3.5"
                    style={{ color: isSelected ? stop.accent : '#C8B8D2' }}
                  />
                  <span className="text-xs font-bold font-display text-white">{stop.name}</span>
                </div>
                <span
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#24152A]"
                  style={{ color: stop.accent }}
                >
                  {stop.tag}
                </span>
              </div>
              <p className="text-[10px] text-[#C8B8D2] font-mono mb-1">{stop.desc}</p>
              <span className="text-[9px] text-[#A88FB5]/70 font-mono">{stop.coords}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Animated Route Flow */}
      <div className="p-3.5 rounded-xl bg-[#160F1B]/95 border border-[#4B2855] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono relative z-10">
        <div className="flex items-center gap-2 text-[#F8F5F2]/90">
          <Route className="w-3.5 h-3.5 text-[#8CC9E8] shrink-0" />
          <span>User Query &rarr; LLM Planner &rarr; Dynamic Waypoints &rarr; Interactive Map</span>
        </div>
        <div className="flex items-center gap-1 text-[#C9A85E] shrink-0 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-Time AI Route Engine</span>
        </div>
      </div>
    </div>
  );
};
