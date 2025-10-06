// src/components/HeroSection.jsx
import Link from 'next/link';

const HeroSection = () => (
  <section className="bg-blue-600 text-white py-20 text-center">
    <div className="container mx-auto px-4">
      <h1 className="text-5xl font-bold mb-4">
        ERP System: ระบบวางแผนทรัพยากรองค์กรครบวงจร
      </h1>
      <p className="text-xl mb-8">
        รวมทุกฟังก์ชันธุรกิจไว้ในแพลตฟอร์มเดียว เพื่อการบริหารจัดการที่ไร้รอยต่อ
      </p>
      <Link 
        href="/contact" 
        className="bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-yellow-300 transition duration-300"
      >
        ทดลองใช้งานฟรี
      </Link>
    </div>
  </section>
);

export default HeroSection;