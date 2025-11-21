import { Project, Skill } from './types';
import { Code, Terminal, Database, Layers, Cpu, Globe, Smartphone, Palette } from 'lucide-react';

export const PORTFOLIO_OWNER = "Aryan";

export const SYSTEM_INSTRUCTION = `
You are an AI assistant for ${PORTFOLIO_OWNER}'s portfolio website. 
Your goal is to professionally and enthusiastically answer questions about ${PORTFOLIO_OWNER}'s skills, projects, and experience.

Here is the context about ${PORTFOLIO_OWNER}:
- Role: Senior Full Stack Engineer & Creative Technologist.
- Key Skills: React, TypeScript, Node.js, Python, WebGL (Three.js), AI Integration (Gemini API), Tailwind CSS.
- Experience: 7+ years building scalable web apps and immersive 3D experiences.
- Philosophy: "Blending code with art to create meaningful digital experiences."
- Availability: Open for freelance and full-time opportunities.

Projects Context:
1. NeonNexus: A 3D visualization dashboard for crypto assets.
2. EcoTrack: An AI-powered sustainability tracking mobile app.
3. DevFlow: A developer productivity tool integrated with VS Code.

Tone: Professional, witty, slightly tech-focused, helpful. 
If asked about contact info, direct them to the contact section or mention 'aryan@example.com'.
Keep responses concise (under 100 words usually) unless a detailed technical explanation is asked.
`;

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'NeonNexus Dashboard',
    description: 'Real-time 3D data visualization for cryptocurrency markets using React Three Fiber and WebSocket streams.',
    techStack: ['React', 'Three.js', 'WebSocket', 'Tailwind'],
    imageUrl: 'https://picsum.photos/800/600?random=1',
    link: '#',
    category: 'Frontend'
  },
  {
    id: '2',
    title: 'EcoTrack AI',
    description: 'Mobile application that uses Gemini Vision to analyze trash and suggest recycling methods.',
    techStack: ['React Native', 'Gemini API', 'Firebase'],
    imageUrl: 'https://picsum.photos/800/600?random=2',
    link: '#',
    category: 'AI/ML'
  },
  {
    id: '3',
    title: 'DevFlow Suite',
    description: 'A productivity ecosystem for developers including a CLI tool and a web dashboard for task management.',
    techStack: ['Rust', 'Tauri', 'React', 'GraphQL'],
    imageUrl: 'https://picsum.photos/800/600?random=3',
    link: '#',
    category: 'Fullstack'
  },
  {
    id: '4',
    title: 'Lumina UI Kit',
    description: 'An open-source accessible component library focused on glassmorphism aesthetics.',
    techStack: ['TypeScript', 'Storybook', 'CSS Modules'],
    imageUrl: 'https://picsum.photos/800/600?random=4',
    link: '#',
    category: 'Frontend'
  }
];

export const SKILLS: Skill[] = [
  { name: 'React / Next.js', level: 95, category: 'Frameworks', icon: Code },
  { name: 'TypeScript', level: 90, category: 'Languages', icon: Terminal },
  { name: 'Node.js', level: 85, category: 'Frameworks', icon: Database },
  { name: 'Three.js / WebGL', level: 75, category: 'Tools', icon: Layers },
  { name: 'AI / LLM Integration', level: 80, category: 'Tools', icon: Cpu },
  { name: 'Tailwind CSS', level: 95, category: 'Tools', icon: Palette },
];