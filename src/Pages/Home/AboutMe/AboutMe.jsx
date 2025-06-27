import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import PersonalIntro from './PersonalIntro'
import Highlights from './Highlights'
import CallToAction from './CallToAction'
import SkillsSection from './SkillsSection'
import StatsSection from './StatsSection'

const AboutMe = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.section 
      className="py-16 lg:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader variants={itemVariants} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <PersonalIntro variants={itemVariants} />
            <Highlights variants={itemVariants} cardVariants={cardVariants} />
            <CallToAction variants={itemVariants} />
          </div>

          {/* Right Content - Skills */}
          <div className="space-y-6">
            <SkillsSection variants={itemVariants} cardVariants={cardVariants} />
            <StatsSection variants={itemVariants} />
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default AboutMe