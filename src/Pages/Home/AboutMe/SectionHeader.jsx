import React from 'react'

const SectionHeader = () => {
  return (
    <div className="text-center mb-12">
      <h2 
        className="text-3xl sm:text-4xl  font-bold text-white mb-4"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        About <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Me</span>
      </h2>
      <p 
        className="text-gray-400 text-lg max-w-2xl mx-auto"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="100"
      >
        Passionate developer crafting digital experiences with modern technologies
      </p>
    </div>
  )
}

export default SectionHeader
