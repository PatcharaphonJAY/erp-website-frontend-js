// src/components/HeroSection.jsx
"use client";

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
// สมมติว่าไฟล์นี้ถูกสร้างขึ้นและมี Provider ครอบคลุมอยู่
// หากไม่มี useHero, คุณสามารถลบ import และใช้ isHeroVisible = true แทนได้
import { useHero } from '@/app/HeroContext'; 

// --------------------------------------------------------------------------
// ข้อมูลจำลองโมดูลสำหรับ Carousel (ปรับให้เข้ากับบริบทโรงพยาบาลทั้งหมด)
// --------------------------------------------------------------------------
const carouselModules = [
  { 
    id: 1, 
    title: 'การเงินและบัญชีโรงพยาบาล (Hospital Finance & Accounting)', 
    headline: 'บริหารค่ารักษา, การเคลมประกัน, และการตั้งเบิกจ่ายอย่างแม่นยำ', 
    summary: 'จัดการใบแจ้งหนี้ผู้ป่วย, การกระทบยอดกับคู่สัญญาประกัน, และการวิเคราะห์ต้นทุนบริการทางการแพทย์.',
    // URL ที่คุณต้องการใช้
    imageUrl: 'https://storage.googleapis.com/fastwork-static/b7af132f-d38c-4525-bd96-eb244a70d075.jpg',
    link: '/modules#finance' 
  },
  { 
    id: 4, 
    title: 'ทรัพยากรบุคคลทางการแพทย์ (Medical HR Management)', 
    headline: 'จัดการตารางแพทย์/พยาบาล, การฝึกอบรม, และการปฏิบัติตามมาตรฐานวิชาชีพ',
    summary: 'ระบบ HRIS ที่รองรับการบริหารใบอนุญาตประกอบวิชาชีพและชั่วโมงการทำงานที่ซับซ้อนของบุคลากรทางการแพทย์.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-21735c024bc6?w=1200&auto=format&fit=crop&q=80', // ภาพเกี่ยวกับทีมงานทางการแพทย์
    link: '/modules#hr' 
  },
  { 
    id: 5, 
    title: 'การจัดซื้อเวชภัณฑ์และครุภัณฑ์ (Medical Procurement)', 
    headline: 'ควบคุมการจัดซื้อยาและอุปกรณ์ทางการแพทย์ให้ทันต่อความต้องการรักษา', 
    summary: 'จัดการผู้ขาย, การประมูลยา, และการตรวจสอบคุณภาพอุปกรณ์ตามมาตรฐาน อย. และ GMP.',
    imageUrl: 'https://graduate.mahidol.ac.th/assets-center/e-GP/assets/images/planing.jpg',
    link: '/modules#procurement' 
  },
  { 
    id: 2, 
    title: 'การบริหารคลินิกและบริการผู้ป่วย (Clinical & Patient Service)', 
    headline: 'เพิ่มประสิทธิภาพการบริการ, จัดการนัดหมาย, และลดเวลารอคอยของผู้ป่วย', 
    summary: 'ระบบจัดการคิว, การจองห้องตรวจ, และการติดตามเส้นทางการรักษา (Patient Journey) แบบครบวงจร.',
    imageUrl: 'https://images.unsplash.com/photo-1582759714881-8b0101c77f0a?w=1200&auto=format&fit=crop&q=80', // ภาพบรรยากาศในคลินิก/โรงพยาบาล
    link: '/modules#clinic-service' 
  },
  { 
    id: 3, 
    title: 'คลังยาและเวชภัณฑ์ (Drug & Medical Inventory)', 
    headline: 'ควบคุมอุณหภูมิ, จัดการ Lot/Serial Number, และป้องกันยาหมดอายุ', 
    summary: 'ระบบจัดการคลังสินค้าแบบ FIFO/FEFO สำหรับยา, วัคซีน, และวัสดุสิ้นเปลืองทางการแพทย์ด้วยความแม่นยำสูง.',
    imageUrl: 'https://images.unsplash.com/photo-1588775691062-817349942a15?w=1200&auto=format&fit=crop&q=80', // ภาพคลังยา/เภสัชกรรม
    link: '/modules#drug-inventory' 
  },
  { 
    id: 6, 
    title: 'การบริหารประสบการณ์ผู้ป่วย (Patient Experience Management)', 
    headline: 'สร้างความสัมพันธ์ระยะยาวและติดตามผลลัพธ์การรักษาของผู้ป่วย', 
    summary: 'ระบบ CRM สำหรับติดตามการนัดหมาย, ประเมินความพึงพอใจ, และการสื่อสารข้อมูลสุขภาพเฉพาะบุคคล.',
    imageUrl: 'https://images.unsplash.com/photo-1629904853716-981882650e47?w=1200&auto=format&fit=crop&q=80', // ภาพการให้คำปรึกษา
    link: '/modules#patient-crm' 
  },
];


