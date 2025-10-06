// src/app/layout.js
import './globals.css';
import Navbar from '@/components/Navbar'; // Import Navbar
import Footer from '@/components/Footer'; // Import Footer

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <Navbar /> {/* ใช้ Navbar ที่นี่ */}
        
        {/* main wrapper สำหรับเนื้อหาแต่ละหน้า และ min-h-screen ช่วยให้ footer อยู่ด้านล่างสุด */}
        <main className="min-h-screen">
          {children} {/* children คือเนื้อหาของ page.js หรือหน้าอื่นๆ */}
        </main>
        
        <Footer /> {/* ใช้ Footer ที่นี่ */}
      </body>
    </html>
  );
}