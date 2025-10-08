'use client';
import React, { useEffect } from 'react';

// ---------------------- SVG Icons ----------------------
const IconEHR = ({ className = 'w-8 h-8' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="12" y1="13" x2="12" y2="17"/>
    <line x1="10" y1="15" x2="14" y2="15"/>
  </svg>
);
const IconFinance = ({ className = 'w-8 h-8' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16V12"/>
    <path d="M12 8V4"/>
    <path d="M8 12h8"/>
  </svg>
);

// ---------------------- Mock Data ----------------------
const mockData = {
  reviewCategories: [
    { icon: IconEHR, name: 'เวชระเบียนอิเล็กทรอนิกส์ (EHR)', benefit: 'ลดข้อผิดพลาดทางการแพทย์ เพิ่มความแม่นยำ', score: 4.9 },
    { icon: IconFinance, name: 'การจัดการการเงิน (FI)', benefit: 'ควบคุมรายรับ-รายจ่าย ลดหนี้สูญ', score: 4.5 },
  ]
};

// ---------------------- App Component ----------------------
export default function App() {
  const PrimaryColor = '#5b7ddb';

  // Floating bubbles effect with multiple layers
  useEffect(() => {
    const container = document.getElementById('bubble-bg');
    if (!container) return;

    const layers = [
      { count: 20, speedRange: [8, 14], scaleRange: [0.5, 1], opacityRange: [0.2, 0.6], zIndex: 0 },
      { count: 15, speedRange: [12, 20], scaleRange: [1, 1.5], opacityRange: [0.3, 0.7], zIndex: 1 },
      { count: 10, speedRange: [16, 24], scaleRange: [1.5, 2.5], opacityRange: [0.4, 0.8], zIndex: 2 },
    ];

    layers.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        const bubble = document.createElement('div');
        const size = Math.random() * 12 + 8;
        bubble.style.width = bubble.style.height = `${size}px`;
        bubble.style.position = 'absolute';
        bubble.style.bottom = `${Math.random() * 20 - 10}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.backgroundColor = `rgba(91,123,219,${Math.random() * (layer.opacityRange[1] - layer.opacityRange[0]) + layer.opacityRange[0]})`;
        bubble.style.borderRadius = '50%';
        bubble.style.pointerEvents = 'none';
        bubble.style.zIndex = layer.zIndex;
        const speed = Math.random() * (layer.speedRange[1] - layer.speedRange[0]) + layer.speedRange[0];
        const scale = Math.random() * (layer.scaleRange[1] - layer.scaleRange[0]) + layer.scaleRange[0];
        bubble.style.transform = `scale(${scale})`;
        bubble.style.animation = `rise ${speed}s linear forwards`;
        container.appendChild(bubble);

        // Remove after animation
        setTimeout(() => {
          if (bubble.parentNode) container.removeChild(bubble);
        }, speed * 1000);
      }
    });

    // Repeat bubbles periodically
    const interval = setInterval(() => {
      layers.forEach(layer => {
        const bubble = document.createElement('div');
        const size = Math.random() * 12 + 8;
        bubble.style.width = bubble.style.height = `${size}px`;
        bubble.style.position = 'absolute';
        bubble.style.bottom = `${Math.random() * 20 - 10}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.backgroundColor = `rgba(91,123,219,${Math.random() * (layer.opacityRange[1] - layer.opacityRange[0]) + layer.opacityRange[0]})`;
        bubble.style.borderRadius = '50%';
        bubble.style.pointerEvents = 'none';
        bubble.style.zIndex = layer.zIndex;
        const speed = Math.random() * (layer.speedRange[1] - layer.speedRange[0]) + layer.speedRange[0];
        const scale = Math.random() * (layer.scaleRange[1] - layer.scaleRange[0]) + layer.scaleRange[0];
        bubble.style.transform = `scale(${scale})`;
        bubble.style.animation = `rise ${speed}s linear forwards`;
        container.appendChild(bubble);
        setTimeout(() => {
          if (bubble.parentNode) container.removeChild(bubble);
        }, speed * 1000);
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden font-[Inter]">
      {/* Floating Bubbles Background */}
      <div id="bubble-bg" className="absolute inset-0 z-0 pointer-events-none"></div>
      <style>{`
        @keyframes rise {
          0% { transform: translateY(0) scale(var(--scale,1)); opacity: 0.3; }
          50% { opacity: 0.7; }
          100% { transform: translateY(-120vh) scale(var(--scale,1)); opacity: 0; }
        }
      `}</style>

      <main className="relative z-10">
        <section className="py-24 md:py-32 bg-gray-50 relative">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 max-w-2xl mx-auto">
              โมดูลหลักเพื่อขับเคลื่อนโรงพยาบาลยุคใหม่
            </h2>
            <p className="text-lg text-gray-500 mb-12 max-w-4xl mx-auto">
              ระบบของเราถูกออกแบบตามมาตรฐานสากล โดยแบ่งเป็นโมดูลสำคัญที่ทำงานร่วมกัน เพื่อความราบรื่นในการดำเนินงานและการรักษาที่ยอดเยี่ยม
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {mockData.reviewCategories.map((cat, index) => (
                <div key={index} className={`p-6 rounded-xl shadow-lg border-t-4 border-b-4 border-transparent hover:border-[${PrimaryColor}] transition duration-300 transform hover:-translate-y-1 bg-white text-left`}>
                  {React.createElement(cat.icon, { className: 'w-10 h-10 stroke-2 text-gray-800 mb-4 block' })}
                  <p className='text-xl font-bold text-gray-900 leading-tight mb-2'>{cat.name}</p>
                  <span className='text-sm text-gray-600'>{cat.benefit}</span>
                  <div className='mt-3 flex items-center text-sm text-gray-500'>
                    <span className='text-yellow-500 mr-1'>⭐</span>
                    คะแนนความพึงพอใจ: <span className='font-semibold ml-1 text-gray-800'>{cat.score}/5.0</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
