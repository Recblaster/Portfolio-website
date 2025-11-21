
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, ChevronDown, ArrowRight, Terminal } from 'lucide-react';
import gsap from 'gsap';
import ThreeScene from './components/ThreeScene';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import AIChat from './components/AIChat';
import PixelBackground from './components/PixelBackground';
import AdminPanel from './components/AdminPanel';
import CustomCursor from './components/CustomCursor';
import { PROJECTS, SKILLS } from './constants';
import { Project, Skill } from './types';

// Advanced Decrypting Text Effect
const DecryptText: React.FC<{ 
  text: string; 
  className?: string;
  revealDelay?: number;
}> = ({ text, className = "", revealDelay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&<>[]{}|;:";
  
  useEffect(() => {
    let iteration = 0;
    let interval: any;

    // Initial delay before starting animation
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 2; // Slower resolve for dramatic effect
      }, 30);
    }, revealDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [text, revealDelay, isHovered]); 

  const handleMouseEnter = () => {
     setIsHovered(prev => !prev); 
  };

  return (
    <span 
      className={`${className} inline-block cursor-default relative group`}
      onMouseEnter={handleMouseEnter}
      aria-label={text} 
    >
      <span aria-hidden="true">
        {displayText.split("").map((char, i) => (
          <span key={i} className={i < displayText.length && text[i] !== char ? "text-accent" : ""}>
            {char}
          </span>
        ))}
      </span>
    </span>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const headerY = useTransform(scrollY, [0, 50], [-20, 0]);
  
  const heroRef = useRef<HTMLDivElement>(null);

  // Dynamic Data State
  const [currentProjects, setCurrentProjects] = useState<Project[]>(PROJECTS);
  const [currentSkills, setCurrentSkills] = useState<Skill[]>(SKILLS);

  const handleAddProject = (newProject: Project) => {
    setCurrentProjects(prev => [...prev, newProject]);
  };

  const handleAddSkill = (newSkill: Skill) => {
    setCurrentSkills(prev => [...prev, newSkill]);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(".hero-line", 
        { height: 0 },
        { height: "100px", duration: 1, ease: "power3.out" }
      )
      .fromTo(".hero-btn",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
        "+=1" 
      );
      
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-accent selection:text-slate-950 relative cursor-none">
      
      <CustomCursor />
      <PixelBackground />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
          <div className="relative z-50 group cursor-pointer clickable" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}>
            <div className="flex items-center gap-2">
              <Terminal size={20} className="text-accent animate-pulse" />
              <span className="text-xl font-bold text-white font-mono tracking-tighter group-hover:text-accent transition-colors">
                ARYAN<span className="text-slate-600">.DEV</span>
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <motion.div 
            className="hidden md:flex items-center gap-1 bg-slate-950/50 backdrop-blur-md rounded-full border border-slate-800/50 p-1 pr-2 pointer-events-auto"
            style={{ opacity: headerOpacity, y: headerY }}
          >
             {['About', 'Projects', 'Experience', 'Skills', 'Contact'].map((item) => (
               <button
                 key={item}
                 onClick={() => scrollToSection(item.toLowerCase())}
                 className="px-5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all clickable"
               >
                 {item}
               </button>
             ))}
             <div className="w-px h-4 bg-slate-800 mx-2"></div>
             <button className="p-2 text-slate-400 hover:text-accent transition-colors clickable"><Github size={16} /></button>
             <button className="p-2 text-slate-400 hover:text-accent transition-colors clickable"><Linkedin size={16} /></button>
          </motion.div>

          <div className="md:hidden z-50 pointer-events-auto">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors clickable">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8 md:hidden pointer-events-auto"
          >
            {['About', 'Projects', 'Experience', 'Skills', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-4xl font-bold text-white hover:text-accent transition-colors font-sans tracking-tight clickable"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="about" ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 opacity-60">
           <ThreeScene />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-950/50 to-slate-950 z-1 pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
             {/* Decorative Line */}
             <div className="hero-line w-px bg-gradient-to-b from-transparent via-accent to-transparent mb-8 opacity-50"></div>

             <div className="flex flex-col items-center gap-0 md:gap-2">
                <h1 className="text-4xl md:text-8xl font-bold text-white tracking-tighter mb-2">
                  <DecryptText text="DESIGNING" revealDelay={500} />
                </h1>
                <div className="flex items-center gap-3 md:gap-5 text-3xl md:text-8xl font-bold tracking-tighter mb-8">
                   <span className="text-slate-700">THE</span>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-techPurple drop-shadow-lg">
                     <DecryptText text="FUTURE" revealDelay={1200} className="text-accent" />
                   </span>
                </div>
             </div>

             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 2.5, duration: 1 }}
               className="text-base md:text-lg text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed font-light"
             >
               I'm <span className="text-white font-medium">Aryan</span>. A Creative Technologist crafting digital experiences that blend <span className="text-white font-medium">aesthetic precision</span> with <span className="text-white font-medium">technical excellence</span>.
             </motion.p>
             
             <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
               <button 
                 onClick={() => scrollToSection('projects')}
                 className="hero-btn group relative px-8 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-all overflow-hidden clickable"
               >
                 <span className="relative z-10 flex items-center gap-2">View Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
               </button>
               
               <button 
                 onClick={() => scrollToSection('contact')}
                 className="hero-btn px-8 py-4 bg-slate-900/50 border border-slate-800 text-white font-semibold rounded-full hover:bg-slate-800 hover:border-slate-600 transition-all backdrop-blur-sm clickable"
               >
                 Contact Me
               </button>
             </div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600 z-20"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      <Projects projects={currentProjects} />

      <Experience />
      
      <Skills skills={currentSkills} />

      {/* Contact / Footer */}
      <section id="contact" className="py-32 px-6 relative z-10 border-t border-slate-900 scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
            Ready to collaborate?
          </h2>
          <p className="text-slate-400 text-xl mb-12">
            Drop me a line or chat with my AI assistant.
          </p>
          
          <a 
            href="mailto:aryan@example.com"
            className="inline-flex items-center gap-3 text-2xl md:text-4xl font-mono text-accent hover:text-white transition-colors border-b-2 border-accent/30 hover:border-accent pb-2 clickable"
          >
            <Mail className="w-8 h-8 md:w-12 md:h-12" />
            aryan@example.com
          </a>

          <div className="mt-24 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-slate-600 text-sm">
             <div className="mb-4 md:mb-0">
               © {new Date().getFullYear()} NexFolio. All rights reserved.
             </div>
             <div className="flex gap-6">
               <a href="#" className="hover:text-white transition-colors clickable">Github</a>
               <a href="#" className="hover:text-white transition-colors clickable">Twitter</a>
               <a href="#" className="hover:text-white transition-colors clickable">LinkedIn</a>
             </div>
          </div>
        </div>
      </section>

      <AIChat />
      <AdminPanel onAddProject={handleAddProject} onAddSkill={handleAddSkill} />
    </div>
  );
};

export default App;
