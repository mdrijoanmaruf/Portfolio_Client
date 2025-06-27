import React from 'react'
import { motion } from 'framer-motion'

const AcademicSkills = ({ variants, cardVariants }) => {
  const skills = [
    "Problem Solving",
    "Critical Thinking",
    "Team Collaboration",
    "Project Management",
    "Technical Documentation",
    "Research & Analysis"
  ]

  return (
    <motion.div variants={variants} className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
          Academic <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Skills</span>
        </h3>
        <p className="text-gray-400">
          Skills developed through my academic journey
        </p>
      </div>

      <motion.div 
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8"
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex flex-wrap gap-3 justify-center">
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 rounded-full text-sm font-medium hover:from-blue-500/30 hover:to-cyan-500/30 hover:border-blue-400 transition-all duration-300"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AcademicSkills
