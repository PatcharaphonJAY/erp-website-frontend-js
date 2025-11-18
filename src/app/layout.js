'use client'; // ▼▼▼ 1. เพิ่ม 'use client' เพื่อใช้ Hook ▼▼▼

import { Kanit } from 'next/font/google';
import { usePathname } from 'next/navigation'; // ▼▼▼ 2. Import usePathname ▼▼▼
import './globals.css';
import Footer from '../components/Footer';

// ▼▼▼ 3. Import ทุกอย่างที่เราสร้างขึ้นมา ▼▼▼
import { ThemeProvider } from './context/ThemeContext'; 
import MourningModeToggle from '../components/MourningModeToggle';
import ThemeApplicator from '../components/ThemeApplicator';
import BackToTopButton from '../components/BackToTopButton'; // <-- ปุ่มกลับไปด้านบน
// ▲▲▲ สิ้นสุดการ Import ▲▲▲


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
          {/* Component นี้จะคอยเพิ่ม/ลบ class 'grayscale-mode' */}
          <ThemeApplicator />

          <main className="min-h-screen">
            {children}
          </main>

          {/* 1. Footer (ซ่อนในหน้า Admin) */}
          {!isAdminPage && <Footer />}

          {/* 2. ปุ่มโหมดไว้อาลัย (แสดงทุกหน้า - ขวาล่าง) */}
          <MourningModeToggle />
          
          {/* 3. ปุ่มกลับไปด้านบน (แสดงทุกหน้า - ซ้ายล่าง) */}
          <BackToTopButton />

        </ThemeProvider>
      </body>
    </html>
  );
}