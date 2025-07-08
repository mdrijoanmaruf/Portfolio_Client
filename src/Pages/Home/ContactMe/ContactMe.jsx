import React from 'react'
import SectionHeader from './SectionHeader'
import ContactInfo from './ContactInfo'
import SocialLinks from './SocialLinks'
import AvailabilityStatus from './AvailabilityStatus'
import ContactForm from './ContactForm'
import ContactCTA from './ContactCTA'

const ContactMe = () => {
  return (
    <section className="py-6 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Section Title */}
          <SectionHeader />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Contact Information */}
            <div className="space-y-8">
              <ContactInfo />
              <SocialLinks />
              <AvailabilityStatus />
            </div>

            {/* Right Column - Contact Form */}
            <ContactForm />
          </div>

          {/* Bottom CTA */}
          <ContactCTA />
        </div>
      </div>
    </section>
  )
}

export default ContactMe