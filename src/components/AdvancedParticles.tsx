import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const AdvancedParticles: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* CSS-based particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-green rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Interactive overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 border border-neon-green rounded-full opacity-20"
          style={{
            transform: 'translate(-50%, -50%) translateZ(100px)'
          }}
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.4 : 0.2
          }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-32 border border-neon-blue rounded-full opacity-30"
          style={{
            transform: 'translate(-50%, -50%) translateZ(200px)'
          }}
          animate={{
            scale: isHovering ? 2 : 1,
            opacity: isHovering ? 0.6 : 0.3
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
      </motion.div>
      
      {/* Mouse trail effect */}
      <motion.div
        className="fixed w-4 h-4 pointer-events-none z-10"
        style={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.4
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-full bg-neon-green rounded-full blur-sm" />
      </motion.div>
    </div>
  );
};

export default AdvancedParticles; 