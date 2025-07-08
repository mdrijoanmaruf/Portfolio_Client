import React from 'react'
import { FaTags, FaTimes } from 'react-icons/fa'

const ProjectTagsSection = ({ formData, currentTag, setCurrentTag, addTag, removeTag }) => {
  return (
    <div 
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-delay="300"
      className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-4 sm:p-6"
    >
      <h3 
        className="text-lg sm:text-xl font-semibold text-white flex items-center gap-3 mb-4 sm:mb-6"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="400"
      >
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
          <FaTags className="text-white text-xs sm:text-sm" />
        </div>
        Technologies & Tags
      </h3>

      <div className="space-y-4">
        <div 
          className="flex flex-col sm:flex-row gap-2"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="500"
        >
          <input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="React, Node.js, MongoDB..."
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm sm:text-base"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg transition-all font-medium shadow-lg hover:shadow-xl text-sm sm:text-base whitespace-nowrap hover:scale-105 active:scale-95"
          >
            Add Tag
          </button>
        </div>

        {formData.tags.length > 0 && (
          <div 
            className="space-y-3"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="600"
          >
            <p className="text-sm text-gray-400 font-medium">Project Tags:</p>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  data-aos="zoom-in"
                  data-aos-duration="400"
                  data-aos-delay={100 + (index * 50)}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-300 rounded-full text-xs sm:text-sm flex items-center gap-2 font-medium"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-emerald-400 hover:text-red-400 transition-colors"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectTagsSection
