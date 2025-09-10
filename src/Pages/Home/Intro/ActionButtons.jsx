import React, { useState, useEffect } from 'react'
import { FaDownload } from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { resumeAPI } from '../../../utils/api'

const ActionButtons = () => {
  const [resumeLink, setResumeLink] = useState('');

  // Fetch resume link on component mount
  useEffect(() => {
    const fetchResumeLink = async () => {
      try {
        const response = await resumeAPI.get();
        if (response.success && response.data.link) {
          setResumeLink(response.data.link);
        }
      } catch (error) {
        console.error('Error fetching resume link:', error);
        // Use fallback link if API fails
        setResumeLink('https://drive.google.com/uc?export=download&id=1WP6pbZsR_x4b1qlqrzhEZiuDNmSFWqXe');
      }
    };
    
    fetchResumeLink();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-4">
      {resumeLink && (
        <a 
          href={resumeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center space-x-2 px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 text-sm lg:text-base"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="600"
        >
          <FaDownload className="h-3 w-3 lg:h-4 lg:w-4" />
          <span>Download CV</span>
          <div className="animate-pulse">
            <HiArrowRight className="h-3 w-3 lg:h-4 lg:w-4" />
          </div>
        </a>
      )}
      
      <Link to='/projects'>
        <button 
          className="flex items-center justify-center space-x-2 px-6 py-3 lg:px-8 lg:py-4 border-2 border-blue-500 text-blue-400 rounded-lg font-medium hover:bg-blue-500 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 text-sm lg:text-base"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="600"
        >
          <span>View Projects</span>
          <HiArrowRight className="h-3 w-3 lg:h-4 lg:w-4" />
        </button>
      </Link>
    </div>
  )
}

export default ActionButtons
