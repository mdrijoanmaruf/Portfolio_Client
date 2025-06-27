import React from 'react'
import { motion } from 'framer-motion'
import HeroImage from './HeroImage'
import HeroContent from './HeroContent'
import TechStack from './TechStack'
import ActionButtons from './ActionButtons'
import SocialLinks from './SocialLinks'

const Intro = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-10, 0, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.section 
      className="min-h-screen max-w-7xl mx-auto flex items-center justify-center py-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-[100%] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Hero Image */}
          <HeroImage 
            variants={imageVariants} 
            floatingVariants={floatingVariants} 
          />

          {/* Hero Content */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <HeroContent 
              variants={containerVariants} 
              itemVariants={itemVariants} 
            />
            
            <TechStack 
              variants={containerVariants} 
              itemVariants={itemVariants} 
            />
            
            <ActionButtons 
              variants={containerVariants} 
              itemVariants={itemVariants} 
            />
            
            <SocialLinks 
              variants={containerVariants} 
              itemVariants={itemVariants} 
            />
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Intro