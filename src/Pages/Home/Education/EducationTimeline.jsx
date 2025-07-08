import React from 'react'
import { FaUniversity, FaCalendarAlt, FaMedal, FaStar } from 'react-icons/fa'
import { MdSchool } from 'react-icons/md'

const EducationTimeline = () => {
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

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-12">
      {education.map((edu, index) => (
        <div
          key={edu.id}
          className="relative hover:scale-[1.02] transition-transform duration-300"
        >
          {/* Timeline Line */}
          <div className="absolute left-6 sm:left-8 top-16 sm:top-20 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500 opacity-50 hidden sm:block"></div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-blue-500/50 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
              {/* Icon */}
              <div className="flex-shrink-0 self-center sm:self-start">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg">
                  <edu.icon className="text-white text-lg sm:text-xl lg:text-2xl" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3 sm:space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-4">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight">
                    {edu.degree}
                  </h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-400 bg-blue-500/10 px-2 sm:px-3 py-1 rounded-full w-fit">
                    <FaCalendarAlt className="text-xs" />
                    {edu.period}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-base sm:text-lg text-gray-300">
                    <MdSchool className="text-blue-400 flex-shrink-0" />
                    <span className="leading-tight">{edu.institution}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 ml-6">{edu.location}</div>
                  <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-green-400 bg-green-500/10 px-2 sm:px-3 py-1 rounded-full">
                    <FaStar className="text-xs" />
                    {edu.status}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {edu.description}
                </p>

                {/* Achievements */}
                <div className="space-y-2 sm:space-y-3">
                  <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                    <FaMedal className="text-yellow-400 flex-shrink-0" />
                    Key Highlights
                  </h4>
                  <div className="grid gap-2 sm:grid-cols-2 lg:gap-3">
                    {edu.achievements.map((achievement, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-sm sm:text-base text-gray-300"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex-shrink-0 mt-1.5"></div>
                        <span className="leading-relaxed">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default EducationTimeline
