'use client';

// ▼▼▼ แก้ไขบรรทัดนี้ ▼▼▼
import { useTheme } from '../app/context/ThemeContext'; // ใช้ Path นี้
// ▲▲▲ สิ้นสุดการแก้ไข ▲▲▲

import { Eye, EyeOff } from 'lucide-react'; // หรือใช้ Icon ที่คุณมี

export default function MourningModeToggle() {
  const { isMourningMode, toggleMourningMode } = useTheme();

  return (
    <button
      onClick={toggleMourningMode}
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white shadow-lg transition-colors hover:bg-gray-600"
      title={isMourningMode ? 'ปิดโหมดไว้อาลัย' : 'เปิดโหมดไว้อาลัย'}
    >
      {isMourningMode ? 'สีปกติ' : 'สีเทา'}
    </button>
  );
}
