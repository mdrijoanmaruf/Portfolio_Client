import React from 'react'
import { FaImage, FaStar, FaUpload, FaTimes } from 'react-icons/fa'
import { MdDescription, MdTitle } from 'react-icons/md'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const ProjectDetailsSection = ({ formData, handleInputChange, handleImageUpload, isUploading, imagePreview, imagePreviews, removeImage }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4 sm:p-6">
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

        {/* Project Images Upload with ImgBB */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-white">
            <FaImage className="text-blue-400" />
            Project Images * <span className="text-xs text-gray-400 font-normal">(Up to 5 images)</span>
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
                disabled={isUploading || imagePreviews.length >= 5}
                multiple
              />
              <label 
                htmlFor="imageUpload" 
                className={`flex items-center justify-center gap-2 w-full py-3 px-4 cursor-pointer rounded-lg border border-dashed transition-all
                  ${imagePreviews.length >= 5 
                    ? 'border-gray-500 bg-slate-700/30 cursor-not-allowed'
                    : isUploading 
                      ? 'border-blue-400 bg-slate-700/30 cursor-not-allowed' 
                      : 'border-blue-400 bg-slate-700/50 hover:bg-slate-700/70'}`}
              >
                {isUploading ? (
                  <AiOutlineLoading3Quarters className="text-blue-400 animate-spin mr-2" />
                ) : (
                  <FaUpload className={`mr-2 ${imagePreviews.length >= 5 ? 'text-gray-500' : 'text-blue-400'}`} />
                )}
                <span className={`text-sm ${imagePreviews.length >= 5 ? 'text-gray-500' : 'text-white'}`}>
                  {isUploading 
                    ? 'Uploading images...' 
                    : imagePreviews.length >= 5
                      ? 'Maximum 5 images reached'
                      : imagePreviews.length > 0
                        ? `Add more images (${5 - imagePreviews.length} remaining)`
                        : 'Upload project images (multiple selection supported)'
                  }
                </span>
              </label>
            </div>

            {/* Multiple images preview section */}
            {imagePreviews.length > 0 && (
              <div className="mt-2">
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                  <h4 className="text-white text-sm font-medium mb-3 flex items-center justify-between">
                    <span>Project Images ({imagePreviews.length}/5)</span>
                    {imagePreviews.length < 5 && (
                      <span className="text-xs text-blue-400">
                        You can add {5 - imagePreviews.length} more image{5 - imagePreviews.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={preview} 
                          alt={`Project preview ${index + 1}`} 
                          className="w-full h-24 sm:h-32 object-cover rounded-lg border border-slate-600"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover:scale-110"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                        <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                          {index + 1}
                        </div>
                        {index === 0 && (
                          <div className="absolute top-1 left-1 bg-blue-500/90 text-white text-xs px-1 py-0.5 rounded">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Hidden input for form submission */}
                  <input
                    type="hidden"
                    name="images"
                    value={JSON.stringify(formData.images)}
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    The first image will be used as the main project image.
                  </p>
                </div>
              </div>
            )}

            {/* Single image preview for backward compatibility */}
            {imagePreview && imagePreviews.length === 0 && (
              <div className="mt-2 relative">
                <div className="bg-slate-700/50 p-2 rounded-lg border border-slate-600">
                  <img 
                    src={imagePreview} 
                    alt="Project preview" 
                    className="w-full h-auto max-h-64 object-contain rounded-lg"
                  />
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
    </div>
  )
}

export default ProjectDetailsSection
