'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link'; // เพิ่ม import Link
import { MIS_MODULES } from '../data/modules'; // เพิ่ม import MIS_MODULES

export default function Home() {
  const [stars, setStars] = useState([]);
  const [moduleView, setModuleView] = useState('grid');

  const HERO_IMAGES = [
    "https://levinci.group/wp-content/uploads/2024/04/why-should-business-use-ERP-1024x611.jpg",
    "https://tigersoft.co.th/wp-content/uploads/2023/08/blog21.jpg",
    "https://mayade.co.th/wp-content/uploads/2022/06/SeekPng.com_dmk-logo-png_8986300.png"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const PHR_DAN_SAI_PERSONNEL = [
    { name: "นายแพทย์สมศักดิ์ รักษาดี", position: "ผู้อำนวยการโรงพยาบาล", iconInitial: "MD", description: "บริหารวิสัยทัศน์กว้างไกล นำพาองค์กรสู่การพัฒนาด้านสาธารณสุขอย่างยั่งยืน" },
    { name: "พยาบาลวิชาชีพพรทิพย์ สุขสบาย", position: "หัวหน้าพยาบาล", iconInitial: "RN", description: "ดูแลและส่งเสริมคุณภาพการพยาบาล เป็นหัวใจสำคัญในการดูแลผู้ป่วย" },
    { name: "เภสัชกรหญิงอรุณี มีคุณธรรม", position: "หัวหน้าฝ่ายเภสัชกรรม", iconInitial: "PH", description: "ควบคุมการจัดหาและจ่ายยาคุณภาพ เพื่อให้ผู้ป่วยได้รับการรักษาที่เหมาะสมและปลอดภัย" },
    { name: "เจ้าหน้าที่สมชาย พัฒนาการ", position: "หัวหน้าฝ่ายไอที", iconInitial: "IT", description: "ดูแลระบบ MIS 4.0 และการเชื่อมต่อ HOSxP ให้ทำงานได้อย่างราบรื่น 24 ชั่วโมง" },
  ];

  const ERP_ARTICLES = [
    {
      title: "5 กลยุทธ์เลือก ERP ให้เหมาะกับธุรกิจโรงพยาบาล",
      category: "ERP Strategy",
      date: "15 ต.ค. 2568",
      imageUrl: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1000,h_646/https://onestopitservices.konicaminolta.co.th/wp-content/uploads/2023/06/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%A7%E0%B8%B2%E0%B8%87%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A-ERP-%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88.jpg"
    },
    {
      title: "Case Study: รพร.ด่านซ้าย ลดต้นทุนคลังเวชภัณฑ์ด้วย ERP",
      category: "Case Study",
      date: "10 ต.ค. 2568",
      imageUrl: "https://greenmoons.co.th/wp-content/uploads/2024/08/erp-1-scaled.jpg"
    },
    {
      title: "การเชื่อมต่อระบบ ERP กับ HOSxP เพื่อข้อมูลแบบไร้รอยต่อ",
      category: "Integration",
      date: "5 ต.ค. 2568",
      imageUrl: "https://hosxp.net/wordpress/wp-content/uploads/2023/05/diagram-pacs110664.png"
    },
    {
      title: "ความปลอดภัยของข้อมูล (PDPA) ในระบบ ERP สำหรับโรงพยาบาล",
      category: "Security",
      date: "1 ต.ค. 2568",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR046PbhkzVlnjZqKVjn-XtOjNdwSiaPREiUw&s"
    },
  ];

  const ANNOUNCEMENTS = [
    {
      category: "อัปเดตระบบ",
      title: "ปรับปรุงระบบ ERP เป็นเวอร์ชั่น 2.1 เพิ่มประสิทธิภาพและความเร็ว",
      date: "15 ต.ค. 2568",
      description: "ทีมพัฒนาได้ทำการอัปเดตระบบ ERP ครั้งใหญ่ เพิ่มความเร็วในการประมวลผลรายงานและปรับปรุงหน้าตาของโมดูล HRM ให้ใช้งานง่ายขึ้น"
    },
    {
      category: "ประกาศอบรม",
      title: "อบรมการใช้งาน Dashboard ใหม่ในโมดูล BI สำหรับหัวหน้าแผนก",
      date: "12 ต.ค. 2568",
      description: "ขอเชิญหัวหน้าแผนกทุกท่านเข้าร่วมอบรมการใช้งานระบบรายงานเชิงวิเคราะห์ (BI) ตัวใหม่ ในวันที่ 25 ต.ค. 2568 เวลา 13:00 น. ณ ห้องประชุม IT"
    },
    {
      category: "ซ่อมบำรุง",
      title: "แจ้งปิดปรับปรุงระบบ Server ประจำเดือน ตุลาคม 2568",
      date: "10 ต.ค. 2568",
      description: "ทีม IT จะทำการปิดปรับปรุง Server ในคืนวันเสาร์ที่ 18 ต.ค. 2568 เวลา 00:00 - 03:00 น. ซึ่งจะส่งผลให้ไม่สามารถใช้งานระบบได้ชั่วคราว"
    }
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % HERO_IMAGES.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, HERO_IMAGES.length]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    const generatedStars = [...Array(80)].map(() => ({
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 8,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e3a5f] to-[#1a2332] text-slate-200 relative overflow-hidden">
      <Navbar modules={MIS_MODULES} />

      <main className="relative z-10">
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

        <section className="pt-32 lg:pt-36 pb-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
                  ERP จากใจ...สู่การใช้งานจริง<br />
                  <span className="text-blue-400">โดยทีมพัฒนาระบบ รพร.ด่านซ้าย</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0">
                  ระบบบริหารจัดการที่พัฒนาจากความเข้าใจในทุกขั้นตอนการทำงาน เพื่อเชื่อมต่อทุกหน่วยงานของโรงพยาบาล ตั้งแต่การเงิน, บุคลากร, คลังเวชภัณฑ์ สู่การดูแลผู้ป่วยที่เป็นเลิศ
                </p>
                <div className="mt-8 flex gap-4 flex-wrap justify-center lg:justify-start">
                  <a href="#blog" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105">
                    อ่าน Case Study &rarr;
                  </a>
                  <a href="#modules" className="border-2 border-blue-500 text-blue-300 py-3 px-8 rounded-full hover:bg-blue-500 hover:text-white transition">
                    ดูองค์ประกอบระบบ
                  </a>
                </div>
              </div>

              <div
                className="relative flex justify-center lg:justify-end group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
                  <div className="absolute -top-4 -left-4 w-full h-full bg-blue-500/10 rounded-3xl transform rotate-[-6deg] transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105"></div>
                  <div className="absolute -bottom-4 -right-4 w-full h-full bg-blue-500/10 rounded-3xl transform rotate-[4deg] transition-transform duration-500 group-hover:rotate-[6deg] group-hover:scale-105"></div>
                  <div className="relative w-full h-full bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                    {HERO_IMAGES.map((imageUrl, index) => (
                      <img
                        key={imageUrl}
                        src={imageUrl}
                        alt={`ERP Solution Illustration ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out transform
                          ${index === currentImageIndex ? 'opacity-100 z-20' : 'opacity-0 z-10'}
                          group-hover:scale-105
                        `}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div id="modules" className="mt-24">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-white tracking-wide">
                  องค์ประกอบหลักของระบบ
                </h3>
                {/* ===== ส่วนที่แก้ไข ===== */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-lg p-1 bg-white/10">
                    <button onClick={() => setModuleView('scroll')} className={`px-3 py-1 rounded-md text-sm transition-colors ${moduleView === 'scroll' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:bg-white/10'}`}>
                      เลื่อน
                    </button>
                    <button onClick={() => setModuleView('grid')} className={`px-3 py-1 rounded-md text-sm transition-colors ${moduleView === 'grid' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:bg-white/10'}`}>
                      ตาราง
                    </button>
                  </div>
                  <Link href="/modules" className="text-sm font-semibold text-blue-300 hover:text-blue-200 transition-colors">
                    ดูทั้งหมด &rarr;
                  </Link>
                </div>
                {/* ===== จบส่วนที่แก้ไข ===== */}
              </div>
              <p className="text-center text-slate-300 mb-10 -mt-4">
                9 เครื่องมือสำคัญที่เชื่อมต่อการทำงานของโรงพยาบาลให้เป็นหนึ่งเดียว
              </p>

              {moduleView === 'scroll' ? (
                <div className="scroll-container">
                  <div className="scroll-content scroll-right-to-left">
                    {[...MIS_MODULES, ...MIS_MODULES].map((m, i) => (
                      <div
                        key={`scroll-${i}`}
                        className="scroll-item group p-4 rounded-xl shadow-lg transition-all duration-300 bg-white/5 backdrop-blur-sm border border-blue-500/20 hover:border-blue-400 flex-shrink-0"
                        style={{ width: '220px' }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-blue-400 p-2 bg-blue-500/10 rounded-lg transition-all duration-500 group-hover:bg-blue-500 group-hover:text-white">
                            <m.Icon size={28} strokeWidth={2} />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                              {m.title}
                            </h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {MIS_MODULES.map((m, i) => (
                    <div
                      key={`grid-${i}`}
                      className="group p-4 rounded-xl shadow-lg transition-all duration-300 bg-white/5 backdrop-blur-sm border border-blue-500/20 hover:border-blue-400 text-center"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="text-blue-400 p-3 bg-blue-500/10 rounded-lg transition-all duration-500 group-hover:bg-blue-500 group-hover:text-white">
                          <m.Icon size={32} strokeWidth={2} />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                            {m.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1">{m.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-20 bg-black/10 backdrop-blur-sm">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-white">
                เบื้องหลังความสำเร็จ
              </h2>
              <p className="text-lg text-slate-300 mt-2">
                ขับเคลื่อนโดยบุคลากรและองค์ความรู้ที่เราพัฒนาขึ้นเอง
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              <div id="personnel">
                <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-3 mb-6 uppercase tracking-wider text-white">
                  ทีมบริหารและพัฒนาระบบ
                </h3>
                <div className="mb-6 w-full h-48 md:h-60 rounded-lg overflow-hidden shadow-md">
                  <img src="https://png.pngtree.com/thumb_back/fh260/back_our/20190622/ourmid/pngtree-silhouette-of-the-team-s-success-image_215394.jpg" alt="Our Team" className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="space-y-5">
                  {PHR_DAN_SAI_PERSONNEL.map((person, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 border-b border-white/10 hover:bg-white/10 rounded-md transition-all duration-300">
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold text-xl text-white">
                        {person.iconInitial}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-white">{person.name}</h4>
                        <p className="text-sm text-blue-400 font-semibold">{person.position}</p>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2">{person.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="blog">
                <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-3 mb-6 uppercase tracking-wider text-white">
                  บทความและ Case Study
                </h3>
                <div className="mb-6 w-full h-48 md:h-60 rounded-lg overflow-hidden shadow-md">
                  <img src="https://t3.ftcdn.net/jpg/02/76/64/42/360_F_276644254_WLTRw8cuxEqEHx0grR1pzfduxYvu9EfW.jpg" alt="ERP Articles" className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="space-y-5">
                  {ERP_ARTICLES.map((article, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 border-b border-white/10 hover:bg-white/10 rounded-md transition-all duration-300">
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                        <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold hover:text-blue-300 transition-colors cursor-pointer text-white">{article.title}</h4>
                        <p className="text-xs text-slate-300 mt-1">
                          <span className="font-semibold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">{article.category}</span>
                          <span className="mx-2">|</span>
                          <span>{article.date}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="announcements" className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
              ประกาศและข่าวสาร
              </h2>
              <p className="text-lg text-slate-300 mt-4">
              ติดตามข่าวสาร, การอัปเดตเวอร์ชัน, และประกาศสำคัญจากทีมพัฒนาระบบ
              </p>
            </div>

            <div className="space-y-6">
              {ANNOUNCEMENTS.map((item, index) => (
                <div key={index} className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 transition-all duration-300 hover:border-blue-400 hover:bg-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <span className={`text-xs font-bold py-1 px-3 rounded-full mb-2 sm:mb-0
                      ${item.category === 'อัปเดตระบบ' ? 'bg-blue-500/20 text-blue-300' : ''}
                      ${item.category === 'ประกาศอบรม' ? 'bg-green-500/20 text-green-300' : ''}
                      ${item.category === 'ซ่อมบำรุง' ? 'bg-yellow-500/20 text-yellow-300' : ''}
                    `}>
                      {item.category}
                    </span>
                    <p className="text-sm text-slate-400">{item.date}</p>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-3">{item.title}</h3>
                  <p className="text-slate-300 mt-2 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="signup" className="py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-blue-500/20 rounded-xl">
                        <svg className="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-extrabold leading-tight text-white">สนใจศึกษาดูงานหรือขอคำปรึกษา?</h2>
                        <p className="text-slate-300">ติดต่อทีมพัฒนาระบบ ERP รพร.ด่านซ้าย</p>
                      </div>
                    </div>
                    <p className="text-slate-300 text-base leading-relaxed">
                      เราพร้อมแบ่งปันองค์ความรู้และประสบการณ์ในการพัฒนาระบบเพื่อนำไปปรับใช้และต่อยอดสำหรับโรงพยาบาลอื่นๆ
                    </p>
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
                          <span className="text-sm font-bold">✓</span>
                        </div>
                        <span className="text-sm">แลกเปลี่ยนประสบการณ์พัฒนาระบบ</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
                          <span className="text-sm font-bold">✓</span>
                        </div>
                        <span className="text-sm">ดูงานสาธิตการใช้งานระบบจริง</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
                          <span className="text-sm font-bold">✓</span>
                        </div>
                        <span className="text-sm">รับคำปรึกษาในการนำไปปรับใช้</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 lg:p-10">
                  <form className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        ชื่อโรงพยาบาล / หน่วยงาน
                      </label>
                      <input
                        type="text"
                        placeholder="กรอกชื่อหน่วยงานของคุณ"
                        className="w-full border-2 border-white/20 bg-white/5 p-3 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/10 transition"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          อีเมลผู้ติดต่อ
                        </label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className="w-full border-2 border-white/20 bg-white/5 p-3 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/10 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          เบอร์โทรศัพท์
                        </label>
                        <input
                          type="tel"
                          placeholder="0XX-XXX-XXXX"
                          className="w-full border-2 border-white/20 bg-white/5 p-3 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/10 transition"
                        />
                      </div>
                    </div>
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02]">
                      ส่งเรื่องติดต่อทีมพัฒนา &rarr;
                    </button>
                    <p className="text-xs text-slate-400 text-center mt-4">
                      🔒 ข้อมูลของคุณจะถูกเก็บเป็นความลับ
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

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
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
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
          width: 100%;
        }
        .scroll-content {
          display: flex;
          gap: 1.5rem;
          width: fit-content;
        }
        .scroll-right-to-left {
          animation: scrollRightToLeft 40s linear infinite;
        }
        .scroll-left-to-right {
          animation: scrollLeftToRight 40s linear infinite;
        }
        .scroll-container:hover .scroll-content {
          animation-play-state: paused;
        }
        .scroll-item {
          position: relative;
        }
      `}</style>
    </div>
  );
}