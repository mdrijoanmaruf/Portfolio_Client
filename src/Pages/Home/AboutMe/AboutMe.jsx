import React from 'react'
import SectionHeader from './SectionHeader'
import PersonalIntro from './PersonalIntro'
import Highlights from './Highlights'
import CallToAction from './CallToAction'
import SkillsSection from './SkillsSection'

const AboutMe = () => {
  return (
    <section className="py-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <SectionHeader />
        </div>

        {/* Main Content Grid */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="100"
        >
          {/* Left Column - Personal Information */}
          <div className="space-y-6 lg:space-y-8">
            <div
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <PersonalIntro />
            </div>
            <div 
              className="lg:hidden"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="300"
            >
              <SkillsSection />
            </div>
            <div
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="400"
            >
              <Highlights />
            </div>
          </div>

          {/* Right Column - Skills and CTA (Desktop Only) */}
          <div className="hidden lg:block space-y-8">
            <div
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="300"
            >
              <SkillsSection />
            </div>
            <div
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="500"
            >
              <CallToAction />
            </div>
          </div>
        </div>

        {/* Mobile CTA */}
        <div 
          className="lg:hidden mt-8"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="500"
        >
          <CallToAction />
        </div>
      </div>
    </section>
  )
}

export default AboutMe