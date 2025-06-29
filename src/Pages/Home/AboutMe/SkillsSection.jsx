import React from 'react'
import { motion } from 'framer-motion'
import { 
  FaReact, 
  FaNodeJs, 
  FaJs, 
  FaPython, 
  FaGitAlt, 
  FaHtml5,
  FaCss3Alt,
  FaDatabase
} from 'react-icons/fa'
import { 
  SiTailwindcss, 
  SiMongodb, 
  SiExpress,
  SiFirebase
} from 'react-icons/si'

const SkillsSection = ({ variants }) => {
  const skillCategories = [
    {
      title: 'Frontend',
      color: 'from-blue-500 to-cyan-400',
      skills: [
        { name: 'React', icon: FaReact, color: '#61DAFB' },
        { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
        { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
        { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
        { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' }
      ]
    },
    {
      title: 'Backend',
      color: 'from-green-500 to-emerald-400',
      skills: [
        { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
        { name: 'Express', icon: SiExpress, color: '#000000' },
        { name: 'Python', icon: FaPython, color: '#3776AB' },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' }
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4
      }
    }
  }

  return (
    <motion.div 
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div className="text-center">
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
          Technical <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Skills</span>
        </h3>
        <p className="text-gray-400">
          Technologies I use to bring ideas to life
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        className="space-y-6"
      >
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            variants={categoryVariants}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6"
          >
            <h4 className={`text-lg font-semibold mb-4 text-transparent bg-gradient-to-r ${category.color} bg-clip-text`}>
              {category.title}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  variants={skillVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center p-3 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300 group"
                >
                  <skill.icon 
                    className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300"
                    style={{ color: skill.color }}
                  />
                  <span className="text-sm text-gray-300 font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default SkillsSection
