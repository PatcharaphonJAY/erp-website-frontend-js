'use client';

import React, { useEffect, useState } from 'react';
// สมมติว่า Navbar component ถูกสร้างไว้แล้วใน path นี้
import Navbar from '../components/Navbar'; 

export default function Home() {
  const [stars, setStars] = useState([]);
  
  // *** การตั้งค่าสีและข้อมูล (Variables ถูกย้ายมาที่นี่) ***
  const ACCENT_COLOR_CLASS = 'text-gray-900'; 
  const ACCENT_COLOR_TITLE = 'text-sky-600'; 
  const BUTTON_BG_CLASS = 'bg-sky-600';
  
  const GRADIENT_FROM = 'rgba(14, 165, 233, 0.2)'; 
  const GRADIENT_TO = 'rgba(2, 132, 199, 0.0)'; 

  const SYSTEM_LOGO_URL = "https://via.placeholder.com/200x200?text=KNOWLEDGE+HUB"; 
  const INTERCONNECTION_DIAGRAM_URL = "https://via.placeholder.co/400x550?text=System+Interconnection+Diagram";

  const PHR_DAN_SAI_PERSONNEL = [
    { name: "นายแพทย์สมศักดิ์ รักษาดี", position: "ผู้อำนวยการโรงพยาบาล", iconInitial: "MD", description: "บริหารวิสัยทัศน์กว้างไกล นำพาองค์กรสู่การพัฒนาด้านสาธารณสุขอย่างยั่งยืน" },
    { name: "พยาบาลวิชาชีพพรทิพย์ สุขสบาย", position: "หัวหน้าพยาบาล", iconInitial: "RN", description: "ดูแลและส่งเสริมคุณภาพการพยาบาล เป็นหัวใจสำคัญในการดูแลผู้ป่วย" },
    { name: "เภสัชกรหญิงอรุณี มีคุณธรรม", position: "หัวหน้าฝ่ายเภสัชกรรม", iconInitial: "PH", description: "ควบคุมการจัดหาและจ่ายยาคุณภาพ เพื่อให้ผู้ป่วยได้รับการรักษาที่เหมาะสมและปลอดภัย" },
    { name: "เจ้าหน้าที่สมชาย พัฒนาการ", position: "หัวหน้าฝ่ายไอที", iconInitial: "IT", description: "ดูแลระบบ MIS 4.0 และการเชื่อมต่อ HOSxP ให้ทำงานได้อย่างราบรื่น 24 ชั่วโมง" },
  ];

  // *** Modules Data: ใช้ Outline-like Emojis ที่ Clean และเป็นสากล ***
  const MIS_MODULES = [
    // แถวที่ 1
    { title: 'การเงิน & บัญชี (FIN)', desc: 'บริหารงบประมาณ การเบิกจ่าย และระบบสินไหมอัตโนมัติ', iconChar: '💳' }, // Credit Card (Finance/Billing)
    { title: 'ทรัพยากรบุคคล (HRM)', desc: 'บริหารจัดการข้อมูลบุคลากร เงินเดือน และการบริหารเวร', iconChar: '👤' }, // Single User (User Management)
    { title: 'คลังเวชภัณฑ์ (INV)', desc: 'ควบคุมสต็อกคลังเวชภัณฑ์ การรับเข้า-เบิกออก', iconChar: '📦' }, // Package/Box (Inventory)
    
    // แถวที่ 2
    { title: 'บริหารคุณภาพ (QM) & RM', desc: 'บริหารความเสี่ยง และติดตามตัวชี้วัดคุณภาพบริการ', iconChar: '🗊' }, // Outline Check Mark Box (Quality/Form)
    { title: 'เวชระเบียน (HIS/EHR)', desc: 'เชื่อมต่อ HOSxP และจัดการเอกสารผู้ป่วยดิจิทัล', iconChar: '📃' }, // Page/Document Outline
    { title: 'การจัดซื้อจัดจ้าง (PROC)', desc: 'วางแผนจัดซื้อ ติดตามการเบิกจ่าย และควบคุมต้นทุน', iconChar: '🛒' }, // Shopping Cart (Procurement)
    
    // แถวที่ 3
    { title: 'ระบบบำรุงรักษา (PM)', desc: 'วางแผนและติดตามการบำรุงรักษาอุปกรณ์และเครื่องมือแพทย์', iconChar: '⚙️' }, // Gear/Settings (Maintenance)
    { title: 'การตลาด & ประชาสัมพันธ์', desc: 'บริหารจัดการแคมเปญส่งเสริมสุขภาพและการสื่อสารองค์กร', iconChar: '🗣️' }, // Speaking Head (Communication)
    { title: 'รายงานเชิงวิเคราะห์ (BI)', desc: 'ประมวลผลข้อมูลเพื่อแสดง Dashboard และสนับสนุนการตัดสินใจ', iconChar: '📊' }, // Bar Chart (Analysis/BI)
  ];

  // Hook สำหรับการจัดการ Scroll Reveal
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    // 1. Logic for Scroll Reveal (Intersection Observer)
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // *** แก้ไข: หยุดสังเกตทันทีที่ปรากฏ (เพื่อให้ Icon คงสถานะแสดงผล) ***
          observer.unobserve(entry.target); 
        } 
      });
    }, {
      rootMargin: '0px',
      threshold: 0.2 // เมื่อ 20% ขององค์ประกอบปรากฏ
    });

    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(card => observer.observe(card));

    // 2. Star Animation Setup (เดิม)
    const generatedStars = [...Array(60)].map(() => ({
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 8,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setStars(generatedStars);
    
    // Cleanup function
    return () => moduleCards.forEach(card => observer.unobserve(card));
  }, []);

  // การประกาศ Class Name ที่ใช้ซ้ำ (ตอนนี้ตัวแปรทั้งหมดถูกประกาศด้านบนแล้ว)
  const primaryButtonClass = BUTTON_BG_CLASS + ' text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-sky-700 transition transform hover:scale-105';
  const secondaryButtonClass = 'border-2 border-gray-400 text-gray-200 py-3 px-8 rounded-full hover:border-sky-500 hover:text-sky-500 transition';
  const inputClass = 'w-full border border-gray-700 p-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:border-transparent'; 
  
  // Modules Class: เพิ่มคลาส 'module-card'
  const moduleCardClassNew = 'module-card group p-5 bg-[#152033] rounded-3xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] relative border border-transparent hover:border-transparent module-card-effect overflow-hidden'; 
  
  // Icon Wrapper Class
  const moduleIconWrapperClass = 'text-2xl mr-3 p-2 bg-gray-700/50 rounded-lg inline-flex items-center justify-center transition-all duration-300 group-hover:bg-sky-600 group-hover:text-white';
  
  // Accent Bar Class (แถบสีด้านบน)
  const accentBarClass = 'absolute top-0 left-0 w-full h-1.5 bg-sky-500/80 rounded-t-3xl transition-all duration-500 group-hover:h-2 group-hover:bg-sky-400';

  // Class สำหรับ Personnel Section (Light Theme)
  const personnelRowClassCompact = 'group relative flex items-center p-2 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-l-4 border-l-sky-600 hover:border-l-sky-800';
  const hoverOverlayClassPersonnel = 'absolute inset-0 bg-gradient-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0';
  const profileIconClassCompact = 'w-8 h-8 rounded-full flex-shrink-0 mr-2 z-10 font-medium text-xs flex items-center justify-center bg-gray-100 text-sky-600 border border-sky-300';


  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden text-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 to-gray-950 pt-36 pb-48"> 
          {/* Star animation code remains here */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {stars.map((star, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white animate-floatStars"
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

          <div className="container mx-auto px-4 max-w-7xl relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6 md:text-left text-center">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                ปลดล็อกศักยภาพธุรกิจ <br />
                <span className={ACCENT_COLOR_CLASS.replace('text-gray-900', 'text-sky-400')}>ด้วยการวิเคราะห์และวางแผนระบบ ERP</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300">
                เจาะลึกกลยุทธ์และแนวทางปฏิบัติในการนำ ERP Platform มาเชื่อมต่อทุกฟังก์ชันตั้งแต่ 
                การเงิน, บุคคลากร, จนถึง คลังสินค้า เพื่อการตัดสินใจทางธุรกิจที่แม่นยำ
              </p>
              <div className="flex gap-4 pt-4 flex-wrap md:justify-start justify-center">
                <a href="#signup" className={primaryButtonClass}>เริ่มอ่านบทวิเคราะห์ &rarr;</a>
                <a href="#modules" className={secondaryButtonClass}>ดูหัวข้อหลัก</a>
              </div>
            </div>

            <div className="flex justify-center md:justify-end mt-10 md:mt-0">
                <div className="w-full max-w-sm p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-full flex items-center justify-center border border-sky-500/50"
                  style={{ width: '280px', height: '280px' }}>
                    <img 
                        src={SYSTEM_LOGO_URL} 
                        alt="Knowledge Hub Logo" 
                        className="max-w-[80%] max-h-[80%] object-contain" 
                        style={{ filter: 'drop-shadow(0 0 10px rgba(14, 165, 233, 0.5))' }}
                    />
                </div>
            </div>
          </div>
        </section>

        {/* Modules Section (Dark Theme - 9 Core Modules, Lineal Style with Scroll Reveal) */}
        <section id="modules" className="py-32 bg-gray-950 text-white">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* หัวข้อ */}
            <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-100">
                โครงสร้าง 9 องค์ประกอบหลักของระบบบริหารสารสนเทศ (MIS)
            </h2>
            {/* ปรับ Grid เป็น 3 คอลัมน์สำหรับ 9 Modules */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MIS_MODULES.map((m, i) => (
                <div 
                    key={i} 
                    className={moduleCardClassNew}
                    // กำหนด Custom Data Attribute สำหรับใช้กับ CSS Animation Delay
                    data-delay={i} 
                >
                    {/* *** Accent Bar ด้านบน *** */}
                    <div className={accentBarClass}></div>
                    
                    {/* จัดวาง Icon และ Title ให้อยู่บรรทัดเดียวกัน */}
                    <div className="flex items-center mb-2 mt-2"> 
                        <div className={moduleIconWrapperClass}>
                            {/* Icon Element */}
                            <span className="icon-pure-outline-style">{m.iconChar}</span>
                        </div>
                        <h3 className={`text-lg font-bold text-sky-400`}>{m.title}</h3>
                    </div>
                    {/* คำอธิบายที่กระชับยิ่งขึ้น */}
                    <p className="text-gray-400 text-sm">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personnel Section (Light Theme - Compact & Accent Bar) */}
        <section className={`relative py-24 bg-white text-gray-900 shadow-inner-custom`}>
            {/* Seamless Transition Effect */}
            <div className="absolute top-0 left-0 w-full h-24 -mt-24 bg-gradient-to-b from-transparent to-white pointer-events-none" />

            <div className="container mx-auto px-4 max-w-7xl">
                {/* หัวข้อ */}
                <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-900">
                    <span className='inline-block relative text-gray-900 after:block after:w-full after:h-2 after:bg-sky-200 after:absolute after:bottom-1 after:left-0 after:-z-10 after:rounded-full after:opacity-70'>
                        บุคลากรหลัก: ผู้ขับเคลื่อนกลยุทธ์และนวัตกรรมระบบ MIS
                    </span>
                </h2>
                
                {/* Grid 2 คอลัมน์ที่บังคับความสูงเท่ากัน */}
                <div className='grid md:grid-cols-2 gap-8 items-stretch'>
                    
                    {/* LEFT COLUMN: Staff List (Compact & Accent Bar) */}
                    <div className="space-y-3 max-w-xl md:max-w-full mx-auto md:mx-0">
                        {PHR_DAN_SAI_PERSONNEL.map((person, i) => (
                            <div 
                                key={i}
                                className={personnelRowClassCompact}
                            >
                                {/* Diagonal Gradient Overlay */}
                                <div className={hoverOverlayClassPersonnel} />

                                {/* Minimalist Profile Icon (z-10) - ใช้ Text Symbol แทน */}
                                <div className={profileIconClassCompact}>
                                  {person.iconInitial}
                                </div>

                                <div className='flex flex-col text-left z-10 flex-grow'>
                                    <h3 className={'text-sm font-bold ' + ACCENT_COLOR_CLASS}>{person.name}</h3>
                                    <p className="text-gray-600 text-xs font-medium">{person.position}</p>
                                    <p className="text-gray-500 text-[10px] mt-0.5 leading-snug truncate-lines-2">{person.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* RIGHT COLUMN: Diagram Placeholder (ความสูงขนานกับด้านซ้าย) */}
                    <div className='hidden md:flex flex-col justify-center items-center p-6 bg-gray-50 rounded-2xl border border-gray-300 shadow-md h-full'>
                        <h3 className={'text-xl font-bold mb-4 ' + ACCENT_COLOR_TITLE}>แผนผังแสดงการเชื่อมโยงระบบ</h3>
                        <div className='flex-grow w-full flex items-center justify-center'>
                             <img 
                                src={INTERCONNECTION_DIAGRAM_URL} 
                                alt="System Interconnection Diagram" 
                                className="w-full h-full max-h-[400px] object-contain rounded-xl border border-gray-300"
                            />
                        </div>
                        <p className='text-sm text-gray-500 mt-4'>*แสดงการไหลของข้อมูลระหว่างหน่วยงานหลัก</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Signup Section (Contact/Consultation) */}
        <section id="signup" className="py-32 bg-gray-900 text-center text-white border-t border-gray-800">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-4xl font-extrabold text-gray-100">เริ่มต้นการเปลี่ยนแปลง: ปรึกษาผู้เชี่ยวชาญด้านกลยุทธ์ ERP ฟรี!</h2>
            <p className="text-xl text-gray-400 mt-4">กรอกข้อมูลเพื่อรับคำปรึกษาส่วนตัวเชิงลึก และบทวิเคราะห์ล่าสุดจากทีมงานของเรา</p>
            <form className="mt-10 max-w-xl mx-auto grid gap-4">
              <input
                type="text"
                placeholder="ชื่อบริษัท"
                className={inputClass}
              />
              <input
                type="email"
                placeholder="อีเมล"
                className={inputClass}
              />
              <input
                type="tel"
                placeholder="เบอร์โทร"
                className={inputClass}
              />
              <button className={primaryButtonClass.replace('py-3 px-8', 'py-3 px-6')}>
                ขอคำปรึกษาเชิงลึก &rarr;
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Global CSS for animations and Custom Shadow */}
      <style jsx global>{`
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

        /* *** Scroll Reveal Animation Keyframes (Fade In Up) *** */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Custom Shadow for Personnel Section Elevation */
        .shadow-inner-custom {
            box-shadow: inset 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.05);
        }
        
        /* *** Inner Glow Hover Effect for Modules Section *** */
        .module-card-effect:hover {
            box-shadow: inset 0 0 15px rgba(14, 165, 233, 0.4), 0 8px 25px rgba(0, 0, 0, 0.8);
            background-color: #172554; 
        }
        
        /* *** Default State for Scroll Reveal (Hidden) *** */
        .module-card {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }

        /* *** Final State for Scroll Reveal (Visible) *** */
        .module-card.is-visible {
            animation: fadeInUp 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }

        /* *** Sequential Delay for Module Cards (Based on data-delay) *** */
        .module-card[data-delay="0"].is-visible { animation-delay: 0s; }
        .module-card[data-delay="1"].is-visible { animation-delay: 0.1s; }
        .module-card[data-delay="2"].is-visible { animation-delay: 0.2s; }
        .module-card[data-delay="3"].is-visible { animation-delay: 0.3s; }
        .module-card[data-delay="4"].is-visible { animation-delay: 0.4s; }
        .module-card[data-delay="5"].is-visible { animation-delay: 0.5s; }
        .module-card[data-delay="6"].is-visible { animation-delay: 0.6s; }
        .module-card[data-delay="7"].is-visible { animation-delay: 0.7s; }
        .module-card[data-delay="8"].is-visible { animation-delay: 0.8s; }

        
        /* *** Lineal Emojis: Default State (Line) *** */
        .icon-pure-outline-style {
            font-size: 1.5rem; 
            font-weight: 600; 
            color: #38bdf8; 
            filter: grayscale(100%) contrast(1.5) brightness(1.5) drop-shadow(0 0 0.5px #38bdf8);
            transition: color 300ms, filter 300ms;
        }
        
        /* *** Lineal Emojis: Hover State (Soft Curved Gradient Fill) *** */
        .group:hover .icon-pure-outline-style {
            background-image: radial-gradient(circle at 50% 50%, #cff4ff 0%, #38bdf8 100%); 
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            filter: none; 
        }

        /* Diagonal Gradient Hover Keyframes (Personnel Section - Light Theme) */
        @keyframes diagonalMove {
          0% {
            transform: translate(-100%, 100%); 
          }
          100% {
            transform: translate(0%, 0%); 
          }
        }

        .bg-gradient-hover {
          background: linear-gradient(135deg, ${GRADIENT_FROM} 0%, ${GRADIENT_TO} 70%);
          width: 200%;
          height: 200%;
          transform: translate(-100%, 100%); 
        }

        .group:hover .${hoverOverlayClassPersonnel.split(' ').filter(cls => cls.startsWith('bg-')).join('.')} {
          opacity: 1;
          animation: diagonalMove 0.6s ease-out forwards; 
        }
        
        .group:hover h3 {
          color: #0c4a6e !important; 
        }
        .group:hover .${ACCENT_COLOR_CLASS.replace('text-gray-900', 'text-sky-800')} {
            color: #0c4a6e !important; 
        }
        .group:hover .text-gray-600, .group:hover .text-gray-500 {
            color: #4b5563; 
        }
        
        .group:hover .${profileIconClassCompact.split(' ').filter(cls => cls.startsWith('bg-') || cls.startsWith('text-')).join('.')} {
            background-color: #0c4a6e; 
            color: white; 
            border-color: #0c4a6e;
        }

        .truncate-lines-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2; 
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

      `}</style>
    </div>
  );
}
