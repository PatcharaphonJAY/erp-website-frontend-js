// components/Navbar.tsx (หรือ .jsx)
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Blog', href: '#blog' },
    { name: 'Docs', href: '#docs' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navbarClasses = isScrolled
    ? 'fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 border-b border-gray-100'
    : 'absolute top-0 w-full z-50 transition-all duration-300';

  const textColor = isScrolled ? 'text-gray-900' : 'text-white';
  const hoverTextColor = isScrolled ? 'hover:text-[#5b7ddb]' : 'hover:text-gray-200';
  const ctaBgColor = isScrolled ? 'bg-[#5b7ddb] text-white hover:bg-[#4a63b0]' : 'bg-white text-[#5b7ddb] hover:bg-gray-100';

  return (
    <header className={navbarClasses}>
      <style>{`html { scroll-behavior: smooth; }`}</style> {/* Smooth Scroll CSS */}
      <div className="container mx-auto px-4 max-w-7xl">
        <nav className="flex items-center justify-between h-16 py-2">
          <Link href="/" className={`flex items-center space-x-2 text-2xl font-extrabold ${textColor} ${hoverTextColor}`}>
            <Image src="/logo.webp" alt="ERP Website Logo" width={30} height={30} className="rounded-full" />
            <span>ERP Website</span>
          </Link>
          <div className="hidden md:flex items-center space-x-7">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className={`${textColor} ${hoverTextColor} relative group`}>
                {link.name}
                <span className={`absolute left-0 bottom-[-5px] h-0.5 ${isScrolled ? 'bg-[#5b7ddb]' : 'bg-white'} w-0 group-hover:w-full transition-all duration-300`}></span>
              </a>
            ))}
            <Link href="#signup" className={`ml-6 font-bold py-2 px-5 rounded-full text-base transition duration-300 shadow-lg ${ctaBgColor}`}>
              Sign up
            </Link>
          </div>
          <button onClick={toggleMenu} className={`md:hidden text-3xl ${textColor}`}>{isMenuOpen ? '✕' : '☰'}</button>
        </nav>
      </div>

      {/* Mobile Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'} bg-white shadow-xl border-t border-gray-100`}>
        <div className="flex flex-col space-y-3 px-4">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-gray-700 hover:text-[#5b7ddb] py-2 border-b" onClick={toggleMenu}>
              {link.name}
            </a>
          ))}
          <a href="#signup" className="mt-4 bg-[#5b7ddb] text-white font-bold py-2 text-center rounded-full hover:bg-[#4a63b0]" onClick={toggleMenu}>
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
