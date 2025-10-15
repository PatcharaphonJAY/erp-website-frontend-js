// 1. Import ฟอนต์ Kanit จาก next/font/google
import { Kanit } from 'next/font/google';

import './globals.css';
import Footer from '@/components/Footer';

// 2. ตั้งค่าฟอนต์ Kanit สำหรับภาษาไทย
const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['400', '700'], // '400' คือน้ำหนักปกติ, '700' คือตัวหนา
  display: 'swap',
  variable: '--font-kanit', // สร้าง CSS variable ชื่อ --font-kanit
});

export const metadata = {
  title: 'ERP รพร.ด่านซ้าย',
  description: 'ระบบ ERP พัฒนาโดยทีม รพร.ด่านซ้าย',
};

export default function RootLayout({ children }) {
  return (
    // 3. กำหนดตัวแปรฟอนต์ให้กับ <html> tag
    <html lang="th" className={kanit.variable}>
      <body>
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

