import { motion } from 'framer-motion';
import { Calendar, Award, Code, Globe } from 'lucide-react';
import { personal } from '@/data/personal';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/common/SectionHeading';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const highlights = [
  {
    icon: Calendar,
    label: 'Started coding at age 10',
  },
  {
    icon: Award,
    label: 'Certified in 8+ technologies',
  },
  {
    icon: Code,
    label: 'Full-stack developer',
  },
  {
    icon: Globe,
    label: 'Modern web applications',
  },
];

export function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper id="about" className="bg-navy-800/50 rounded-2xl">
      <SectionHeading
        title="About Me"
        subtitle="Get to know more about my journey and expertise"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="flex justify-center"
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -40 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue/20 to-cyan/20 rounded-2xl blur-xl" />
            <img
              src={personal.avatarPath}
              alt={personal.name}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl object-contain border-2 border-white/10 shadow-2xl bg-white"
            />
          </div>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={prefersReducedMotion ? {} : { opacity: 0, x: 40 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-base text-text-secondary leading-relaxed">
            {personal.bio}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={highlight.label}
                  className="flex items-start gap-3 p-4 bg-navy-700 rounded-lg border border-white/5"
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Icon className="text-blue flex-shrink-0 mt-1" size={20} />
                  <span className="text-sm text-text-secondary">
                    {highlight.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
