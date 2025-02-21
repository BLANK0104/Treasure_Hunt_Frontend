import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="relative flex flex-col w-full">
      {/* Main Header Bar */}
      <div className="relative flex items-center justify-between bg-gradient-to-r from-black via-gray-900 to-black text-cyan-400 py-3 md:py-6 px-4 md:px-8 shadow-lg border-b border-cyan-900">
        
        {/* Left Side - Logo */}
        <div className="relative flex-shrink-0 w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300 cursor-pointer">
          <div className="absolute inset-0 bg-cyan-500 rounded-full opacity-20 animate-pulse"></div>
          <img 
            src="/atw.png" 
            alt="Logo" 
            className="w-8 h-8 md:w-12 md:h-12 object-contain"
          />
        </div>

        {/* Center - Title */}
        <div className="relative flex-1 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 hover:from-cyan-300 hover:via-cyan-200 hover:to-cyan-300 transition-all duration-300">
            Ambiora
          </h1>
          <div className="absolute -inset-1 bg-cyan-500 opacity-20 blur-lg transition-all duration-300"></div>
        </div>

        {/* Right Side - Logout Button (Fixed) */}
        <button 
          onClick={() => {
            console.log('User logged out');
            navigate('/login');
          }}
          className="relative flex-shrink-0 min-w-[40px] min-h-[40px] w-10 h-10 md:w-14 md:h-14 rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center cursor-pointer hover:from-gray-700 hover:to-gray-600 transition-all duration-300"
        >
          {/* Fixed X Icon */}
          <X className="w-6 h-6 min-w-[24px] min-h-[24px] md:w-7 md:h-7 text-cyan-400 transform transition-transform duration-300 hover:rotate-90" />
          <span className="sr-only">Logout</span>
        </button>

      </div>
    </header>
  );
};

export default Header;
