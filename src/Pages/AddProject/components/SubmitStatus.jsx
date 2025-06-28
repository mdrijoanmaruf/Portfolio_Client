import React from 'react'
import { motion } from 'framer-motion'
import { FaCheck, FaTimes } from 'react-icons/fa'

const SubmitStatus = ({ submitStatus, isEditMode = false }) => {
  if (!submitStatus) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg flex items-center gap-3 mx-4 sm:mx-0 ${
        submitStatus === 'success' 
          ? 'bg-green-500/10 border border-green-500/30 text-green-400'
          : 'bg-red-500/10 border border-red-500/30 text-red-400'
      }`}
    >
      {submitStatus === 'success' ? <FaCheck /> : <FaTimes />}
      <span className="text-sm sm:text-base">
        {submitStatus === 'success' 
          ? (isEditMode ? 'Project updated successfully!' : 'Project added successfully!')
          : (isEditMode ? 'Failed to update project. Please try again.' : 'Failed to add project. Please try again.')}
      </span>
    </motion.div>
  )
}

export default SubmitStatus
