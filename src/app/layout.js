'use client'; // ▼▼▼ 1. เพิ่ม 'use client' เพื่อใช้ Hook ▼▼▼

import { Kanit } from 'next/font/google';
import { usePathname } from 'next/navigation'; // ▼▼▼ 2. Import usePathname ▼▼▼
import './globals.css';
import Footer from '../components/Footer';

// ▼▼▼ แก้ไข: ใส่ปีกกา { } กลับเข้าไปเหมือนเดิม ▼▼▼
import { ThemeProvider } from './context/ThemeContext'; 
// ▲▲▲ สิ้นสุดการแก้ไข ▲▲▲

import MourningModeToggle from '../components/MourningModeToggle';
import ThemeApplicator from '../components/ThemeApplicator';

// หมายเหตุ: ผมลบ NextNProgressBar ออกก่อน เพราะจาก Log ดูเหมือนคุณจะลบมันออกไปแล้ว
// (ถ้าคุณติดตั้งแล้วและจะใช้ต่อ ก็ import กลับเข้ามาได้เลยครับ)

// ตั้งค่าฟอนต์ Kanit สำหรับภาษาไทย
const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-kanit',
});

/*
export const metadata = {
  title: 'ERP รพร.ด่านซ้าย',
  description: 'ระบบ ERP พัฒนาโดยทีม รพร.ด่านซ้าย',
};
*/

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <html lang="th" className={kanit.variable}>
      <body>
        <ThemeProvider>
          <ThemeApplicator />

          <main className="min-h-screen">
            {children}
          </main>

          {/* 1. Footer จะแสดงเฉพาะเมื่อ 'ไม่' ใช่หน้า Admin */}
          {!isAdminPage && <Footer />}

          {/* 2. MourningModeToggle อยู่นอกเงื่อนไข (แสดงทุกหน้า) */}
          <MourningModeToggle />
          
        </ThemeProvider>
      </body>
    </html>
  );
}
