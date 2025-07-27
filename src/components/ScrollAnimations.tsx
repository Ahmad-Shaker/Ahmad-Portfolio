import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  speed = 0.5, 
  className = "" 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({ 
  text, 
  className = "", 
  delay = 0 
}) => {
  const words = text.split(' ');

  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.1,
            ease: "easeOut"
          }}
          viewport={{ once: true }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ 
  children, 
  className = "", 
  delay = 0 
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 3,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

interface MorphingShapeProps {
  className?: string;
}

const MorphingShape: React.FC<MorphingShapeProps> = ({ className = "" }) => {
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shapeRef.current) {
      gsap.to(shapeRef.current, {
        borderRadius: "50%",
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: "power2.inOut",
        yoyo: true
      });
    }
  }, []);

  return (
    <div
      ref={shapeRef}
      className={`w-32 h-32 bg-gradient-to-r from-neon-green to-neon-blue ${className}`}
    />
  );
};

interface ScrollProgressBarProps {
  className?: string;
}

const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ className = "" }) => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-neon-green origin-left z-50 ${className}`}
      style={{ scaleX: scrollYProgress }}
    />
  );
};

interface StaggeredGridProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

const StaggeredGrid: React.FC<StaggeredGridProps> = ({ 
  children, 
  className = "", 
  staggerDelay = 0.1 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.children;
      
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: staggerDelay,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [staggerDelay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

interface WaveAnimationProps {
  className?: string;
  color?: string;
}

const WaveAnimation: React.FC<WaveAnimationProps> = ({ 
  className = "", 
  color = "#00ff41" 
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        className="absolute bottom-0 left-0 w-full h-16"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          fill={color}
          opacity="0.25"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          fill={color}
          opacity="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          fill={color}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export {
  ParallaxSection,
  TextReveal,
  FloatingElement,
  MorphingShape,
  ScrollProgressBar,
  StaggeredGrid,
  WaveAnimation
}; 