// src/app/layout.js (ส่วนที่แก้ไข)
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HeroProvider } from './HeroContext'; // 1. Import HeroProvider

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <HeroProvider> {/* 2. ครอบ Navbar และ Main ด้วย Provider */}
          <Navbar /> 
          <main className="min-h-screen">
            {children} {/* นี่คือเนื้อหาของแต่ละหน้า รวมถึง page.js (HeroSection) */}
          </main>
        </HeroProvider>
        <Footer />
      </body>
    </html>
  );
}