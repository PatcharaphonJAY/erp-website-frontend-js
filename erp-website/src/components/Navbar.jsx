"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // ต้องใช้ Image component เพื่อดึงภาพจาก public folder

// --------------------------------------------------------------------------
// ข้อมูลจำลองสำหรับเว็บไซต์ ERP โรงพยาบาล (Hospital ERP Mock Data)
// --------------------------------------------------------------------------
const mockData = {
  companyName: 'ระบบ ERP การแพทย์',
  mainHeadline: 'ยกระดับการจัดการทรัพยากรและการดูแลผู้ป่วย: โมดูล ERP อัจฉริยะสำหรับโรงพยาบาล',
  mainContent: 'แพลตฟอร์มของเราประกอบด้วยโมดูลหลัก (เวชระเบียน, การเงิน, จัดซื้อ) ที่ทำงานร่วมกัน เพื่อเพิ่มประสิทธิภาพการรักษา และช่วยให้บุคลากรทำงานได้อย่างราบรื่น',
  ctaButton: 'ขอข้อมูลและตัวอย่างระบบ',
  mockScore: 4.8, 
  totalReviews: 95, 
  
  reviewCategories: [
    { icon: '📝', name: 'เวชระเบียนอิเล็กทรอนิกส์ (EHR)', benefit: 'ลดข้อผิดพลาด/เพิ่มความแม่นยำ', score: 4.9 },
    { icon: '💰', name: 'การจัดการการเงิน (FI)', benefit: 'ควบคุมรายรับ-รายจ่าย/ลดหนี้สูญ', score: 4.5 },
    { icon: '📦', name: 'การบริหารพัสดุ/ยา (MM)', benefit: 'ควบคุมสต็อก/ลดต้นทุนยา', score: 4.7 },
    { icon: '⏱️', name: 'ประสิทธิภาพการบริการ', benefit: 'ลดเวลารอคอยของผู้ป่วย', score: 4.6 },
    { icon: '🧑‍⚕️', name: 'ความพึงพอใจบุคลากร', benefit: 'ลดภาระงาน/เพิ่มเวลาดูแลผู้ป่วย', score: 4.8 },
  ],

  sentimentAnalysis: [
    { label: 'อัตราความสำเร็จในการรักษา (EHR)', percentage: 92, color: '#10b981' },
    { label: 'ลดข้อผิดพลาดทางการเงิน (FI)', percentage: 88, color: '#3b82f6' },
    { label: 'ลดการขาดแคลนเวชภัณฑ์ (MM)', percentage: 95, color: '#f59e0b' },
    { label: 'ความพึงพอใจผู้ป่วยเพิ่มขึ้น', percentage: 85, color: '#ef4444' },
  ]
};

