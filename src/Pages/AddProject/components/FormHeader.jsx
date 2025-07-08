import React from 'react'
import { MdAdminPanelSettings } from 'react-icons/md'

const FormHeader = () => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="800"
      className="text-center mb-8 sm:mb-12"
    >
      <div 
        className="flex items-center justify-center mb-4 sm:mb-6"
        data-aos="zoom-in"
        data-aos-duration="600"
        data-aos-delay="200"
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
          <MdAdminPanelSettings className="text-white text-lg sm:text-2xl" />
        </div>
      </div>
      <h1 
        className="text-2xl sm:text-3xl md:text-4xl  font-bold text-white mb-3 sm:mb-4 px-4"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="100"
      >
        Add New <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Project</span>
      </h1>
      <p 
        className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="200"
      >
        Add a new project to your portfolio with detailed information and links.
      </p>
    </div>
  )
}

export default FormHeader
