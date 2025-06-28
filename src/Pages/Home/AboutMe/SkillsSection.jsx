import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaReact, 
  FaNodeJs, 
  FaJs, 
  FaPython, 
  FaGitAlt, 
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaFigma,
  FaAws,
  FaDocker,
  FaCode,
  FaDatabase,
  FaServer,
  FaCog,
  FaTools
} from 'react-icons/fa'
import { 
  SiTypescript, 
  SiNextdotjs, 
  SiExpress, 
  SiMongodb, 
  SiTailwindcss, 
  SiFirebase, 
  SiVercel, 
  SiNetlify,
  SiRedux,
  SiGraphql,
  SiPostgresql,
  SiVite,
  SiFramer,
  SiJest,
  SiCypress,
  SiStorybook,
  SiNpm,
  SiYarn,
  SiWebpack,
  SiBabel,
  SiEslint,
  SiPrettier,
  SiPostman,
  SiMui,
  SiChakraui,
  SiSocketdotio,
  SiReactrouter,
  SiStyledcomponents,
  SiSass,
  SiJquery
} from 'react-icons/si'

const SkillsSection = ({ variants, cardVariants }) => {
  const [isHovered, setIsHovered] = useState(false)

  const skills = [
    // Frontend Technologies
    { name: 'React', icon: FaReact, color: '#61DAFB', category: 'Frontend' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000', category: 'Frontend' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'Frontend' },
    { name: 'JavaScript', icon: FaJs, color: '#F7DF1E', category: 'Frontend' },
    { name: 'HTML5', icon: FaHtml5, color: '#E34F26', category: 'Frontend' },
    { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6', category: 'Frontend' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', category: 'Frontend' },
    { name: 'Bootstrap', icon: FaBootstrap, color: '#7952B3', category: 'Frontend' },
  
    { name: 'Framer Motion', icon: SiFramer, color: '#0055FF', category: 'Frontend' },
    { name: 'Redux', icon: SiRedux, color: '#764ABC', category: 'Frontend' },
    { name: 'React Router', icon: SiReactrouter, color: '#CA4245', category: 'Frontend' },
   
    
    // Backend Technologies
    { name: 'Node.js', icon: FaNodeJs, color: '#339933', category: 'Backend' },
    { name: 'Express', icon: SiExpress, color: '#68217A', category: 'Backend' },
    { name: 'Python', icon: FaPython, color: '#3776AB', category: 'Backend' },
    
    // Databases
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248', category: 'Database' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', category: 'Database' },
    
    // Tools & Development
    { name: 'Git', icon: FaGitAlt, color: '#F05032', category: 'Tools' },
    { name: 'GitHub', icon: FaGithub, color: '#181717', category: 'Tools' },
    { name: 'Vite', icon: SiVite, color: '#646CFF', category: 'Tools' },
   
    { name: 'VS Code', icon: FaCode, color: '#007ACC', category: 'Tools' },
    { name: 'Figma', icon: FaFigma, color: '#F24E1E', category: 'Tools' },

    
    // Cloud & Deployment
    { name: 'Vercel', icon: SiVercel, color: '#000000', category: 'Cloud' },
    { name: 'Netlify', icon: SiNetlify, color: '#00C7B7', category: 'Cloud' },

    

    { name: 'NPM', icon: SiNpm, color: '#CB3837', category: 'Package Manager' },
    { name: 'Yarn', icon: SiYarn, color: '#2C8EBB', category: 'Package Manager' },
  ]

  // Duplicate skills for seamless loop
  const duplicatedSkills = [...skills, ...skills]
  const reversedSkills = [...duplicatedSkills].reverse()

  return (
    <motion.div className="space-y-8" variants={variants}>
      <div className="text-center lg:text-left">
        <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-6">
          Skills & <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Tech Stack</span>
        </h3>
        <p className="text-gray-400 text-lg mb-8">
          Technologies and tools I use to build amazing digital experiences
        </p>
      </div>

      {/* Interactive Skills Marquee */}
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-slate-800/30 border border-slate-700/50 p-6"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-800/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-800/90 to-transparent z-10 pointer-events-none" />
        
        {/* Forward Marquee */}
        <div className="flex space-x-4 mb-6">
          <motion.div
            className="flex space-x-4 min-w-max"
            animate={{
              x: isHovered ? [null] : [0, -1920]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: isHovered ? 0 : 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedSkills.map((skill, index) => (
              <SkillCard key={`forward-${index}`} skill={skill} index={index} />
            ))}
          </motion.div>
        </div>

        {/* Reverse Marquee */}
        <div className="flex space-x-4">
          <motion.div
            className="flex space-x-4 min-w-max"
            animate={{
              x: isHovered ? [null] : [-1920, 0]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: isHovered ? 0 : 25,
                ease: "linear",
              },
            }}
          >
            {reversedSkills.map((skill, index) => (
              <SkillCard key={`reverse-${index}`} skill={skill} index={index} />
            ))}
          </motion.div>
        </div>

        {/* Hover Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 pointer-events-none"
        >
          <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2">
            <p className="text-blue-400 text-sm font-medium">
              Hover over skills to see details
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Skills Categories */}
      <motion.div
        className="mt-8"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <h4 className="text-lg font-semibold text-white mb-4 text-center lg:text-left">Expertise Areas</h4>
        <div className="flex flex-wrap gap-2">
          {[...new Set(skills.map(skill => skill.category))].map((category, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-gray-300 text-sm font-medium hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300 cursor-default"
            >
              {category}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

const SkillCard = ({ skill, index }) => {
  const IconComponent = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.01 }}
      whileHover={{ 
        scale: 1.1, 
        y: -5,
        transition: { duration: 0.2, type: "spring", stiffness: 300 }
      }}
      className="flex-shrink-0 group relative"
    >
      <div className="flex flex-col items-center justify-center w-16 h-16 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group-hover:bg-slate-600/50 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <IconComponent 
          className="text-lg mb-1 transition-all duration-300 relative z-10 group-hover:drop-shadow-lg" 
          style={{ color: skill.color }}
        />
        <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors duration-300 text-center px-1 relative z-10">
          {skill.name}
        </span>

        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30">
          <div className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white whitespace-nowrap">
            <div className="font-semibold">{skill.name}</div>
            <div className="text-gray-400">{skill.category}</div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SkillsSection
