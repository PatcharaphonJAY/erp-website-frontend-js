'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
// สมมติว่าไฟล์นี้มี Icon ที่ใช้จาก library เช่น Tabler Icons, Lucide
import { MIS_MODULES } from '../data/modules'; 

// =================================================================
// Custom Hook: สำหรับการตรวจจับการ Fade on Scroll
// =================================================================
export function useIsVisible(threshold = 0) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // isIntersecting เป็น true เมื่อองค์ประกอบอยู่ใน Viewport
        if (entry.isIntersecting) {
            setIsVisible(true);
        } else if (entry.boundingClientRect.top < 0) {
            // Fade out เมื่อเลื่อนผ่าน Hero ขึ้นไปด้านบน
            setIsVisible(false);
        }
      },
      { 
        threshold: threshold,
        rootMargin: '0px 0px -100px 0px' 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
}
// =================================================================


// =================================================================
// Sub-Components
// =================================================================

// Component สำหรับแสดง Module Card
const ModuleCard = ({ m }) => (
  <Link 
    href={m.link || '#'} 
    className="group p-6 rounded-xl shadow-xl transition-all duration-300 bg-[#1a293c] border border-slate-700 hover:border-sky-500 hover:-translate-y-1 block"
  >
    <div className="flex flex-col items-start gap-4">
      <div className="text-sky-400 p-3 bg-sky-500/10 rounded-lg transition-all duration-500 group-hover:bg-sky-500 group-hover:text-white">
        {/* สมมติว่า m.Icon เป็น React Component ที่ถูกส่งมาจาก MIS_MODULES */}
        <m.Icon size={32} strokeWidth={2} />
      </div>
      <div>
        <h4 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors duration-300">
          {m.title}
        </h4>
        <p className="text-sm text-slate-400 mt-1">{m.desc}</p>
      </div>
    </div>
  </Link>
);

// Component สำหรับ Hero Image Slider
const HeroImageSlider = ({ HERO_IMAGES, currentImageIndex, setIsHovered }) => (
  <div
    className="relative flex justify-center lg:justify-end group"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
      <div className="relative w-full h-full bg-[#1a293c] rounded-3xl shadow-2xl shadow-black/70 border-4 border-slate-700 overflow-hidden transform transition-all duration-500 group-hover:scale-[1.03]">
        {HERO_IMAGES.map((imageUrl, index) => (
          <img
            key={imageUrl}
            src={imageUrl}
            alt={`ERP Solution Illustration ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100 z-20' : 'opacity-0 z-10'
            }`}
          />
        ))}
      </div>
    </div>
  </div>
);

