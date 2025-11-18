// src/components/Navbar.jsx
'use client';

import React, { useState, useEffect } from 'react'; // <<-- บรรทัดที่แก้ไข
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';

// ไอคอนลูกศรสำหรับเมนูย่อย
const ChevronDownIcon = () => (
  <svg className="w-4 h-4 ml-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const Navbar = ({ modules }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModulesMenuOpen, setIsModulesMenuOpen] = useState(false);
  const [isMobileModulesOpen, setIsMobileModulesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsMobileModulesOpen(false); // ปิดเมนูย่อยด้วย
  };

  const navbarClasses = isScrolled
    ? 'fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-lg shadow-lg shadow-blue-500/10 transition-all duration-300 border-b border-white/10'
    : 'absolute top-0 w-full z-50 transition-all duration-300';

  return (
    <header className={navbarClasses}>
      <style>{`html { scroll-behavior: smooth; }`}</style>
      <div className="container mx-auto px-4 max-w-7xl">
        <nav className="flex items-center justify-between h-20 py-2">
          {/* Logo and Site Name */}
          <Link href="/" className="flex items-center space-x-3 text-2xl font-extrabold group">
             <div className="relative w-10 h-10">
               <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition duration-300"></div>
               <Image 
                 src="/logo.webp" 
                 alt="ERP Website Logo" 
                 width={40} 
                 height={40} 
                 className="relative rounded-full border-2 border-white/20 group-hover:border-blue-400/50 transition-all duration-300" 
               />
             </div>
             <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-slate-100 group-hover:from-white group-hover:to-blue-300 transition-all duration-300">
               ERP Website
             </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-100 hover:text-blue-400 font-medium transition-colors">หน้าแรก</Link>
            
            <div 
              className="relative"
              onMouseEnter={() => setIsModulesMenuOpen(true)}
              onMouseLeave={() => setIsModulesMenuOpen(false)}
            >
              <Link href="/modules" className="flex items-center text-slate-100 hover:text-blue-400 font-medium transition-colors">
                โมดูล <ChevronDownIcon />
              </Link>
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-max transition-all duration-300 ease-in-out
                ${isModulesMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}
              >
                <div className="bg-slate-800/90 backdrop-blur-xl rounded-lg shadow-2xl border border-white/10 p-6">
                  <div className="grid grid-cols-3 gap-x-8 gap-y-5">
                    {modules.map((mod) => (
                      <Link 
                        key={mod.id} 
                        href={`/modules?module=${mod.id}`}
                        onClick={() => setIsModulesMenuOpen(false)}
                        className="flex items-center gap-3 group p-2 rounded-md hover:bg-blue-500/10"
                      >
                        <div className="text-blue-400 group-hover:text-white transition-colors"><mod.Icon size={24} /></div>
                        <span className="text-slate-200 group-hover:text-white font-medium text-sm transition-colors">{mod.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/#blog" className="text-slate-100 hover:text-blue-400 font-medium transition-colors">บทความ</Link>
            <Link href="/#announcements" className="text-slate-100 hover:text-blue-400 font-medium transition-colors">ประกาศ</Link>
            <Link href="/#signup" className="text-slate-100 hover:text-blue-400 font-medium transition-colors">ติดต่อเรา</Link>
            <Link href="/login" className="text-slate-100 hover:text-blue-400 font-medium transition-colors">Sign In</Link>
          </div>
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-3xl text-slate-100">{isMenuOpen ? '✕' : '☰'}</button>
        </nav>
      </div>

      <div className={`md:hidden overflow-y-auto transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen' : 'max-h-0 opacity-0'} bg-slate-900/95 backdrop-blur-xl border-t border-white/10`}>
        <div className="flex flex-col space-y-2 px-5 py-5">
          <Link href="/" className="text-slate-200 hover:bg-blue-500/20 text-lg py-3 px-4 rounded-md" onClick={closeMobileMenu}>หน้าแรก</Link>
          
          <div>
            <button onClick={() => setIsMobileModulesOpen(!isMobileModulesOpen)} className="w-full flex justify-between items-center text-slate-200 hover:bg-blue-500/20 text-lg py-3 px-4 rounded-md">
              <span>โมดูล</span>
              <span className={`transform transition-transform duration-300 ${isMobileModulesOpen ? 'rotate-180' : ''}`}><ChevronDownIcon/></span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isMobileModulesOpen ? 'max-h-96' : 'max-h-0'}`}>
              <div className="pl-6 pt-2 flex flex-col items-start">
                {modules.map((mod) => (
                  <Link 
                    key={mod.id} 
                    href={`/modules?module=${mod.id}`} 
                    className="text-slate-300 hover:text-white py-2" 
                    onClick={closeMobileMenu}
                  >
                    {mod.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <Link href="/#blog" className="text-slate-200 hover:bg-blue-500/20 text-lg py-3 px-4 rounded-md" onClick={closeMobileMenu}>บทความ</Link>
          <Link href="/#announcements" className="text-slate-200 hover:bg-blue-500/20 text-lg py-3 px-4 rounded-md" onClick={closeMobileMenu}>ประกาศ</Link>
          <Link href="/#signup" className="text-slate-200 hover:bg-blue-500/20 text-lg py-3 px-4 rounded-md" onClick={closeMobileMenu}>ติดต่อเรา</Link>
          <Link href="/login" className="text-slate-200 hover:bg-blue-500/20 text-lg py-3 px-4 rounded-md" onClick={closeMobileMenu}>Sign In</Link>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
  })).isRequired,
};

export default Navbar;