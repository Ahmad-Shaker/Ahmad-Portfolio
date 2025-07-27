import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, ChevronRight } from 'lucide-react';

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  company: string;
  location: string;
  description: string;
  technologies: string[];
  link?: string;
  category: 'education' | 'work' | 'project' | 'achievement';
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    year: '2025 - Present',
    title: 'Co-Founder & Tech Lead',
    company: 'SIMURA Fashion Brand',
    location: 'Egypt',
    description: 'Leading technical direction and business strategy for emerging fashion brand, combining technology with style. Managing development team and implementing innovative tech solutions.',
    technologies: ['Business Strategy', 'Technical Leadership', 'Team Management', 'E-commerce'],
    category: 'work'
  },
  {
    id: 2,
    year: '2022 - 2027',
    title: 'Computer Science Engineering',
    company: 'E-JUST University',
    location: 'Egypt-Japan University of Science and Technology',
    description: 'Pursuing advanced studies in computer science with focus on AI, embedded systems, and software engineering.',
    technologies: ['Python', 'C++', 'Machine Learning', 'Embedded Systems'],
    category: 'education'
  },


  {
    id: 4,
    year: '2024',
    title: 'Full-Stack Developer',
    company: 'Freelance',
    location: 'Remote',
    description: 'Developed web applications and mobile solutions for various clients across different industries.',
    technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    category: 'work'
  },
  {
    id: 5,
    year: '2024',
    title: 'Embedded Systems Project',
    company: 'Personal Project',
    location: 'Home Lab',
    description: 'Designed and implemented IoT solutions using Arduino and Raspberry Pi for home automation.',
    technologies: ['Arduino', 'Raspberry Pi', 'C++', 'IoT'],
    category: 'project'
  }
];

const InteractiveTimeline = () => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All', color: 'neon-green' },
    { id: 'education', label: 'Education', color: 'neon-blue' },
    { id: 'work', label: 'Work', color: 'neon-purple' },
    { id: 'project', label: 'Projects', color: 'neon-green' },
    { id: 'achievement', label: 'Achievements', color: 'neon-yellow' }
  ];

  const filteredData = activeCategory === 'all' 
    ? timelineData 
    : timelineData.filter(item => item.category === activeCategory);

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : 'neon-green';
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">My Journey</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            A timeline of my academic, professional, and personal achievements
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                activeCategory === category.id
                  ? `border-${category.color} bg-${category.color} bg-opacity-20 text-${category.color}`
                  : 'border-dark-border text-text-secondary hover:border-neon-green hover:text-neon-green'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-green via-neon-blue to-neon-purple transform -translate-x-1/2" />

          <div className="space-y-12">
            {filteredData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-2 border-${getCategoryColor(item.category)} bg-dark-bg transform -translate-x-1/2 z-10`}
                />

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} ml-16 md:ml-0`}
                >
                                     <div
                     className="glass-effect-enhanced p-6 rounded-lg border border-dark-border cursor-pointer hover:neon-border-strong transition-all duration-300"
                     onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                   >
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-${getCategoryColor(item.category)} font-mono text-sm`}>
                        {item.year}
                      </span>
                      <ChevronRight 
                        className={`w-4 h-4 text-${getCategoryColor(item.category)} transition-transform duration-300 ${
                          selectedItem?.id === item.id ? 'rotate-90' : ''
                        }`} 
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-text-primary mb-2">{item.title}</h3>
                    <div className="flex items-center text-text-secondary text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {item.company}
                    </div>
                    <p className="text-text-secondary text-sm mb-3">{item.location}</p>
                    
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {selectedItem?.id === item.id ? item.description : `${item.description.substring(0, 100)}...`}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.technologies.slice(0, 3).map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.1 }}
                          className={`px-2 py-1 text-xs rounded-full bg-${getCategoryColor(item.category)} bg-opacity-20 text-${getCategoryColor(item.category)}`}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {item.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-dark-card text-text-secondary">
                          +{item.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {item.link && (
                      <motion.a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        className={`inline-flex items-center mt-4 text-${getCategoryColor(item.category)} hover:underline`}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View Details
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTimeline; 