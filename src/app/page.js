'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { ArrowRight, Users, DatabaseZap, Smartphone, ShieldCheck, Headphones, BarChart3 } from 'lucide-react';
// สมมติว่าไฟล์นี้มี Icon ที่ใช้จาก library เช่น Tabler Icons, Lucide
import { MIS_MODULES } from '../data/modules';
import { announcements } from '../data/announcementsData';
// =================================================================
// Custom Hook: สำหรับการตรวจจับการ Fade on Scroll
// =================================================================

export function useIsVisible(threshold = 0) {
  const ref = useRef(null);
  // 1. ค่าเริ่มต้นยังคงเป็น false (ถูกต้อง)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // ⭐ 2. แก้ไข:
        // ตั้งค่า state ตามการมองเห็นจริง (true เมื่อเข้า, false เมื่อออก)
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: threshold,
        // rootMargin ที่คุณตั้งไว้ (-100px) เหมาะสมดีแล้วครับ
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        // 3. (unobserve จะทำงานเฉพาะตอน component ถูกทำลายเท่านั้น)
        observer.unobserve(currentRef);
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
// Component สำหรับ Feature Card (พื้นหลังขาว)

// Component สำหรับ Feature Card (พื้นหลังขาว)
const FeatureCard = ({ icon: Icon, title, description, highlight = false }) => (
  <div 
    className={`flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 bg-white group
                ${highlight 
                  ? 'border-2 border-sky-500 shadow-sky-500/30 shadow-xl' // ไฮไลท์
                  // [แก้ไข] เพิ่ม hover:scale, hover:border-sky-500 และ hover:shadow-sky-500/30
                  : 'border border-slate-200 shadow-lg hover:scale-[1.02] hover:border-sky-500 hover:shadow-xl hover:shadow-sky-500/30' 
                }`}
  >
    {/* [แก้ไข] เพิ่ม group-hover:scale-110 */}
    <Icon className="w-12 h-12 text-sky-600 mb-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
    
    {/* [แก้ไข] เพิ่ม group-hover:text-sky-600 */}
    <h4 className="text-base font-bold text-slate-800 mb-2 uppercase tracking-wider transition-colors duration-300 group-hover:text-sky-600">{title}</h4>
    
    <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const ModuleCard = ({ m }) => (
  <Link
    href={`/modules?module=${m.id}`}
    className="group relative block rounded-xl bg-slate-900 p-4
              shadow-lg shadow-black/30
              transition-all duration-300 ease-out
              overflow-hidden
              hover:scale-[1.02]
              hover:shadow-[0_0_20px_rgba(14,165,233,0.35)]" /* glow รอบบล็อค */
  >

    {/* ===== Gradient Overlay ===== */}
    <div
      className="absolute inset-0 rounded-xl
                  bg-gradient-to-r from-sky-600/20 to-blue-700/30
                  opacity-0 transition-opacity duration-300 ease-out
                  group-hover:opacity-100"
    />

    {/* ===== เนื้อหาหลัก ===== */}
    <div className="relative z-10 flex items-center justify-between gap-4">

      {/* ===== ไอคอน + Title/Description ===== */}
      <div className="flex items-center gap-4">
        {/* ===== ไอคอน ===== */}
        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg
                          bg-gradient-to-br from-sky-500 to-blue-600
                          text-white shadow-lg shadow-blue-500/40
                          transition-all duration-300
                          group-hover:scale-110 group-hover:rotate-6
                          group-hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]">
          <m.Icon size={24} strokeWidth={1.5}
            className="transition-all duration-300 ease-out
                          group-hover:scale-110 group-hover:rotate-6
                          group-hover:drop-shadow-[0_0_8px_rgba(14,165,233,0.7)]" />
        </div>

        {/* ===== Title / Description ===== */}
        <div>
          <h4 className="text-base font-semibold text-white
                          group-hover:text-sky-400 transition-all duration-300 ease-out
                          drop-shadow-[0_0_8px_rgba(14,165,233,0.7)]"> {/* glow รอบตัวอักษร */}
            {m.title}
          </h4>
          <p className="text-xs text-[#94a3b8] mt-0.5 leading-snug line-clamp-2
                          group-hover:text-[#f0f9ff] transition-all duration-300 ease-out
                          group-hover:drop-shadow-[0_0_6px_rgba(14,165,233,0.5)]">
            {m.desc}
          </p>
        </div>
      </div>

      {/* ===== ลูกศร ===== */}
      <div className="flex-shrink-0 text-sky-400 opacity-0 -translate-x-2
                          transition-all duration-300 ease-out
                          group-hover:opacity-100 group-hover:translate-x-0">
        <ArrowRight size={20} strokeWidth={2} />
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
      <div className="relative w-full h-full bg-[#1a293c] rounded-3xl shadow-2xl shadow-black/70 overflow-hidden transform transition-all duration-500 group-hover:scale-[1.03]">        {HERO_IMAGES.map((imageUrl, index) => (
         <img
            key={imageUrl}
            src={imageUrl}
            alt={`ERP Solution Illustration ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover
              transition-opacity duration-1000 ease-in-out
              transition-transform duration-[7000ms] ease-in-out
              ${
                index === currentImageIndex
                  ? 'opacity-100 z-20 scale-110 -rotate-1' // ◄◄◄ เมื่อแสดง: ให้ซูมเข้าและหมุนซ้าย 1 องศา
                  : 'opacity-0 z-10 scale-100 rotate-0'   // ◄◄◄ เมื่อซ่อน: ให้กลับไปขนาดปกติ
              }`}
          />
        ))}
      </div>
    </div>
  </div>
);

// Component Modal สำหรับประกาศข่าวสาร
const AnnouncementModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div
      // *** แก้ไข: ลดความเข้ม Black และคง Backdrop-blur ***
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        // *** แก้ไข: เพิ่ม max-h และ overflow-y-auto ***
        className="relative w-full max-w-2xl bg-[#1a293c] rounded-xl shadow-2xl border border-slate-700 transition-all duration-300 scale-95 opacity-0 animate-fadeIn max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
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
          <div className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
          {item.content}
        </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

// Component Modal สำหรับบทความ
const ArticleModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div
      // *** แก้ไข: ลดความเข้ม Black และคง Backdrop-blur ***
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        // *** แก้ไข: เพิ่ม max-h และ overflow-y-auto ***
        className="relative w-full max-w-2xl bg-[#1a293c] rounded-xl shadow-2xl border border-slate-700 transition-all duration-300 scale-95 opacity-0 animate-fadeIn max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <img src={item.imageUrl} alt={item.title} className="w-full h-48 md:h-60 object-cover" />

        <div className="p-6 md:p-8">
          <p className="text-xs text-slate-400 mb-3">
            <span className="font-semibold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">{item.category}</span>
            <span className="mx-2">|</span>
            <span>{item.date}</span>
          </p>
          <p className="text-slate-300 text-base leading-relaxed">
            นี่คือเนื้อหาฉบับเต็มสำหรับบทความ {item.title}.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
            Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus
            rhoncus ut eleifend nibh porttitor.
          </p>
           <p className="text-slate-300 text-base leading-relaxed mt-4">
            (เนื้อหาสมมติ) ... Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis
            nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};


export default function Home() {
  // =================================================================
  // Data Definition & State
  // =================================================================
  const [stars, setStars] = useState([]);
  const [moduleView, setModuleView] = useState('grid');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [contactRef, isContactVisible] = useIsVisible(0.3);
  const [formData, setFormData] = useState({
    hospital: '',
    email: '',
    tel: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [heroRef, isHeroVisible] = useIsVisible(0.1);
  const [announcementRef, isAnnouncementVisible] = useIsVisible(0.2);
  const [personnelRef, isPersonnelVisible] = useIsVisible(0.2);
  const [modulesRef, isModulesVisible] = useIsVisible(0.2);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const HERO_IMAGES = useMemo(() => [
    "https://levinci.group/wp-content/uploads/2024/04/why-should-business-use-ERP-1024x611.jpg",
    "https://tigersoft.co.th/wp-content/uploads/2023/08/blog21.jpg",
    "https://mayade.co.th/wp-content/uploads/2022/06/SeekPng.com_dmk-logo-png_8986300.png"
  ], []);

const ERP_FEATURES = useMemo(() => [
    { 
      icon: Users, 
      title: "พัฒนาโดยผู้ใช้จริง", 
      description: "ออกแบบจากความต้องการและปัญหาหน้างานจริงของบุคลากร รพร.ด่านซ้าย",
      highlight: false // ◄◄◄ แก้ไขบรรทัดนี้
    },
    { 
      icon: DatabaseZap, 
      title: "เชื่อมต่อ HOSxP", 
      description: "เชื่อมโยงข้อมูลสำคัญจากระบบ HOSxP ลดการทำงานซ้ำซ้อน"
    },
    { 
      icon: Smartphone, 
      title: "Responsive Design", 
      description: "ใช้งานได้บนทุกอุปกรณ์ ทั้ง PC, Tablet และ Smartphone"
    },
    { 
      icon: ShieldCheck, 
      title: "ปลอดภัย (PDPA)", 
      description: "บริหารจัดการข้อมูลตามมาตรฐาน PDPA พร้อมระบบกำหนดสิทธิ์การเข้าถึง"
    },
    { 
      icon: Headphones, 
      title: "ทีมงานสนับสนุน", 
      description: "มีทีมพัฒนา IT คอยให้คำปรึกษาและแก้ไขปัญหาอย่างรวดเร็ว"
    },
    { 
      icon: BarChart3, 
      title: "วิเคราะห์ข้อมูล (BI)", 
      description: "มาพร้อม Dashboard วิเคราะห์ข้อมูล สรุปผลและตรวจสอบตัวชี้วัด"
    },
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

  const LATEST_ANNOUNCEMENTS = announcements.slice(0, 3);

  // ... ในฟังก์ชัน Home()
  const handleFormChange = (e) => {
      const { id, value } = e.target;
      const stateKey = id.replace('-name', '').replace('contact-', '');
      let processedValue = value;
      if (id === 'contact-tel') {
          const numericValue = value.replace(/[^0-9]/g, '');
          processedValue = numericValue.slice(0, 10);
      } else if (id === 'contact-message') { // ⭐ จัดการ state สำหรับกล่องข้อความ
          processedValue = value;
      }
      setFormData((prev) => ({
          ...prev,
          [stateKey.includes('hospital') ? 'hospital' : stateKey.includes('email') ? 'email' : stateKey.includes('tel') ? 'tel' : 'message']: processedValue
      }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ hospital: '', email: '', tel: '', message: '' });
      } else {
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

  // Handlers สำหรับ Announcement Modal
  const openAnnouncementModal = (item) => {
    setSelectedAnnouncement(item);
  };
  const closeAnnouncementModal = () => {
    setSelectedAnnouncement(null);
  };

  // Handlers สำหรับ Article Modal
  const openArticleModal = (item) => {
    setSelectedArticle(item);
  };
  const closeArticleModal = () => {
    setSelectedArticle(null);
  };

  // =================================================================
  // Effects & Side Effects
  // =================================================================
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % HERO_IMAGES.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, HERO_IMAGES.length]);

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

  // *** เพิ่ม Effect: ล็อคการ Scroll ของ Body เมื่อ Modal เปิด ***
  useEffect(() => {
    if (selectedAnnouncement || selectedArticle) {
      // เมื่อ Modal ใดๆ เปิด
      document.body.style.overflow = 'hidden';
    } else {
      // เมื่อ Modal ทั้งหมดปิด
      document.body.style.overflow = 'auto';
    }

    // Cleanup function เพื่อคืนค่า scroll เมื่อ component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedAnnouncement, selectedArticle]); // ทำงานเมื่อ state สองตัวนี้เปลี่ยน


  // =================================================================
  // JSX Render
  // =================================================================
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#131e32] to-[#0a111a] text-slate-200 relative overflow-hidden bg-[length:200%_200%] animate-gradient-shift">
      <Navbar modules={MIS_MODULES} />

      <main className="relative z-10">
        {/* ... (โค้ดส่วนพื้นหลังแสงและดาวลอย) ... */}
         <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/20 rounded-full blur-[120px]"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[100px]"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/40 rounded-full blur-[80px]"></div>
         </div>
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

        {/* ... (โค้ด Hero Section) ... */}
        <section
          ref={heroRef}
          className={`pt-32 lg:pt-40 pb-20 transition-opacity duration-700 ease-out transform relative ${
            isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="text-center lg:text-left">

                {/* H1: สีขาว (เหมือนในรูป) */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
                  ERP จากใจ...สู่การใช้งานจริง
                </h1>

                {/* [แก้ไข 1] H2: เปลี่ยนเป็นสีเทาอ่อน (text-slate-300) ให้เหมือนในรูป */}
                <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold text-slate-300">
                  โดยทีมพัฒนาระบบ รพร.ด่านซ้าย
                </h2>

                {/* [แก้ไข 2] P: เปลี่ยนเป็นสีเทาที่เข้มขึ้น (text-slate-400) ให้เหมือนในรูป */}
                <p className="mt-4 text-sm sm:text-base md:text-xl text-slate-400 font-medium max-w-lg mx-auto lg:mx-0">
                  ระบบบริหารจัดการที่พัฒนาจากความเข้าใจในทุกขั้นตอนการทำงาน เพื่อเชื่อมต่อทุกหน่วยงานของโรงพยาบาล ตั้งแต่การเงิน, บุคลากร, คลังเวชภัณฑ์ สู่การดูแลผู้ป่วยที่เป็นเลิศ
                </p>

                <div className="mt-8 flex gap-3 flex-wrap justify-center lg:justify-start">
                  {/* Button 1: สีฟ้า (เหมือนในรูป) */}
                  <a href="#modules" className="bg-sky-500 text-white font-bold py-3 px-6 rounded-lg shadow-xl shadow-sky-500/30 hover:bg-sky-600 transition transform hover:scale-105 text-sm sm:text-base">
                    สำรวจโมดูล &rarr;
                  </a>

                  {/* [แก้ไข 3] Button 2: เปลี่ยนเป็นปุ่มสีเทาทึบ (bg-slate-800) ให้เหมือนในรูป */}
                  <Link
                    href="/modules"
                    className="bg-slate-800 text-slate-300 font-medium py-3 px-6 rounded-lg
                                   hover:bg-slate-700 hover:text-white transition text-sm sm:text-base"
                  >
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
          <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
            <div className="animated-border-line"></div>
          </div>
        </section>

        {/* ... (โค้ด Modules Section) ... */}
        <section id="modules" ref={modulesRef} className="py-20 bg-black/20 backdrop-blur-sm border-t border-b border-white/5 relative">
          <div className="container mx-auto px-4 max-w-7xl">
            <div
  className={`flex flex-col sm:flex-row justify-between items-end mb-8 border-b border-slate-700/50 pb-4
          transition-all duration-700 ease-out
          ${isModulesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
>
  {/* ===== Title + จำนวนโมดูล ===== */}
  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
    <h4 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
      องค์ประกอบหลักของระบบ (Modules)
    </h4>
    <span className="text-sm text-sky-400 font-medium bg-sky-600/10 px-2 py-0.5 rounded-lg shadow-sm">
      {MIS_MODULES.length} โมดูล
    </span>
  </div>

  {/* ===== View Switch + Link ===== */}
  <div className="flex items-center gap-4 mt-3 sm:mt-0">
    <div className="flex items-center gap-2 rounded-lg p-1 bg-white/10 border border-slate-700">
      <button
        onClick={() => setModuleView('scroll')}
        aria-pressed={moduleView === 'scroll'}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          moduleView === 'scroll'
            ? 'bg-sky-600 text-white shadow-lg'
            : 'text-slate-300 hover:bg-white/10'
        }`}
      >
        เลื่อน
      </button>
      <button
        onClick={() => setModuleView('grid')}
        aria-pressed={moduleView === 'grid'}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          moduleView === 'grid'
            ? 'bg-sky-600 text-white shadow-lg'
            : 'text-slate-300 hover:bg-white/10'
        }`}
      >
        ตาราง
      </button>
    </div>

    <Link
      href="/modules"
      className="text-base font-semibold text-sky-400 hover:text-sky-300 transition-colors hidden sm:block drop-shadow-sm"
    >
      ดูประสิทธิภาพ &rarr;
    </Link>
  </div>
</div>


           {moduleView === 'scroll' ? (
             <div className={`scroll-container transition-all duration-700 ease-out delay-200
               ${isModulesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
             `}>
                <div className="scroll-content scroll-right-to-left">
                 {[...MIS_MODULES, ...MIS_MODULES].map((m, i) => (
                   <Link
                     key={`scroll-${i}-${m.title}`}
                     href={`/modules?module=${m.id}`}
                     className="scroll-item group"
                     style={{ width: '240px' }}   // ⭐ กว้างขึ้นเล็กน้อยรองรับ 2 บรรทัด
                   >
                     <div className="scroll-item-inner">
                       <div className="scroll-icon">
                         <m.Icon size={24} strokeWidth={1.5} />
                       </div>

                       <div className="scroll-text">
                         <h4>{m.title}</h4>
                         <p>{m.desc}</p>
                       </div>
                     </div>
                   </Link>
                 ))}
                </div>
               </div>
           ) : (
             //ตารางโมดูล
             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mt-8">
               {MIS_MODULES.map((m, i) => (
                 <ModuleCard key={`grid-${i}`} m={m} />
               ))}
             </div>
           )}
           </div>

           <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
             <div className="animated-border-line"></div>
           </div>
        </section>

        {/* *** แก้ไข: Personnel & Blog Section (พื้นหลังสีขาว) *** */}
        {/* *** แก้ไข: Section คุณสมบัติเด่น (Features) (พื้นหลังสีขาว) *** */}
    <section id="features" ref={personnelRef} className="py-20 bg-white relative">
      <div className="container mx-auto px-4 max-w-7xl relative z-20">
        
        {/* [แก้ไข 1] เปลี่ยน Title ของ Section */}
       <div className={`text-center mb-16 transition-all duration-700 ease-out
          ${isPersonnelVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          {/* [แก้ไข 1] เปลี่ยน H2 ให้นำเสนอข้อมูลมากขึ้น */}
          <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">
            จุดเด่นของระบบ (System Highlights)
          </h2>
          {/* [แก้ไข 2] เปลี่ยน P (คำอธิบาย) */}
          <p className="text-lg text-slate-600 mt-2">
            ภาพรวมฟังก์ชันที่ออกแบบมาเพื่อการทำงานในโรงพยาบาล
          </p>
        </div>

        {/* [แก้ไข 2] เปลี่ยนจาก 2-column เป็น 3x2 Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ease-out delay-200
          ${isPersonnelVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          
          {/* วนลูปข้อมูล Feature ที่เราสร้างขึ้นใหม่ */}
          {ERP_FEATURES.map((feature, i) => (
            <FeatureCard 
              key={i}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              highlight={feature.highlight}
            />
          ))}
        </div>

      </div>
    </section>
    {/* *** (สิ้นสุดการแก้ไข Section) *** */}
        {/* *** (สิ้นสุดการแก้ไข Section) *** */}


        {/* Announcement Section */}
     {/* Announcement Section */}
      <section id="announcements"
        ref={announcementRef} className="py-20 bg-black/10 backdrop-blur-sm border-t border-white/5 relative">
  <div className="container mx-auto px-4 max-w-7xl"> {/* [แก้ไข] เปลี่ยน max-w-4xl เป็น max-w-7xl ให้กว้างเท่า section อื่น */}
    {/* ... (โค้ดส่วน Title - เหมือนเดิม) ... */}
    <div className={`text-center mb-16 transition-all duration-700 ease-out
      ${isAnnouncementVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
    `}>
      <h2 className="text-4xl font-extrabold text-white tracking-tight">
      ประกาศและข่าวสารสำคัญ
      </h2>
      <p className="text-lg text-slate-400 mt-4">
      ติดตามข่าวสาร, การอัปเดตเวอร์ชัน, และประกาศสำคัญจากทีมพัฒนาระบบ
      </p>
    </div>

    {/* [แก้ไข] เปลี่ยนจาก space-y-4 เป็น grid 3 คอลัมน์ */}
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 ease-out delay-200
      ${isAnnouncementVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
    `}>
      
      {LATEST_ANNOUNCEMENTS.map((item) => (
        <button
          key={item.id} 
          onClick={() => openAnnouncementModal(item)}
          // [แก้ไข] เพิ่ม h-full และ flex flex-col เพื่อให้การ์ดสูงเท่ากัน
          className="w-full h-full text-left p-5 bg-[#1a293c] rounded-xl border border-slate-700 transition-all duration-300 hover:border-sky-500 hover:shadow-xl shadow-black/50 flex flex-col"
        >
          {/* ส่วน Header (Category/Date) - คงเดิม */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-700/50 pb-2 mb-3">
            
            <span className={`text-xs font-bold py-1 px-3 rounded-full mb-2 sm:mb-0 uppercase tracking-wider
              ${item.category === 'ระบบ' ? 'bg-sky-500/20 text-sky-300' : ''}
              ${item.category === 'บำรุงรักษา' ? 'bg-yellow-500/20 text-yellow-300' : ''}
              ${item.category === 'ความปลอดภัย' ? 'bg-pink-500/20 text-pink-300' : ''}
              ${item.category === 'ฟีเจอร์' ? 'bg-indigo-500/20 text-indigo-300' : ''}
              ${item.category === 'การฝึกอบรม' ? 'bg-green-500/20 text-green-300' : ''}
            `}>
              {item.category}
            </span>
            
            <p className="text-sm text-slate-400 font-medium">
              {new Date(item.date).toLocaleDateString('th-TH', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
          </div>
          
          {/* [แก้ไข] เพิ่ม div ครอบ h3 และ p เพื่อจัดการ flex-grow */}
          <div className="flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-white leading-snug">{item.title}</h3>
            
            {/* [แก้ไข] เพิ่ม flex-grow เพื่อให้ p ยืดเต็มพื้นที่ที่เหลือ */}
            <p className="text-slate-300 mt-2 text-sm leading-relaxed flex-grow">{item.excerpt}</p>
          </div>
        </button>
      ))}
    </div>

    {/* ส่วนปุ่ม "ดูข่าวสารทั้งหมด" (ถูกต้องแล้ว) */}
    <div className={`mt-12 text-center transition-all duration-700 ease-out delay-300
      ${isAnnouncementVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
    `}>
      <Link
        href="/announcements"
        className="inline-block px-8 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 font-medium
                  transition-all duration-300 hover:bg-slate-700 hover:border-sky-500 hover:text-white"
      >
        ดูข่าวสารและประกาศทั้งหมด
      </Link>
    </div>

  </div>
  <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
    <div className="animated-border-line"></div>
  </div>
</section>

        {/* ... (โค้ด Contact Section) ... */}
        <section id="signup" className="py-20 bg-black/10 border-t border-white/5 relative overflow-hidden"> {/* ⭐ เพิ่ม overflow-hidden เพื่อซ่อนตอนสไลด์ */}
          <div className="container mx-auto px-4 max-w-7xl">

            {/* ⭐ 1. เพิ่ม ref={contactRef} ที่นี่ */}
            <div
              ref={contactRef}
              className="bg-[#1a293c] rounded-xl shadow-2xl shadow-black/70 overflow-hidden border border-slate-700"
            >
              <div className="grid lg:grid-cols-2 gap-0">

                {/* ⭐ 2. ฝั่งซ้าย: เพิ่มคลาส Transition */}
                <div className={`p-8 lg:p-12 flex flex-col justify-start bg-gradient-to-r from-[#131e32] to-[#1a293c]
                  transition-all duration-700 ease-out
                  ${isContactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}
                `}>
                  <div className="space-y-6">
                    {/* (เนื้อหาฝั่งซ้าย: ต้องการคำปรึกษา?) */}
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

                {/* ⭐ 3. ฝั่งขวา: เพิ่มคลาส Transition (และ delay) */}
                <div className={`p-8 lg:p-12 bg-white
                  transition-all duration-700 ease-out delay-200
                  ${isContactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}
                `}>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* (เนื้อหาฟอร์มฝั่งขวา) */}
                    <div>
                      <label htmlFor="hospital-name" className="block text-sm font-semibold text-slate-800 mb-2">
                        ชื่อโรงพยาบาล / หน่วยงาน
                      </label>
                      <input
                        id="hospital-name"
                        name="hospitalName"
                        type="text"
                        placeholder="กรอกชื่อหน่วยงานของคุณ"
                        required
                        className="w-full border border-slate-300 bg-slate-100 p-3 rounded-lg text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                        value={formData.hospital}
                        onChange={handleFormChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-800 mb-2">
                          อีเมลผู้ติดต่อ
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="w-full border border-slate-300 bg-slate-100 p-3 rounded-lg text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                          value={formData.email}
                          onChange={handleFormChange}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-tel" className="block text-sm font-semibold text-slate-800 mb-2">
                          เบอร์โทรศัพท์
                        </label>
                        <input
                          id="contact-tel"
                          name="tel"
                          type="tel"
                          placeholder="0XX-XXX-XXXX"
                          required
                          className="w-full border border-slate-300 bg-slate-100 p-3 rounded-lg text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                          value={formData.tel}
                          onChange={handleFormChange}
                          disabled={isSubmitting}
                          maxLength={10}
                          inputMode="numeric"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-800 mb-2">
                        รายละเอียดที่ต้องการปรึกษา (ด้วยความจริงใจ)
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows="4"
                        placeholder="เช่น สนใจแลกเปลี่ยนประสบการณ์โมดูลคลังยา, ต้องการทราบข้อมูลด้านการเชื่อมต่อ HOSxP, หรือข้อสงสัยอื่นๆ..."
                        required
                        className="w-full border border-slate-300 bg-slate-100 p-3 rounded-lg text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                        value={formData.message}
                        onChange={handleFormChange}
                        disabled={isSubmitting}
                      ></textarea>
                    </div>

                    {submitStatus === 'success' && (
                      <div className="p-3 rounded-lg text-center text-sm font-medium bg-green-500/10 border border-green-500/30 text-green-700">
                        ส่งข้อมูลสำเร็จ! ทีมงานจะติดต่อกลับโดยเร็วที่สุด
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="p-3 rounded-lg text-center text-sm font-medium bg-red-500/10 border border-red-500/30 text-red-700">
                        เกิดข้อผิดพลาด! กรุณาลองใหม่อีกครั้ง
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-sky-600 text-white font-bold py-4 rounded-lg shadow-xl shadow-sky-500/30 hover:bg-sky-700 transition-all transform hover:scale-[1.01]"
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

      {/* *** 5. เพิ่ม Modal Components ที่นี่ *** */}
      <AnnouncementModal
        item={selectedAnnouncement}
        onClose={closeAnnouncementModal}
      />

      <ArticleModal
        item={selectedArticle}
        onClose={closeArticleModal}
      />

      <style jsx global>{`
  /* === Floating Stars Animation === */
  @keyframes floatStars {
    0%   { transform: translateY(100vh) scale(0.3); opacity: 0; }
    50%  { opacity: 1; }
    100% { transform: translateY(-10vh) scale(1); opacity: 0; }
  }
  .animate-floatStars {
    animation: floatStars linear infinite;
  }

  /* === Scroll Animations === */
  @keyframes scrollRightToLeft {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes scrollLeftToRight {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }

  /* === Scroll Container === */
  .scroll-container {
    overflow: hidden;
    position: relative;
  }

  .scroll-content {
    display: flex;
    gap: 20px;
    padding: 10px 0;
    width: max-content;
    animation: scrollRightToLeft 40s linear infinite;
  }

  .scroll-container:hover .scroll-content {
    animation-play-state: paused;
  }


  /* ==================================================
     SCROLL ITEM (แบบตาราง)
  ================================================== */
  .scroll-item {
     background: #0f172a;       /* เปลี่ยนเป็นสีพื้นหลังใหม่ */

     border-radius: 14px;
     padding: 0;
     cursor: pointer;
     flex-shrink: 0;
     transition: all 0.35s ease;
     box-shadow: 0 8px 20px rgba(0,0,0,0.25);
  }

  .scroll-item:hover {
     transform: translateY(-3px) scale(1.015);
     box-shadow: 0 12px 28px rgba(14,165,233,0.25);
  }


  /* === Scroll Inner Layout === */
  .scroll-item-inner {
    display: flex;
    gap: 14px;
    align-items: center;
    padding: 18px;
  }

  /* === Icon Box แบบตาราง === */
  .scroll-icon {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    background: linear-gradient(135deg, #0ea5e9, #2563eb);
    color: white;
    transition: all 0.3s ease;
    box-shadow: 0 6px 16px rgba(14,165,233,0.25);
  }

  .scroll-item:hover .scroll-icon {
    transform: scale(1.12) rotate(4deg);
    box-shadow: 0 10px 20px rgba(14,165,233,0.35);
  }

  /* === Text === */
  /* === Heading === */
.scroll-text h4 {
    margin: 0;
    font-weight: 800;             /* หนักขึ้น */
    font-size: 1rem;              /* ใหญ่ขึ้นเล็กน้อย */
    color: #e0e7ff;               /* สีอ่อนแต่เข้มกว่าขาว */
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);  /* เอฟเฟกต์เงา */
    transition: all 0.3s ease;    /* ทำให้ hover นุ่มขึ้น */
}

.scroll-item:hover h4 {
    color: #0ea5e9;               /* เปลี่ยนเป็นฟ้าเข้มเวลาชี้เมาส์ */
    text-shadow: 0 2px 6px rgba(14,165,233,0.5); /* เงาชัดขึ้น */
    transform: translateY(-2px) scale(1.03);    /* ขยับเล็กน้อยเวลาชี้ */
}

/* === Paragraph === */
.scroll-text p {
    margin: 3px 0 0;
    font-size: 0.8rem;            /* เพิ่มขนาดเล็กน้อย */
    color: #cbd5e1;               /* สีเทาเข้มขึ้น */
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;         /* แสดง 2 บรรทัด */
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.3s, transform 0.3s;
}

.scroll-item:hover p {
    color: #f0f9ff;               /* สว่างขึ้นเวลาชี้ */
    transform: translateY(-1px);    /* เล็กน้อย animation */
}


  /* ==================================================
     Animated Light Border (เส้นไฟรอบกรอบ)
  ================================================== */
  @keyframes borderLightMove {
    0%   { transform: translateX(-100%); opacity: 0; }
    20%  { opacity: 1; }
    80%  { opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
  }

  .animated-border-line {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;

    background: linear-gradient(
      90deg,
      transparent 0%,
      transparent 30%,
      rgba(255,255,255,0.1) 40%,
      rgba(255,255,255,0.3) 50%,
      rgba(255,255,255,0.1) 60%,
      transparent 70%,
      transparent 100%
    );
    animation: borderLightMove 3s ease-in-out infinite;
  }

  section:nth-child(2) .animated-border-line { animation-delay: 0s; animation-duration: 3s; }
  section:nth-child(3) .animated-border-line { animation-delay: 0.5s; animation-duration: 3.5s; }
  section:nth-child(5) .animated-border-line { animation-delay: 1.5s; animation-duration: 3.2s; }
  section:nth-child(6) .animated-border-line { animation-delay: 2s; animation-duration: 3.8s; }

`}</style>

    </div>
  );
}