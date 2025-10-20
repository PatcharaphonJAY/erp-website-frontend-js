import React from 'react';

// ไอคอน SVG สำหรับโซเชียลมีเดีย
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400 group-hover:text-sky-500 transition duration-300">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400 group-hover:text-sky-500 transition duration-300">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path>
    </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400 group-hover:text-sky-500 transition duration-300">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Footer = () => {
  // ลิงก์ด่วนสำหรับนำทางในเว็บไซต์
  const quickLinks = [
    { name: 'หน้าหลัก', href: '/' },
    { name: 'โมดูลทั้งหมด', href: '/modules' },
    { name: 'นโยบายความเป็นส่วนตัว', href: '/privacy' },
    { name: 'ติดต่อเรา', href: '/#signup' }, 
  ];

  // ข้อมูลสำหรับติดต่อ
  const contactInfo = {
    email: 'info@rpds-erp.com',
    phone: '+66 42 899 001',
    address: 'โรงพยาบาลสมเด็จพระยุพราชด่านซ้าย, จ.เลย 42120'
  };

  return (
    <footer className="bg-[#101827] text-slate-300 pt-12 pb-6 border-t border-slate-700/50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-b border-slate-700/50 pb-8">
          
          {/* ส่วนที่ 1: แบรนด์และพันธกิจ */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <h4 className="text-xl font-extrabold mb-3 text-white tracking-wider">
              RPDS <span className="text-sky-500">ERP System</span>
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              ระบบบริหารจัดการทรัพยากรที่พัฒนาและขับเคลื่อนโดยทีมงาน รพร.ด่านซ้าย
              เพื่อการจัดการที่โปร่งใสและเป็นเลิศด้านบริการสาธารณสุข
            </p>
          </div>

          {/* ส่วนที่ 2: ลิงก์ด่วน */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">ลิงก์ด่วน</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-slate-400 hover:text-sky-400 transition duration-300 text-sm font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ส่วนที่ 3: ข้อมูลติดต่อ */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">ติดต่อ</h4>
            <div className="space-y-2 text-sm">
              <p className="text-slate-400">
                <span className="font-semibold text-sky-400">อีเมล:</span> {contactInfo.email}
              </p>
              <p className="text-slate-400">
                <span className="font-semibold text-sky-400">โทร:</span> {contactInfo.phone}
              </p>
              <p className="text-slate-400 pt-2">{contactInfo.address}</p>
            </div>
          </div>

          {/* ส่วนที่ 4: โซเชียลมีเดีย */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">ติดตาม</h4>
            <div className="flex space-x-4">
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

        {/* ส่วนลิขสิทธิ์ */}
        <div className="text-center pt-6 text-slate-500 text-xs font-light">
          &copy; {new Date().getFullYear()} RPDS ERP System. All Rights Reserved. (พัฒนาโดยทีมงาน รพร.ด่านซ้าย)
        </div>
      </div>
    </footer>
  );
};

export default Footer;

