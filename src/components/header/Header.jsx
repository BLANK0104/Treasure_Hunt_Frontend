import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative flex flex-col w-full">
      {/* Main Header Bar */}
      <div className="relative flex items-center justify-between bg-gradient-to-r from-black via-gray-900 to-black text-cyan-400 py-3 md:py-6 px-4 md:px-8 shadow-lg border-b border-cyan-900">
        {/* Animated Logo */}
        <div className="relative w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300 cursor-pointer">
          <div className="absolute inset-0 bg-cyan-500 rounded-full opacity-20 animate-pulse"></div>
          <span className="text-black text-xs md:text-sm font-semibold">Logo</span>
        </div>

        {/* Title with animated gradient and glow */}
        <div className="relative group">
          <div className="overflow-hidden">
            <h1 className="text-3xl md:text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 hover:from-cyan-300 hover:via-cyan-200 hover:to-cyan-300 transition-all duration-300">
              Ambiora
            </h1>
          </div>
          <div className="absolute -inset-1 bg-cyan-500 opacity-20 group-hover:opacity-30 blur-lg transition-all duration-300"></div>
        </div>

        {/* Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative w-10 h-10 md:w-14 md:h-14 rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center cursor-pointer hover:from-gray-700 hover:to-gray-600 transition-all duration-300"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-cyan-400 transform transition-transform duration-300 hover:rotate-90" />
          ) : (
            <Menu className="w-6 h-6 text-cyan-400 transform transition-transform duration-300 hover:scale-110" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Slides down when open */}
      <div className={`absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-sm transform transition-all duration-300 ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <nav className="p-4 space-y-3">
          {['Home', 'Hunt', 'Leaderboard', 'Profile'].map((item) => (
            <div key={item} className="group">
              <a 
                href="#" 
                className="block text-cyan-400 hover:text-cyan-300 py-2 px-4 rounded-lg transition-all duration-300 hover:bg-cyan-500/10"
              >
                <span className="relative">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;