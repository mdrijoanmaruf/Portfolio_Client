import React from 'react'

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center z-50">
      <div className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Main loading container */}
        <div className="relative z-10 flex flex-col items-center space-y-8">
          
          {/* Animated logo/icon */}
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="w-24 h-24 border-4 border-transparent border-t-blue-500 border-r-cyan-400 rounded-full animate-spin"></div>
            
            {/* Inner rotating ring */}
            <div className="absolute inset-2 w-16 h-16 border-4 border-transparent border-b-purple-500 border-l-pink-400 rounded-full animate-spin-reverse"></div>
            
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Loading text */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Loading
              <span className="inline-block animate-bounce ml-1">.</span>
              <span className="inline-block animate-bounce ml-1" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="inline-block animate-bounce ml-1" style={{ animationDelay: '0.4s' }}>.</span>
            </h2>
            <p className="text-gray-400 text-sm">Please wait while we prepare your experience</p>
          </div>
          
          {/* Animated progress bar */}
          <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full animate-loading-bar"></div>
          </div>
          
          {/* Floating particles */}
          <div className="absolute -top-8 -left-8 w-2 h-2 bg-blue-400 rounded-full animate-float-1"></div>
          <div className="absolute -top-4 -right-6 w-3 h-3 bg-cyan-400 rounded-full animate-float-2"></div>
          <div className="absolute -bottom-6 -left-4 w-2 h-2 bg-purple-400 rounded-full animate-float-3"></div>
          <div className="absolute -bottom-8 -right-8 w-2 h-2 bg-pink-400 rounded-full animate-float-4"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading