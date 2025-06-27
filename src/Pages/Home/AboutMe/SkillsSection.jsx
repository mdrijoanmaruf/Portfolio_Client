import React from 'react'
import { motion } from 'framer-motion'

const SkillsSection = ({ variants, cardVariants }) => {
  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "JavaScript ES6+"] },
    { category: "Backend", items: ["Node.js", "Express.js", "MongoDB", "SQL", "RESTful APIs"] },
    { category: "Tools & Others", items: ["Git", "VS Code", "Firebase", "Figma"] }
  ]

  return (
    <motion.div className="space-y-6" variants={variants}>
      <div className="text-center lg:text-left">
        <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-6">
          Skills & <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Expertise</span>
        </h3>
      </div>

      {/* Skills Categories */}
      <div className="space-y-6">
        {skills.map((skillCategory, categoryIndex) => (
          <motion.div
            key={skillCategory.category}
            className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 + categoryIndex * 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full mr-3"></div>
              {skillCategory.category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {skillCategory.items.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  className="px-3 py-2 bg-slate-700 text-blue-400 text-sm rounded-lg border border-slate-600 hover:border-blue-500 transition-colors duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + categoryIndex * 0.2 + skillIndex * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default SkillsSection
