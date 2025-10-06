// src/app/page.js

// Import Component ต่างๆ ที่เราสร้างไว้ใน src/components
// ใช้ @/components/ เพื่ออ้างอิงถึง src/components ตามการตั้งค่า default ของ Next.js
import HeroSection from '@/components/HeroSection';
import KeyFeatures from '@/components/KeyFeatures';
import ModulesOverview from '@/components/ModulesOverview';

// หมายเหตุ: ในโค้ดนี้ สมมติว่าคุณมี Component ชื่อ HeroSection แล้ว
// ถ้ายังไม่มี ต้องสร้างไฟล์ HeroSection.jsx ก่อน

export default function Home() {
  return (
    <main>
      {/* 1. ส่วนหัว: แนะนำระบบและ Call-to-Action */}
      <HeroSection /> 
      
      {/* 2. ส่วนแสดงจุดเด่นและประโยชน์หลักของระบบ */}
      <KeyFeatures />
      
      {/* 3. ส่วนแสดงภาพรวมของโมดูลทั้งหมด */}
      <ModulesOverview />
      
      {/* 4. ส่วนอื่นๆ ที่จะเพิ่มเข้ามาในภายหลัง (เช่น Testimonials, CTA พิเศษ) */}
      {/* <TestimonialsSection /> */}
    </main>
  );
}