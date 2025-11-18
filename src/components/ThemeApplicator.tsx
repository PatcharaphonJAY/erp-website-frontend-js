'use client';

import { useEffect } from 'react';

// ▼▼▼ แก้ไขบรรทัดนี้ ▼▼▼
import { useTheme } from '../app/context/ThemeContext'; // ใช้ Path นี้
// ▲▲▲ สิ้นสุดการแก้ไข ▲▲▲

export default function ThemeApplicator() {
  const { isMourningMode } = useTheme();

  useEffect(() => {
    const htmlElement = document.documentElement; 

    if (isMourningMode) {
      htmlElement.classList.add('grayscale-mode');
    } else {
      htmlElement.classList.remove('grayscale-mode');
    }
  }, [isMourningMode]);

  return null;
}