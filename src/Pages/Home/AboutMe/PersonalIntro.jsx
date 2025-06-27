import React from 'react'
import { motion } from 'framer-motion'

const PersonalIntro = ({ variants }) => {
  return (
    <motion.div className="space-y-6" variants={variants}>
      <div className="space-y-4">
        <h3 className="text-2xl lg:text-3xl font-semibold text-white">
          Hello! I'm <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Rijoan</span>
        </h3>
        <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
          I'm a passionate Full Stack Developer with over 1 years of experience creating digital solutions 
          that make a difference. My journey in tech started with curiosity and has evolved into a deep 
          love for building applications that solve real-world problems.
        </p>
        <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
          When I'm not coding, you can find me exploring new technologies, contributing to open-source 
          projects, or sharing my knowledge with the developer community. I believe in continuous learning 
          and the power of collaboration to build amazing things.
        </p>
      </div>
    </motion.div>
  )
}

export default PersonalIntro
