import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    label: 'Frontend',
    skills: [
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'React' },
      { name: 'Tailwind CSS' },
      { name: 'Vite' },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js' },
      { name: 'Express.js' },
    ],
  },
  {
    label: 'Database',
    skills: [
      { name: 'MongoDB' },
      { name: 'MySQL' },
      { name: 'Supabase' },
    ],
  },
  {
    label: 'Tools',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'VS Code' },
      { name: 'Postman' },
    ],
  },
];
