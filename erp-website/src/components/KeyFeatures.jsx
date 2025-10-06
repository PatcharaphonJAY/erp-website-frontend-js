// src/components/KeyFeatures.jsx
import React from 'react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 border-t-4 border-blue-500">
    <div className="text-4xl text-blue-600 mb-4">{icon}</div>
    <h3 className="text-2xl font-bold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600">
      {description}
    </p>
  </div>
);

const KeyFeatures = () => {
  const features = [
    {
      icon: '📊', // ใช้ Emoji แทน Icon ชั่วคราว
      title: 'ข้อมูลรวมศูนย์ (Unified Data)',
      description: 'ทุกแผนกทำงานบนฐานข้อมูลเดียวกัน ลดความซ้ำซ้อนของข้อมูล และมั่นใจได้ว่าข้อมูลมีความถูกต้องและเป็นปัจจุบันเสมอ',
    },
    {
      icon: '🚀',
      title: 'ประสิทธิภาพสูง (Optimized Process)',
      description: 'ปรับปรุงกระบวนการทำงานให้เป็นอัตโนมัติ (Automation) ตั้งแต่การสั่งซื้อจนถึงการผลิต ช่วยลดต้นทุนและเวลาดำเนินงาน',
    },
    {
      icon: '🧠',
      title: 'การตัดสินใจที่ชาญฉลาด (Smart Decisions)',
      description: 'เข้าถึงรายงานและ Dashboard แบบ Real-time เพื่อวิเคราะห์ภาพรวมธุรกิจและคาดการณ์แนวโน้มในอนาคตได้อย่างแม่นยำ',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-800">
          จุดเด่นของระบบ ERP ของเรา
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          ก้าวข้ามขีดจำกัดทางธุรกิจด้วยการวางแผนและบริหารจัดการที่เหนือกว่า
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;