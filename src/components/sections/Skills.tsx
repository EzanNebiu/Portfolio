import { motion } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/common/SectionHeading';
import { SkillChip } from '@/components/ui/SkillChip';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Skills() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper id="skills" className="bg-navy-800/50 rounded-2xl">
      <SectionHeading
        title="Skills & Technologies"
        subtitle="Tools and technologies I work with"
      />

      <div className="space-y-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.label}
            className="space-y-4"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <h3 className="text-xl font-bold text-text-primary">
              {category.label}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                >
                  <SkillChip skill={skill} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
