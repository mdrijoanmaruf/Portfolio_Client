import React from 'react'

const ContactCTA = () => {
  return (
    <div className="text-center">
      <div 
        className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-8"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <h4 
          className="text-2xl font-bold text-white mb-4"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="100"
        >
          Ready to Start a Project?
        </h4>
        <p 
          className="text-gray-300 mb-6 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="200"
        >
          Whether you have a clear vision or just an idea, I'm here to help bring your project to life. 
          Let's discuss how we can work together to create something amazing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:rijoanmaruf@gmail.com"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            data-aos="zoom-in"
            data-aos-duration="600"
            data-aos-delay="300"
          >
            Email Me Directly
          </a>
          <a
            href="tel:+8801813606468"
            className="px-8 py-3 border border-blue-400 text-blue-400 rounded-lg font-medium hover:bg-blue-400 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300"
            data-aos="zoom-in"
            data-aos-duration="600"
            data-aos-delay="400"
          >
            Schedule a Call
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactCTA
