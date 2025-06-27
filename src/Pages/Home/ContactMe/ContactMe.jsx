import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import ContactInfo from './ContactInfo'
import SocialLinks from './SocialLinks'
import AvailabilityStatus from './AvailabilityStatus'
import ContactForm from './ContactForm'
import ContactCTA from './ContactCTA'

const ContactMe = () => {
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

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Contact Information */}
            <div className="space-y-8">
              <ContactInfo variants={itemVariants} />
              <SocialLinks variants={itemVariants} />
              <AvailabilityStatus variants={cardVariants} />
            </div>

            {/* Right Column - Contact Form */}
            <ContactForm variants={itemVariants} />
          </div>

          {/* Bottom CTA */}
          <ContactCTA variants={itemVariants} />
        </motion.div>
      </div>
    </section>
  )
}

export default ContactMe