import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaGithub, FaLinkedin, FaCode, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { HiArrowRight } from 'react-icons/hi';
import RijoanImg from '../../../public/Rijoan.png';

const Intro = () => {
  const [socialData, setSocialData] = useState([]);

  // Icon mapping
  const iconMap = {
    FaGithub: FaGithub,
    FaLinkedin: FaLinkedin,
    FaFacebook: FaFacebook,
    FaInstagram: FaInstagram,
    FaTwitter: FaTwitter,
    SiLeetcode: SiLeetcode
  };

  // Fetch social media data
  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        const response = await fetch('/Social.json');
        const data = await response.json();
        setSocialData(data);
      } catch (error) {
        console.error('Error fetching social data:', error);
        // Fallback data in case of error
        setSocialData([
          { id: 1, name: "GitHub", url: "https://github.com/mdrijoanmaruf", icon: "FaGithub", title: "GitHub", hoverColor: "hover:bg-gray-700" },
          { id: 2, name: "LinkedIn", url: "https://www.linkedin.com/in/mdrijoanmaruf/", icon: "FaLinkedin", title: "LinkedIn", hoverColor: "hover:bg-blue-600" }
        ]);
      }
    };

    fetchSocialData();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 0, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center py-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Right Image - Shows first on mobile */}
          <motion.div 
            className="flex justify-center order-1 lg:order-2"
            variants={imageVariants}
          >
            <div className="relative">
              {/* Background decoration */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl transform scale-110"
                animate={{
                  scale: [1.1, 1.2, 1.1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              
              {/* Main image container */}
              <motion.div 
                className="relative z-10 group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-400 to-cyan-300 shadow-2xl transition-all duration-500">
                  <motion.img 
                    src={RijoanImg} 
                    alt="Md Rijoan Maruf" 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
                  variants={floatingVariants}
                  animate="animate"
                >
                  <FaCode className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-white font-bold text-xs">DEV</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Left Content - Shows second on mobile */}
          <motion.div 
            className="space-y-6 lg:space-y-8 order-2 lg:order-1 text-center lg:text-left"
            variants={containerVariants}
          >
            {/* Greeting */}
            <motion.div className="space-y-2" variants={itemVariants}>
              <p className="text-blue-400 text-base lg:text-lg font-medium">Hello, I'm</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Md <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Rijoan</span> Maruf
              </h1>
            </motion.div>

            {/* Role/Title */}
            <motion.div className="space-y-3 lg:space-y-4" variants={itemVariants}>
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light">
                Full Stack Developer
              </h2>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-400">
                <FaCode className="h-4 w-4 lg:h-5 lg:w-5 text-blue-400" />
                <span className="text-sm lg:text-base">Passionate about creating innovative web solutions</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
              variants={itemVariants}
            >
              I specialize in building exceptional digital experiences with modern technologies. 
              From responsive web applications to full-stack solutions, I bring ideas to life 
              with clean code and intuitive design.
            </motion.p>

            {/* Tech Stack */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <p className="text-gray-400 text-xs lg:text-sm font-medium uppercase tracking-wider">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2 lg:gap-3 justify-center lg:justify-start">
                {['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'JavaScript'].map((tech, index) => (
                  <motion.span 
                    key={tech}
                    className="px-2 py-1 lg:px-3 lg:py-1 bg-slate-800 text-blue-400 text-xs lg:text-sm rounded-full border border-slate-700 hover:border-blue-500 transition-colors duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-4"
              variants={itemVariants}
            >
              <motion.button 
                className="group flex items-center justify-center space-x-2 px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl text-sm lg:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FaDownload className="h-3 w-3 lg:h-4 lg:w-4" />
                <span>Download CV</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <HiArrowRight className="h-3 w-3 lg:h-4 lg:w-4" />
                </motion.div>
              </motion.button>
              
              <motion.button 
                className="flex items-center justify-center space-x-2 px-6 py-3 lg:px-8 lg:py-4 border-2 border-blue-500 text-blue-400 rounded-lg font-medium hover:bg-blue-500 hover:text-white transition-all duration-300 text-sm lg:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span>View Projects</span>
                <HiArrowRight className="h-3 w-3 lg:h-4 lg:w-4" />
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex flex-wrap gap-3 lg:gap-4 pt-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              {socialData.map((social, index) => {
                const IconComponent = iconMap[social.icon];
                
                return (
                  <motion.a 
                    key={social.id}
                    href={social.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 lg:p-3 rounded-full bg-slate-800 text-gray-400 hover:text-white ${social.hoverColor} transition-all duration-300`}
                    title={social.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {IconComponent && <IconComponent className="h-4 w-4 lg:h-5 lg:w-5" />}
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Intro;