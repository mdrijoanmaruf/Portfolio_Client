import React from 'react'
import { motion } from 'framer-motion'
import { FaImage, FaStar } from 'react-icons/fa'
import { MdDescription, MdTitle } from 'react-icons/md'

const ProjectDetailsSection = ({ formData, handleInputChange }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4 sm:p-6"
    >
      <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
          <MdDescription className="text-white text-xs sm:text-sm" />
        </div>
        Project Details
      </h3>

      <div className="space-y-4 sm:space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-white">
            <MdTitle className="text-blue-400" />
            Project Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Enter your project title"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-white">
            <MdDescription className="text-blue-400" />
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            placeholder="Describe your project, its features, and technologies used..."
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-vertical text-sm sm:text-base"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-white">
            <FaImage className="text-blue-400" />
            Project Image URL *
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            required
            placeholder="https://example.com/project-screenshot.jpg"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
          />
        </div>

        {/* Featured Toggle */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-white">
            <FaStar className="text-blue-400" />
            Project Status
          </label>
          <div className="flex items-center gap-3 p-3 sm:p-4 bg-slate-700/30 rounded-lg border border-slate-600">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleInputChange}
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
            />
            <div className="flex flex-col">
              <span className="text-white font-medium text-sm sm:text-base">Featured Project</span>
              <span className="text-gray-400 text-xs">Highlight this project in your portfolio</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectDetailsSection
