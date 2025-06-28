import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPaperPlane, FaUser, FaEnvelope, FaComment } from 'react-icons/fa'
import { showSuccess, showError, showLoading } from '../../../utils/sweetAlerts'

const ContactForm = ({ variants }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Show loading alert
    showLoading('Sending Message...', 'Please wait while we send your message')
    
    try {
      // Simulate form submission
      setTimeout(async () => {
        try {
          setIsSubmitting(false)
          
          // Show success message
          await showSuccess(
            'Message Sent Successfully!',
            'Thank you for reaching out! I will get back to you as soon as possible.'
          )
          
          // Clear form
          setFormData({ name: '', email: '', subject: '', message: '' })
        } catch (error) {
          await showError(
            'Failed to Send Message!',
            'Something went wrong while sending your message. Please try again or contact me directly.'
          )
        }
      }, 2000)
    } catch (error) {
      setIsSubmitting(false)
      await showError(
        'Failed to Send Message!',
        'Something went wrong while sending your message. Please try again or contact me directly.'
      )
    }
  }

  return (
    <motion.div variants={variants}>
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6">
          Send a <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Message</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FaUser className="inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              placeholder="Your full name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FaEnvelope className="inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Subject Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              placeholder="What's this about?"
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FaComment className="inline mr-2" />
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
              placeholder="Tell me about your project or just say hello..."
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Send Message
              </>
            )}
          </motion.button>
        </form>

        {/* Form Footer */}
        <div className="mt-6 pt-6 border-t border-slate-700">
          <p className="text-sm text-gray-400 text-center">
            I'll get back to you within 24 hours. Looking forward to connecting!
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default ContactForm
