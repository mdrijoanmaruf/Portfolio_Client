import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../Hooks/useAuth'

const Login = () => {
  const { signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  px-4 py-12">
      <div className="w-full max-w-md bg-slate-800/60 border border-slate-700 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 text-center">Welcome Back!</h1>
        <p className="text-gray-300 text-base sm:text-lg mb-8 text-center">Sign in to your account to continue</p>
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="flex items-center gap-3 w-full justify-center px-6 py-3 rounded-xl bg-white hover:bg-gray-100 transition-all duration-300 shadow-lg text-gray-700 font-semibold text-base sm:text-lg disabled:opacity-60"
        >
          <FcGoogle className="h-6 w-6" />
          <span>{loading ? 'Signing in...' : 'Sign in with Google'}</span>
        </button>
        <div className="mt-10 text-center">
          <span className="text-xs text-gray-400">By signing in, you agree to our <a href="#" className="underline hover:text-cyan-300">Terms</a> and <a href="#" className="underline hover:text-cyan-300">Privacy Policy</a>.</span>
        </div>
      </div>
    </div>
  )
}

export default Login