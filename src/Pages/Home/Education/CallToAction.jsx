import React from 'react'
import { motion } from 'framer-motion'

const CallToAction = ({ variants }) => {
  return (
    <motion.div variants={variants} className="text-center">
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-8">
        <h4 className="text-xl font-bold text-white mb-2">
          Currently Seeking Opportunities
        </h4>
        <p className="text-gray-300 mb-6">
          I'm always looking for internships, projects, and collaborative opportunities to apply my knowledge and grow as a developer.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Let's Connect
        </motion.button>
      </div>
    </motion.div>
  )
}

export default CallToAction
