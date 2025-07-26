import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  px-4 py-12">
      <div className="text-center">
        <div className="mb-6 animate-bounce-slow">
          <span className="text-[7rem] sm:text-[9rem] font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg select-none">404</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-xl mx-auto">
          Sorry, the page you are looking for does not exist or has been moved.<br />
          Please check the URL or return to the homepage.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-xl shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all text-base sm:text-lg hover:scale-105 active:scale-95"
        >
          <FaArrowLeft className="text-white" />
          Back to Home
        </Link>
      </div>
      {/* Custom animation for slow bounce */}
      <style>{`
        .animate-bounce-slow {
          animation: bounce-slow 2.2s infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
      `}</style>
    </div>
  )
}

export default PageNotFound