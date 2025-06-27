import React from 'react'
import { motion } from 'framer-motion'

const ContactCTA = ({ variants }) => {
  return (
    <motion.div variants={variants} className="text-center">
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-8">
        <h4 className="text-2xl font-bold text-white mb-4">
          Ready to Start a Project?
        </h4>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Whether you have a clear vision or just an idea, I'm here to help bring your project to life. 
          Let's discuss how we can work together to create something amazing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="mailto:rijoanmaruf@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Email Me Directly
          </motion.a>
          <motion.a
            href="tel:+8801813606468"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-blue-400 text-blue-400 rounded-lg font-medium hover:bg-blue-400 hover:text-white transition-all duration-300"
          >
            Schedule a Call
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

export default ContactCTA
