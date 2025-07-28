import React from 'react'
import { Link } from 'react-router-dom'
import { FaLock } from 'react-icons/fa'

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  px-4 py-12">
      <div className="text-center">
        <div className="mb-6 animate-bounce-slow">
          <span className="inline-flex items-center justify-center">
            <span className="text-[6rem] sm:text-[8rem] font-extrabold bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg select-none">403</span>
            <FaLock className="ml-2 text-yellow-400 text-4xl sm:text-6xl drop-shadow-lg" />
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Access Forbidden</h1>
        <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-xl mx-auto">
          Sorry, you do not have permission to access this page.<br />
          If you believe this is a mistake, please contact the site administrator.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-xl shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all text-base sm:text-lg hover:scale-105 active:scale-95"
        >
          Go to Home
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

export default Forbidden