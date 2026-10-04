import React from 'react';
import { motion } from 'framer-motion';

interface RotatingSectionBadgeProps {
  text: string;
  className?: string;
  size?: number;
  reverse?: boolean;
}

export const RotatingSectionBadge: React.FC<RotatingSectionBadgeProps> = ({
  text,
  className = '',
  size = 120,
  reverse = false,
}) => {
  const repeatedText = text.endsWith(' ') ? text : `${text} • `;
  const radius = size * 0.38;
  const viewBoxSize = size;
  const center = viewBoxSize / 2;

  return (
    <div
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Subtle glowing center backdrop */}
      <div
        className="absolute rounded-full bg-gradient-to-tr from-[#8CC9E8]/10 via-[#A88FB5]/15 to-[#65BBD8]/10 blur-md"
        style={{ width: size * 0.65, height: size * 0.65 }}
      />

      {/* Decorative center icon or pulse dot */}
      <div className="absolute w-2 h-2 rounded-full bg-[#8CC9E8] shadow-[0_0_12px_#8CC9E8] animate-ping opacity-75" />
      <div className="absolute w-2 h-2 rounded-full bg-[#A88FB5]" />

      {/* Rotating Circular SVG text */}
      <motion.svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="w-full h-full"
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{
          repeat: Infinity,
          duration: 22,
          ease: 'linear',
        }}
      >
        <defs>
          <path
            id={`circle-path-${text.replace(/[^a-zA-Z0-9]/g, '')}`}
            d={`M ${center}, ${center} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text className="text-[9.5px] font-mono font-bold uppercase tracking-[0.22em] fill-[#C8B8D2] drop-shadow-[0_0_8px_rgba(140,201,232,0.4)]">
          <textPath
            href={`#circle-path-${text.replace(/[^a-zA-Z0-9]/g, '')}`}
            startOffset="0%"
          >
            {repeatedText}
          </textPath>
        </text>
      </motion.svg>
    </div>
  );
};
