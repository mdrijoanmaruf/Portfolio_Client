import React from 'react'

const SectionHeader = () => {
  return (
    <div className="text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
        My <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Education</span>
      </h2>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto">
        Building a strong foundation in computer science and engineering
      </p>
    </div>
  )
}

export default SectionHeader
