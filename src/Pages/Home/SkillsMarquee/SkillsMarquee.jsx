import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaReact, 
  FaNodeJs, 
  FaJs, 
  FaPython, 
  FaGitAlt, 
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaFigma,
  FaCode,
  FaServer
} from 'react-icons/fa'
import { 
  SiTailwindcss, 
  SiMongodb, 
  SiExpress
} from 'react-icons/si'

const SkillsMarquee = () => {
  const [isHovered, setIsHovered] = useState(false)

  const skills = [
    // Frontend Technologies (6)
    { name: 'HTML', icon: FaHtml5, color: '#E34F26', category: 'Frontend Technologies' },
    { name: 'CSS', icon: FaCss3Alt, color: '#1572B6', category: 'Frontend Technologies' },
    { name: 'JavaScript', icon: FaJs, color: '#F7DF1E', category: 'Frontend Technologies' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', category: 'Frontend Technologies' },
    { name: 'Bootstrap', icon: FaBootstrap, color: '#7952B3', category: 'Frontend Technologies' },
    { name: 'React', icon: FaReact, color: '#61DAFB', category: 'Frontend Technologies' },
    
    // Backend Technologies (2)
    { name: 'Node.js', icon: FaNodeJs, color: '#339933', category: 'Backend Technologies' },
    { name: 'Express', icon: SiExpress, color: '#68217A', category: 'Backend Technologies' },
    
    // Database (1)
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248', category: 'Database' },
    
    // Programming Languages (4)
    { name: 'C', icon: FaCode, color: '#A8B9CC', category: 'Programming Languages' },
    { name: 'C++', icon: FaCode, color: '#00599C', category: 'Programming Languages' },
    { name: 'Python', icon: FaPython, color: '#3776AB', category: 'Programming Languages' },
    { name: 'Java', icon: FaCode, color: '#ED8B00', category: 'Programming Languages' },
    
    // Data Science Libraries (3)
    { name: 'NumPy', icon: FaPython, color: '#013243', category: 'Data Science Libraries' },
    { name: 'Pandas', icon: FaPython, color: '#150458', category: 'Data Science Libraries' },
    { name: 'Matplotlib', icon: FaPython, color: '#11557c', category: 'Data Science Libraries' },
    
    // Tools & Development (4)
    { name: 'VS Code', icon: FaCode, color: '#007ACC', category: 'Tools & Development' },
    { name: 'cPanel', icon: FaServer, color: '#FF6C2C', category: 'Tools & Development' },
    { name: 'Git', icon: FaGitAlt, color: '#F05032', category: 'Tools & Development' },
    { name: 'Figma', icon: FaFigma, color: '#F24E1E', category: 'Tools & Development' },
  ]

  // Create duplicated arrays for seamless scrolling
  const duplicatedSkills = [...skills, ...skills]

  return (
    <div className="py-16 overflow-hidden bg-gradient-to-br from-slate-900/60 to-blue-900/40 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          animation: 'float 20s ease-in-out infinite'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            My <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text">Tech Arsenal</span>
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The powerful technologies I wield to craft exceptional digital solutions
          </motion.p>
        </motion.div>

        {/* Scrolling Skills Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Edge Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent z-20 pointer-events-none" />
          
          {/* Main Scrolling Row */}
          <div className="flex space-x-8 py-8">
            <motion.div
              className="flex space-x-8 min-w-max"
              animate={{
                x: isHovered ? 0 : [-2000, 0]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: isHovered ? 0 : 60,
                  ease: "linear",
                },
              }}
            >
              {duplicatedSkills.map((skill, index) => (
                <SkillCard key={`skill-${index}`} skill={skill} index={index} />
              ))}
            </motion.div>
          </div>

          {/* Hover Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-30 pointer-events-none"
          >
            <div className="bg-slate-800/95 backdrop-blur-md border border-blue-500/30 rounded-2xl px-6 py-3 shadow-2xl">
              <p className="text-blue-400 font-semibold">
                🔍 Hover paused - Explore the skills!
              </p>
            </div>
          </motion.div>
        </div>

        {/* Skills Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-8">Expertise Domains</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[...new Set(skills.map(skill => skill.category))].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.08,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="px-6 py-3 bg-gradient-to-r from-slate-800/70 to-slate-700/70 border border-slate-600/50 rounded-2xl text-gray-200 font-medium hover:border-blue-500/50 hover:text-blue-300 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-default backdrop-blur-sm"
              >
                {category}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
      `}</style>
    </div>
  )
}

const SkillCard = ({ skill, index }) => {
  const IconComponent = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      whileHover={{ 
        scale: 1.2, 
        y: -20,
        rotateY: 12,
        transition: { duration: 0.4, type: "spring", stiffness: 200 }
      }}
      className="flex-shrink-0 group relative cursor-pointer"
    >
      <div className="flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-600/50 rounded-3xl hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-slate-700/90 group-hover:to-slate-800/90 relative overflow-hidden">
        
        {/* Animated Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Sparkle Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-2 right-2 w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
          <div className="absolute bottom-3 left-3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-300" />
        </div>
        
        <IconComponent 
          className="text-2xl sm:text-3xl mb-2 transition-all duration-500 relative z-10 group-hover:drop-shadow-xl group-hover:scale-110" 
          style={{ color: skill.color }}
        />
        <span className="text-xs sm:text-sm font-semibold text-gray-300 group-hover:text-white transition-colors duration-500 text-center px-1 relative z-10 leading-tight">
          {skill.name}
        </span>

        {/* Enhanced Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-30 scale-95 group-hover:scale-100">
          <div className="bg-gradient-to-r from-slate-900/95 to-slate-800/95 border border-blue-500/30 rounded-xl px-4 py-3 text-sm text-white whitespace-nowrap backdrop-blur-sm shadow-2xl">
            <div className="font-bold text-blue-300">{skill.name}</div>
            <div className="text-gray-400 text-xs mt-1">{skill.category}</div>
            {/* Enhanced Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="border-8 border-transparent border-t-slate-900/95 filter drop-shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SkillsMarquee
