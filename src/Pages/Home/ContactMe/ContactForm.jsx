import React, { useState } from 'react'
import { FaPaperPlane, FaUser, FaEnvelope, FaComment } from 'react-icons/fa'
import { showSuccess, showError, showLoading } from '../../../utils/sweetAlerts'
import { contactsAPI } from '../../../utils/api'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showError('Validation Error', 'Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    showLoading('Sending Message...', 'Please wait while we send your message')
    
    try {
      const response = await contactsAPI.submit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim()
      })
      
      if (response.success) {
        setIsSubmitting(false)
        
        // Show success message
        await showSuccess(
          'Message Sent Successfully!',
          response.message || 'Thank you for reaching out! I will get back to you as soon as possible.'
        )
        
        // Clear form
        setFormData({ name: '', email: '', message: '' })
      }
    } catch (error) {
      setIsSubmitting(false)
      console.error('Error submitting contact form:', error)
      await showError(
        'Failed to Send Message!',
        error.message || 'Something went wrong while sending your message. Please try again or contact me directly.'
      )
    }
  }

  return (
    <div>
      <div 
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <h3 
          className="text-2xl font-bold text-white mb-6"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="100"
        >
          Send a <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Message</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="200"
          >
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
          <div
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="300"
          >
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

          {/* Message Input */}
          <div
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="400"
          >
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            data-aos="zoom-in"
            data-aos-duration="600"
            data-aos-delay="500"
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
          </button>
        </form>

        {/* Form Footer */}
        <div 
          className="mt-6 pt-6 border-t border-slate-700"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="600"
        >
          <p className="text-sm text-gray-400 text-center">
            I'll get back to you within 24 hours. Looking forward to connecting!
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
