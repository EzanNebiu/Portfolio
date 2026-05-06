import { motion } from 'framer-motion';
import { Download, Linkedin, ArrowDown } from 'lucide-react';
import { personal } from '@/data/personal';
import { Button } from '@/components/common/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-800 to-navy-700 -z-10" />
      
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            variants={prefersReducedMotion ? {} : containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tight"
              variants={prefersReducedMotion ? {} : itemVariants}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <span className="bg-gradient-to-r from-blue-light to-cyan bg-clip-text text-transparent">
                {personal.name}
              </span>
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl font-semibold text-text-primary"
              variants={prefersReducedMotion ? {} : itemVariants}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {personal.title}
            </motion.p>

            <motion.p
              className="text-lg md:text-xl text-text-secondary leading-relaxed"
              variants={prefersReducedMotion ? {} : itemVariants}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {personal.tagline}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              variants={prefersReducedMotion ? {} : itemVariants}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Button variant="primary" onClick={handleScrollToProjects}>
                View Projects
                <ArrowDown size={18} />
              </Button>
              <Button
                variant="outline"
                href={personal.cvPath}
                download
              >
                Download CV
                <Download size={18} />
              </Button>
              <Button
                variant="ghost"
                href={personal.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <Linkedin size={18} />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center lg:justify-end"
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue to-cyan rounded-full blur-2xl opacity-30" />
              <img
                src={personal.avatarPath}
                alt={personal.name}
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-contain border-4 border-white/10 shadow-2xl bg-white"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
