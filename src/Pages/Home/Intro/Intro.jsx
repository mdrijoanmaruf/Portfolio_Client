import React from 'react'
import HeroImage from './HeroImage'
import HeroContent from './HeroContent'
import TechStack from './TechStack'
import ActionButtons from './ActionButtons'
import SocialLinks from './SocialLinks'

const Intro = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-blue-500/5"></div>
      </div>
      
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
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-bounce"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hero Content */}
          <div className="space-y-8 lg:space-y-10 order-2 lg:order-1">
            <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
              <HeroContent />
            </div>
            <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
              <TechStack />
            </div>
            <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
              <ActionButtons />
            </div>
            <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
              <SocialLinks />
            </div>
          </div>
          {/* Hero Image */}
          <div 
            data-aos="fade-left" 
            data-aos-duration="1000" 
            data-aos-delay="500"
            className="order-1 lg:order-2"
          >
            <HeroImage />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Intro