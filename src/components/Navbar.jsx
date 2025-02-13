import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-amber-700 to-amber-500 text-amber-100 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-3xl font-extrabold tracking-wide">
          Treasure Hunt
        </div>
        <nav className="space-x-6">
          <a href="#home" className="text-white hover:text-gray-300 transition duration-300 ease-in-out">Home</a>
          <a href="#about" className="text-white hover:text-gray-300 transition duration-300 ease-in-out">About</a>
          <a href="#services" className="text-white hover:text-gray-300 transition duration-300 ease-in-out">Services</a>
          <a href="#contact" className="text-white hover:text-gray-300 transition duration-300 ease-in-out">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;