import { cn } from '@/utils/cn';

interface ChipProps {
  label: string;
  className?: string;
}

export function Chip({ label, className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-navy-800 text-text-secondary border border-white/10',
        className
      )}
    >
      {label}
    </span>
  );
}
