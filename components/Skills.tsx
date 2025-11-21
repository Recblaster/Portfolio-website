
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Hexagon, Zap } from 'lucide-react'; // Import default icon just in case
import { Skill } from '../types';
import TechMarquee from './TechMarquee';

interface SkillsProps {
  skills: Skill[];
}

// Enhanced skill data wrapper for the visual revamp
const SKILL_DESCRIPTIONS: Record<string, string> = {
  'React / Next.js': 'Building complex SPAs with server-side rendering and advanced state management patterns.',
  'TypeScript': 'Enforcing type safety and architectural scalability across large codebases.',
  'Node.js': 'Designing high-performance microservices and RESTful APIs.',
  'Three.js / WebGL': 'Crafting immersive 3D web experiences and shader programming.',
  'AI / LLM Integration': 'Implementing RAG pipelines and fine-tuning models for specific use cases.',
  'Tailwind CSS': 'Rapid UI development with a focus on design systems and responsiveness.',
};

const RadarChart: React.FC<{ level: number }> = ({ level }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Background Circle */}
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-slate-800"
        />
        {/* Progress Circle */}
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          cx="64"
          cy="64"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeLinecap="round"
          className="text-accent drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col select-none">
        <span className="text-2xl font-bold text-white font-mono leading-none">{level}%</span>
        {/* Adjusted padding to visually center the tracking-widest text */}
        <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 pl-2">Mastery</span>
      </div>
    </div>
  );
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  // Initialize hover state with first skill when data loads
  useEffect(() => {
    if (skills.length > 0 && !hoveredSkill) {
      setHoveredSkill(skills[0]);
    }
  }, [skills, hoveredSkill]);

  // Group skills by category
  const categories = useMemo(() => {
    const grouped: Record<string, Skill[]> = {};
    skills.forEach(skill => {
      if (!grouped[skill.category]) grouped[skill.category] = [];
      grouped[skill.category].push(skill);
    });
    return grouped;
  }, [skills]);

  // Helper to render icon safely
  const renderIcon = (skill: Skill) => {
    if (!skill.icon) return <Zap size={20} />;
    // If it's a React component (function)
    if (typeof skill.icon === 'function' || typeof skill.icon === 'object') {
        const Icon = skill.icon;
        return <Icon size={20} />;
    }
    return <Zap size={20} />;
  };

  const renderLargeIcon = (skill: Skill) => {
    if (!skill.icon) return <Zap size={32} />;
    if (typeof skill.icon === 'function' || typeof skill.icon === 'object') {
        const Icon = skill.icon;
        return <Icon size={32} />;
    }
    return <Zap size={32} />;
  }

  if (!hoveredSkill && skills.length > 0) return null; // Wait for effect

  return (
    <section id="skills" className="py-32 px-6 relative z-10 overflow-hidden scroll-mt-20">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-px w-12 bg-accent"></div>
            <span className="text-accent font-mono text-sm tracking-widest uppercase">System Architecture</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
          >
            TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-700">ARSENAL</span>
          </motion.h2>
        </div>
      </div>

      {/* Marquee Section - Full Width Breakout */}
      <motion.div
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         transition={{ duration: 1 }}
         className="w-screen relative left-1/2 -translate-x-1/2 mb-16"
      >
         <TechMarquee />
      </motion.div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Skill Directory */}
          <div className="lg:col-span-7 space-y-12">
            {(Object.entries(categories) as [string, Skill[]][]).map(([category, categorySkills], catIndex) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <h3 className="text-slate-400 font-mono text-sm uppercase tracking-wider mb-6 flex items-center gap-3">
                  <Hexagon size={12} className="text-accent" />
                  {category}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categorySkills.map((skill) => (
                    <motion.button
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative p-4 rounded-lg border text-left transition-all duration-300 ${
                        hoveredSkill?.name === skill.name
                          ? 'bg-slate-800/80 border-accent/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]' 
                          : 'bg-slate-900/40 border-slate-800 hover:border-slate-600'
                      }`}
                    >
                      {/* Hover Glow Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 transition-opacity duration-300 ${hoveredSkill?.name === skill.name ? 'opacity-100' : ''}`} />

                      <div className="relative z-10 flex items-center gap-4">
                        <div className={`p-2 rounded-md transition-colors ${
                          hoveredSkill?.name === skill.name ? 'bg-accent text-slate-900' : 'bg-slate-800 text-slate-400 group-hover:text-white'
                        }`}>
                          {renderIcon(skill)}
                        </div>
                        <div>
                          <h4 className={`font-semibold transition-colors ${
                            hoveredSkill?.name === skill.name ? 'text-white' : 'text-slate-300'
                          }`}>
                            {skill.name}
                          </h4>
                          <div className="h-1 w-full bg-slate-800 mt-2 rounded-full overflow-hidden">
                            <div 
                              style={{ width: `${skill.level}%` }}
                              className={`h-full transition-colors ${
                                hoveredSkill?.name === skill.name ? 'bg-accent' : 'bg-slate-600'
                              }`} 
                            />
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT COLUMN: The Analyzer (Sticky HUD) */}
          <div className="hidden lg:block lg:col-span-5 relative h-full">
            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                {hoveredSkill && (
                <motion.div
                  key={hoveredSkill.name}
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
                >
                  {/* Scanner Effect */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-accent/50 shadow-[0_0_15px_rgba(6,182,212,0.8)] animate-[scan_2s_linear_infinite]" />
                  
                  {/* Header */}
                  <div className="flex justify-between items-start mb-8 border-b border-slate-800 pb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-1">{hoveredSkill.name}</h3>
                      <span className="font-mono text-accent text-xs uppercase tracking-widest bg-accent/10 px-2 py-1 rounded">
                        Module: {hoveredSkill.category}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-accent shadow-inner">
                      {renderLargeIcon(hoveredSkill)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex items-center gap-8 mb-8">
                    <RadarChart level={hoveredSkill.level} />
                    <div className="flex-1 space-y-4">
                      <div className="space-y-1">
                         <div className="flex justify-between text-xs font-mono text-slate-500 uppercase">
                           <span>Status</span>
                           <span className="text-green-400">Active</span>
                         </div>
                         <div className="flex justify-between text-xs font-mono text-slate-500 uppercase">
                           <span>Version</span>
                           <span>Latest</span>
                         </div>
                         <div className="flex justify-between text-xs font-mono text-slate-500 uppercase">
                           <span>Experience</span>
                           <span>{hoveredSkill.level > 90 ? 'Expert' : 'Advanced'}</span>
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800/50">
                    <div className="flex items-center gap-2 mb-2 text-slate-400 font-mono text-xs">
                      <Terminal size={12} />
                      <span>./description.txt</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-sm">
                      <span className="text-accent mr-2">{'>'}</span>
                      {SKILL_DESCRIPTIONS[hoveredSkill.name] || `Professional proficiency in ${hoveredSkill.name}, utilized in production environments for scalable solutions.`}
                      <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle"></span>
                    </p>
                  </div>
                  
                  {/* Decorative Corners */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent opacity-50"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent opacity-50"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent opacity-50"></div>
                </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
