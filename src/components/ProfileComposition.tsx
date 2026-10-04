import React, { useState } from 'react';
import { useCursor } from '../context/CursorContext';

export const ProfileComposition: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  return (
    <div
      className="relative flex flex-col items-center justify-center w-[340px] sm:w-[420px] md:w-[460px] select-none"
      onMouseEnter={() => {
        setIsHovered(true);
        setCursor('EXPLORE', 'image');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        resetCursor();
      }}
    >
      {/* Top Spark Particle ✦ */}
      <div
        className="absolute -top-6 text-[#2F9FEF] text-lg font-bold pointer-events-none select-none"
        style={{
          filter: 'drop-shadow(0 0 10px rgba(47, 159, 239, 0.8))',
          animation: 'phraseGlowPulse 3s ease-in-out infinite',
        }}
      >
        ✦
      </div>

      {/* Main Profile Circle Container */}
      <div className="relative flex items-center justify-center w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]">
        {/* Soft Dynamic Aura */}
        <div
          className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#1976D2]/30 via-[#2F9FEF]/25 to-[#66C7EA]/30 blur-2xl pointer-events-none"
          style={{
            transform: isHovered ? 'scale(1.15)' : 'scale(1)',
            opacity: isHovered ? 0.9 : 0.6,
            transition: 'transform 0.8s ease, opacity 0.8s ease',
          }}
        />

        {/* Ring 1: One thin blue outer ring (slow clockwise rotation) */}
        <div
          className="absolute -inset-7 rounded-full border border-[#1976D2]/45 pointer-events-none ring-anim-1"
          style={{
            boxShadow: '0 0 15px rgba(25, 118, 210, 0.15)',
          }}
        >
          {/* Subtle accent dot on Ring 1 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1976D2] shadow-[0_0_8px_#2F9FEF]" />
        </div>

        {/* Ring 2: One soft cyan glowing ring (slow counter-clockwise rotation) */}
        <div
          className="absolute -inset-4 rounded-full border border-[#66C7EA]/65 pointer-events-none ring-anim-2"
          style={{
            boxShadow: '0 0 16px rgba(102, 199, 234, 0.35)',
          }}
        />

        {/* Ring 3: One very subtle dashed ring (very slow dashed rotation) */}
        <div className="absolute -inset-1.5 rounded-full border border-dashed border-[#1976D2]/35 pointer-events-none ring-anim-3" />

        {/* Floating Profile Image Frame (Gentle vertical float up/down, NO continuous photo rotation) */}
        <div
          className="relative z-10 w-[240px] h-[240px] sm:w-[270px] sm:h-[270px] rounded-full p-1.5 bg-white border-2 border-[#1976D2]/30 shadow-[0_16px_45px_rgba(25,118,210,0.2),0_0_25px_rgba(102,199,234,0.25)] cursor-pointer overflow-hidden profile-frame-float"
        >
          <div className="relative w-full h-full rounded-full overflow-hidden bg-[#F0F8FF] border border-[#B9E4FA] profile-reveal-img">
            <img
              src="/assets/profile.jpg"
              alt="Vaishnavi R Kannur - Computer Science Engineer"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              loading="eager"
            />

            {/* Occasional blue light sweep across the photo */}
            <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none z-10">
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  background:
                    'linear-gradient(135deg, transparent 35%, rgba(255, 255, 255, 0.75) 50%, rgba(102, 199, 234, 0.4) 55%, transparent 65%)',
                  animation: 'lightSweepSheen 6s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        </div>

        {/* Small floating particles ◯ around bottom of the circle */}
        {/* Row 1: Left & Right dots */}
        <div
          className="absolute left-[10%] -bottom-3 w-2 h-2 rounded-full bg-[#2F9FEF] pointer-events-none"
          style={{ boxShadow: '0 0 8px #66C7EA', animation: 'expandingRingPulse 3.5s ease-in-out infinite 0.2s' }}
        />
        <div
          className="absolute right-[10%] -bottom-3 w-2 h-2 rounded-full bg-[#2F9FEF] pointer-events-none"
          style={{ boxShadow: '0 0 8px #66C7EA', animation: 'expandingRingPulse 3.5s ease-in-out infinite 0.9s' }}
        />

        {/* Row 2: 3 dots below (◯ ◯ ◯) */}
        <div
          className="absolute left-[34%] -bottom-7 w-1.5 h-1.5 rounded-full bg-[#66C7EA] pointer-events-none"
          style={{ boxShadow: '0 0 6px #2F9FEF', animation: 'expandingRingPulse 4s ease-in-out infinite 0.5s' }}
        />
        <div
          className="absolute left-1/2 -bottom-8 -translate-x-1/2 w-2 h-2 rounded-full bg-[#1976D2] pointer-events-none"
          style={{ boxShadow: '0 0 8px #2F9FEF', animation: 'expandingRingPulse 4.2s ease-in-out infinite 1.2s' }}
        />
        <div
          className="absolute right-[34%] -bottom-7 w-1.5 h-1.5 rounded-full bg-[#66C7EA] pointer-events-none"
          style={{ boxShadow: '0 0 6px #2F9FEF', animation: 'expandingRingPulse 4s ease-in-out infinite 1.8s' }}
        />
      </div>

      {/* Clean Minimal Identity Info Below (No Orbiting Badges) */}
      <div className="mt-12 flex flex-col items-center text-center z-20">
        <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#123B5D] tracking-wide">
          VAISHNAVI R KANNUR
        </h3>
        <p className="font-mono text-xs sm:text-sm font-semibold text-[#1976D2] mt-0.5">
          Computer Science Engineer
        </p>
        <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] font-bold text-[#123B5D] mt-2">
          <span>AI</span>
          <span className="text-[#2F9FEF]">•</span>
          <span>CLOUD</span>
          <span className="text-[#2F9FEF]">•</span>
          <span>SOFTWARE</span>
          <span className="text-[#2F9FEF]">•</span>
          <span>DEVELOPMENT</span>
        </div>
      </div>
    </div>
  );
};
