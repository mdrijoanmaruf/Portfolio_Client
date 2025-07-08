import React from 'react'

const ComponentLoading = ({ message = "Loading...", className = "" }) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-2xl animate-pulse"></div>
        
        {/* Main loading container */}
        <div className="relative z-10 flex flex-col items-center space-y-6">
          
          {/* Animated logo/icon */}
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="w-16 h-16 border-3 border-transparent border-t-blue-500 border-r-cyan-400 rounded-full animate-spin"></div>
            
            {/* Inner rotating ring */}
            <div className="absolute inset-2 w-10 h-10 border-3 border-transparent border-b-purple-500 border-l-pink-400 rounded-full animate-spin-reverse"></div>
            
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Loading text */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-white">
              {message.split('...')[0]}
              <span className="inline-block animate-bounce ml-1">.</span>
              <span className="inline-block animate-bounce ml-1" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="inline-block animate-bounce ml-1" style={{ animationDelay: '0.4s' }}>.</span>
            </h3>
            <p className="text-gray-400 text-xs">Please wait a moment</p>
          </div>
          
          {/* Animated progress bar */}
          <div className="w-48 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full animate-loading-bar"></div>
          </div>
          
          {/* Floating particles */}
          <div className="absolute -top-6 -left-6 w-1.5 h-1.5 bg-blue-400 rounded-full animate-float-1 opacity-70"></div>
          <div className="absolute -top-3 -right-4 w-2 h-2 bg-cyan-400 rounded-full animate-float-2 opacity-60"></div>
          <div className="absolute -bottom-4 -left-3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-float-3 opacity-80"></div>
          <div className="absolute -bottom-6 -right-6 w-1.5 h-1.5 bg-pink-400 rounded-full animate-float-4 opacity-70"></div>
        </div>
      </div>
    </div>
  )
}

export default ComponentLoading