// *** 1. เพิ่ม Component Modal สำหรับประกาศข่าวสาร ***
const AnnouncementModal = ({ item, onClose }) => {
  if (!item) return null; // ถ้าไม่มี item ที่เลือก ให้ซ่อน Modal

  return (
    <div
      className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose} // ปิดเมื่อคลิกที่พื้นหลัง (Backdrop)
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-2xl bg-[#1a293c] rounded-xl shadow-2xl border border-slate-700 overflow-hidden transform transition-all duration-300 scale-95 opacity-0 animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // ป้องกันการปิดเมื่อคลิกที่เนื้อหา
      >
        {/* ปุ่มปิด (X) มุมบนขวา */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* เนื้อหา Modal (คัดลอกสไตล์มาจาก Card เดิม) */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-700/50 pb-3 mb-4">
            <span className={`text-xs font-bold py-1 px-3 rounded-full mb-2 sm:mb-0 uppercase tracking-wider
              ${item.category === 'อัปเดตระบบ' ? 'bg-sky-500/20 text-sky-300' : ''}
              ${item.category === 'ประกาศอบรม' ? 'bg-green-500/20 text-green-300' : ''}
              ${item.category === 'ซ่อมบำรุง' ? 'bg-yellow-500/20 text-yellow-300' : ''}
            `}>
              {item.category}
            </span>
            <p className="text-sm text-slate-400 font-medium">{item.date}</p>
          </div>
          <h3 className="text-2xl font-bold text-white leading-snug mb-4">{item.title}</h3>
          {/* ขยายเนื้อหา Description ให้ยาวขึ้น (ตัวอย่าง) */}
          <p className="text-slate-300 text-base leading-relaxed">{item.description}</p>
          {/* <p className="text-slate-300 text-base leading-relaxed mt-4">
              [คุณสามารถเพิ่มเนื้อหาข่าวเต็มๆ ได้ที่นี่]... Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit. Nullam in dui mauris. 
              Vivamus hendrerit arcu sed erat molestie vehicula.
            </p>
          */}
        </div>
      </div>
      
      {/* เพิ่ม CSS สำหรับ Animation (จำเป็นต้องใช้ <style jsx>) */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
// *** (สิ้นสุด Sub-Component ใหม่) ***


export default function Home() {
  // =================================================================
  // Data Definition
  // =================================================================
  const [stars, setStars] = useState([]);
  const [moduleView, setModuleView] = useState('grid');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    hospital: '',
    email: '',
    tel: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  // *** เพิ่มการเรียกใช้ Hook สำหรับ Hero Section ***
  const [heroRef, isHeroVisible] = useIsVisible(0.1); 

  // *** 2. เพิ่ม State สำหรับ Modal ***
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const HERO_IMAGES = useMemo(() => [
    "https://levinci.group/wp-content/uploads/2024/04/why-should-business-use-ERP-1024x611.jpg",
    "https://tigersoft.co.th/wp-content/uploads/2023/08/blog21.jpg",
    "https://mayade.co.th/wp-content/uploads/2022/06/SeekPng.com_dmk-logo-png_8986300.png"
  ], []);

  const PHR_DAN_SAI_PERSONNEL = useMemo(() => [
    { name: "นายแพทย์สมศักดิ์ รักษาดี", position: "ผู้อำนวยการโรงพยาบาล", iconInitial: "MD", description: "บริหารวิสัยทัศน์กว้างไกล นำพาองค์กรสู่การพัฒนาด้านสาธารณสุขอย่างยั่งยืน" },
    { name: "พยาบาลวิชาชีพพรทิพย์ สุขสบาย", position: "หัวหน้าพยาบาล", iconInitial: "RN", description: "ดูแลและส่งเสริมคุณภาพการพยาบาล เป็นหัวใจสำคัญในการดูแลผู้ป่วย" },
    { name: "เภสัชกรหญิงอรุณี มีคุณธรรม", position: "หัวหน้าฝ่ายเภสัชกรรม", iconInitial: "PH", description: "ควบคุมการจัดหาและจ่ายยาคุณภาพ เพื่อให้ผู้ป่วยได้รับการรักษาที่เหมาะสมและปลอดภัย" },
    { name: "เจ้าหน้าที่สมชาย พัฒนาการ", position: "หัวหน้าฝ่ายไอที", iconInitial: "IT", description: "ดูแลระบบ MIS 4.0 และการเชื่อมต่อ HOSxP ให้ทำงานได้อย่างราบรื่น 24 ชั่วโมง" },
  ], []);

  const ERP_ARTICLES = useMemo(() => [
    {
      title: "5 กลยุทธ์เลือก ERP ให้เหมาะกับธุรกิจโรงพยาบาล",
      category: "ERP Strategy",
      date: "15 ต.ค. 2568",
      imageUrl: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1000,h_646/https://onestopitservices.konicaminolta.co.th/wp-content/uploads/2023/06/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%A7%E0%B8%B2%E0%B8%87%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A-ERP-%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88.jpg",
      link: "#"
    },
    {
      title: "Case Study: รพร.ด่านซ้าย ลดต้นทุนคลังเวชภัณฑ์ด้วย ERP",
      category: "Case Study",
      date: "10 ต.ค. 2568",
      imageUrl: "https://greenmoons.co.th/wp-content/uploads/2024/08/erp-1-scaled.jpg",
      link: "#"
    },
    {
      title: "การเชื่อมต่อระบบ ERP กับ HOSxP เพื่อข้อมูลแบบไร้รอยต่อ",
      category: "Integration",
      date: "5 ต.ค. 2568",
      imageUrl: "https://hosxp.net/wordpress/wp-content/uploads/2023/05/diagram-pacs110664.png",
      link: "#"
    },
    {
      title: "ความปลอดภัยของข้อมูล (PDPA) ในระบบ ERP สำหรับโรงพยาบาล",
      category: "Security",
      date: "1 ต.ค. 2568",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR046PbhkzVlnjZqKVjn-XtOjNdwSiaPREiUw&s",
      link: "#"
    },
  ], []);

  const ANNOUNCEMENTS = useMemo(() => [
    {
      category: "อัปเดตระบบ",
      title: "ปรับปรุงระบบ ERP เป็นเวอร์ชั่น 2.1 เพิ่มประสิทธิภาพและความเร็ว",
      date: "15 ต.ค. 2568",
      description: "ทีมพัฒนาได้ทำการอัปเดตระบบ ERP ครั้งใหญ่ เพิ่มความเร็วในการประมวลผลรายงานและปรับปรุงหน้าตาของโมดูล HRM ให้ใช้งานง่ายขึ้น ท่านสามารถอ่านรายละเอียดการเปลี่ยนแปลงทั้งหมดได้โดยคลิกที่นี่..."
    },
    {
      category: "ประกาศอบรม",
      title: "อบรมการใช้งาน Dashboard ใหม่ในโมดูล BI สำหรับหัวหน้าแผนก",
      date: "12 ต.ค. 2568",
      description: "ขอเชิญหัวหน้าแผนกทุกท่านเข้าร่วมอบรมการใช้งานระบบรายงานเชิงวิเคราะห์ (BI) ตัวใหม่ ในวันที่ 25 ต.ค. 2568 เวลา 13:00 น. ณ ห้องประชุม IT กรุณาลงทะเบียนภายในวันที่ 20 ต.ค. เพื่อยืนยันสิทธิ์"
    },
    {
      category: "ซ่อมบำรุง",
      title: "แจ้งปิดปรับปรุงระบบ Server ประจำเดือน ตุลาคม 2568",
      date: "10 ต.ค. 2568",
      description: "ทีม IT จะทำการปิดปรับปรุง Server ในคืนวันเสาร์ที่ 18 ต.ค. 2568 เวลา 00:00 - 03:00 น. ซึ่งจะส่งผลให้ไม่สามารถใช้งานระบบได้ชั่วคราว จึงเรียนมาเพื่อโปรดทราบและวางแผนการทำงานล่วงหน้า"
    }
  ], []);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    
    // ใช้ id ในการ map เข้า state (เช่น id 'hospital-name' จะ map เข้า 'hospital')
    const stateKey = id.replace('-name', '').replace('contact-', ''); 

    let processedValue = value; // 1. สร้างตัวแปรมารับค่าเริ่มต้น

    // 2. เพิ่มเงื่อนไขเช็คว่า ID เป็น 'contact-tel' หรือไม่
    if (id === 'contact-tel') {
      // 2.1 ลบทุกอย่างที่ไม่ใช่ตัวเลข (0-9)
      const numericValue = value.replace(/[^0-9]/g, '');
      // 2.2 จำกัดความยาวไม่ให้เกิน 10 ตัวอักษร
      processedValue = numericValue.slice(0, 10);
    }

    // 3. อัปเดต state ด้วยค่าที่ผ่านการกรองแล้ว
    setFormData((prev) => ({
      ...prev,
      [stateKey]: processedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการโหลดหน้าใหม่
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // ล้างฟอร์ม
        setFormData({ hospital: '', email: '', tel: '' });
      } else {
        // ดึง error message จาก API (ถ้ามี)
        const errorData = await response.json();
        console.error('Submission error:', errorData.error);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // *** 3. เพิ่ม Handlers สำหรับ Modal ***
  const openAnnouncementModal = (item) => {
    setSelectedAnnouncement(item);
  };

  const closeAnnouncementModal = () => {
    setSelectedAnnouncement(null);
  };

  // =================================================================
  // Effects & Side Effects
  // =================================================================

  // Image Slider Interval - ใช้ HERO_IMAGES.length เป็น dependency
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % HERO_IMAGES.length);
      }, 4000);
      return () => clearInterval(interval); // Cleanup Function
    }
  }, [isHovered, HERO_IMAGES.length]); 

  // Star Animation Setup
  useEffect(() => {
    const generatedStars = [...Array(80)].map(() => ({
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 8,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setStars(generatedStars);
  }, []); 

  // =================================================================
  // JSX Render
  // =================================================================

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#131e32] to-[#0a111a] text-slate-200 relative overflow-hidden">
      <Navbar modules={MIS_MODULES} />

      <main className="relative z-10">
        {/* พื้นหลังแสงสีขาวตรงกลาง */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/20 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/40 rounded-full blur-[80px]"></div>
        </div>
        
        {/* ส่วนดาวลอย (Floating Stars) */}
        <div 
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50"
          aria-hidden="true"
        >
          {stars.map((star, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-blue-300/80 animate-floatStars"
              style={{
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animationDelay: `-${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            ></span>
          ))}
        </div>
        
        {/* ส่วน Hero Section */}
        <section 
          ref={heroRef}
          className={`pt-32 lg:pt-40 pb-20 transition-opacity duration-700 ease-out transform relative ${
            isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
                  ERP จากใจ...สู่การใช้งานจริง
                  <br className="sm:hidden"/> 
                  <span className="text-sky-400 block sm:inline mt-1 sm:mt-0">โดยทีมพัฒนาระบบ รพร.ด่านซ้าย</span>
                </h1>
                <p className="mt-4 text-sm sm:text-base md:text-xl text-slate-400 font-medium max-w-lg mx-auto lg:mx-0">
                  ระบบบริหารจัดการที่พัฒนาจากความเข้าใจในทุกขั้นตอนการทำงาน เพื่อเชื่อมต่อทุกหน่วยงานของโรงพยาบาล ตั้งแต่การเงิน, บุคลากร, คลังเวชภัณฑ์ สู่การดูแลผู้ป่วยที่เป็นเลิศ
                </p>
                <div className="mt-8 flex gap-3 flex-wrap justify-center lg:justify-start"> 
                  <a href="#modules" className="bg-sky-500 text-white font-bold py-3 px-6 rounded-lg shadow-xl shadow-sky-500/30 hover:bg-sky-600 transition transform hover:scale-105 text-sm sm:text-base">
                    สำรวจโมดูล &rarr;
                  </a>
                  <Link href="/modules" className="border-2 border-slate-600 text-slate-300 py-3 px-6 rounded-lg hover:bg-slate-700/50 hover:text-white transition text-sm sm:text-base">
                    ดูประสิทธิภาพระบบ
                  </Link>
                </div>
              </div>

              <HeroImageSlider 
                HERO_IMAGES={HERO_IMAGES}
                currentImageIndex={currentImageIndex}
                setIsHovered={setIsHovered}
              />
            </div>
          </div>
          
          {/* เส้นแสงด้านล่าง Hero Section */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
            <div className="animated-border-line"></div>
          </div>
        </section>
        
        {/* ส่วน Modules Section */}
        <section id="modules" className="py-20 bg-black/20 backdrop-blur-sm border-t border-b border-white/5 relative">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex justify-between items-end mb-8 border-b border-slate-700/50 pb-4">
              <h3 className="text-3xl font-bold text-white tracking-tight">
                องค์ประกอบหลักของระบบ (Modules)
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-lg p-1 bg-white/10 border border-slate-700">
                  <button 
                    onClick={() => setModuleView('scroll')} 
                    aria-pressed={moduleView === 'scroll'}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${moduleView === 'scroll' ? 'bg-sky-600 text-white shadow' : 'text-slate-300 hover:bg-white/10'}`}
                  >
                    เลื่อน
                  </button>
                  <button 
                    onClick={() => setModuleView('grid')} 
                    aria-pressed={moduleView === 'grid'}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${moduleView === 'grid' ? 'bg-sky-600 text-white shadow' : 'text-slate-300 hover:bg-white/10'}`}
                  >
                    ตาราง
                  </button>
                </div>
                <Link href="/modules" className="text-base font-semibold text-sky-400 hover:text-sky-300 transition-colors hidden sm:block">
                  ดูประสิทธิภาพ &rarr;
                </Link>
              </div>
            </div>

            {moduleView === 'scroll' ? (
              <div className="scroll-container">
                <div className="scroll-content scroll-right-to-left">
                  {[...MIS_MODULES, ...MIS_MODULES].map((m, i) => (
                    <div
                      key={`scroll-${i}-${m.title}`}
                      className="scroll-item group p-4 rounded-xl shadow-lg transition-all duration-300 bg-[#1a293c] border border-slate-700 hover:border-sky-500 flex-shrink-0"
                      style={{ width: '220px' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-sky-400 p-2 bg-sky-500/10 rounded-lg transition-all duration-500 group-hover:bg-sky-500 group-hover:text-white">
                          <m.Icon size={28} strokeWidth={2} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors duration-300">
                            {m.title}
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">{m.desc.split(' ').slice(0, 3).join(' ')}...</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {MIS_MODULES.map((m, i) => (
                  <ModuleCard key={`grid-${i}`} m={m} />
                ))}
              </div>
            )}
          </div>
          
          {/* เส้นแสงด้านล่าง Modules Section */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
            <div className="animated-border-line"></div>
          </div>
        </section>

        {/* ส่วน Personnel & Blog */}
        <section className="py-20 bg-white relative">
          <div className="container mx-auto px-4 max-w-7xl relative z-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                บุคลากรและองค์ความรู้
              </h2>
              <p className="text-lg text-slate-600 mt-2">
                ขับเคลื่อนด้วยทีมงานที่เข้าใจการทำงานจริงและ Case Study ที่เป็นประโยชน์
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              {/* Team Section */}
              <div id="personnel">
                <h3 className="text-xl font-bold border-b-2 border-sky-600 pb-3 mb-6 uppercase tracking-wider text-slate-800">
                  ทีมบริหารและพัฒนาระบบ
                </h3>
                <div className="mb-6 w-full h-48 md:h-60 rounded-xl overflow-hidden shadow-2xl border-4 border-slate-300">
                  <img src="https://png.pngtree.com/thumb_back/fh260/back_our/20190622/ourmid/pngtree-silhouette-of-the-team-s-success-image_215394.jpg" alt="ภาพรวมทีมบุคลากร" className="w-full h-full object-cover opacity-70" />
                </div>
                <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-300 shadow-lg">
                  {PHR_DAN_SAI_PERSONNEL.map((person, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 border border-slate-200 rounded-lg hover:bg-white transition-all duration-300">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center font-bold text-lg text-white shadow-md">
                        {person.iconInitial}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-slate-800 text-base">{person.name}</h4>
                        <p className="text-sm text-sky-600 font-medium">{person.position}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blog Section */}
              <div id="blog">
                <h3 className="text-xl font-bold border-b-2 border-sky-600 pb-3 mb-6 uppercase tracking-wider text-slate-800">
                  บทความและ Case Study
                </h3>
                <div className="mb-6 w-full h-48 md:h-60 rounded-xl overflow-hidden shadow-2xl border-4 border-slate-300">
                  <img src="https://t3.ftcdn.net/jpg/02/76/64/42/360_F_276644254_WLTRw8cuxEqEHx0grR1pzfduxYvu9EfW.jpg" alt="ภาพรวมบทความ ERP" className="w-full h-full object-cover opacity-70" />
                </div>
                <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-300 shadow-lg">
                  {ERP_ARTICLES.map((article, i) => (
                    <Link key={i} href={article.link} className="flex items-start gap-4 p-3 border border-slate-200 rounded-lg hover:bg-white transition-all duration-300 group">
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-slate-300">
                        <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold group-hover:text-sky-600 transition-colors text-slate-800 text-base leading-snug">{article.title}</h4>
                        <p className="text-xs text-slate-600 mt-2">
                          <span className="font-semibold text-sky-600 bg-sky-100 px-2 py-0.5 rounded-full">{article.category}</span>
                          <span className="mx-2">|</span>
                          <span>{article.date}</span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* เส้นแสงด้านล่าง Personnel & Blog Section */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden z-30">
            <div className="animated-border-line"></div>
          </div>
        </section>

        {/* Announcement Section */}
        <section id="announcements" className="py-20 border-t border-white/5 relative">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-white tracking-tight">
              ประกาศและข่าวสารสำคัญ
              </h2>
              <p className="text-lg text-slate-400 mt-4">
              ติดตามข่าวสาร, การอัปเดตเวอร์ชัน, และประกาศสำคัญจากทีมพัฒนาระบบ
              </p>
            </div>

            <div className="space-y-4">
              {/* *** 4. แก้ไขจาก <div> เป็น <button> และเพิ่ม onClick *** */}
              {ANNOUNCEMENTS.map((item, index) => (
                <button
                  key={index}
                  onClick={() => openAnnouncementModal(item)}
                  className="w-full text-left p-5 bg-[#1a293c] rounded-xl border border-slate-700 transition-all duration-300 hover:border-sky-500 hover:shadow-xl shadow-black/50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-700/50 pb-2 mb-3">
                    <span className={`text-xs font-bold py-1 px-3 rounded-full mb-2 sm:mb-0 uppercase tracking-wider
                      ${item.category === 'อัปเดตระบบ' ? 'bg-sky-500/20 text-sky-300' : ''}
                      ${item.category === 'ประกาศอบรม' ? 'bg-green-500/20 text-green-300' : ''}
                      ${item.category === 'ซ่อมบำรุง' ? 'bg-yellow-500/20 text-yellow-300' : ''}
                    `}>
                      {item.category}
                    </span>
                    <p className="text-sm text-slate-400 font-medium">{item.date}</p>
                  </div>
                  <h3 className="text-xl font-bold text-white leading-snug">{item.title}</h3>
                  <p className="text-slate-300 mt-2 text-sm leading-relaxed">{item.description}</p>
                </button>
              ))}
              {/* *** (สิ้นสุดการแก้ไข) *** */}
            </div>
          </div>
          
          {/* เส้นแสงด้านล่าง Announcements Section */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
            <div className="animated-border-line"></div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="signup" className="py-20 bg-black/10 border-t border-white/5 relative">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="bg-[#1a293c] rounded-xl shadow-2xl shadow-black/70 overflow-hidden border border-slate-700">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-r from-[#131e32] to-[#1a293c]">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-sky-500/20 rounded-full">
                        <svg className="w-8 h-8 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      </div>
                      <div>
                        <h2 className="text-3xl font-extrabold leading-tight text-white">ต้องการคำปรึกษา?</h2>
                        <p className="text-slate-400 mt-1">ติดต่อทีมพัฒนาระบบ ERP รพร.ด่านซ้าย</p>
                      </div>
                    </div>
                    <p className="text-slate-300 text-base leading-relaxed border-t border-slate-700/50 pt-6">
                      เราพร้อมแบ่งปันองค์ความรู้และประสบการณ์ในการพัฒนาระบบเพื่อนำไปปรับใช้และต่อยอดสำหรับโรงพยาบาลอื่นๆ
                    </p>
                    <div className="space-y-3 pt-4">
                      {['แลกเปลี่ยนประสบการณ์พัฒนาระบบ', 'ดูงานสาธิตการใช้งานระบบจริง', 'รับคำปรึกษาในการนำไปปรับใช้'].map((text, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-sky-500/20 text-sky-300">
                            <span className="text-sm font-bold">✓</span>
                          </div>
                          <span className="text-sm text-slate-300">{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Form Section */}
                <div className="p-8 lg:p-12">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="hospital-name" className="block text-sm font-semibold text-slate-300 mb-2">
                        ชื่อโรงพยาบาล / หน่วยงาน
                      </label>
                      <input
                        id="hospital-name"
                        name="hospitalName"
                        type="text"
                        placeholder="กรอกชื่อหน่วยงานของคุณ"
                        required
                        className="w-full border border-slate-700 bg-[#203045] p-3 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                        value={formData.hospital}
                        onChange={handleFormChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-300 mb-2">
                          อีเมลผู้ติดต่อ
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="w-full border border-slate-700 bg-[#203045] p-3 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                          value={formData.email}
                          onChange={handleFormChange}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-tel" className="block text-sm font-semibold text-slate-300 mb-2">
                          เบอร์โทรศัพท์
                        </label>
                        <input
                          id="contact-tel"
                          name="tel"
                          type="tel"
                          placeholder="0XX-XXX-XXXX"
                          required
                          className="w-full border border-slate-700 bg-[#203045] p-3 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                          value={formData.tel}
                          onChange={handleFormChange}
                          disabled={isSubmitting}
                          maxLength={10}
                          inputMode="numeric"
                        />
                      </div>
                    </div>

                    {submitStatus === 'success' && (
                      <div className="p-3 rounded-lg text-center text-sm font-medium bg-green-500/10 border border-green-500/30 text-green-400">
                        ส่งข้อมูลสำเร็จ! ทีมงานจะติดต่อกลับโดยเร็วที่สุด
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="p-3 rounded-lg text-center text-sm font-medium bg-red-500/10 border border-red-500/30 text-red-400">
                        เกิดข้อผิดพลาด! กรุณาลองใหม่อีกครั้ง
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-sky-600 to-sky-700 text-white font-bold py-4 rounded-lg shadow-xl shadow-sky-500/30 hover:from-sky-700 hover:to-sky-800 transition-all transform hover:scale-[1.01]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งเรื่องติดต่อทีมพัฒนา →'}
                    </button>
                    <p className="text-xs text-slate-500 text-center pt-4">
                      🔒 ข้อมูลของคุณจะถูกเก็บเป็นความลับและใช้เพื่อการติดต่อกลับเท่านั้น
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* *** 5. เพิ่ม Modal Component ที่นี่ *** */}
      <AnnouncementModal 
        item={selectedAnnouncement} 
        onClose={closeAnnouncementModal} 
      />

      <style jsx global>{`
        /* โค้ดดาวลอย (Floating Stars) */
        @keyframes floatStars {
          0% {
            transform: translateY(100vh) scale(0.3);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-10vh) scale(1);
            opacity: 0;
          }
        }
        .animate-floatStars {
          animation: floatStars linear infinite;
        }
        
        /* Module Scrolling Styles */
        @keyframes scrollRightToLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollLeftToRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .scroll-container {
          overflow: hidden;
          position: relative;
        }
        .scroll-content {
          display: flex;
          gap: 1.5rem;
          width: fit-content;
          padding-bottom: 1.5rem; 
        }
        .scroll-right-to-left {
          animation: scrollRightToLeft 40s linear infinite;
        }
        .scroll-container:hover .scroll-content {
          animation-play-state: paused;
        }

        /* เส้นแสงเคลื่อนไหว (Animated Border Lines) */
        @keyframes borderLightMove {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        .animated-border-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 30%,
            rgba(255, 255, 255, 0.1) 40%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.1) 60%,
            transparent 70%,
            transparent 100%
          );
          animation: borderLightMove 3s ease-in-out infinite;
        }

        /* Variant สำหรับเส้นแสงที่มีความเร็วต่างกัน */
        section:nth-child(2) .animated-border-line {
          animation-delay: 0s;
          animation-duration: 3s;
        }
        
        section:nth-child(3) .animated-border-line {
          animation-delay: 0.5s;
          animation-duration: 3.5s;
        }
        
        section:nth-child(4) .animated-border-line {
          animation-delay: 1s;
          animation-duration: 4s;
        }
        
        section:nth-child(5) .animated-border-line {
          animation-delay: 1.5s;
          animation-duration: 3.2s;
        }
        
        section:nth-child(6) .animated-border-line {
          animation-delay: 2s;
          animation-duration: 3.8s;
        }
      `}</style>
    </div>
  );
}
