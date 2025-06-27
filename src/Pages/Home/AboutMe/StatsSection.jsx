import React from 'react'
import { motion } from 'framer-motion'

const StatsSection = ({ variants }) => {
  const stats = [
    { number: "3+", label: "Years Experience" },
    { number: "50+", label: "Projects Completed" },
    { number: "100%", label: "Client Satisfaction" }
  ]

  return (
    <motion.div 
      className="grid grid-cols-3 gap-4 mt-8"
      variants={variants}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 + index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text mb-1">
            {stat.number}
          </div>
          <div className="text-gray-400 text-sm">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default StatsSection
