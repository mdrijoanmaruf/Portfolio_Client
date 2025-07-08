import React from 'react'
import { FaMapMarkerAlt, FaCalendarAlt, FaHeart } from 'react-icons/fa'

const PersonalIntro = () => {
  const personalInfo = [
    { icon: FaMapMarkerAlt, label: "Based in", value: "Bangladesh" },
    { icon: FaCalendarAlt, label: "Experience", value: "1+ Years" },
    { icon: FaHeart, label: "Passion", value: "Problem Solving" }
  ]

  return (
    <div className="space-y-8">
      {/* Main Introduction */}
      <div 
        className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <div 
          className="flex items-center space-x-4 mb-6"
          data-aos="fade-right"
          data-aos-duration="800"
          data-aos-delay="100"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">R</span>
          </div>
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              Hello! I'm <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Rijoan</span>
            </h3>
            <p className="text-blue-400 font-medium">Full Stack Developer</p>
          </div>
        </div>
        
        <div 
          className="space-y-4"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="200"
        >
          <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
            I'm a passionate Full Stack Developer with over 1 year of experience creating digital solutions 
            that make a difference. My journey in tech started with curiosity and has evolved into a deep 
            love for building applications that solve real-world problems.
          </p>
          <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
            When I'm not coding, you can find me exploring new technologies, contributing to open-source 
            projects, or sharing my knowledge with the developer community. I believe in continuous learning 
            and the power of collaboration to build amazing things.
          </p>
        </div>

        {/* Personal Info Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="300"
        >
          {personalInfo.map((info, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-3 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30"
              data-aos="zoom-in"
              data-aos-duration="600"
              data-aos-delay={400 + index * 100}
            >
              <info.icon className="text-blue-400 text-lg" />
              <div>
                <p className="text-gray-400 text-sm">{info.label}</p>
                <p className="text-white font-medium">{info.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div 
          className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-700/50"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="500"
        >
          {[
            { number: "1+", label: "Years Experience" },
            { number: "15+", label: "Projects Completed" },
            { number: "100%", label: "Client Satisfaction" }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
              data-aos="flip-up"
              data-aos-duration="600"
              data-aos-delay={600 + index * 100}
            >
              <div className="text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text mb-1">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PersonalIntro
