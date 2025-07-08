import React from 'react'

const SectionHeader = () => {
  return (
    <div className="text-center">
      <h2 
        className="text-3xl sm:text-4xl l font-bold text-white mb-4"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        Get In <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Touch</span>
      </h2>
      <p 
        className="text-gray-400 text-lg max-w-2xl mx-auto"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="100"
      >
        Have a project in mind or just want to say hello? I'd love to hear from you!
      </p>
    </div>
  )
}

export default SectionHeader
