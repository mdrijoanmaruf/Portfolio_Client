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
          <div
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <SectionHeader />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Contact Information */}
            <div className="space-y-8">
              <div
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-delay="100"
              >
                <ContactInfo />
              </div>
              <div
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-delay="200"
              >
                <SocialLinks />
              </div>
              <div
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-delay="300"
              >
                <AvailabilityStatus />
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <ContactForm />
            </div>
          </div>

          {/* Bottom CTA */}
          <div
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            <ContactCTA />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactMe