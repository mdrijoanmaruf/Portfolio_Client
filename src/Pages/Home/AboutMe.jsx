import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaGraduationCap, FaBriefcase, FaLightbulb, FaHeart, FaRocket } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';

const AboutMe = () => {
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
        duration: 0.6
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript ES6+"] },
    { category: "Backend", items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "RESTful APIs"] },
    { category: "Tools & Others", items: ["Git", "Docker", "AWS", "Firebase", "Figma"] }
  ];

  const highlights = [
    {
      icon: FaCode,
      title: "Clean Code Enthusiast",
      description: "I believe in writing maintainable, scalable, and efficient code that stands the test of time."
    },
    {
      icon: FaLightbulb,
      title: "Problem Solver",
      description: "I love tackling complex challenges and finding innovative solutions to real-world problems."
    },
    {
      icon: FaRocket,
      title: "Fast Learner",
      description: "Always eager to learn new technologies and stay updated with the latest industry trends."
    }
  ];

  return (
    <motion.section 
      className="py-16 lg:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div className="text-center mb-12 lg:mb-16" variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            About <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Me</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="space-y-4">
              <h3 className="text-2xl lg:text-3xl font-semibold text-white">
                Hello! I'm <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Rijoan</span>
              </h3>
              <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                I'm a passionate Full Stack Developer with over 3 years of experience creating digital solutions 
                that make a difference. My journey in tech started with curiosity and has evolved into a deep 
                love for building applications that solve real-world problems.
              </p>
              <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source 
                projects, or sharing my knowledge with the developer community. I believe in continuous learning 
                and the power of collaboration to build amazing things.
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <highlight.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{highlight.title}</h4>
                    <p className="text-gray-400 text-sm">{highlight.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div className="pt-4" variants={itemVariants}>
              <motion.button
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiDownload className="h-4 w-4" />
                <span>Download Resume</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Skills */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-6">
                Skills & <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Expertise</span>
              </h3>
            </div>

            {/* Skills Categories */}
            <div className="space-y-6">
              {skills.map((skillCategory, categoryIndex) => (
                <motion.div
                  key={skillCategory.category}
                  className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + categoryIndex * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full mr-3"></div>
                    {skillCategory.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-2 bg-slate-700 text-blue-400 text-sm rounded-lg border border-slate-600 hover:border-blue-500 transition-colors duration-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + categoryIndex * 0.2 + skillIndex * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-4 mt-8"
              variants={itemVariants}
            >
              {[
                { number: "3+", label: "Years Experience" },
                { number: "50+", label: "Projects Completed" },
                { number: "100%", label: "Client Satisfaction" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutMe;