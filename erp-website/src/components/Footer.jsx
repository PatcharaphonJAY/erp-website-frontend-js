// src/components/Footer.jsx
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const quickLinks = [
    { name: 'หน้าหลัก', href: '/' },
    { name: 'โมดูลทั้งหมด', href: '/modules' },
    { name: 'นโยบายความเป็นส่วนตัว', href: '/privacy' },
  ];

  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6 mt-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
          
          {/* Column 1: About */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-blue-400">ERP-WEBSITE</h4>
            <p className="text-gray-400 text-sm">
              แพลตฟอร์ม ERP ที่ขับเคลื่อนธุรกิจของคุณสู่ความเป็นเลิศ ด้วยระบบหลังบ้านที่ยืดหยุ่นและปลอดภัย
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">ลิงก์ด่วน</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">ติดต่อเรา</h4>
            <p className="text-gray-400 text-sm">
              อีเมล: support@erp-website.com
              <br />
              โทรศัพท์: +66 8x xxx xxxx
            </p>
          </div>

          {/* Column 4: Social Media (Placeholder) */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">ติดตาม</h4>
            <div className="flex space-x-3">
                {/* ไอคอนโซเชียลมีเดีย */}
                <span className="text-gray-400 hover:text-blue-400 transition duration-300">FB</span>
                <span className="text-gray-400 hover:text-blue-400 transition duration-300">X</span>
                <span className="text-gray-400 hover:text-blue-400 transition duration-300">LI</span>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center pt-6 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ERP-WEBSITE. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;