// src/components/Navbar.jsx
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  const navLinks = [
    { name: 'โมดูล', href: '/modules' },
    { name: 'ผู้ใช้งาน', href: '/case-studies' }, // สำหรับอ้างอิงผู้ใช้งาน
    { name: 'ผู้สนับสนุน', href: '/partners' },
    { name: 'ติดต่อ', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-blue-700 shadow-md">
      <div className="container mx-auto px-4 max-w-7xl">
        <nav className="flex items-center justify-between h-16">
          {/* Logo / Site Title */}
          <Link href="/" className="text-2xl font-bold text-white hover:text-blue-200 transition duration-300">
            ERP-WEBSITE
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-white hover:text-yellow-400 text-lg transition duration-300 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Call to Action Button */}
          <Link 
            href="/demo" 
            className="bg-yellow-400 text-blue-900 font-bold py-1.5 px-4 rounded-md hover:bg-yellow-300 transition duration-300 hidden sm:block"
          >
            Demo
          </Link>

          {/* Mobile Menu Icon (Placeholder) */}
          {/* ในโปรเจกต์จริงควรเพิ่ม Mobile Menu Logic ที่นี่ */}
          <button className="md:hidden text-white text-2xl">
            ☰
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;