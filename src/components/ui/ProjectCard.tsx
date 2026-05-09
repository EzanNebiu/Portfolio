import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import type { Project } from '@/types';
import { Badge } from '@/components/common/Badge';
import { Chip } from '@/components/common/Chip';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';

interface ProjectCardProps {
  project: Project;
  className?: string;
  onClick: () => void;
}

const statusColors = {
  completed: 'green',
  'in-progress': 'yellow',
  live: 'blue',
  'coming-soon': 'purple',
} as const;

const statusLabels = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  live: 'Live',
  'coming-soon': 'Coming Soon',
} as const;

export function ProjectCard({ project, className, onClick }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      className={cn(
        'group bg-navy-800 border border-white/10 rounded-2xl backdrop-blur-sm shadow-xl overflow-hidden transition-all duration-300 cursor-pointer',
        className
      )}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={prefersReducedMotion ? {} : { y: -4, boxShadow: '0 20px 40px rgba(37, 99, 235, 0.2)' }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden bg-navy-700">
        <img
          src={project.mainImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start gap-2">
          <div className="flex flex-wrap gap-2">
            {project.featured && (
              <Badge 
                label={
                  <span className="flex items-center gap-1">
                    <Star size={14} fill="currentColor" />
                    Featured
                  </span>
                } 
                color="yellow" 
              />
            )}
            {project.status && (
              <Badge 
                label={statusLabels[project.status]} 
                color={statusColors[project.status]} 
              />
            )}
          </div>
          <Badge label={project.category} color="blue" />
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-2">
            {project.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <Chip key={tech} label={tech} />
          ))}
          {project.technologies.length > 4 && (
            <Chip label={`+${project.technologies.length - 4}`} />
          )}
        </div>

        <div className="pt-2 flex flex-wrap gap-3 items-center">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue hover:bg-blue-light text-white rounded-lg transition-colors text-sm font-medium"
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          )}
          <span className="text-blue hover:text-blue-light text-sm font-medium transition-colors inline-flex items-center gap-1">
            View Details
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </motion.article>
  );
}
