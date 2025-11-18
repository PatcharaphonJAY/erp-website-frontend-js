'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ประเภทของข้อมูลที่จะเก็บใน Context
interface ThemeContextType {
  isMourningMode: boolean;
  toggleMourningMode: () => void;
}

// สร้าง Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// สร้าง Provider (ตัวจัดการสถานะ)
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isMourningMode, setIsMourningMode] = useState(false);

  // 1. เมื่อโหลด Component ครั้งแรก ให้ดึงค่าจาก localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('mourningMode') === 'true';
    setIsMourningMode(savedMode);
  }, []);

  // 2. ฟังก์ชันสำหรับสลับโหมด
  const toggleMourningMode = () => {
    setIsMourningMode((prevMode) => {
      const newMode = !prevMode;
      // 3. บันทึกค่าใหม่ลง localStorage
      localStorage.setItem('mourningMode', String(newMode));
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isMourningMode, toggleMourningMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 4. สร้าง Hook สำหรับเรียกใช้
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme ต้องถูกใช้ภายใน ThemeProvider');
  }
  return context;
}