import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';

interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'outline';
  href?: string;
  onClick?: () => void;
  download?: boolean;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export function Button({
  variant = 'primary',
  href,
  onClick,
  download,
  children,
  className,
  target,
  rel,
}: ButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-navy';
  
  const variants = {
    primary: 'bg-blue text-white hover:bg-blue-light shadow-lg shadow-blue/20 hover:shadow-blue/30',
    ghost: 'text-blue hover:bg-blue/10',
    outline: 'border-2 border-blue text-blue hover:bg-blue/10',
  };

  const classes = cn(baseStyles, variants[variant], className);

  const MotionComponent = motion(href ? 'a' : 'button');

  return (
    <MotionComponent
      href={href}
      onClick={onClick}
      download={download}
      target={target}
      rel={rel}
      className={classes}
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
    >
      {children}
    </MotionComponent>
  );
}
