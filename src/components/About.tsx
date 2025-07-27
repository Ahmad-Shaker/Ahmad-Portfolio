import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Code, Brain, Cpu, Award } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineData = [
    {
      year: '2024',
      title: 'Computer Science Engineering Student',
      description: 'Currently pursuing Computer Science Engineering at E-JUST, focusing on AI, embedded systems, and full-stack development.',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'neon-green'
    },
    {
      year: '2024',
      title: 'AI & ML Projects',
      description: 'Working on various AI projects, exploring computer vision and machine learning.',
      icon: <Brain className="w-6 h-6" />,
      color: 'neon-purple'
    },
    {
      year: '2024',
      title: 'Embedded Systems',
      description: 'Hands-on experience with ATmega328P and Arduino, building intelligent embedded solutions.',
      icon: <Cpu className="w-6 h-6" />,
      color: 'neon-blue'
    },
    {
      year: '2024',
      title: 'Full-Stack Development',
      description: 'Building web applications with React, Flask, and modern web technologies.',
      icon: <Code className="w-6 h-6" />,
      color: 'neon-green'
    },
    {
      year: '2024',
      title: 'Project Portfolio',
      description: 'Netflix-checkers, classroom management system, medical AI assistant, SIMURA fashion brand, and data processing tools.',
      icon: <Award className="w-6 h-6" />,
      color: 'neon-purple'
    },
    {
      year: '2025',
      title: 'Co-founder & Tech Lead',
      description: 'Co-founder of SIMURA, a boundaryless fashion brand creating gender-inclusive clothing that celebrates individuality and breaks traditional fashion norms. Founded in 2025 with focus on inclusivity, quality, and creativity.',
      icon: <Award className="w-6 h-6" />,
      color: 'neon-green'
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            I'm a Computer Science Engineering student at E-JUST, passionate about intelligent systems, 
            embedded tech, and creative automation. As Co-founder & Tech Lead of SIMURA fashion brand, I'm 
            exploring new technologies and building innovative solutions across technology and fashion.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-dark-border h-full hidden md:block"></div>
          
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-${item.color} border-2 border-dark-bg z-10 hidden md:block`}></div>
                
                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="glass-effect p-6 rounded-lg border border-dark-border hover:border-neon-green transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 rounded-full bg-dark-card border border-${item.color}`}>
                        <div className={`text-${item.color}`}>
                          {item.icon}
                        </div>
                      </div>
                      <span className="text-neon-green font-mono text-sm">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-text-primary">{item.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{item.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="glass-effect p-8 rounded-lg border border-dark-border">
            <h3 className="text-2xl font-bold mb-4 gradient-text">What Drives Me</h3>
            <p className="text-text-secondary text-lg leading-relaxed max-w-4xl mx-auto">
              I believe in the power of technology to solve real-world problems. Whether it's 
              building AI systems that can understand and assist, creating embedded solutions 
              that make life easier, or developing web applications that connect people, 
              I'm always excited to learn and build something meaningful.
            </p>
          </div>
        </motion.div>



      </div>
    </section>
  );
};

export default About; 