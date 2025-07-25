import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaCode, FaEnvelope, FaHeart } from 'react-icons/fa';
import { HiLocationMarker, HiPhone } from 'react-icons/hi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">
              Rijoan Maruf
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Passionate full-stack developer creating innovative web solutions. 
              Specialized in modern technologies and responsive design.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/mdrijoanmaruf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                title="GitHub"
              >
                <FaGithub className="h-6 w-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/mdrijoanmaruf/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                title="LinkedIn"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://www.facebook.com/md.rijoanmaruf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                title="Facebook"
              >
                <FaFacebook className="h-6 w-6" />
              </a>
              <a 
                href="https://www.instagram.com/rijoanmaruf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                title="Instagram"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a 
                href="https://leetcode.com/u/mdrijoanmaruf/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                title="LeetCode"
              >
                <FaCode className="h-6 w-6" />
              </a>
              <a 
                href="mailto:rijoanmaruf@gmail.com"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                title="Email"
              >
                <FaEnvelope className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="/add-project" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm">
                  Add Project
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm">
                  About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <HiLocationMarker className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300 text-sm">Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-3">
                <HiPhone className="h-5 w-5 text-blue-400" />
                <a 
                  href="tel:+8801813505468" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  +880 1813505468
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="h-5 w-5 text-blue-400" />
                <a 
                  href="mailto:rijoanmaruf@gmail.com" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  rijoanmaruf@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {currentYear} Developed by</span>
              <a 
                href="https://rijoan.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-cyan-300 transition-colors duration-300 font-medium"
              >
                Md Rijoan Maruf
              </a>
              {/* <FaHeart className="h-4 w-4 text-red-400" /> */}
              {/* <span>in Bangladesh</span> */}
            </div>
            <div className="text-gray-400 text-sm">
              <span>All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;