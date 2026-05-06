import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';
import type { Project } from '@/types';
import { ImageSlider } from './ImageSlider';
import { Chip } from '@/components/common/Chip';
import { Badge } from '@/components/common/Badge';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
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

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      
      // Focus the modal after animation
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
      
      // Return focus to the element that opened the modal
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    modal.addEventListener('keydown', handleTabKey);
    return () => modal.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 overflow-hidden"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={prefersReducedMotion ? {} : { opacity: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              ref={modalRef}
              className={cn(
                'relative w-full max-w-4xl bg-navy-800 border border-white/10 rounded-2xl shadow-2xl',
                'max-h-[90vh] overflow-y-auto my-8'
              )}
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              {/* Close Button */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-navy-900/80 hover:bg-navy-900 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Image Slider */}
                <ImageSlider images={project.images} alt={project.title} />

                {/* Project Info */}
                <div className="space-y-6">
                  {/* Title and Status */}
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h2 id="modal-title" className="text-3xl font-bold text-text-primary">
                        {project.title}
                      </h2>
                      {project.status && (
                        <Badge 
                          label={statusLabels[project.status]} 
                          color={statusColors[project.status]} 
                        />
                      )}
                    </div>
                    <p id="modal-description" className="text-text-secondary leading-relaxed">
                      {project.fullDescription}
                    </p>
                  </div>

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                        <CheckCircle size={20} className="text-blue" />
                        Key Highlights
                      </h3>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2 text-text-secondary">
                            <span className="text-blue mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Challenges */}
                  {project.challenges && (
                    <div className="bg-navy-900/50 border border-orange-500/20 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-text-primary mb-2 flex items-center gap-2">
                        <AlertCircle size={20} className="text-orange-500" />
                        Challenges
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        {project.challenges}
                      </p>
                    </div>
                  )}

                  {/* Solution */}
                  {project.solution && (
                    <div className="bg-navy-900/50 border border-green-500/20 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-text-primary mb-2 flex items-center gap-2">
                        <Lightbulb size={20} className="text-green-500" />
                        Solution
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  )}

                  {/* Technologies */}
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-3">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Chip key={tech} label={tech} />
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue hover:bg-blue-light text-white rounded-lg transition-colors font-medium"
                      >
                        <ExternalLink size={20} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.githubUrl && project.status !== 'in-progress' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-navy-700 hover:bg-navy-600 text-white rounded-lg transition-colors font-medium border border-white/10"
                      >
                        <Github size={20} />
                        <span>View Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
