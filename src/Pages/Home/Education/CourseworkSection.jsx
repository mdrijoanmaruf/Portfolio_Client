import React from 'react'
import { motion } from 'framer-motion'
import { FaCode, FaLaptopCode, FaDatabase, FaBook } from 'react-icons/fa'
import { MdComputer } from 'react-icons/md'

const CourseworkSection = ({ variants, cardVariants }) => {
  const relevantCourses = [
    { name: "Data Structures & Algorithms", icon: FaCode, status: "Completed" },
    { name: "Object Oriented Programming", icon: FaLaptopCode, status: "Completed" },
    { name: "Database Management Systems", icon: FaDatabase, status: "Ongoing" },
    { name: "Web Technologies", icon: MdComputer, status: "Completed" },
    { name: "Software Engineering", icon: FaBook, status: "Ongoing" },
    { name: "Computer Networks", icon: FaLaptopCode, status: "Upcoming" }
  ]

  return (
    <motion.div variants={variants} className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
          Relevant <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Coursework</span>
        </h3>
        <p className="text-gray-400">
          Key subjects that have shaped my technical foundation
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relevantCourses.map((course, index) => (
          <motion.div
            key={course.name}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-blue-500/50 rounded-xl p-6 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <course.icon className="text-white text-lg" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white">{course.name}</h4>
              </div>
            </div>
            <div className="flex justify-end">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                course.status === 'Completed' 
                  ? 'bg-green-500/10 text-green-400' 
                  : course.status === 'Ongoing'
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'bg-gray-500/10 text-gray-400'
              }`}>
                {course.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default CourseworkSection
