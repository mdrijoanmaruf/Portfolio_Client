import React from 'react'
import SectionHeader from './SectionHeader'
import EducationTimeline from './EducationTimeline'
import CourseworkSection from './CourseworkSection'
import AcademicSkills from './AcademicSkills'
import CallToAction from './CallToAction'

const Education = () => {
  return (
    <section className="min-h-screen mb-6">
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {/* Section Title */}
          <div 
            data-aos="fade-up" 
            data-aos-duration="800"
            className="text-center"
          >
            <SectionHeader />
          </div>

          {/* Education Timeline */}
          <div 
            data-aos="fade-right" 
            data-aos-duration="1000" 
            data-aos-delay="200"
            className="w-full"
          >
            <EducationTimeline />
          </div>

          {/* Relevant Coursework */}
          <div 
            data-aos="fade-left" 
            data-aos-duration="1000" 
            data-aos-delay="400"
            className="w-full"
          >
            <CourseworkSection />
          </div>

          {/* Academic Skills */}
          <div 
            data-aos="fade-up" 
            data-aos-duration="1000" 
            data-aos-delay="600"
            className="w-full"
          >
            <AcademicSkills />
          </div>

          {/* Call to Action */}
          <div 
            data-aos="zoom-in" 
            data-aos-duration="800" 
            data-aos-delay="800"
            className="text-center pt-4 sm:pt-6 lg:pt-8"
          >
            <CallToAction />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education