import React from 'react'

const SectionHeader = () => {
  return (
    <div className="text-center mb-6 sm:mb-8 lg:mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 leading-tight">
        My <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Education</span>
      </h2>
      <p className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
        Building a strong foundation in computer science and engineering
      </p>
    </div>
  )
}

export default SectionHeader
