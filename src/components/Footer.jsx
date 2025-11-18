import React from 'react';

// [ปรับสี] ไอคอน (ใช้โทนสีฟ้า blue-400)
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-slate-500 transition duration-300 hover:text-blue-400">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-slate-500 transition duration-300 hover:text-blue-400">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path>
    </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-slate-500 transition duration-300 hover:text-blue-400">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Footer = () => {
  const quickLinks = [
    { name: 'หน้าหลัก', href: '/' },
    { name: 'โมดูลทั้งหมด', href: '/modules' },
    { name: 'นโยบายความเป็นส่วนตัว', href: '/privacy' },
    { name: 'ติดต่อเรา', href: '/#signup' }, 
  ];

  const contactInfo = {
    email: 'info@rpds-erp.com',
    phone: '+66 42 899 001',
    address: 'โรงพยาบาลสมเด็จพระยุพราชด่านซ้าย, จ.เลย 42120'
  };

  return (
    // [FIX] ปรับ Padding ให้น้อยลง (pt-10 -> pt-12, pb-5 -> pb-6)
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-6 border-t border-slate-700/50">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* [FIX] เปลี่ยนเป็น Grid 3 คอลัมน์ (บน Desktop) และ 1 คอลัมน์ (บน Mobile) */}
        {/* ใช้ 12-column grid system เพื่อการจัดวางที่ "สากล" */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8">
          
          {/* ส่วนที่ 1: แบรนด์ (กินพื้นที่ 5/12) */}
          <div className="lg:col-span-5">
            <h4 className="text-xl font-extrabold mb-3 text-white tracking-wider">
              Website <span className="text-blue-400">ERP System</span>
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              ระบบบริหารจัดการทรัพยากรที่พัฒนาและขับเคลื่อนโดยทีมงาน รพร.ด่านซ้าย
              เพื่อการจัดการที่โปร่งใสและเป็นเลิศด้านบริการสาธารณสุข
            </p>
          </div>

          {/* ส่วนที่ 2: ลิงก์ด่วน (กินพื้นที่ 3/12) */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-semibold mb-3 text-white">ลิงก์ด่วน</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-slate-300 hover:text-blue-400 transition duration-300 text-sm font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ส่วนที่ 3: ข้อมูลติดต่อ (กินพื้นที่ 4/12) */}
          <div className="lg:col-span-4">
            <h4 className="text-lg font-semibold mb-3 text-white">ติดต่อ</h4>
            <div className="space-y-2 text-sm">
              <p className="flex flex-col">
                <span className="font-semibold text-slate-400">อีเมล:</span>
                <span className="text-slate-200">{contactInfo.email}</span>
              </p>
              <p className="flex flex-col">
                <span className="font-semibold text-slate-400">โทร:</span>
                <span className="text-slate-200">{contactInfo.phone}</span>
              </p>
              <p className="text-slate-400 pt-2">{contactInfo.address}</p>
            </div>
          </div>

          {/* [REMOVED] ลบคอลัมน์ "ติดตาม" ออก */}

        </div>

        {/* [FIX] ส่วนลิขสิทธิ์ และ Social Icons (ย้ายมาไว้รวมกัน) */}
        <div className="mt-6 pt-6 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center">
          
          {/* Copyright (อยู่ซ้ายบน Desktop, อยู่บนบน Mobile) */}
          <div className="text-slate-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Website ERP System. All Rights Reserved.
            <span className="hidden md:inline"> | (พัฒนาโดยทีมงาน รพร.ด่านซ้าย)</span>
          </div>

          {/* Social Icons (อยู่ขวาบน Desktop, อยู่ล่างบน Mobile) */}
          <div className="flex space-x-5 mt-4 md:mt-0">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group">
              <FacebookIcon />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="group">
              <TwitterIcon />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group">
              <LinkedinIcon />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;