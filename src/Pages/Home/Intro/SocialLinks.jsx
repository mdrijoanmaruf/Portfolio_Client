import React, { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'

const SocialLinks = () => {
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
    <div className="flex flex-wrap gap-3 lg:gap-4 pt-4 justify-center lg:justify-start">
      {socialData.map((social, index) => {
        const IconComponent = iconMap[social.icon]
        
        return (
          <a 
            key={social.id}
            href={social.url}
            target="_blank" 
            rel="noopener noreferrer"
            className={`p-2 lg:p-3 rounded-full bg-slate-800 text-gray-400 hover:text-white ${social.hoverColor} hover:scale-110 hover:rotate-6 active:scale-95 transition-all duration-300`}
            title={social.title}
            data-aos="fade-up"
            data-aos-delay={100 + index * 50}
            data-aos-duration="600"
          >
            {IconComponent && <IconComponent className="h-4 w-4 lg:h-5 lg:w-5" />}
          </a>
        )
      })}
    </div>
  )
}

export default SocialLinks
