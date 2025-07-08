import React from 'react'

const CallToAction = () => {
  return (
    <div className="text-center">
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 mx-2 sm:mx-0">
        <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">
          Currently Seeking Opportunities
        </h4>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
          I'm always looking for internships, projects, and collaborative opportunities to apply my knowledge and grow as a developer.
        </p>
        <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base">
          Let's Connect
        </button>
      </div>
    </div>
  )
}

export default CallToAction
