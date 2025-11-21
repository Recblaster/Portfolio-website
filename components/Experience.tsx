
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: "Senior Creative Technologist",
    company: "TechNova Innovations",
    period: "2023 - Present",
    description: "Leading the R&D division for immersive web experiences. Architecting 3D visualization tools for fintech clients and integrating LLMs into customer support workflows.",
    tech: ["React Three Fiber", "Python", "AWS", "Gemini API"]
  },
  {
    id: 2,
    role: "Full Stack Engineer",
    company: "Nexus Systems",
    period: "2021 - 2023",
    description: "Spearheaded the migration of a monolithic legacy codebase to a microservices architecture. Improved system uptime by 99.9% and reduced server costs by 40%.",
    tech: ["Node.js", "Rust", "Docker", "PostgreSQL"]
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "Creative Pulse Agency",
    period: "2019 - 2021",
    description: "Developed award-winning marketing sites for Fortune 500 clients. Focused on high-performance animations, accessibility, and responsive design patterns.",
    tech: ["React", "GSAP", "WebGL", "SCSS"]
  },
  {
    id: 4,
    role: "Junior Web Developer",
    company: "StartUp Inc",
    period: "2018 - 2019",
    description: "Collaborated with design teams to implement UI components. Assisted in backend API development and database schema design.",
    tech: ["JavaScript", "HTML5", "CSS3", "Firebase"]
  }
];

const ExperienceCard: React.FC<{ experience: typeof experiences[0]; index: number }> = ({ experience, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`relative flex items-center justify-between md:justify-normal mb-12 w-full ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Timeline Node */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-slate-950 border-2 border-accent rounded-full z-10 shadow-[0_0_10px_rgba(6,182,212,0.8)]">
        <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20"></div>
      </div>

      {/* Spacer for Desktop alignment */}
      <div className="hidden md:block w-1/2" />

      {/* Content Card */}
      <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-12 text-right" : "md:pl-12 text-left"}`}>
        <div className="group relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 hover:border-accent/50 p-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:-translate-y-1">
          
          {/* Decorative corner accents */}
          <div className={`absolute top-0 w-3 h-3 border-t border-accent/50 transition-all duration-300 ${isEven ? "right-0 border-r" : "left-0 border-l"}`} />
          <div className={`absolute bottom-0 w-3 h-3 border-b border-accent/50 transition-all duration-300 ${isEven ? "left-0 border-l" : "right-0 border-r"}`} />

          <div className={`flex flex-col gap-1 mb-4 ${isEven ? "md:items-end" : "md:items-start"}`}>
            <span className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider bg-accent/10 px-2 py-1 rounded border border-accent/20">
              <Calendar size={12} />
              {experience.period}
            </span>
            <h3 className="text-xl font-bold text-white mt-2 group-hover:text-accent transition-colors">
              {experience.role}
            </h3>
            <span className="text-slate-400 font-medium text-sm flex items-center gap-1">
               <Briefcase size={14} />
               {experience.company}
            </span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            {experience.description}
          </p>

          <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
            {experience.tech.map((t) => (
              <span key={t} className="text-[10px] font-mono text-slate-500 bg-slate-950 border border-slate-800 px-2 py-1 rounded hover:border-slate-600 hover:text-slate-300 transition-colors cursor-default">
                {t}
              </span>
            ))}
          </div>

          {/* Connecting Line for Card */}
          <div 
             className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-px bg-gradient-to-r from-accent/50 to-transparent ${
               isEven ? "-right-12 rotate-180" : "-left-12"
             }`} 
          />
        </div>
      </div>
    </motion.div>
  );
};

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-32 px-6 relative scroll-mt-20">
      <div className="max-w-5xl mx-auto relative" ref={containerRef}>
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 text-accent font-mono text-sm tracking-[0.3em] uppercase mb-3 opacity-80">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Career Trajectory
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600">Evolution</span>
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Line (Background) */}
          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-slate-800/50" />
          
          {/* Central Line (Active/Filled) */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-blue-500 to-purple-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" 
          />

          {/* Experience Cards */}
          <div className="relative z-10">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>

          {/* End Node */}
          <div className="absolute bottom-0 left-4 md:left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-slate-900 border border-slate-700 rounded-full" />
        </div>

        <div className="mt-20 text-center">
           <a 
             href="/resume.pdf" 
             className="inline-flex items-center gap-2 text-slate-400 hover:text-accent transition-colors font-mono text-sm group border-b border-transparent hover:border-accent pb-1"
           >
             View Full Resume <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
           </a>
        </div>

      </div>
    </section>
  );
};

export default Experience;
