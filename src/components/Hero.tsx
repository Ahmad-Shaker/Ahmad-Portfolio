import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TypewriterEffect from './TypewriterEffect';
import { ChevronDown, Code, Brain, Cpu } from 'lucide-react';
import { gsap } from 'gsap';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // GSAP animations for floating elements
    gsap.to(".floating-icon", {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.2
    });

    // Rotating background elements
    gsap.to(".rotating-bg", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });
  }, []);

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 pointer-events-none circuit-bg opacity-30" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="rotating-bg absolute top-20 left-20 w-32 h-32 border-2 border-neon-green opacity-30 rounded-full neon-border-strong" />
        <div className="rotating-bg absolute bottom-20 right-20 w-24 h-24 border-2 border-neon-blue opacity-40 rounded-full neon-border-strong" />
        <div className="rotating-bg absolute top-1/2 right-10 w-16 h-16 border-2 border-neon-purple opacity-35 rounded-full neon-border-strong" />
        <div className="rotating-bg absolute top-1/3 left-1/4 w-20 h-20 border-2 border-neon-green opacity-25 rounded-full neon-border-strong" />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold"
            >
              <span className="gradient-text neon-glow-strong">Hi, I'm Ahmad</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-text-secondary font-mono"
            >
              <TypewriterEffect
                text="Computer Science Engineering student, AI explorer, and tech leader."
                typeSpeed={50}
                eraseSpeed={30}
                eraseDelay={2000}
                cursor="|"
                cursorStyle={{ color: '#00ff41' }}
                textStyle={{
                  color: '#00ff41',
                  fontWeight: 'bold',
                }}
              />
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-4"
          >
            Computer Science Engineering student at E-JUST, passionate about intelligent systems, 
            embedded tech, and creative automation. Co-founder & Tech Lead of SIMURA fashion brand, building the future through technology and style.
          </motion.p>

          {/* Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex justify-center space-x-4 sm:space-x-8 pt-8"
          >
            <motion.div
              whileHover={{ scale: 1.2, y: -5 }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="p-4 rounded-full bg-dark-card border border-neon-green">
                <Code className="w-8 h-8 text-neon-green" />
              </div>
              <span className="text-sm text-text-secondary">Full-Stack</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.2, y: -5 }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="p-4 rounded-full bg-dark-card border border-neon-purple">
                <Brain className="w-8 h-8 text-neon-purple" />
              </div>
              <span className="text-sm text-text-secondary">AI/ML</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.2, y: -5 }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="p-4 rounded-full bg-dark-card border border-neon-blue">
                <Cpu className="w-8 h-8 text-neon-blue" />
              </div>
              <span className="text-sm text-text-secondary">Embedded</span>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToAbout}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-neon-green border border-neon-green rounded-lg overflow-hidden transition-all duration-300 hover:bg-neon-green hover:text-dark-bg"
            >
              <span className="relative z-10">Explore My Work</span>
              <div className="absolute inset-0 bg-neon-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={scrollToAbout}
            className="cursor-pointer"
          >
            <ChevronDown className="w-6 h-6 text-neon-green" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 