import React from 'react'
import { motion } from 'framer-motion'

const SectionHeader = ({ variants }) => {
  return (
    <motion.div className="text-center mb-12 lg:mb-16" variants={variants}>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
        About <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Me</span>
      </h2>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto">
        Get to know the person behind the code
      </p>
    </motion.div>
  )
}

export default SectionHeader
