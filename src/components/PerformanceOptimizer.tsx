import React, { useEffect, useState } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ children }) => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleReducedMotionChange);

    // Check device performance
    const checkPerformance = () => {
      const start = performance.now();
      for (let i = 0; i < 1000000; i++) {
        Math.random();
      }
      const end = performance.now();
      const duration = end - start;
      
      // If computation takes more than 50ms, consider it low performance
      setIsLowPerformance(duration > 50);
    };

    checkPerformance();

    // Check for mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      setIsLowPerformance(true);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  useEffect(() => {
    // Apply performance optimizations
    if (isLowPerformance || isReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.1s');
      document.documentElement.style.setProperty('--particle-count', '20');
      document.documentElement.style.setProperty('--blur-amount', '5px');
    } else {
      document.documentElement.style.setProperty('--animation-duration', '0.3s');
      document.documentElement.style.setProperty('--particle-count', '100');
      document.documentElement.style.setProperty('--blur-amount', '10px');
    }
  }, [isLowPerformance, isReducedMotion]);

  // Conditionally render children based on performance settings
  if (isReducedMotion) {
    return (
      <div className="reduced-motion">
        {children}
      </div>
    );
  }

  if (isLowPerformance) {
    return (
      <div className="low-performance">
        {children}
      </div>
    );
  }

  return <>{children}</>;
};

export default PerformanceOptimizer; 