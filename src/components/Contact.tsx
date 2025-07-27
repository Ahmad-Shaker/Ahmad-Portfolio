import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MessageSquare, Send, Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('_subject', 'New Portfolio Contact Form Submission');
      formDataToSend.append('_template', 'table');
      formDataToSend.append('_captcha', 'false');

      const response = await fetch('https://formsubmit.co/ahmadshakerfareed@gmail.com', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Ahmad-Shaker',
      icon: <Github className="w-6 h-6" />,
      color: 'neon-green'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ahmad-shaker-698b0a320/',
      icon: <Linkedin className="w-6 h-6" />,
      color: 'neon-blue'
    },
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Ready to collaborate on something amazing? Let's discuss your project and see how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-effect p-4 md:p-8 rounded-lg border border-dark-border">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 rounded-full bg-dark-card border border-neon-green">
                  <MessageSquare className="w-6 h-6 text-neon-green" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary">Send a Message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-text-primary placeholder-text-secondary focus:border-neon-green focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-text-primary placeholder-text-secondary focus:border-neon-green focus:outline-none transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-text-primary placeholder-text-secondary focus:border-neon-green focus:outline-none transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-text-primary placeholder-text-secondary focus:border-neon-green focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 text-neon-green border border-neon-green rounded-lg hover:bg-neon-green hover:text-dark-bg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-900 bg-opacity-20 border border-green-500 rounded-lg text-green-400 text-center"
                  >
                    ✅ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-900 bg-opacity-20 border border-red-500 rounded-lg text-red-400 text-center"
                  >
                    ❌ Failed to send message. Please try again or contact me directly.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="glass-effect p-4 md:p-8 rounded-lg border border-dark-border">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 rounded-full bg-dark-card border border-neon-blue">
                  <Mail className="w-6 h-6 text-neon-blue" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary">Contact Information</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 rounded-full bg-neon-green"></div>
                  <div>
                    <p className="text-text-secondary text-sm">Email</p>
                    <p className="text-text-primary font-medium">ahmadshakerfareed@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 rounded-full bg-neon-blue"></div>
                  <div>
                    <p className="text-text-secondary text-sm">Location</p>
                    <p className="text-text-primary font-medium">Egypt</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 rounded-full bg-neon-purple"></div>
                  <div>
                    <p className="text-text-secondary text-sm">Education</p>
                    <p className="text-text-primary font-medium">Computer Science Engineering Student at E-JUST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-effect p-4 md:p-8 rounded-lg border border-dark-border">
              <h3 className="text-2xl font-bold mb-6 text-text-primary">Connect With Me</h3>
              <div className="grid grid-cols-1 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-4 p-4 rounded-lg border border-dark-border hover:border-${social.color} transition-all duration-300`}
                  >
                    <div className={`p-3 rounded-full bg-dark-card border border-${social.color}`}>
                      <div className={`text-${social.color}`}>
                        {social.icon}
                      </div>
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">{social.name}</p>
                      <p className="text-text-secondary text-sm">Follow me on {social.name}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="glass-effect p-4 md:p-8 rounded-lg border border-dark-border">
              <h3 className="text-2xl font-bold mb-4 text-text-primary">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Available for:</span>
                  <span className="text-neon-green font-medium">Freelance & Full-time</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Response time:</span>
                  <span className="text-neon-green font-medium">Within 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Languages:</span>
                  <span className="text-neon-green font-medium">English & Arabic</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 