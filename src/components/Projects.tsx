import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Code, Brain, Monitor, Cpu } from 'lucide-react';

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: 'Netflix Cookie Checker',
      description: 'A sophisticated tool for checking and validating Netflix cookies, built with Python and modern web technologies.',
      image: '/api/placeholder/400/250',
      technologies: ['Python', 'JavaScript', 'HTML/CSS', 'Web Scraping'],
      icon: <Monitor className="w-8 h-8" />,
      color: 'neon-green',
      live: null,
      featured: true
    },
    {
      title: 'Classroom Management System',
      description: 'A comprehensive web application for managing virtual classrooms with real-time features, authentication, and assignment management.',
      image: '/api/placeholder/400/250',
      technologies: ['JavaScript', 'HTML/CSS', 'Firebase'],
      icon: <Code className="w-8 h-8" />,
      color: 'neon-blue',
      github: 'https://github.com/Mohamedgwad/classroom',
      live: null,
      featured: true
    },
    {
      title: 'Medical AI Assistant',
      description: 'An intelligent medical assistant platform with image upload, chatbot interface, and PDF report generation.',
      image: '/api/placeholder/400/250',
      technologies: ['Python', 'FastAPI', 'TensorFlow', 'React'],
      icon: <Brain className="w-8 h-8" />,
      color: 'neon-purple',
      github: 'https://github.com/MohmadWalid/Medical-APP',
      live: null,
      featured: true
    },
    {
      title: 'Embedded Systems Lab',
      description: 'Hands-on experience with ATmega328P microcontroller, building intelligent embedded solutions and IoT projects.',
      image: '/api/placeholder/400/250',
      technologies: ['C/C++', 'Arduino', 'ATmega328P', 'Embedded Systems'],
      icon: <Cpu className="w-8 h-8" />,
      color: 'neon-green',
      github: null,
      live: null,
      featured: false
    },
    
    {
      title: 'SIMURA E-commerce Platform',
      description: 'Full-stack e-commerce solution built with React frontend, Next.js for SSR, Express.js backend API, and comprehensive admin dashboard for fashion design, inventory management, and marketing automation.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'Next.js', 'Express', 'Node.js', 'MongoDB', 'Stripe', 'Admin Dashboard'],
      icon: <Monitor className="w-8 h-8" />,
      color: 'neon-green',
      github: null,
      live: null,
      featured: true
    },
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            A showcase of my latest work, from web applications to AI systems and embedded solutions.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="glass-effect-enhanced rounded-lg overflow-hidden border border-dark-border hover:neon-border-strong transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-48 bg-dark-card overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-dark-card to-dark-bg opacity-80"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`p-6 rounded-full bg-dark-card border border-${project.color}`}>
                      <div className={`text-${project.color}`}>
                        {project.icon}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-text-primary">{project.title}</h3>
                  <p className="text-text-secondary mb-4 leading-relaxed">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs font-mono bg-dark-card border border-dark-border rounded-full text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex space-x-4">
                    {project.github && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-neon-green hover:text-neon-green/80 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                        <span>Code</span>
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-neon-blue hover:text-neon-blue/80 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold mb-6 gradient-text">Other Projects</h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.filter(p => !p.featured).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
              whileHover={{ scale: 1.05 }}
              className="glass-effect-enhanced p-6 rounded-lg border border-dark-border hover:neon-border-strong transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-full bg-dark-card border border-${project.color}`}>
                  <div className={`text-${project.color}`}>
                    {project.icon}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-text-primary">{project.title}</h4>
              </div>
              
              <p className="text-text-secondary text-sm mb-4 leading-relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 text-xs font-mono bg-dark-card border border-dark-border rounded text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.github && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-neon-green hover:text-neon-green/80 transition-colors text-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>View Code</span>
                </motion.a>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="glass-effect-enhanced p-8 rounded-lg border border-dark-border holographic">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Interested in Collaborating?</h3>
            <p className="text-text-secondary mb-6">
              I'm always open to new opportunities and exciting projects. Let's build something amazing together!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center space-x-2 px-6 py-3 text-neon-green border border-neon-green rounded-lg hover:bg-neon-green hover:text-dark-bg transition-all duration-300"
            >
              <span>Get In Touch</span>
              <ExternalLink className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 