import React from 'react'
import { FaCode } from 'react-icons/fa'

const HeroContent = () => {
  return (
    <div className="space-y-6 lg:space-y-8 order-2 lg:order-1 text-center lg:text-left">
      {/* Greeting */}
      <div className="space-y-2">
        <p className="text-blue-400 text-base lg:text-lg font-medium">Hello, I'm</p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Md <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Rijoan</span> Maruf
        </h1>
      </div>

      {/* Role/Title */}
      <div className="space-y-3 lg:space-y-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light">
          Full Stack Developer
        </h2>
        <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-400">
          <FaCode className="h-4 w-4 lg:h-5 lg:w-5 text-blue-400" />
          <span className="text-sm lg:text-base">Passionate about creating innovative web solutions</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
        I specialize in building exceptional digital experiences with modern technologies. 
        From responsive web applications to full-stack solutions, I bring ideas to life 
        with clean code and intuitive design.
      </p>
    </div>
  )
}

export default HeroContent