// --------------------------------------------------------------------------
// Component: Hero Section หลัก
// --------------------------------------------------------------------------
export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);
  // ใช้ค่าเริ่มต้นเป็น true หาก useHero ไม่ได้ถูกกำหนด
  const isHeroVisible = typeof useHero === 'function' ? useHero().isHeroVisible : true; 

  // Logic สำหรับ Auto-slide และการควบคุม
  useEffect(() => {
    if (isHeroVisible && !isHovering) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % carouselModules.length);
      }, 4000); 
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHeroVisible, isHovering]);

  // Function เลื่อนซ้าย/ขวา
  const goToPrev = () => {
    setIsHovering(true);
    setCurrentIndex(prevIndex => (prevIndex - 1 + carouselModules.length) % carouselModules.length);
    setTimeout(() => setIsHovering(false), 500);
  };

  const goToNext = () => {
    setIsHovering(true);
    setCurrentIndex(prevIndex => (prevIndex + 1) % carouselModules.length);
    setTimeout(() => setIsHovering(false), 500);
  };

  const currentModule = carouselModules[currentIndex];

  // คำนวณค่า translateX() สำหรับการเลื่อน
  const translateXValue = -currentIndex * 100;

  return (
    <section 
      className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden bg-gray-900 group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      
      {/* 1. Slide Track (ตัวควบคุมการเลื่อนของรูปภาพ) */}
      <div 
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out" 
        style={{ transform: `translateX(${translateXValue}%)` }} // ใช้ค่า translateX เพื่อเลื่อน Track
      >
        {carouselModules.map((module) => (
          // แต่ละสไลด์จะถูกกำหนดความกว้าง 100% และถูกจัดเรียงตามแนวนอน
          <div 
            key={module.id} 
            className="w-full h-full flex-shrink-0 relative"
          >
            {module.imageUrl ? (
              <img 
                src={module.imageUrl} 
                alt={module.headline} 
                className="w-full h-full object-cover filter brightness-[0.35] transition-transform duration-700 group-hover:scale-105"
                // ********** แก้ไข: เมื่อโหลดรูปภาพไม่ได้ จะแสดง Placeholder แทน **********
                onError={(e) => {
                  // ซ่อน img ที่เสีย
                  e.target.style.display = 'none'; 
                  
                  // ตรวจสอบว่ามี Placeholder อยู่แล้วหรือไม่ เพื่อป้องกันการเพิ่มซ้ำ
                  if (!e.target.parentNode.querySelector('.img-placeholder')) {
                      // สร้าง div Placeholder
                      const placeholder = document.createElement('div');
                      placeholder.className = 'img-placeholder absolute inset-0 bg-gray-800 flex items-center justify-center text-white';
                      placeholder.innerHTML = `<p class="text-lg font-semibold p-4">ไม่พบรูปภาพ: ${module.title}</p>`;
                      // แทรก Placeholder เข้าไปใน parent div
                      e.target.parentNode.appendChild(placeholder);
                  }
                }}
              />
            ) : (
              // ********** Placeholder สำหรับกรณีที่ imageUrl เป็นค่าว่างตั้งแต่แรก **********
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-white">
                
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fade Effect จางๆ ที่ขอบ */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 via-transparent to-gray-900/40 z-10"></div>
      
      {/* 2. เนื้อหาข้อความกระชับ (อยู่ตรงกลาง) - ใช้ key เพื่อบังคับ Fade Effect */}
      <div 
          key={currentModule.id + '_text'} 
          className="container mx-auto h-full flex flex-col justify-center items-center absolute inset-0 z-20 px-4 text-center text-white 
                     pt-10 pb-24 transition-opacity duration-700 ease-in-out opacity-100" 
      > 
          {/* ขนาดตัวอักษรที่ลดลงแล้ว */}
          <p className="text-base md:text-lg mb-2 font-light text-yellow-300 uppercase tracking-widest">
             {currentModule.title}
          </p>
          <h1 className="text-2xl md:text-4xl font-extrabold mb-3 leading-tight max-w-4xl">
             {currentModule.headline}
          </h1>
          <p className="text-sm md:text-base font-light max-w-3xl"> 
             {currentModule.summary}
          </p>
      </div>

      {/* 3. ปุ่ม/Link CTA ที่ล็อคตำแหน่ง (ลอยตัว) */}
      <Link 
        key={currentModule.id + '_cta'} 
        href={currentModule.link} 
        className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 z-50 
                   transition-all duration-300 shadow-xl 
                   scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100" 
        aria-label={`Go to ${currentModule.title} module`}
      >
        <span className="inline-block bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded-lg text-base hover:bg-yellow-300 transition duration-300">
          สำรวจโมดูลนี้ →
        </span>
      </Link>

      {/* 4. ปุ่มควบคุมการเลื่อน (ซ้าย/ขวา) - z-30 */}
      <div className="absolute inset-y-0 w-full flex items-center justify-between px-4 md:px-8 z-30">
        <button 
          onClick={goToPrev} 
          className="bg-black/30 hover:bg-black/60 text-white p-3 rounded-full transition-colors duration-300 hidden md:block" 
          aria-label="Previous Slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button 
          onClick={goToNext} 
          className="bg-black/30 hover:bg-black/60 text-white p-3 rounded-full transition-colors duration-300 hidden md:block" 
          aria-label="Next Slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      
      {/* 5. Navigation Dots (ตัวบ่งชี้สไลด์) - z-30 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {carouselModules.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-yellow-400' : 'bg-gray-400/50 hover:bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
