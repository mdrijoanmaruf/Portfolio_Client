import React from 'react'
import { FaCode } from 'react-icons/fa'
import RijoanImg from '../../../../public/Rijoan.png'

const HeroImage = () => {
  return (
    <div className="flex justify-center order-1 lg:order-2">
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl transform scale-110 animate-pulse"></div>
        
        {/* Main image container */}
        <div className="relative z-10 group">
          <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-400 to-cyan-300 shadow-2xl  transition-all duration-500">
            <img 
              src={RijoanImg} 
              alt="Md Rijoan Maruf" 
              className="w-full h-full object-cover  transition-transform duration-300"
            />
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <FaCode className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          
          <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <span className="text-white font-bold text-xs">DEV</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroImage
