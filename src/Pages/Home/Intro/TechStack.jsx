import React from 'react'
import { motion } from 'framer-motion'

const TechStack = ({ variants, itemVariants }) => {
  const techStack = ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'JavaScript']

  return (
    <motion.div className="space-y-3" variants={itemVariants}>
      <p className="text-gray-400 text-xs lg:text-sm font-medium uppercase tracking-wider">
        Tech Stack
      </p>
      <div className="flex flex-wrap gap-2 lg:gap-3 justify-center lg:justify-start">
        {techStack.map((tech, index) => (
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
  )
}

export default TechStack
