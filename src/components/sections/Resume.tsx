import { motion } from 'framer-motion';
import { Download, Linkedin, FileText } from 'lucide-react';
import { personal } from '@/data/personal';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/common/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Resume() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper id="resume">
      <SectionHeading
        title="Resume"
        subtitle="Want to know more about my experience and qualifications?"
      />

      <motion.div
        className="max-w-3xl mx-auto text-center space-y-8"
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="relative p-12 bg-gradient-to-br from-navy-800 to-navy-700 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue/10 to-cyan/10" />
          
          <motion.div
            className="relative"
            initial={prefersReducedMotion ? {} : { y: 20, opacity: 0 }}
            whileInView={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue/20 rounded-full mb-6">
              <FileText size={40} className="text-blue" />
            </div>
            
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              Download my full CV to see my complete work history, education, 
              certifications, and detailed project descriptions. You can also 
              connect with me on LinkedIn to stay updated on my professional journey.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="primary"
                href={personal.cvPath}
                download
              >
                Download CV
                <Download size={18} />
              </Button>
              <Button
                variant="outline"
                href={personal.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View LinkedIn
                <Linkedin size={18} />
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
