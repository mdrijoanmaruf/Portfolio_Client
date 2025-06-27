import React from 'react'
import { motion } from 'framer-motion'

const AvailabilityStatus = ({ variants }) => {
  return (
    <motion.div 
      variants={variants}
      className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-green-400 font-semibold">Available for Work</span>
      </div>
      <p className="text-gray-300 text-sm">
        Currently open to internships, freelance projects, and full-time opportunities.
      </p>
    </motion.div>
  )
}

export default AvailabilityStatus
