import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import EducationTimeline from './EducationTimeline'
import CourseworkSection from './CourseworkSection'
import AcademicSkills from './AcademicSkills'
import CallToAction from './CallToAction'

const Education = () => {
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
          <SectionHeader variants={itemVariants} />

          {/* Education Timeline */}
          <EducationTimeline variants={itemVariants} cardVariants={cardVariants} />

          {/* Relevant Coursework */}
          <CourseworkSection variants={itemVariants} cardVariants={cardVariants} />

          {/* Academic Skills */}
          <AcademicSkills variants={itemVariants} cardVariants={cardVariants} />

          {/* Call to Action */}
          <CallToAction variants={itemVariants} />
        </motion.div>
      </div>
    </section>
  )
}

export default Education