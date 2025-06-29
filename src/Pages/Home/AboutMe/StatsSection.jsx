import React from 'react'

const StatsSection = () => {
  const stats = [
    { number: "3+", label: "Years Experience" },
    { number: "50+", label: "Projects Completed" },
    { number: "100%", label: "Client Satisfaction" }
  ]

  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:scale-105 transition-transform duration-300"
        >
          <div className="text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text mb-1">
            {stat.number}
          </div>
          <div className="text-gray-400 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

export default StatsSection
