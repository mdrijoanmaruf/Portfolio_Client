import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiLogOut, FiUser } from 'react-icons/fi';
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signInWithGoogle, logOut, loading } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: 'Home', path: '/', type: 'route' },
    { name: 'About', path: '/about', type: 'route' },
    { name: 'Education', path: '/education', type: 'route' },
    { name: 'Contact', path: '/contact', type: 'route' },
    { name: 'Projects', path: '/projects', type: 'route' },
    { name: 'Add Project', path: '/add-project', type: 'route', protected: true }
  ];

  // Check if user has access to protected routes
  const hasAccess = user && user.email === 'rijoanmaruf@gmail.com';

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Brand */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text hover:from-cyan-300 hover:to-blue-400 transition-all duration-300"
            >
              Rijoan Maruf
            </Link>
          </div>

          {/* Center - Navigation Links (Desktop) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                item.protected ? (
                  hasAccess ? (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        isActiveRoute(item.path)
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                          : 'text-gray-300 hover:text-white hover:bg-slate-800 hover:shadow-md'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.path}
                      disabled
                      className="px-4 py-2 rounded-lg text-sm font-medium opacity-50 cursor-not-allowed text-gray-500"
                      title="Admin access required"
                    >
                      {item.name}
                    </button>
                  )
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActiveRoute(item.path)
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-slate-800 hover:shadow-md'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Right side - Authentication (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full border-2 border-blue-400"
                    />
                  ) : (
                    <FiUser className="w-8 h-8 p-2 bg-slate-700 rounded-full text-gray-300" />
                  )}
                  <span className="text-sm text-gray-300 max-w-24 truncate">
                    {user.displayName || user.email}
                  </span>
                </div>
                <button 
                  onClick={handleLogOut}
                  className="p-2 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:shadow-md text-gray-300 hover:text-white"
                  title="Sign Out"
                >
                  <FiLogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:shadow-md text-gray-300 hover:text-white disabled:opacity-50"
                title="Sign in with Google"
              >
                <FcGoogle className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {loading ? 'Loading...' : 'Sign In'}
                </span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition-all duration-300"
            >
              {isMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenuAlt3 className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-r from-slate-800 via-blue-800 to-slate-800 border-t border-slate-700">
          {navItems.map((item) => (
            item.protected ? (
              hasAccess ? (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActiveRoute(item.path)
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.path}
                  disabled
                  className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium opacity-50 cursor-not-allowed text-gray-500"
                >
                  {item.name} (Admin Only)
                </button>
              )
            ) : (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActiveRoute(item.path)
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {item.name}
              </Link>
            )
          ))}
          
          {/* Authentication for Mobile */}
          <div className="px-4 py-3 border-t border-slate-600">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full border-2 border-blue-400"
                    />
                  ) : (
                    <FiUser className="w-10 h-10 p-2 bg-slate-700 rounded-full text-gray-300" />
                  )}
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">
                      {user.displayName || 'User'}
                    </p>
                    <p className="text-gray-400 text-xs truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogOut}
                  className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-slate-700 transition-all duration-300 text-gray-300 hover:text-white"
                >
                  <FiLogOut className="h-5 w-5" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-slate-700 transition-all duration-300 text-gray-300 hover:text-white disabled:opacity-50"
              >
                <FcGoogle className="h-6 w-6" />
                <span className="text-sm font-medium">
                  {loading ? 'Loading...' : 'Sign in with Google'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;