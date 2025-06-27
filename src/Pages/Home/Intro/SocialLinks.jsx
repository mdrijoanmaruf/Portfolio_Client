import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'

const SocialLinks = ({ variants, itemVariants }) => {
  const [socialData, setSocialData] = useState([])

  // Icon mapping
  const iconMap = {
    FaGithub: FaGithub,
    FaLinkedin: FaLinkedin,
    FaFacebook: FaFacebook,
    FaInstagram: FaInstagram,
    FaTwitter: FaTwitter,
    SiLeetcode: SiLeetcode
  }

  // Fetch social media data
  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        const response = await fetch('/Social.json')
        const data = await response.json()
        setSocialData(data)
      } catch (error) {
        console.error('Error fetching social data:', error)
        // Fallback data in case of error
        setSocialData([
          { id: 1, name: "GitHub", url: "https://github.com/mdrijoanmaruf", icon: "FaGithub", title: "GitHub", hoverColor: "hover:bg-gray-700" },
          { id: 2, name: "LinkedIn", url: "https://www.linkedin.com/in/mdrijoanmaruf/", icon: "FaLinkedin", title: "LinkedIn", hoverColor: "hover:bg-blue-600" }
        ])
      }
    }

    fetchSocialData()
  }, [])

  return (
    <motion.div 
      className="flex flex-wrap gap-3 lg:gap-4 pt-4 justify-center lg:justify-start"
      variants={itemVariants}
    >
      {socialData.map((social, index) => {
        const IconComponent = iconMap[social.icon]
        
        return (
          <motion.a 
            key={social.id}
            href={social.url}
            target="_blank" 
            rel="noopener noreferrer"
            className={`p-2 lg:p-3 rounded-full bg-slate-800 text-gray-400 hover:text-white ${social.hoverColor} transition-all duration-300`}
            title={social.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + index * 0.1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            {IconComponent && <IconComponent className="h-4 w-4 lg:h-5 lg:w-5" />}
          </motion.a>
        )
      })}
    </motion.div>
  )
}

export default SocialLinks
