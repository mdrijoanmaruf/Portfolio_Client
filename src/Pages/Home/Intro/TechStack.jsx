import React from 'react'

const TechStack = () => {
  const techStack = ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'JavaScript']

  return (
    <div className="space-y-3">
      <p className="text-gray-400 text-xs lg:text-sm font-medium uppercase tracking-wider">
        Tech Stack
      </p>
      <div className="flex flex-wrap gap-2 lg:gap-3 justify-center lg:justify-start">
        {techStack.map((tech, index) => (
          <span 
            key={tech}
            className="px-2 py-1 lg:px-3 lg:py-1 bg-slate-800 text-blue-400 text-xs lg:text-sm rounded-full border border-slate-700 hover:border-blue-500 hover:scale-105 transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay={100 + index * 50}
            data-aos-duration="600"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TechStack
