import React from 'react'
import { HiDownload, HiMail, HiEye } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  const actions = [
    {
      label: "Download Resume",
      href: "https://drive.google.com/uc?export=download&id=1WP6pbZsR_x4b1qlqrzhEZiuDNmSFWqXe",
      icon: HiDownload,
      isPrimary: true,
      isExternal: true
    },
    {
      label: "View Projects",
      href: "/projects",
      icon: HiEye,
      isPrimary: false,
      isExternal: false
    },
    {
      label: "Contact Me",
      href: "/contact",
      icon: HiMail,
      isPrimary: false,
      isExternal: false
    }
  ]

  return (
    <div 
      className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div 
        className="text-center mb-6"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="100"
      >
        <h4 className="text-lg font-semibold text-white mb-2">Let's Work Together</h4>
        <p className="text-gray-400 text-sm">
          Ready to start your next project? Let's make it happen!
        </p>
      </div>

      <div className="space-y-3">
        {actions.map((action, index) => {
          const ActionComponent = action.isExternal ? 'a' : Link
          const linkProps = action.isExternal 
            ? { href: action.href, target: "_blank", rel: "noopener noreferrer" }
            : { to: action.href }

          return (
            <div 
              key={action.label}
              data-aos="zoom-in"
              data-aos-duration="600"
              data-aos-delay={200 + index * 100}
            >
              <ActionComponent
                {...linkProps}
                className={`
                  flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-lg font-medium 
                  transition-all duration-300 group relative overflow-hidden
                  ${action.isPrimary 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl' 
                    : 'bg-slate-700/50 text-gray-300 border border-slate-600/50 hover:border-blue-500/50 hover:text-white hover:bg-slate-600/50'
                  }
                `}
              >
                {action.isPrimary && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                
                <action.icon className="h-4 w-4 relative z-10" />
                <span className="relative z-10">{action.label}</span>
                
                {action.isPrimary && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700" />
                )}
              </ActionComponent>
            </div>
          )
        })}
      </div>

      {/* Social proof or additional info */}
      <div 
        className="mt-6 pt-6 border-t border-slate-700/50 text-center"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="500"
      >
        <p className="text-gray-400 text-xs">
          Available for freelance projects and full-time opportunities
        </p>
        <div className="flex justify-center items-center space-x-2 mt-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-green-400 text-xs font-medium">Currently Available</span>
        </div>
      </div>
    </div>
  )
}

export default CallToAction
