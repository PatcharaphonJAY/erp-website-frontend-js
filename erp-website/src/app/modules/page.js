// src/app/modules/page.js
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Navbar from '../../components/Navbar';
import { MIS_MODULES } from '../../data/modules.js';
import Link from 'next/link';

// === Component: กราฟใยแมงมุม (Radar Chart) ===
const PerformanceChart = ({ metrics }) => {
  const size = 200;
  const center = size / 2;
  const labels = Object.keys(metrics);
  const values = Object.values(metrics);
  const numAxes = labels.length;

  const points = values.map((value, i) => {
    const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
    const x = center + (center * 0.8 * (value / 100)) * Math.cos(angle);
    const y = center + (center * 0.8 * (value / 100)) * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative w-full h-auto flex justify-center items-center">
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
        {/* แกนและวงแหวน */}
        {[...Array(numAxes)].map((_, i) => {
          const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
          const x2 = center + center * 0.8 * Math.cos(angle);
          const y2 = center + center * 0.8 * Math.sin(angle);
          return <line key={i} x1={center} y1={center} x2={x2} y2={y2} stroke="rgba(255, 255, 255, 0.1)" />;
        })}
        {[0.25, 0.5, 0.75].map(r => (
           <circle key={r} cx={center} cy={center} r={center * 0.8 * r} fill="none" stroke="rgba(255, 255, 255, 0.1)" />
        ))}
        {/* พื้นที่ข้อมูล */}
        <polygon points={points} fill="rgba(59, 130, 246, 0.4)" stroke="#3B82F6" strokeWidth="2" />
        {/* จุดข้อมูล */}
        {points.split(' ').map((p, i) => {
            const [x, y] = p.split(',');
            return <circle key={i} cx={x} cy={y} r="3" fill="#3B82F6" stroke="white" strokeWidth="1"/>
        })}
      </svg>
      {/* ป้ายกำกับ */}
      <div className="absolute inset-0">
        {labels.map((label, i) => {
          const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
          const x = 50 + 48 * Math.cos(angle);
          const y = 50 + 48 * Math.sin(angle);
          return <div key={label} className="absolute text-xs text-slate-300" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)'}}>{label}</div>
        })}
      </div>
    </div>
  );
};

// === Component: หน้าหลัก ===
export default function ModulesPage() {
  const [selectedModule, setSelectedModule] = useState(null);
  const detailSectionRef = useRef(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const moduleIdFromUrl = searchParams.get('module');
    if (moduleIdFromUrl) {
      const moduleToSelect = MIS_MODULES.find(m => m.id === moduleIdFromUrl);
      if (moduleToSelect) {
        handleModuleSelect(moduleToSelect, 'instant');
      }
    } else {
        setSelectedModule(null); // Clear selection if no module in URL
    }
  }, [searchParams]);

  const handleModuleSelect = (module, behavior = 'smooth') => {
    setSelectedModule(module);
    if (behavior === 'smooth') {
      setTimeout(() => {
        detailSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e3a5f] to-[#1a2332] text-slate-200">
      <Navbar modules={MIS_MODULES} />

      <main className="relative z-10">
        <section className="pt-32 lg:pt-36 pb-20">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* === โครงสร้าง Grid หลัก (ซ้าย-ขวา) === */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              
              {/* === คอลัมน์ซ้าย (ส่วนควบคุม) === */}
              <div className="lg:col-span-3">
                <div className="text-center lg:text-left mb-8">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                    ภาพรวมและประสิทธิภาพ
                  </h1>
                  <p className="mt-4 text-lg text-slate-300">
                    เลือกโมดูลเพื่อดูรายละเอียด และประเมินประสิทธิภาพการทำงานในมิติต่างๆ
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {MIS_MODULES.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => handleModuleSelect(m)}
                      className={`group p-4 rounded-xl shadow-lg transition-all duration-300 bg-white/5 backdrop-blur-sm border hover:-translate-y-1 cursor-pointer flex flex-col items-center text-center
                        ${selectedModule?.id === m.id ? 'border-blue-400' : 'border-blue-500/10 hover:border-blue-400'}`}
                    >
                      <div className="text-blue-400 p-3 bg-blue-500/10 rounded-lg transition-all duration-500 group-hover:bg-blue-500 group-hover:text-white mb-3">
                        <m.Icon size={32} strokeWidth={1.5} />
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors duration-300 text-center">
                        {m.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* === คอลัมน์ขวา (ส่วนแสดงผลกราฟ) === */}
              <div className="lg:col-span-2">
                <div className="sticky top-24 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 h-full animate-fade-in">
                  {selectedModule ? (
                    <div>
                       <h2 className="text-xl font-bold text-white text-center mb-1">{selectedModule.title}</h2>
                       <p className="text-sm text-slate-400 text-center mb-4">Performance Metrics</p>
                       <PerformanceChart metrics={selectedModule.performanceMetrics} />
                       <div className="mt-4 grid grid-cols-3 gap-4 text-center border-t border-white/10 pt-4">
                        {/* vvv --- THIS IS THE FIX --- vvv
                        */}
                        {Object.entries(selectedModule.summaryStats).map(([key, value]) => (
                            <div key={key}>
                                <div className="text-lg font-bold text-white">{value}</div>
                                <div className="text-xs text-slate-400">{key}</div>
                            </div>
                        ))}
                        {/* ^^^ --- THIS IS THE FIX --- ^^^
                        */}
                       </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="text-5xl mb-4">📊</div>
                        <h3 className="text-xl font-bold text-white">เลือกโมดูล</h3>
                        <p className="text-slate-400">เพื่อดูข้อมูลประสิทธิภาพเชิงลึก</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* === ส่วนแสดงข้อมูลเชิงลึก (ด้านล่าง) === */}
            <div ref={detailSectionRef} className="mt-16">
              {selectedModule && (
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-blue-400/50 animate-fade-in-down">
                   <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <div className="flex-shrink-0 text-blue-300 p-4 bg-blue-500/20 rounded-xl">
                        <selectedModule.Icon size={48} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{selectedModule.title}</h2>
                        <p className="text-slate-300 leading-relaxed">{selectedModule.desc}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 border-t border-white/10 pt-6">
                    <h3 className="font-semibold text-lg text-white mb-4">ความสามารถหลัก (Key Features)</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                      {selectedModule.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-blue-400 mt-1">✓</span>
                          <span className="text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>
      </main>
      
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-down { animation: fadeInDown 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}