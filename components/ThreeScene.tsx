import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSphere = () => {
  const interactiveGroupRef = useRef<THREE.Group>(null);
  const autoRotateRef = useRef<THREE.Points>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Memoize geometry generation for performance
  const positions = useMemo(() => {
    const particleCount = 2500;
    const pos = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 

      const r = 2 + Math.random() * 0.5; // Add some thickness to the shell
      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    const { pointer, clock } = state;
    
    // 1. Continuous Auto-Rotation (The particles themselves spinning)
    if (autoRotateRef.current) {
      autoRotateRef.current.rotation.y -= delta * 0.05;
      autoRotateRef.current.rotation.z += delta * 0.01;
      
      // Pulse effect inner
      const pulse = 1 + Math.sin(clock.elapsedTime * 0.8) * 0.03;
      autoRotateRef.current.scale.set(pulse, pulse, pulse);
    }

    // 2. Interactive Controls with Damping (Spring-like effect)
    if (interactiveGroupRef.current) {
      // Calculate targets
      // If hovering: Target is based on mouse position
      // If not hovering: Target is a gentle idle sway (Lissajous figure)
      
      let targetRotX = 0;
      let targetRotY = 0;
      let targetScale = 1;

      if (isHovered) {
        targetRotX = pointer.y * 0.4; // Tilt intensity
        targetRotY = pointer.x * 0.4; 
        
        // ZOOM: Scale up when mouse is near center
        const dist = Math.sqrt(pointer.x ** 2 + pointer.y ** 2);
        const focusFactor = Math.max(0, 1 - dist); 
        targetScale = 1 + (focusFactor * 0.15);
      } else {
        // Idle sway
        targetRotX = Math.sin(clock.elapsedTime * 0.3) * 0.1;
        targetRotY = Math.cos(clock.elapsedTime * 0.2) * 0.1;
        targetScale = 1;
      }

      // Smooth Damping (The "Spring" feel comes from the lambda factor and continuous update)
      // THREE.MathUtils.damp(current, target, lambda, dt)
      // Lambda: Higher = faster/stiffer, Lower = looser/smoother
      
      const dampFactor = isHovered ? 4 : 1.5; // Looser when idle for floating feel

      interactiveGroupRef.current.rotation.x = THREE.MathUtils.damp(
        interactiveGroupRef.current.rotation.x, 
        targetRotX, 
        dampFactor, 
        delta
      );
      
      interactiveGroupRef.current.rotation.y = THREE.MathUtils.damp(
        interactiveGroupRef.current.rotation.y, 
        targetRotY, 
        dampFactor, 
        delta
      );

      const currentScale = interactiveGroupRef.current.scale.x;
      const smoothScale = THREE.MathUtils.damp(currentScale, targetScale, 3, delta);
      interactiveGroupRef.current.scale.set(smoothScale, smoothScale, smoothScale);
    }
  });

  return (
    <group 
      ref={interactiveGroupRef} 
      rotation={[0, 0, Math.PI / 4]}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {/* Invisible hitbox sphere to catch pointer events reliably */}
      <mesh visible={false}>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshBasicMaterial />
      </mesh>
      
      <Points ref={autoRotateRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#22d3ee"
          size={0.025}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const ThreeScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 4.5], fov: 60 }} 
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleSphere />
      </Canvas>
    </div>
  );
};

export default ThreeScene;