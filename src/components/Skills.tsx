import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Code, 
  Cpu, 
  Brain, 
  GitBranch, 
  Monitor, 
  Users
} from 'lucide-react';
import { gsap } from 'gsap';
import SkillBar from './SkillBar';

const Skills: React.FC = () => {
  const skillsRef = useRef<HTMLElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Debug logging
  useEffect(() => {
    console.log('Skills section inView:', inView);
  }, [inView]);

  const { scrollYProgress } = useScroll({
    target: skillsRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    if (inView) {
      // Animate skill bars with GSAP
      gsap.to(".skill-bar", {
        width: (i, el) => el.getAttribute("data-width"),
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.1
      });

      // Animate floating icons
      gsap.to(".floating-skill-icon", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.2
      });

      // Fallback: Add CSS class for skill bars
      const skillBars = document.querySelectorAll('.skill-bar-fallback');
      skillBars.forEach((bar, index) => {
        setTimeout(() => {
          bar.classList.add('animate-skill-bar');
        }, index * 100);
      });
    }
  }, [inView]);

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <Code className="w-6 h-6" />,
      color: 'neon-green',
      skills: [
        { name: 'Python', level: 75 },
        { name: 'JavaScript', level: 70 },
        { name: 'C/C++', level: 65 },
        { name: 'HTML/CSS', level: 80 },
        { name: 'TypeScript', level: 60 },
        { name: 'Java', level: 55 }
      ]
    },
    {
      title: 'Tools & Technologies',
      icon: <GitBranch className="w-6 h-6" />,
      color: 'neon-blue',
      skills: [
        { name: 'Git', level: 70 },
        { name: 'VS Code', level: 85 },
        { name: 'Arduino', level: 65 },
        { name: 'Docker', level: 50 },
        { name: 'Linux', level: 70 },
        { name: 'PostgreSQL', level: 60 }
      ]
    },
    {
      title: 'Frameworks & Libraries',
      icon: <Monitor className="w-6 h-6" />,
      color: 'neon-purple',
      skills: [
        { name: 'React', level: 85 },
        { name: 'Node.js', level: 80 },
        { name: 'Flask', level: 75 },
        { name: 'TensorFlow', level: 70 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Framer Motion', level: 80 }
      ]
    },
    {
      title: 'Soft Skills',
      icon: <Users className="w-6 h-6" />,
      color: 'neon-green',
      skills: [
        { name: 'Problem Solving', level: 90 },
        { name: 'Teamwork', level: 85 },
        { name: 'Communication', level: 80 },
        { name: 'Leadership', level: 75 },
        { name: 'Time Management', level: 85 },
        { name: 'Adaptability', level: 90 }
      ]
    }
  ];

  return (
    <section ref={skillsRef} id="skills" className="py-20 relative">
      <motion.div 
        style={{ y }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit for building the future. From programming languages to 
            soft skills, here's what I bring to the table.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="glass-effect-enhanced p-6 rounded-lg border border-dark-border hover:neon-border-strong transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div 
                  className="p-3 rounded-full bg-dark-card border"
                  style={{
                    borderColor: category.color === 'neon-green' 
                      ? '#00ff41'
                      : category.color === 'neon-blue'
                      ? '#0080ff'
                      : category.color === 'neon-purple'
                      ? '#8a2be2'
                      : '#00ff41'
                  }}
                >
                  <div 
                    style={{
                      color: category.color === 'neon-green' 
                        ? '#00ff41'
                        : category.color === 'neon-blue'
                        ? '#0080ff'
                        : category.color === 'neon-purple'
                        ? '#8a2be2'
                        : '#00ff41'
                    }}
                  >
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-text-primary">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                  >
                    <SkillBar
                      name={skill.name}
                      level={skill.level}
                      color={category.color}
                      delay={(categoryIndex * 0.2) + (skillIndex * 0.1)}
                      inView={inView}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass-effect-enhanced p-8 rounded-lg border border-dark-border holographic">
            <h3 className="text-2xl font-bold mb-6 gradient-text">Specialized Areas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-2"
              >
                <div className="p-4 rounded-full bg-dark-card border border-neon-green">
                  <Brain className="w-8 h-8 text-neon-green" />
                </div>
                <span className="text-text-secondary text-center">AI/ML</span>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-2"
              >
                <div className="p-4 rounded-full bg-dark-card border border-neon-blue">
                  <Cpu className="w-8 h-8 text-neon-blue" />
                </div>
                <span className="text-text-secondary text-center">Embedded Systems</span>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-2"
              >
                <div className="p-4 rounded-full bg-dark-card border border-neon-purple">
                  <Monitor className="w-8 h-8 text-neon-purple" />
                </div>
                <span className="text-text-secondary text-center">Web Development</span>
              </motion.div>
              

            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills; 