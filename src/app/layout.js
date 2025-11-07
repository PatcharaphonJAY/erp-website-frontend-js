'use client'; // ▼▼▼ 1. เพิ่ม 'use client' เพื่อใช้ Hook ▼▼▼

import { Kanit } from 'next/font/google';
import { usePathname } from 'next/navigation'; // ▼▼▼ 2. Import usePathname ▼▼▼
import './globals.css';
import Footer from '../components/Footer';
import { ThemeProvider } from './context/ThemeContext'; // Path นี้อยู่ถูกที่แล้ว (app/context)
import MourningModeToggle from '../components/MourningModeToggle';
import ThemeApplicator from '../components/ThemeApplicator';

// ตั้งค่าฟอนต์ Kanit สำหรับภาษาไทย
const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-kanit',
});

// ▼▼▼ REFACTOR: ลบ metadata export ▼▼▼
// เราต้องลบ metadata object นี้ออก
// เพราะไฟล์นี้ถูกกำหนดเป็น 'use client' (ซึ่งจำเป็นสำหรับ usePathname)
// และ Next.js ไม่อนุญาตให้ export metadata จาก Client Component
/*
export const metadata = {
  title: 'ERP รพร.ด่านซ้าย',
  description: 'ระบบ ERP พัฒนาโดยทีม รพร.ด่านซ้าย',
};
*/
// ▲▲▲ สิ้นสุดการแก้ไข ▲▲▲


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <html lang="th" className={kanit.variable}>
      <body>
        {/* เราต้องแก้ ThemeProvider ด้วย เพราะมันก็อยู่ใน app/ เหมือนกัน */}
        <ThemeProvider>
          <ThemeApplicator />

          <main className="min-h-screen">
            {children}
          </main>

          {/* ▼▼▼ นี่คือส่วนที่แก้ไข ▼▼▼ */}

          {/* 1. Footer จะแสดงเฉพาะเมื่อ 'ไม่' ใช่หน้า Admin */}
          {!isAdminPage && <Footer />}

          {/* 2. MourningModeToggle อยู่นอกเงื่อนไข 
              จึงแสดงในทุกหน้า (รวมถึง Admin) */}
          <MourningModeToggle />
          
          {/* ▲▲▲ สิ้นสุดการแก้ไข ▲▲▲ */}

        </ThemeProvider>
      </body>
    </html>
  );
}
