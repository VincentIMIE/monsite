// Define types for our portfolio data
export interface SkillItem {
  id: string;
  name: string;
  level: number; // 1-5
  icon?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  skills?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  technologies: string[];
}

export interface HobbyItem {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  icon?: string;
  proficiency: number; // 1-5
}

export interface PhotoItem {
  id: string;
  title: string;
  url: string;
  description?: string;
}

export interface SectionConfig {
  id: string;
  title: string;
  type: 'skills' | 'experience' | 'projects' | 'hobbies' | 'tools' | 'photos' | 'custom';
  visible: boolean;
  order: number;
  parallaxEnabled?: boolean;
  customContent?: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  subtitle: string;
  sections: SectionConfig[];
}