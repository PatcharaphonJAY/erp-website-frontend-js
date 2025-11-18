'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react'; // ไอคอนลูกศรชี้ขึ้น

export default function BackToTopButton() {
  // --- (ส่วน Logic: useState, toggleVisibility, scrollToTop, useEffect ... ไม่ต้องแก้ไขครับ) ---
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    // ถ้าสกรอลล์ลงมามากกว่า 300px ให้แสดงปุ่ม
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // ทำให้การเลื่อนนุ่มนวล
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    // คืนค่าฟังก์ชันนี้ เพื่อลบ Event Listener ออกเมื่อ Component ปิด
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []); // [] หมายความว่าให้รัน Effect นี้แค่ครั้งเดียว
  // --- (สิ้นสุดส่วน Logic) ---


  // ▼▼▼ 1. แก้ไขสไตล์และตำแหน่งที่นี่ ▼▼▼
  return (
    <button
      onClick={scrollToTop}
      title="กลับไปด้านบนสุด"
      className={`
        fixed z-50 flex h-12 w-12 items-center justify-center 
        rounded-full bg-white text-gray-700 shadow-lg 
        border border-gray-200 
        transition-all duration-300 ease-in-out  /* <-- 3. เพิ่ม transition-all */
        hover:shadow-xl hover:scale-110 active:scale-95
        dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700

        /* ▼▼▼ 2. ย้ายตำแหน่งมาอยู่ฝั่งเดียวกัน (ขวาล่าง) ▼▼▼ */
        /* โดยให้อยู่ 'เหนือ' ปุ่มสลับโหมด (bottom-20) */
        bottom-20 right-5 

        /* ▼▼▼ 4. เปลี่ยนจาก "โผล่-หาย" เป็น "ลอยขึ้นมา" (สวยกว่า) ▼▼▼ */
        /* ถ้า isVisible จริง: ให้โชว์ / ถ้าไม่จริง: ให้ซ่อนและเลื่อนลง */
        ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      <ArrowUp size={20} />
    </button>
  );
}