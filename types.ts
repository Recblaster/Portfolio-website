
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  link: string;
  category: 'Frontend' | 'Fullstack' | 'AI/ML' | 'Mobile';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Languages' | 'Frameworks' | 'Tools';
  icon: any;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isTyping?: boolean;
}

export enum Section {
  HERO = 'hero',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  CONTACT = 'contact'
}
