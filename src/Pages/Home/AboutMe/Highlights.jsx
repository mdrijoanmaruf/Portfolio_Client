import React from 'react'
import { motion } from 'framer-motion'
import { FaCode, FaLightbulb, FaRocket } from 'react-icons/fa'

const Highlights = ({ variants, cardVariants }) => {
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
  ]

  return (
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
  )
}

export default Highlights