// --------------------------------------------------------------------------
// Component: Sticky Navbar with Scroll Effect (ตามคำขอ)
// --------------------------------------------------------------------------
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State สำหรับตรวจจับการเลื่อนหน้า

  // Logic สำหรับตรวจจับการเลื่อนหน้า
  useEffect(() => {
    const handleScroll = () => {
      // ตรวจสอบว่ามีการเลื่อนหน้าลงมาเกิน 100px หรือไม่
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Docs', href: '/docs' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Class สำหรับ Header: เปลี่ยนจาก absolute เป็น fixed เมื่อมีการ Scroll พร้อม Blur Effect
  const navbarClasses = isScrolled
    // Fixed, สีขาวโปร่งใส (95%), มี Blur, มีเงา/เส้นขีดแบ่งส่วน
    ? 'fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 border-b border-gray-100' 
    : 'absolute top-0 w-full z-50 transition-all duration-300'; // Absolute, โปร่งใส

  // สีตัวอักษรจะเปลี่ยนตามสถานะการ Scroll
  const textColor = isScrolled ? 'text-gray-900' : 'text-white';
  const hoverTextColor = isScrolled ? 'hover:text-[#5b7ddb]' : 'hover:text-gray-200';
  const ctaBgColor = isScrolled ? 'bg-[#5b7ddb] text-white hover:bg-[#4a63b0]' : 'bg-white text-[#5b7ddb] hover:bg-gray-100';


  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-4 max-w-7xl">
        <nav className="flex items-center justify-between h-16 py-2">
          
          {/* Logo / Site Title: ใช้ Image และชื่อ 'ERP Website' */}
          <Link 
            href="/" 
            className={`flex items-center space-x-2 text-2xl font-extrabold ${textColor} ${hoverTextColor} transition duration-300 focus:outline-none`}
          >
            {/* ใช้ Image component ดึงรูป logo.webp จาก public folder */}
            <Image
              src="/logo.webp" 
              alt="ERP Website Logo"
              width={30} 
              height={30} 
              className="rounded-full"
            />
            <span>ERP Website</span> 
          </Link>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`${textColor} ${hoverTextColor} text-base transition duration-300 relative group`}
              >
                {link.name}
                {/* Underline Effect - สีตามสถานะ Scroll */}
                <span 
                  className={`absolute left-0 bottom-[-5px] h-0.5 ${isScrolled ? 'bg-[#5b7ddb]' : 'bg-white'} w-0 group-hover:w-full transition-all duration-300`}
                ></span>
              </Link>
            ))}

            {/* ปุ่ม Call to Action (CTA) */}
            <Link 
              href="/signup" 
              className={`ml-6 font-bold py-2 px-5 rounded-full text-base transition duration-300 shadow-lg ${ctaBgColor}`}
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <button onClick={toggleMenu} className={`md:hidden text-3xl ${textColor}`}>
            {isMenuOpen ? '✕' : '☰'} 
          </button>
        </nav>
      </div>

      {/* Mobile Menu Dropdown (ใช้สีขาวทึบเพื่อให้ผู้ใช้เห็นเมนูชัดเจน) */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
        } bg-white shadow-xl border-t border-gray-100`}
      >
        <div className="flex flex-col space-y-3 px-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-gray-700 hover:text-[#5b7ddb] font-medium py-2 border-b border-gray-100 last:border-b-0"
              onClick={toggleMenu}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/signup" 
            className="mt-4 bg-[#5b7ddb] text-white font-bold py-2 text-center rounded-full hover:bg-[#4a63b0] transition duration-300"
            onClick={toggleMenu}
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};


// --------------------------------------------------------------------------
// Component: Home Page (Landing Page Structure)
// --------------------------------------------------------------------------
export default function Home() {

  return (
    <div className="min-h-screen bg-white">
      {/* เพิ่ม Navbar ที่เราสร้างเข้าไป */}
      <Navbar /> 
      
      <main>
        
        {/* =========================================================
            1. Hero Section: Gradient Background & Grid Layout
            ========================================================= */}
        <section className="relative pt-36 pb-48 md:pt-48 md:pb-64 overflow-hidden"> 
          {/* พื้นหลัง Gradient (Soft Blue/Purple) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#5b7ddb] to-[#a36be5]">
            {/* Wave effect at the bottom - นิ่ง ไม่มีการเคลื่อนไหว */}
            <svg 
              className="absolute bottom-0 left-0 w-full h-auto text-white fill-current" 
              viewBox="0 0 1440 320" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0,160L48,160C96,160,192,160,288,176C384,192,480,224,576,218.7C672,213,768,171,864,154.7C960,139,1056,149,1152,160C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
          
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            {/* Grid Layout: Text (Left) vs Image (Right) */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              {/* Left Column: Text Content */}
              <div className="text-white pt-10 md:pt-0 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-snug">
                  {mockData.mainHeadline}
                </h1>
                <p className="text-lg mb-8 font-light max-w-lg mx-auto md:mx-0">
                  {mockData.mainContent}
                </p>
                
                {/* CTA Button */}
                <div className="flex justify-center md:justify-start">
                  <Link 
                    href="/report" 
                    className="bg-white text-[#5b7ddb] font-bold py-3 px-8 rounded-full text-lg shadow-xl hover:bg-gray-100 transition duration-300 transform hover:scale-105"
                  >
                    {mockData.ctaButton}
                  </Link>
                </div>
              </div>
              
              {/* Right Column: Illustrative UI (ERP Score Mockup) */}
              <div className="relative flex justify-center md:justify-end min-h-[300px] mt-10 md:mt-0">
                {/* Placeholder Card - จำลองข้อมูลประสิทธิภาพ */}
                <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] border-4 border-gray-100 relative">
                  <p className="text-sm text-gray-400 mb-2">วัดจากประสิทธิภาพการทำงานจริง</p>
                  <h3 className='text-3xl font-bold text-gray-800 mb-6'>
                    ประสิทธิภาพรวม: {mockData.companyName}
                  </h3>
                  
                  {/* Score Display */}
                  <div className='flex flex-col items-center justify-center py-10 bg-blue-50 rounded-lg'>
                    <span className='text-7xl font-extrabold text-[#5b7ddb]'>{mockData.mockScore}</span>
                    <span className='text-xl text-gray-600 mt-2'>ระดับประสิทธิภาพ (จาก 5.0)</span>
                    <span className='text-sm text-gray-500 mt-1'>อ้างอิงจาก {mockData.totalReviews.toLocaleString()} การใช้งานในหน่วยงานชั้นนำ</span> 
                  </div>
                  
                  {/* Image Placeholder - Icon/Mockup UI */}
                  <div className='absolute -top-10 right-4 bg-green-500 p-4 rounded-full text-white text-xl shadow-xl border-4 border-white'>
                    รูปภาพ
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* =========================================================
            2. Section: Key Metrics / Categories (Floating Icons)
            ========================================================= */}
        <section className="py-24 md:py-32 bg-white relative">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 max-w-2xl mx-auto">
              หัวข้อ: โมดูลหลักและประโยชน์ที่ชัดเจน
            </h2>
            <p className="text-lg text-gray-500 mb-12 max-w-4xl mx-auto">
              เนื้อหา: ระบบของเราถูกออกแบบตามมาตรฐานสากล โดยแบ่งเป็นโมดูลสำคัญที่ขับเคลื่อนประสิทธิภาพในด้านต่างๆ
            </p>

            {/* Floating Icons & Central Logo */}
            <div className="relative flex justify-center items-center h-64 md:h-96">
              
              {/* Central Logo */}
              <div className="relative z-20 w-40 h-40 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center border-4 border-gray-100 transform hover:scale-105 transition duration-500">
                <span className="text-5xl mb-1">🧠</span>
                <span className="text-sm font-semibold text-gray-800">Hospital ERP Core</span>
              </div>
              
              {/* Floating Icons (Placement based on image) */}
              {mockData.reviewCategories.map((cat, index) => (
                <div 
                  key={index}
                  className={`absolute p-4 md:p-6 rounded-xl shadow-lg text-center bg-white transition-all duration-700 hover:scale-110 flex flex-col items-center w-36 border-2 border-[#5b7ddb]/20`}
                  // Dynamic positioning for a scattered effect
                  style={{
                    top: `${[15, 25, 60, 85, 45][index]}%`,
                    left: `${[8, 85, 20, 75, 50][index]}%`,
                    transform: `translate(-50%, -50%)`,
                    zIndex: 10,
                    backgroundColor: `hsl(${index * 60 + 20}, 90%, 97%)` // Soft colors
                  }}
                >
                  <span className='text-3xl mb-1'>{cat.icon}</span>
                  <p className='text-sm font-bold text-gray-900 leading-tight mb-1'>{cat.name}</p>
                  <span className='text-xs text-gray-600'>{cat.benefit}</span>
                </div>
              ))}
              
              {/* Subtle background blob */}
              <div className="absolute inset-0 bg-gray-100/50 rounded-[4rem] transform rotate-3 scale-x-[1.1] scale-y-[1.2]"></div>

            </div>
            
          </div>
        </section>

        {/* =========================================================
            3. Section: Performance Analysis (Two-Column Feature)
            ========================================================= */}
        <section className="py-24 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Grid Layout: Text (Left) vs Image (Right) */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              
              {/* Left Column: Text Content */}
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">
                  หัวข้อ: การวัดประสิทธิภาพและความคุ้มค่า (KPIs)
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  เนื้อหา: เราแสดงผลการวิเคราะห์ประสิทธิภาพหลัก (KPIs) ที่โรงพยาบาลทำได้หลังจากการติดตั้งระบบ ซึ่งแสดงให้เห็นถึงความคุ้มค่าของการลงทุน
                </p>
                
                {/* CTA Button */}
                <Link 
                  href="/detailed-sentiment" 
                  className="inline-block bg-[#5b7ddb] text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl hover:bg-[#4a63b0] transition duration-300 transform hover:scale-105"
                >
                  ดูรายงานผลลัพธ์ฉบับเต็ม
                </Link>
              </div>
              
              {/* Right Column: Performance Chart Mockup Placeholder */}
              <div className="relative flex justify-center">
                {/* Mockup Card */}
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] w-full max-w-md border border-gray-100 relative">
                  <h3 className="text-lg font-semibold mb-4 flex justify-between items-center">
                    หัวข้อ: ผลการวิเคราะห์ประสิทธิภาพหลัก <span className='text-sm text-green-600 bg-green-50 p-1 rounded'>📈</span>
                  </h3>
                  
                  {/* Stats Bar List */}
                  <div className="space-y-5">
                    {mockData.sentimentAnalysis.map((item, index) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-base text-gray-700 mb-1">
                          <span>{item.label}</span>
                          <span className="font-bold text-lg" style={{ color: item.color }}>{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="h-3 rounded-full" 
                            style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Image Placeholder (Floating Element) */}
                  <div className='absolute -bottom-8 -right-4 transform translate-x-1/2 translate-y-1/2'>
                    <div className='bg-red-400 text-white p-4 rounded-full text-2xl shadow-xl border-4 border-gray-50'>รูปภาพ</div>
                  </div>
                  
                  {/* Image Placeholder (Floating Element) */}
                  <div className='absolute -top-4 -left-4'>
                    <div className='bg-green-400 text-white p-2 rounded-lg text-lg shadow-lg'>รูปภาพ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section 4: Placeholder for the rest of the page */}
        <section className="py-16 text-center">
            <h2 className="text-2xl font-bold text-gray-700">ส่วนเนื้อหาอื่นๆ ของเว็บไซต์</h2>
            <p className="text-gray-500">คุณสามารถเพิ่ม Case Studies, Features หรือ Contact Form ได้ที่นี่</p>
        </section>

      </main>
    </div>
  );
}
