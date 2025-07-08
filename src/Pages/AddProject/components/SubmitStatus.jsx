import React from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'

const SubmitStatus = ({ submitStatus, isEditMode = false }) => {
  if (!submitStatus) return null

  return (
    <div
      data-aos="fade-down"
      data-aos-duration="600"
      className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg flex items-center gap-3 mx-4 sm:mx-0 ${
        submitStatus === 'success' 
          ? 'bg-green-500/10 border border-green-500/30 text-green-400'
          : 'bg-red-500/10 border border-red-500/30 text-red-400'
      }`}
    >
      <span
        data-aos={submitStatus === 'success' ? "zoom-in" : "shake"}
        data-aos-duration="400"
        data-aos-delay="100"
      >
        {submitStatus === 'success' ? <FaCheck /> : <FaTimes />}
      </span>
      <span 
        className="text-sm sm:text-base"
        data-aos="fade-left"
        data-aos-duration="500"
        data-aos-delay="200"
      >
        {submitStatus === 'success' 
          ? (isEditMode ? 'Project updated successfully!' : 'Project added successfully!')
          : (isEditMode ? 'Failed to update project. Please try again.' : 'Failed to add project. Please try again.')}
      </span>
    </div>
  )
}

export default SubmitStatus
