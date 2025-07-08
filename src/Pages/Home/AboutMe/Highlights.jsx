import React from 'react'
import { FaCode, FaLightbulb, FaRocket, FaUsers, FaCoffee, FaHeart } from 'react-icons/fa'

const Highlights = () => {
  const highlights = [
    {
      icon: FaCode,
      title: "Clean Code Enthusiast",
      description: "I believe in writing maintainable, scalable, and efficient code that stands the test of time.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FaLightbulb,
      title: "Problem Solver",
      description: "I love tackling complex challenges and finding innovative solutions to real-world problems.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: FaRocket,
      title: "Fast Learner",
      description: "Always eager to learn new technologies and stay updated with the latest industry trends.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: FaUsers,
      title: "Team Player",
      description: "I thrive in collaborative environments and believe great products are built by great teams.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: FaCoffee,
      title: "Detail Oriented",
      description: "I pay attention to the small details that make a big difference in user experience.",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: FaHeart,
      title: "Passionate Creator",
      description: "Every project is an opportunity to create something meaningful and impactful.",
      color: "from-red-500 to-pink-500"
    }
  ]

  return (
    <div className="space-y-6">
      <div 
        className="text-center"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <h4 className="text-xl font-semibold text-white mb-2">What Drives Me</h4>
        <p className="text-gray-400">The values and principles that guide my work</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {highlights.map((highlight, index) => (
          <div
            key={highlight.title}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-blue-500/50 transition-all duration-300"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay={100 + index * 100}
          >
            {/* Gradient Background on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-r ${highlight.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            
            <div className="relative">
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${highlight.color} rounded-lg flex items-center justify-center shadow-lg`}>
                  <highlight.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h5 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {highlight.title}
                  </h5>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Highlights
