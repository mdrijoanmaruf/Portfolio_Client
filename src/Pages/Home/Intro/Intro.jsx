import React from 'react'
import { motion } from 'framer-motion'
import HeroImage from './HeroImage'
import HeroContent from './HeroContent'
import TechStack from './TechStack'
import ActionButtons from './ActionButtons'
import SocialLinks from './SocialLinks'

const Intro = () => {
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
        duration: 0.8
      }
    }
  }

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  const imageVariants = {
    hidden: { scale: 0.5, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.3
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-15, 15, -15],
      x: [-5, 5, -5],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const backgroundVariants = {
    animate: {
      background: [
        "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
        "radial-gradient(circle at 80% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)",
        "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        variants={backgroundVariants}
        animate="animate"
      />
      
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900" />
        <div 
          className="absolute inset-0 bg-grid-pattern opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.1'%3e%3ccircle cx='7' cy='7' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
          }}
        />
      </div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: i * 2,
          }}
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hero Content */}
          <div className="space-y-8 lg:space-y-10 order-2 lg:order-1">
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
          {/* Hero Image */}
          <HeroImage 
            variants={imageVariants} 
            floatingVariants={floatingVariants} 
          />
        </div>
      </div>
    </motion.section>
  )
}

export default Intro