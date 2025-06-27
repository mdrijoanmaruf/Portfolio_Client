import React from 'react'
import { motion } from 'framer-motion'
import { FaDownload } from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi'

const ActionButtons = ({ variants, itemVariants }) => {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-4"
      variants={itemVariants}
    >
      <motion.button 
        className="group flex items-center justify-center space-x-2 px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl text-sm lg:text-base"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <FaDownload className="h-3 w-3 lg:h-4 lg:w-4" />
        <span>Download CV</span>
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <HiArrowRight className="h-3 w-3 lg:h-4 lg:w-4" />
        </motion.div>
      </motion.button>
      
      <motion.button 
        className="flex items-center justify-center space-x-2 px-6 py-3 lg:px-8 lg:py-4 border-2 border-blue-500 text-blue-400 rounded-lg font-medium hover:bg-blue-500 hover:text-white transition-all duration-300 text-sm lg:text-base"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <span>View Projects</span>
        <HiArrowRight className="h-3 w-3 lg:h-4 lg:w-4" />
      </motion.button>
    </motion.div>
  )
}

export default ActionButtons
