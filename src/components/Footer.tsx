import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-2"
          >
            <Code className="w-5 h-5 text-neon-green" />
            <span className="text-text-secondary">
              Made with <Heart className="inline w-4 h-4 text-red-500" /> by Ahmad — 2025
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center space-x-6"
          >
            <span className="text-text-secondary text-sm">
              Computer Science Student at E-JUST
            </span>
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-neon-purple animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 pt-6 border-t border-dark-border text-center"
        >
          <p className="text-text-secondary text-sm">
            Built with React, TypeScript, Tailwind CSS, and Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 