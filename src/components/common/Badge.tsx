import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

interface BadgeProps {
  label: string | ReactNode;
  color?: 'blue' | 'cyan' | 'violet' | 'green' | 'yellow' | 'purple' | 'orange';
  className?: string;
}

export function Badge({ label, color = 'blue', className }: BadgeProps) {
  const colors = {
    blue: 'bg-blue/20 text-blue-light border-blue/30',
    cyan: 'bg-cyan/20 text-cyan-light border-cyan/30',
    violet: 'bg-violet/20 text-violet-light border-violet/30',
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
        colors[color],
        className
      )}
    >
      {label}
    </span>
  );
}
