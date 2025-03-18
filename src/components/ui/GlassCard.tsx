
import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: 'default' | 'subtle' | 'solid';
  hoverEffect?: boolean;
}

const variants = {
  default: 'glass-card',
  subtle: 'glass-panel',
  solid: 'bg-white shadow-subtle rounded-2xl',
};

const GlassCard = ({ 
  children, 
  variant = 'default', 
  hoverEffect = false,
  className,
  ...props 
}: GlassCardProps) => {
  return (
    <motion.div
      className={cn(
        variants[variant],
        hoverEffect && 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
