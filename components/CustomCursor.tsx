
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    // Initial setup
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      // Main point always tracks instantly
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });
      
      // Tactical physics: Snappy but with weight, slight overshoot
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'back.out(1.2)' 
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'select' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.clickable') ||
        target.classList.contains('clickable');

      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Center Cross / Target */}
      <div ref={cursorRef} className="desktop-cursor-only fixed top-0 left-0 pointer-events-none z-[100] items-center justify-center mix-blend-normal">
           {/* Horizontal line */}
           <div className={`w-[2px] absolute transition-all duration-300 ease-out ${isHovering ? 'h-3 rotate-[135deg] bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]' : 'h-4 bg-amber-500'}`} />
           {/* Vertical line */}
           <div className={`h-[2px] absolute transition-all duration-300 ease-out ${isHovering ? 'w-3 rotate-[135deg] bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]' : 'w-4 bg-amber-500'}`} />
           
           {/* Center dot pop-in */}
           <div className={`absolute w-1.5 h-1.5 bg-red-600 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(220,38,38,1)] ${isHovering ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
      </div>
      
      {/* Outer Brackets / Reticle */}
      <div 
        ref={followerRef} 
        className={`desktop-cursor-only fixed top-0 left-0 pointer-events-none z-[100] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] items-center justify-center ${
          isHovering 
            ? 'w-20 h-20 backdrop-grayscale backdrop-contrast-125 bg-white/5 rotate-0 rounded-lg border-transparent' 
            : 'w-10 h-10 rotate-45 border-none'
        }`}
      >
         {/* Top Left */}
         <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-all duration-300 ${
           isHovering 
             ? 'border-red-600 -top-2 -left-2 w-3 h-3 opacity-100 drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]' 
             : 'border-amber-500/60 top-0 left-0 w-2 h-2 opacity-80'
         }`} />
         
         {/* Top Right */}
         <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 transition-all duration-300 ${
           isHovering 
             ? 'border-red-600 -top-2 -right-2 w-3 h-3 opacity-100 drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]' 
             : 'border-amber-500/60 top-0 right-0 w-2 h-2 opacity-80'
         }`} />
         
         {/* Bottom Left */}
         <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 transition-all duration-300 ${
           isHovering 
             ? 'border-red-600 -bottom-2 -left-2 w-3 h-3 opacity-100 drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]' 
             : 'border-amber-500/60 bottom-0 left-0 w-2 h-2 opacity-80'
         }`} />
         
         {/* Bottom Right */}
         <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-all duration-300 ${
           isHovering 
             ? 'border-red-600 -bottom-2 -right-2 w-3 h-3 opacity-100 drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]' 
             : 'border-amber-500/60 bottom-0 right-0 w-2 h-2 opacity-80'
         }`} />
         
         {/* Dotted Spinner Ring */}
          <div className={`absolute inset-0 border border-dashed rounded-full transition-all duration-500 ${
              isHovering 
                ? 'border-red-500 border-[2px] opacity-50 animate-[spin_4s_linear_infinite]' // Noticeable on hover
                : 'border-amber-500/30 border-[1px] opacity-30 animate-[spin_10s_linear_infinite]' // Faint on idle
          }`} />
      </div>
    </>
  );
};

export default CustomCursor;
