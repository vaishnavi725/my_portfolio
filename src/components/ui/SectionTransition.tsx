import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

export type TransitionType =
  | 'circular'
  | 'horizontal-rotate'
  | '3d-card'
  | 'vertical-perspective'
  | 'circular-reveal'
  | 'diagonal-rotate'
  | 'flip'
  | 'digital-scan'
  | 'zoom-rotate'
  | 'default';

interface SectionTransitionProps {
  children: React.ReactNode;
  type?: TransitionType;
  className?: string;
  id?: string;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  type = 'default',
  className = '',
  id,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getVariants = (): Variants => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      };
    }

    switch (type) {
      case 'circular':
        return {
          hidden: { opacity: 0.6, scale: 0.96, rotate: -1.5 },
          visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
          },
        };

      case 'horizontal-rotate':
        return {
          hidden: { opacity: 0.6, x: 30, rotateY: 4 },
          visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
          },
        };

      case '3d-card':
        return {
          hidden: { opacity: 0.6, rotateX: 6, y: 30 },
          visible: {
            opacity: 1,
            rotateX: 0,
            y: 0,
            transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
          },
        };

      case 'vertical-perspective':
        return {
          hidden: { opacity: 0.6, y: 40, rotateX: -4 },
          visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] as const },
          },
        };

      case 'circular-reveal':
        return {
          hidden: { opacity: 0.6, scale: 0.95, rotateZ: 1.5 },
          visible: {
            opacity: 1,
            scale: 1,
            rotateZ: 0,
            transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as const },
          },
        };

      case 'diagonal-rotate':
        return {
          hidden: { opacity: 0.6, x: -25, y: 25, rotate: -1.5 },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
          },
        };

      case 'flip':
        return {
          hidden: { opacity: 0.6, rotateY: 8 },
          visible: {
            opacity: 1,
            rotateY: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
          },
        };

      case 'digital-scan':
        return {
          hidden: { opacity: 0.6, y: 25 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
          },
        };

      case 'zoom-rotate':
        return {
          hidden: { opacity: 0.6, scale: 0.96, rotate: 1 },
          visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
          },
        };

      default:
        return {
          hidden: { opacity: 0.6, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
          },
        };
    }
  };

  return (
    <motion.div
      id={id}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.01 }}
      variants={getVariants()}
      className={`relative w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};
