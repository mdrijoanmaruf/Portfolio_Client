import React from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa'

const SocialLinks = ({ variants }) => {
  const socialLinks = [
    {
      icon: FaLinkedin,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/rijoanmaruf',
      color: 'hover:text-blue-500'
    },
    {
      icon: FaGithub,
      name: 'GitHub',
      url: 'https://github.com/rijoanmaruf',
      color: 'hover:text-gray-400'
    },
    {
      icon: FaTwitter,
      name: 'Twitter',
      url: 'https://twitter.com/rijoanmaruf',
      color: 'hover:text-blue-400'
    },
    {
      icon: FaInstagram,
      name: 'Instagram',
      url: 'https://instagram.com/rijoanmaruf',
      color: 'hover:text-pink-500'
    }
  ]

  return (
    <motion.div variants={variants} className="space-y-4">
      <h4 className="text-xl font-semibold text-white">Follow Me</h4>
      <div className="flex gap-4">
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`w-12 h-12 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center text-gray-400 ${social.color} hover:border-current transition-all duration-300`}
          >
            <social.icon className="text-lg" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}

export default SocialLinks
