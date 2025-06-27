import React from 'react'
import { motion } from 'framer-motion'
import { FaCode } from 'react-icons/fa'
import RijoanImg from '../../../../public/Rijoan.png'

const HeroImage = ({ variants, floatingVariants }) => {
  return (
    <motion.div 
      className="flex justify-center order-1 lg:order-2"
      variants={variants}
    >
      <div className="relative">
        {/* Background decoration */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl transform scale-110"
          animate={{
            scale: [1.1, 1.2, 1.1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        
        {/* Main image container */}
        <motion.div 
          className="relative z-10 group"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-400 to-cyan-300 shadow-2xl transition-all duration-500">
            <motion.img 
              src={RijoanImg} 
              alt="Md Rijoan Maruf" 
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Floating elements */}
          <motion.div 
            className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
            variants={floatingVariants}
            animate="animate"
          >
            <FaCode className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-white font-bold text-xs">DEV</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default HeroImage
