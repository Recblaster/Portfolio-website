
import React from 'react';
import { motion } from 'framer-motion';

const LOGOS_ROW_1 = [
  { name: 'React', url: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js', url: 'https://cdn.simpleicons.org/nextdotjs/white' },
  { name: 'TypeScript', url: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'Node.js', url: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'Python', url: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'Rust', url: 'https://cdn.simpleicons.org/rust/white' },
  { name: 'Docker', url: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'AWS', url: 'https://cdn.simpleicons.org/amazonaws/FF9900' },
];

const LOGOS_ROW_2 = [
  { name: 'Tailwind', url: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'Three.js', url: 'https://cdn.simpleicons.org/threedotjs/white' },
  { name: 'Figma', url: 'https://cdn.simpleicons.org/figma/F24E1E' },
  { name: 'Git', url: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'GraphQL', url: 'https://cdn.simpleicons.org/graphql/E10098' },
  { name: 'PostgreSQL', url: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'OpenAI', url: 'https://cdn.simpleicons.org/openai/white' },
  { name: 'Linux', url: 'https://cdn.simpleicons.org/linux/FCC624' },
];

const CyberTrack: React.FC<{ direction: 'left' | 'right'; delay: string }> = ({ direction, delay }) => {
  return (
    <div className="absolute w-full h-[2px] bg-slate-800/80 overflow-hidden top-1/2 -translate-y-1/2">
      <div 
        className={`absolute top-0 h-full w-64 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-100 blur-[2px] shadow-[0_0_15px_rgba(34,211,238,1)] ${
          direction === 'left' ? 'animate-[beam-left_3s_linear_infinite]' : 'animate-[beam-right_3s_linear_infinite]'
        }`}
        style={{ animationDelay: delay }}
      />
    </div>
  );
};

const MarqueeRow: React.FC<{ logos: typeof LOGOS_ROW_1, direction: 'left' | 'right' }> = ({ logos, direction }) => {
  // Duplicate list multiple times to ensure seamless loop on wide screens
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="relative flex overflow-hidden py-10 group w-full border-y border-slate-800/50 bg-slate-950/40 backdrop-blur-sm">
      
      {/* Cyber Tracks Background - Removed opacity-60 for better visibility */}
      <div className="absolute inset-0 z-0 flex flex-col justify-between py-3 pointer-events-none">
         {/* Track 1 */}
         <div className="relative w-full h-4">
            <CyberTrack direction={direction} delay="0s" />
         </div>
         {/* Track 2 (Middle - Offset) */}
         <div className="relative w-full h-4">
            <CyberTrack direction={direction} delay="1.2s" />
         </div>
         {/* Track 3 */}
         <div className="relative w-full h-4">
            <CyberTrack direction={direction} delay="2.4s" />
         </div>
      </div>

      {/* Gradient Masks for edges */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />

      <motion.div
        className="flex gap-16 items-center flex-nowrap relative z-10"
        initial={{ x: direction === 'left' ? 0 : '-50%' }}
        animate={{ x: direction === 'left' ? '-50%' : 0 }}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {repeatedLogos.map((logo, idx) => (
          <div 
            key={`${logo.name}-${idx}`} 
            className="relative flex-shrink-0 group/item cursor-pointer"
          >
            {/* Logo Glow Background */}
            <div className="absolute inset-0 bg-accent/0 blur-xl rounded-full transition-colors duration-300 group-hover/item:bg-accent/20" />
            
            <img
              src={logo.url}
              alt={logo.name}
              className="relative z-10 h-12 w-auto object-contain opacity-50 grayscale transition-all duration-300 group-hover/item:grayscale-0 group-hover/item:opacity-100 group-hover/item:scale-110 group-hover/item:drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const TechMarquee: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-0 mb-16">
      {/* Row 1: Moves Left */}
      <MarqueeRow logos={LOGOS_ROW_1} direction="left" />
      
      {/* Row 2: Moves Right */}
      <MarqueeRow logos={LOGOS_ROW_2} direction="right" />
    </div>
  );
};

export default TechMarquee;
