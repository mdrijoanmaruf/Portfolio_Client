import React from 'react'
import { FaCode, FaLaptop, FaServer, FaExternalLinkAlt } from 'react-icons/fa'

const ProjectLinksSection = ({ formData, handleInputChange }) => {
  return (
    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <FaCode className="text-white text-xs sm:text-sm" />
        </div>
        Project Links
      </h3>

      <div className="space-y-4 sm:space-y-6">
        {/* Source Code Links */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-white">
              <FaLaptop className="text-purple-400" />
              Client Repository
            </label>
            <input
              type="url"
              name="clientSourceCode"
              value={formData.clientSourceCode}
              onChange={handleInputChange}
              placeholder="https://github.com/username/frontend-repo"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-white">
              <FaServer className="text-purple-400" />
              Server Repository
            </label>
            <input
              type="url"
              name="serverSourceCode"
              value={formData.serverSourceCode}
              onChange={handleInputChange}
              placeholder="https://github.com/username/backend-repo"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Live Link */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-white">
            <FaExternalLinkAlt className="text-purple-400" />
            Live Demo
          </label>
          <input
            type="url"
            name="liveLink"
            value={formData.liveLink}
            onChange={handleInputChange}
            placeholder="https://your-awesome-project.com"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-sm sm:text-base"
          />
        </div>
      </div>
    </div>
  )
}

export default ProjectLinksSection
