
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Filter, ChevronDown, Check } from 'lucide-react';
import gsap from 'gsap';
import { Project } from '../types';
import SpotlightCard from './SpotlightCard';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.project-item');
      
      // Kill existing tweens to prevent conflicts
      gsap.killTweensOf(cards);

      gsap.fromTo(cards, 
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.5, 
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "all" 
        }
      );
    }
  }, [activeCategory, projects]); // Re-run when projects change

  return (
    <section id="projects" className="py-32 px-6 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div className="max-w-2xl">
             <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sans tracking-tight">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-techPurple">Works</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Explorations in code, design, and interaction. A collection of projects pushing the boundaries of web technology.
            </p>
          </div>
          
          {/* Dropdown Filter */}
          <div className="relative z-20 w-full md:w-auto">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full md:w-auto flex items-center gap-4 px-6 py-3 bg-slate-900/80 backdrop-blur-sm border border-slate-700 hover:border-accent/50 rounded-xl text-slate-300 transition-all group min-w-[200px] justify-between shadow-lg hover:shadow-accent/5"
            >
              <div className="flex items-center gap-3">
                <Filter size={18} className="text-accent" />
                <span className="font-mono text-sm uppercase tracking-wider font-semibold">{activeCategory}</span>
              </div>
              <ChevronDown size={18} className={`text-slate-500 transition-transform duration-300 group-hover:text-accent ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-full md:w-[240px] bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl overflow-hidden py-2 z-30"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-sm font-mono uppercase tracking-wider flex justify-between items-center transition-all ${
                        activeCategory === cat 
                          ? 'bg-accent/10 text-accent border-l-2 border-accent pl-[18px]' 
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white border-l-2 border-transparent'
                      }`}
                    >
                      {cat}
                      {activeCategory === cat && <Check size={16} className="text-accent" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 min-h-[500px]">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className={`project-item h-full transition-all duration-500 ease-out will-change-transform ${
                hoveredProject === project.id ? 'scale-[1.02] lg:scale-[1.03] z-10' : ''
              } ${
                hoveredProject && hoveredProject !== project.id ? 'blur-[2px] opacity-50 scale-95 grayscale-[0.8]' : ''
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <SpotlightCard className="h-full group">
                <div className="flex flex-col h-full p-6 sm:p-8 relative z-10">
                   {/* Image Area */}
                   <div className="relative aspect-video overflow-hidden rounded-lg mb-6 bg-slate-950 border border-slate-800/50 group-hover:border-accent/30 transition-colors duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 z-10" />
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                        <a href={project.link} className="p-2 bg-slate-900/90 backdrop-blur text-white rounded-full hover:bg-accent hover:text-slate-900 transition-colors border border-slate-700 hover:border-accent">
                           <Github size={16} />
                        </a>
                        <a href={project.link} className="p-2 bg-slate-900/90 backdrop-blur text-white rounded-full hover:bg-accent hover:text-slate-900 transition-colors border border-slate-700 hover:border-accent">
                           <ExternalLink size={16} />
                        </a>
                      </div>
                   </div>

                   {/* Content */}
                   <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                         <span className="text-accent font-mono text-xs tracking-wider uppercase px-2 py-1 bg-accent/10 rounded border border-accent/20">{project.category}</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors flex items-center gap-2">
                        {project.title}
                        <ArrowUpRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent" />
                      </h3>
                      
                      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-slate-800/50 group-hover:border-accent/20 transition-colors">
                        {project.techStack.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-2.5 py-1 text-[11px] font-mono text-slate-500 bg-slate-950/50 rounded border border-slate-800/50 group-hover:border-slate-700 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                   </div>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
