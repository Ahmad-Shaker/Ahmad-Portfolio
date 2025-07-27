import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import ParticlesBackground from './components/ParticlesBackground';
import AnimatedCursor from './components/AnimatedCursor';
import AdvancedParticles from './components/AdvancedParticles';
import InteractiveTimeline from './components/InteractiveTimeline';
import { ScrollProgressBar } from './components/ScrollAnimations';
import PerformanceOptimizer from './components/PerformanceOptimizer';
import MatrixBackground from './components/MatrixBackground';

function App() {
  return (
    <PerformanceOptimizer>
      <div className="min-h-screen bg-dark-bg relative overflow-x-hidden">
        {/* Multiple background layers for depth */}
        <MatrixBackground />
        <ParticlesBackground />
        <AdvancedParticles />
        
        {/* Interactive cursor */}
        <AnimatedCursor />
        
        {/* Scroll progress bar */}
        <ScrollProgressBar />
        
        <Navigation />
        
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <InteractiveTimeline />
          <Projects />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </PerformanceOptimizer>
  );
}

export default App; 