// src/components/Navbar.jsx
"use client"; // *** สำคัญ: ต้องใช้ Client Component เพื่อใช้ useState และ Context ***

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Import Context Hook ที่เราสร้างไว้ใน src/app/HeroContext.jsx
import { useHero } from '@/app/HeroContext'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleHero } = useHero(); // ดึง Function สำหรับสลับสถานะ Hero Section มาใช้

  const navLinks = [
    { name: 'หน้าหลัก', href: '/' },
    { name: 'โมดูล', href: '/modules' },
    { name: 'ผู้ใช้งาน', href: '/case-studies' },
    { name: 'ผู้สนับสนุน', href: '/partners' },
  ];

  // Function สำหรับสลับสถานะเมนู (Mobile)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-blue-900 shadow-xl"> 
      <div className="container mx-auto px-4 max-w-7xl">
        <nav className="flex items-center justify-between h-16">
          
          {/* Logo / Site Title: เพิ่ม onClick เพื่อ Toggle Hero Section */}
          <button 
            type="button" // ใช้ button เพื่อให้คลิกแล้วไม่เปลี่ยน URL
            onClick={(e) => {
              toggleHero(); // สลับสถานะ Hero Section
              setIsMenuOpen(false); // ปิดเมนูมือถือเสมอเมื่อคลิกโลโก้
            }} 
            className="flex items-center space-x-2 text-2xl font-extrabold text-white hover:text-blue-200 transition duration-300 focus:outline-none"
          >
            <Image
              src="/logo.webp" 
              alt="ERP Solution Logo"
              width={30} 
              height={30} 
              className="rounded-full"
            />
            <span>ERP SOLUTION</span>
          </button>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-gray-200 hover:text-white text-base transition duration-300 relative group"
              >
                {link.name}
                <span className="absolute left-0 bottom-[-5px] h-0.5 bg-yellow-400 w-0 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}

            {/* ปุ่ม Call to Action (CTA) */}
            <Link 
              href="/contact" 
              className="ml-6 bg-yellow-400 text-blue-900 font-bold py-2 px-5 rounded-full text-base hover:bg-yellow-300 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ติดต่อ Demo ฟรี
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <button onClick={toggleMenu} className="md:hidden text-white text-3xl">
            {isMenuOpen ? '✕' : '☰'} 
          </button>
        </nav>
      </div>

      {/* Mobile Menu Dropdown (มี Transition) */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
        } bg-blue-800`}
      >
        <div className="flex flex-col space-y-3 px-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-gray-200 hover:text-white font-medium py-2 border-b border-blue-700 last:border-b-0"
              onClick={toggleMenu} // ปิดเมนูเมื่อคลิก
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/contact" 
            className="mt-4 bg-yellow-400 text-blue-900 font-bold py-2 text-center rounded-md hover:bg-yellow-300"
            onClick={toggleMenu}
          >
            ติดต่อ Demo ฟรี
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;