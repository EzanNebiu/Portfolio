export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  avatarPath: string;
  linkedInUrl: string;
  gitHubUrl: string;
  cvPath: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  mainImage: string;
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: ProjectCategory;
  featured: boolean;
  status?: 'completed' | 'in-progress' | 'live' | 'coming-soon';
  highlights?: string[];
  challenges?: string;
  solution?: string;
}

export type ProjectCategory = 'Frontend' | 'Fullstack' | 'Tool' | 'AI';

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  label: string;
  skills: Skill[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}
