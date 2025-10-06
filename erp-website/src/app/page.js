// src/app/page.js (ส่วนที่แก้ไข)
"use client"; // ต้องเป็น Client Component เพื่อใช้ Context
import HeroSection from '@/components/HeroSection';
import KeyFeatures from '@/components/KeyFeatures';
import ModulesOverview from '@/components/ModulesOverview';
import { useHero } from './HeroContext'; // 1. Import Hook

export default function Home() {
  const { isHeroVisible } = useHero(); // 2. ดึง isHeroVisible มาใช้
  
  return (
    <main>
      {/* 3. ใช้ Conditional Rendering และ Transition */}
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isHeroVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <HeroSection /> 
      </div>
      
      {/* ส่วนอื่นๆ ของหน้า */}
      <KeyFeatures />
      <ModulesOverview />
    </main>
  );
}