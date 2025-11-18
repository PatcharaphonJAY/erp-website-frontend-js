'use client';

import { useTheme } from '../app/context/ThemeContext';
import { Eye, EyeOff } from 'lucide-react'; // หรือใช้ Icon ที่คุณมี

export default function MourningModeToggle() {
  const { isMourningMode, toggleMourningMode } = useTheme();

  return (
    <button
      onClick={toggleMourningMode}
      title={isMourningMode ? 'แสดงสีปกติ' : 'เปิดโหมดไว้อาลัย'}
      className={`
        /* 1. z-40 (อยู่หลังปุ่ม BackToTop) */
        fixed z-40 flex h-12 w-12 items-center justify-center 
        rounded-full bg-white text-gray-700 shadow-lg 
        border border-gray-200 
        transition-all duration-300 ease-in-out
        hover:shadow-xl hover:scale-110 active:scale-95
        dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700
        
        /* 2. ตำแหน่งล่างสุด (ขวาล่าง) */
        bottom-5 right-5 
      `}
    >
      {isMourningMode ? <Eye size={20} /> : <EyeOff size={20} />}
    </button>
  );
}