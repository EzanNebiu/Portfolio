import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import type { Project, ProjectCategory } from '@/types';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';

const categories: (ProjectCategory | 'All')[] = ['All', 'Frontend', 'Fullstack', 'Tool', 'AI'];

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <SectionWrapper id="projects">
      <SectionHeading
        title="Featured Projects"
        subtitle="A selection of my recent work and personal projects"
      />

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              'px-6 py-2 rounded-full text-sm font-medium transition-all',
              selectedCategory === category
                ? 'bg-blue text-white shadow-lg shadow-blue/20'
                : 'bg-navy-800 text-text-secondary border border-white/10 hover:border-blue/50 hover:text-blue'
            )}
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        layout={!prefersReducedMotion}
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            layout={!prefersReducedMotion}
          >
            <ProjectCard project={project} onClick={() => handleProjectClick(project)} />
          </motion.div>
        ))}
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={prefersReducedMotion ? {} : { opacity: 1 }}
        >
          <p className="text-text-secondary">No projects found in this category.</p>
        </motion.div>
      )}

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </SectionWrapper>
  );
}
