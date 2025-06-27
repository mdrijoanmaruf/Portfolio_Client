import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first then scroll
      window.location.href = `/#${sectionId}`;
    } else {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }
    setIsMenuOpen(false); // Close mobile menu
  };

  const navItems = [
    { name: 'Home', sectionId: 'home' },
    { name: 'About', sectionId: 'about' },
    { name: 'Education', sectionId: 'education' },
    { name: 'Contact', sectionId: 'contact' }
  ];

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
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-gray-300 hover:text-white hover:bg-slate-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  {item.name}
                </button>
              ))}
              <Link
                to="/add-project"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActiveRoute('/add-project')
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-slate-800 hover:shadow-md'
                }`}
              >
                Add Project
              </Link>
            </div>
          </div>

          {/* Right side - Google Icon (Desktop) */}
          <div className="hidden md:block">
            <button className="p-2 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:shadow-md">
              <FcGoogle className="h-6 w-6" />
            </button>
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
            <button
              key={item.sectionId}
              onClick={() => scrollToSection(item.sectionId)}
              className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 text-gray-300 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {item.name}
            </button>
          ))}
          <Link
            to="/add-project"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
              isActiveRoute('/add-project')
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            Add Project
          </Link>
          
          {/* Google Icon for Mobile */}
          <div className="px-4 py-3">
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-700 transition-all duration-300 text-gray-300 hover:text-white">
              <FcGoogle className="h-6 w-6" />
              <span className="text-sm font-medium">Google</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;