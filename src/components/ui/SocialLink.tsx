import type { SocialLink as SocialLinkType } from '@/types';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SocialLinkProps {
  link: SocialLinkType;
  className?: string;
}

export function SocialLink({ link, className }: SocialLinkProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 text-text-secondary hover:text-blue transition-colors',
        className
      )}
      aria-label={link.label}
    >
      <ExternalLink size={18} />
      <span>{link.label}</span>
    </a>
  );
}
