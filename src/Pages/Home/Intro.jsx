import React from 'react';
import { FaDownload, FaGithub, FaLinkedin, FaCode, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { HiArrowRight } from 'react-icons/hi';
import RijoanImg from '../../../public/Rijoan.png';

const Intro = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-left">
            {/* Greeting */}
            <div className="space-y-2">
              <p className="text-blue-400 text-lg font-medium">Hello, I'm</p>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Md Rijoan
                <span className="block text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">
                  Maruf
                </span>
              </h1>
            </div>

            {/* Role/Title */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl text-gray-300 font-light">
                Full Stack Developer
              </h2>
              <div className="flex items-center space-x-2 text-gray-400">
                <FaCode className="h-5 w-5 text-blue-400" />
                <span>Passionate about creating innovative web solutions</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
              I specialize in building exceptional digital experiences with modern technologies. 
              From responsive web applications to full-stack solutions, I bring ideas to life 
              with clean code and intuitive design.
            </p>

            {/* Tech Stack */}
            <div className="space-y-3">
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-3">
                {['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'JavaScript'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-slate-800 text-blue-400 text-sm rounded-full border border-slate-700 hover:border-blue-500 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <FaDownload className="h-4 w-4" />
                <span>Download CV</span>
                <HiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-blue-500 text-blue-400 rounded-lg font-medium hover:bg-blue-500 hover:text-white transition-all duration-300">
                <span>View Projects</span>
                <HiArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="https://github.com/mdrijoanmaruf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                title="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/mdrijoanmaruf/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-800 text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                title="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/md.rijoanmaruf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-800 text-gray-400 hover:text-white hover:bg-blue-500 transition-all duration-300 hover:scale-110"
                title="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/rijoanmaruf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-800 text-gray-400 hover:text-white hover:bg-pink-500 transition-all duration-300 hover:scale-110"
                title="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/rijianmaruf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-800 text-gray-400 hover:text-white hover:bg-sky-500 transition-all duration-300 hover:scale-110"
                title="X (Twitter)"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a 
                href="https://leetcode.com/u/mdrijoanmaruf/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-800 text-gray-400 hover:text-white hover:bg-orange-500 transition-all duration-300 hover:scale-110"
                title="LeetCode"
              >
                <SiLeetcode className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in-right">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl transform scale-110"></div>
              
              {/* Main image container */}
              <div className="relative z-10 group">
                <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-400 to-cyan-300 shadow-2xl group-hover:scale-105 transition-all duration-500">
                  <img 
                    src={RijoanImg} 
                    alt="Md Rijoan Maruf" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                  <FaCode className="h-8 w-8 text-white" />
                </div>
                
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-white font-bold text-xs">DEV</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(-10px);
          }
          50% {
            transform: translateY(0px);
          }
        }
        
        .animate-fade-in-left {
          animation: fade-in-left 1s ease-out;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out 0.3s both;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Intro;