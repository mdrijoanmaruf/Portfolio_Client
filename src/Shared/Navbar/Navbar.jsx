import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiLogOut, FiUser } from 'react-icons/fi';
import useAuth from '../../Hooks/useAuth';
import { resumeAPI } from '../../utils/api';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resumeLink, setResumeLink] = useState('');
  const location = useLocation();
  const { user, signInWithGoogle, logOut, loading } = useAuth();

  // Fetch resume link on component mount
  useEffect(() => {
    const fetchResumeLink = async () => {
      try {
        const response = await resumeAPI.get();
        if (response.success && response.data.link) {
          setResumeLink(response.data.link);
        }
      } catch (error) {
        console.error('Error fetching resume link:', error);
        // Use fallback link if API fails
        setResumeLink('https://drive.google.com/uc?export=download&id=1WP6pbZsR_x4b1qlqrzhEZiuDNmSFWqXe');
      }
    };
    
    fetchResumeLink();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
    { name: 'Dashboard', path: '/dashboard', type: 'route', protected: true }
  ];

  // Check if user has access to protected routes
  const hasAccess = user && user.email === 'rijoanmaruf@gmail.com';

  return (
    <nav className=" shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
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
              {navItems.map((item) => {
                if (item.protected && !hasAccess) return null;
                return (
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
                );
              })}
            </div>
          </div>

          {/* Right side - Authentication (Desktop) */}
          <div className="hidden md:flex items-center">
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 text-sm"
              style={{ display: resumeLink ? 'block' : 'none' }}
            >
              Resume
            </a>
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
        <div className="px-2 pt-2 pb-3 space-y-1 border border-t border-slate-700">
          {navItems.map((item) => {
            if (item.protected && !hasAccess) return null;
            return (
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
            );
          })}
          
          {/* Resume Button for Mobile */}
          {resumeLink && (
            <div className="px-4 py-3 border-t border-slate-600">
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 text-base"
              >
                Resume
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;