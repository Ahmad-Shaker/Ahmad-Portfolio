import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  delay: number;
  inView: boolean;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level, color, delay, inView }) => {
  const barRef = useRef<HTMLDivElement>(null);

  const getColorValue = (colorName: string) => {
    switch (colorName) {
      case 'neon-green':
        return '#00ff41';
      case 'neon-blue':
        return '#0080ff';
      case 'neon-purple':
        return '#8a2be2';
      default:
        return '#00ff41';
    }
  };

  useEffect(() => {
    console.log(`SkillBar ${name}: inView=${inView}, level=${level}`);
    if (inView && barRef.current) {
      // Ensure the bar animates even if Framer Motion fails
      setTimeout(() => {
        if (barRef.current) {
          barRef.current.style.width = `${level}%`;
          console.log(`SkillBar ${name}: Set width to ${level}%`);
        }
      }, delay * 1000);
    }
  }, [inView, level, delay, name]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-text-secondary font-medium">{name}</span>
        <span className="text-neon-green font-mono text-sm">{level}%</span>
      </div>
      <div className="w-full bg-dark-card rounded-full h-2 overflow-hidden border border-gray-600">
        <motion.div
          ref={barRef}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ 
            duration: 1.5, 
            delay: delay,
            ease: "easeOut"
          }}
          className="h-2 rounded-full opacity-80"
          style={{
            background: `linear-gradient(to right, ${getColorValue(color)}, ${getColorValue(color)})`,
            boxShadow: `0 0 10px ${getColorValue(color)}40`,
            border: `1px solid ${getColorValue(color)}`
          }}
        />
      </div>
    </div>
  );
};

export default SkillBar; 