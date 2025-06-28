import React from 'react'
import { motion } from 'framer-motion'
import { HiDownload } from 'react-icons/hi'

const CallToAction = ({ variants }) => {
  return (
    <motion.div className="pt-4" variants={variants}>
      <motion.a
        href="https://drive.google.com/uc?export=download&id=1WP6pbZsR_x4b1qlqrzhEZiuDNmSFWqXe"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <HiDownload className="h-4 w-4" />
        <span>Download Resume</span>
      </motion.a>
    </motion.div>
  )
}

export default CallToAction
