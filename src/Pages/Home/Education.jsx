import React from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaUniversity, FaCalendarAlt, FaCode, FaLaptopCode, FaDatabase, FaMedal, FaBook, FaStar } from 'react-icons/fa'
import { MdSchool, MdComputer } from 'react-icons/md'

const Education = () => {
  const education = [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science & Engineering",
      institution: "American International University - Bangladesh",
      period: "2023 - 2027",
      status: "Currently Enrolled - 2nd Year",
      location: "Dhaka, Bangladesh",
      icon: FaUniversity,
      description: "Pursuing comprehensive education in computer science fundamentals, software engineering, and modern development practices.",
      achievements: [
        "Maintaining strong academic performance",
        "Active participation in coding competitions",
        "Student of Programming Hero",
        "Completed multiple web development projects"
      ]
    }
  ]

  const relevantCourses = [
    { name: "Data Structures & Algorithms", icon: FaCode, status: "Completed" },
    { name: "Object Oriented Programming", icon: FaLaptopCode, status: "Completed" },
    { name: "Database Management Systems", icon: FaDatabase, status: "Ongoing" },
    { name: "Web Technologies", icon: MdComputer, status: "Completed" },
    { name: "Software Engineering", icon: FaBook, status: "Ongoing" },
    { name: "Computer Networks", icon: FaLaptopCode, status: "Upcoming" }
  ]

  const skills = [
    "Problem Solving",
    "Critical Thinking",
    "Team Collaboration",
    "Project Management",
    "Technical Documentation",
    "Research & Analysis"
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-16"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              My <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Education</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Building a strong foundation in computer science and engineering
            </p>
          </motion.div>

          {/* Education Timeline */}
          <motion.div variants={itemVariants} className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                {/* Timeline Line */}
                <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500 opacity-50"></div>
                
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-blue-500/50 rounded-2xl p-8 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                        <edu.icon className="text-white text-2xl" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3 className="text-xl lg:text-2xl font-bold text-white">
                          {edu.degree}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                          <FaCalendarAlt className="text-xs" />
                          {edu.period}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-lg text-gray-300">
                          <MdSchool className="text-blue-400" />
                          {edu.institution}
                        </div>
                        <div className="text-sm text-gray-400">{edu.location}</div>
                        <div className="inline-flex items-center gap-2 text-sm font-medium text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
                          <FaStar className="text-xs" />
                          {edu.status}
                        </div>
                      </div>

                      <p className="text-gray-300 leading-relaxed">
                        {edu.description}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                          <FaMedal className="text-yellow-400" />
                          Key Highlights
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {edu.achievements.map((achievement, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * idx }}
                              className="flex items-center gap-2 text-gray-300"
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex-shrink-0"></div>
                              {achievement}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Relevant Coursework */}
          <motion.div variants={itemVariants} className="space-y-8">
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

          {/* Academic Skills */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Academic <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Skills</span>
              </h3>
              <p className="text-gray-400">
                Skills developed through my academic journey
              </p>
            </div>

            <motion.div 
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-wrap gap-3 justify-center">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 rounded-full text-sm font-medium hover:from-blue-500/30 hover:to-cyan-500/30 hover:border-blue-400 transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-white mb-2">
                Currently Seeking Opportunities
              </h4>
              <p className="text-gray-300 mb-6">
                I'm always looking for internships, projects, and collaborative opportunities to apply my knowledge and grow as a developer.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Let's Connect
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education