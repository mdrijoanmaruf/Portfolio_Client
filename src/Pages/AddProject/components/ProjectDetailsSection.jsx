import React from 'react'
import { FaImage, FaStar, FaUpload } from 'react-icons/fa'
import { MdDescription, MdTitle } from 'react-icons/md'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const ProjectDetailsSection = ({ formData, handleInputChange, handleImageUpload, isUploading, imagePreview }) => {
  return (
    <div 
      data-aos="fade-right"
      data-aos-duration="800"
      data-aos-delay="100"
      className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4 sm:p-6"
    >
      <h3 
        className="text-lg sm:text-xl font-semibold text-white flex items-center gap-3 mb-4 sm:mb-6"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="200"
      >
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
          <MdDescription className="text-white text-xs sm:text-sm" />
        </div>
        Project Details
      </h3>

      <div className="space-y-4 sm:space-y-6">
        {/* Title */}
        <div 
          className="space-y-2"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="300"
        >
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
        <div 
          className="space-y-2"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="400"
        >
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

        {/* Project Image Upload with ImgBB */}
        <div 
          className="space-y-3"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="500"
        >
          <label className="flex items-center gap-2 text-sm font-semibold text-white">
            <FaImage className="text-blue-400" />
            Project Image *
          </label>

          {/* Image upload section */}
          <div className="flex flex-col gap-4">
            {/* File input section */}
            <div className="relative">
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
              <label 
                htmlFor="imageUpload" 
                className={`flex items-center justify-center gap-2 w-full py-3 px-4 cursor-pointer rounded-lg border border-dashed border-blue-400 transition-all
                  ${isUploading 
                    ? 'bg-slate-700/30 cursor-not-allowed' 
                    : 'bg-slate-700/50 hover:bg-slate-700/70'}`}
              >
                {isUploading ? (
                  <AiOutlineLoading3Quarters className="text-blue-400 animate-spin mr-2" />
                ) : (
                  <FaUpload className="text-blue-400 mr-2" />
                )}
                <span className="text-white text-sm">
                  {isUploading 
                    ? 'Uploading image...' 
                    : formData.image 
                      ? 'Change project image' 
                      : 'Upload project image'
                  }
                </span>
              </label>
            </div>

            {/* Image preview section */}
            {(imagePreview || formData.image) && !isUploading && (
              <div className="mt-2 relative">
                <div className="bg-slate-700/50 p-2 rounded-lg border border-slate-600">
                  <img 
                    src={imagePreview || formData.image} 
                    alt="Project preview" 
                    className="w-full h-auto max-h-64 object-contain rounded-lg"
                  />
                  {/* Hidden image URL for form submission */}
                  <input
                    type="hidden"
                    name="image"
                    value={formData.image}
                  />
                  <p className="text-xs text-gray-400 mt-2 break-all">
                    {formData.image && formData.image.substring(0, 50) + (formData.image.length > 50 ? '...' : '')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Featured Toggle */}
        <div 
          className="space-y-2"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="600"
        >
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
    </div>
  )
}

export default ProjectDetailsSection
