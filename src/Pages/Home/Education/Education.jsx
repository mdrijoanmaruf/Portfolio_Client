import React from 'react'
import SectionHeader from './SectionHeader'
import EducationTimeline from './EducationTimeline'
import CourseworkSection from './CourseworkSection'
import AcademicSkills from './AcademicSkills'
import CallToAction from './CallToAction'

const Education = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Section Title */}
          <SectionHeader />

          {/* Education Timeline */}
          <EducationTimeline />

          {/* Relevant Coursework */}
          <CourseworkSection />

          {/* Academic Skills */}
          <AcademicSkills />

          {/* Call to Action */}
          <CallToAction />
        </div>
      </div>
    </section>
  )
}

export default Education