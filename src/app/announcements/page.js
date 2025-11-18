'use client';

// [NEW] 1. import useEffect, useRef, และ html2canvas
import React, { useState, useEffect, useRef } from 'react';
import { Bell, Calendar, Search, Filter, ChevronRight, Clock, User } from 'lucide-react';
import Navbar from '../../components/Navbar';
import html2canvas from 'html2canvas';
import { announcements } from '../../data/announcementsData';

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // แสดง 5 ข่าวต่อหน้า

  // [NEW] 2. สร้าง ref สำหรับ Modal content
  const modalContentRef = useRef(null);

  
  const categories = ['ทั้งหมด', 'ระบบ', 'บำรุงรักษา', 'ความปลอดภัย', 'ฟีเจอร์', 'การฝึกอบรม'];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-pink-500 text-white';
      case 'medium': return 'bg-yellow-400 text-gray-800';
      case 'low': return 'bg-gray-400 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const getPriorityLabel = (priority) => {
    switch(priority) {
      case 'high': return 'สำคัญมาก';
      case 'medium': return 'ปานกลาง';
      case 'low': return 'ทั่วไป';
      default: return '';
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          announcement.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ทั้งหมด' || announcement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // คำนวณ Pagination
  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAnnouncements.slice(indexOfFirstItem, indexOfLastItem); 
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1); 

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleCloseModal = () => {
    setSelectedAnnouncement(null);
  };

  // [FIX] 3. แก้ไขฟังก์ชันแชร์รูปภาพ
  const handleShareAsImage = () => {
    if (!modalContentRef.current) return;

    const element = modalContentRef.current;
    
    // [NEW] ใช้ scrollHeight เพื่อจับภาพเนื้อหาทั้งหมด แม้จะล้นกรอบ
    const originalHeight = element.style.height;
    const originalOverflow = element.style.overflowY;
    element.style.height = `${element.scrollHeight}px`;
    element.style.overflowY = 'visible';

    html2canvas(element, {
      useCORS: true,
      backgroundColor: '#ffffff', // บังคับพื้นหลังเป็นสีขาว
      scale: 2, // [NEW] เพิ่ม scale เพื่อความคมชัด (2x)
      
      // [NEW] บอกให้ "ซ่อน" element ที่มี attribute นี้
      ignoreElements: (el) => el.hasAttribute('data-html2canvas-ignore'),

      // [NEW] ตั้งค่าให้จับภาพตามขนาดจริงของเนื้อหา (รวมที่ล้น)
      windowHeight: element.scrollHeight,
      windowWidth: element.scrollWidth,
      
    }).then(canvas => {
      // คืนค่า style ของ Modal กลับไปเป็นเหมือนเดิม
      element.style.height = originalHeight;
      element.style.overflowY = originalOverflow;

      // แปลง canvas เป็นไฟล์ PNG
      const image = canvas.toDataURL('image/png', 1.0);
      
      // สร้างลิงก์สำหรับดาวน์โหลด
      const link = document.createElement('a');
      
      const fileName = selectedAnnouncement?.title
        .replace(/[^ก-๙a-zA-Z0-9 ]/g, '') 
        .substring(0, 50) + '.png' || 'erp-news.png';
        
      link.download = fileName;
      link.href = image;
      link.click(); // สั่งดาวน์โหลด
    }).catch(err => {
      // คืนค่า style แม้ว่าจะเกิด Error
      element.style.height = originalHeight;
      element.style.overflowY = originalOverflow;
      console.error("Error capturing image:", err);
    });
  };

  // [NEW] 4. useEffect สำหรับ "ล็อค" การเลื่อนหน้าเว็บ
  useEffect(() => {
    if (selectedAnnouncement) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedAnnouncement]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Navbar modules={[]} /> 
      
      <div className="min-h-screen pt-20 flex flex-col"> 

        {/* Header Section - พื้นหลังสีเข้ม */}
        <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border-b border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-500 p-4 rounded-2xl shadow-lg"> 
                    <Bell className="w-8 h-8 text-white origin-top animate-ring-bell" />                </div>
                <div>
                  <h1 className="text-4xl font-bold text-blue-400 mb-1">
                    ข่าวสารและ
                    <span className="text-white ml-2">ประกาศ</span>
                  </h1>
                  <p className="text-slate-300 text-sm">อัพเดทล่าสุดเกี่ยวกับระบบและบริการของเรา</p> 
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {totalPages > 1 && (
                  <div className="flex items-center space-x-1 bg-slate-700/50 p-1 rounded-xl border border-slate-600">
                    {pageNumbers.map(number => (
                      <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === number 
                            ? 'bg-blue-500 text-white shadow-md' 
                            : 'text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                )}
                <div className="bg-slate-700/50 backdrop-blur-sm px-5 py-3 rounded-xl border border-slate-600"> 
                  <p className="text-sm text-blue-400 font-bold">
                    {filteredAnnouncements.length} ข่าวสาร
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ส่วนเนื้อหาหลัก - (ฟิกซ์ความสูง) */}
        <div className="bg-gray-50 rounded-t-2xl flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Search Bar - Light Theme */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ค้นหาข่าวสาร..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Category Filter - Light Theme */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1); 
                    }}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 border border-gray-300 hover:border-blue-500 hover:text-blue-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Announcements List - WHITE CARDS + แถบไฮไลท์สีฟ้า */}
            <div className="space-y-4">
              {currentItems.length === 0 ? ( 
                <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-200">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">ไม่พบข่าวสารที่ค้นหา</p>
                </div>
              ) : (
                currentItems.map((announcement) => ( 
                  <div
                    key={announcement.id}
                    onClick={() => handleAnnouncementClick(announcement)}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group border border-gray-200 border-l-4 border-blue-400"
                  > 
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-3 flex-wrap gap-2">
                            {announcement.isNew && (
                              <span className="px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-full shadow-sm">
                                ใหม่
                              </span>
                            )}
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${getPriorityColor(announcement.priority)}`}>
                              {getPriorityLabel(announcement.priority)}
                            </span>
                            <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                              {announcement.category}
                            </span>
                          </div>
                          <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
                            {announcement.title}
                          </h2>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                        {announcement.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{new Date(announcement.date).toLocaleDateString('th-TH', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{announcement.time} น.</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">โดย {announcement.author}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
          </div>
        </div> {/* ปิด div ของ bg-gray-50 (flex-1) */}

      </div> {/* ปิด div wrapper (min-h-screen pt-20) */}


      {/* Modal for Full Announcement - WHITE */}
      {selectedAnnouncement && (
        
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4" 
          onClick={handleCloseModal}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)'
          }}
        >
          {/* [FIX] 5. ref กลับมาอยู่ที่ div นี้ */}
          <div 
            ref={modalContentRef}
            data-testid="modal-content"
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* ส่วน Header (จะถูกจับภาพ) */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-2xl z-10">
              {/* [FIX] ปรับขนาด Font และ Padding */}
              <h2 className="text-3xl font-bold text-gray-900 pr-8">{selectedAnnouncement.title}</h2>
              {/* [FIX] เพิ่ม data-html2canvas-ignore ที่ปุ่ม X */}
              <button
                data-html2canvas-ignore="true" 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* [FIX] ปรับ Padding และระยะห่าง (space-y-6) */}
            <div className="p-8 space-y-6">
              {/* Meta Information */}
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                {selectedAnnouncement.isNew && (
                  <span className="px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-full">
                    ใหม่
                  </span>
                )}
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${getPriorityColor(selectedAnnouncement.priority)}`}>
                  {getPriorityLabel(selectedAnnouncement.priority)}
                </span>
                <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                  {selectedAnnouncement.category}
                </span>
              </div>

              {/* [FIX] ปรับขนาด Font และระยะห่าง (text-base, space-x-6) */}
              <div className="flex items-center space-x-6 text-base text-gray-600 pb-6 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span>{new Date(selectedAnnouncement.date).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>{selectedAnnouncement.time} น.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <span>โดย {selectedAnnouncement.author}</span>
                </div>
              </div>

              {/* [FIX] เพิ่มคลาส prose และ text-lg เพื่อจัดระเบียบเนื้อหาให้อ่านง่าย */}
              <div className="prose max-w-none prose-lg prose-p:text-gray-800 prose-li:text-gray-800">
                <div className="whitespace-pre-line leading-relaxed">
                  {selectedAnnouncement.content}
                </div>
              </div>
            </div>

            {/* [FIX] ส่วน Footer (จะ "ไม่" ถูกจับภาพ) */}
            <div 
              data-html2canvas-ignore="true"
              className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between px-8 py-6"
            >
              <button 
                onClick={handleShareAsImage}
                className="px-5 py-2 text-base text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                แชร์ข่าวสารนี้
              </button>
              <button
                onClick={handleCloseModal}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md text-lg"
              >
                ปิด
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}