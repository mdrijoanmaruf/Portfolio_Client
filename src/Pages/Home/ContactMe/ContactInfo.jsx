import React from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const ContactInfo = () => {
  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email',
      value: 'rijoanmaruf@gmail.com',
      link: 'mailto:rijoanmaruf@gmail.com'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      value: '+880 1813-606468',
      link: 'tel:+8801813606468'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      value: 'Dhaka, Bangladesh',
      link: null
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
          Let's <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Connect</span>
        </h3>
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          I'm always open to discussing new opportunities, creative projects, or just having a chat about technology and development. Feel free to reach out!
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="space-y-4">
        {contactInfo.map((info, index) => (
          <div
            key={info.title}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-blue-500/50 rounded-xl p-6 transition-all duration-300 hover:scale-102"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <info.icon className="text-white text-lg" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-1">{info.title}</h4>
                {info.link ? (
                  <a 
                    href={info.link}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    {info.value}
                  </a>
                ) : (
                  <span className="text-gray-400">{info.value}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContactInfo
