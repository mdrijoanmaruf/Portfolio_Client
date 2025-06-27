import React from 'react'
import { motion } from 'framer-motion'

const SectionHeader = ({ variants }) => {
  return (
    <motion.div variants={variants} className="text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
        Get In <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Touch</span>
      </h2>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto">
        Have a project in mind or just want to say hello? I'd love to hear from you!
      </p>
    </motion.div>
  )
}

export default SectionHeader
