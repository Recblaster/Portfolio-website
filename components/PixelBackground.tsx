import React, { useEffect, useRef } from 'react';

const PixelBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Configuration
    const spacing = 30; // Spacing between dots
    const dotSize = 1.5; // Radius of dots
    const hoverRadius = 150; // Radius of mouse influence
    
    let columns = Math.ceil(width / spacing);
    let rows = Math.ceil(height / spacing);

    // Store dot state
    interface Dot {
      x: number;
      y: number;
      baseAlpha: number;
      currentAlpha: number;
      targetAlpha: number;
    }
    
    let dots: Dot[] = [];

    const initDots = () => {
      dots = [];
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * spacing,
            y: j * spacing,
            baseAlpha: 0.05, // Very dim by default
            currentAlpha: 0.05,
            targetAlpha: 0.05
          });
        }
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      columns = Math.ceil(width / spacing);
      rows = Math.ceil(height / spacing);
      initDots();
    };

    window.addEventListener('resize', resize);
    resize();

    // Mouse tracking
    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX; 
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      dots.forEach(dot => {
        // Calculate distance to mouse
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Target alpha based on distance
        if (distance < hoverRadius) {
          // Closer = brighter. 
          // Map distance (0 to hoverRadius) to alpha (1.0 to baseAlpha)
          const intensity = 1 - (distance / hoverRadius);
          dot.targetAlpha = 0.1 + (intensity * 0.8); // Max brightness 0.9
        } else {
          dot.targetAlpha = dot.baseAlpha;
          
          // Random twinkle effect
          if (Math.random() < 0.001) {
             dot.targetAlpha = 0.5;
          }
        }

        // Smooth linear interpolation for alpha (decay/attack)
        dot.currentAlpha += (dot.targetAlpha - dot.currentAlpha) * 0.1;

        // Draw Dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${dot.currentAlpha})`; // Cyan
        ctx.fill();
        
        // Connect lines if very close to mouse (constellation effect)
        if (distance < 80 && dot.currentAlpha > 0.3) {
           ctx.beginPath();
           ctx.moveTo(dot.x, dot.y);
           ctx.lineTo(mouse.x, mouse.y);
           ctx.strokeStyle = `rgba(6, 182, 212, ${dot.currentAlpha * 0.2})`;
           ctx.lineWidth = 0.5;
           ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default PixelBackground;