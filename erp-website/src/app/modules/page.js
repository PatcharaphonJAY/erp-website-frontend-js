// src/app/modules/page.js
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Navbar from '../../components/Navbar'; // สมมติว่าคุณมีไฟล์นี้
import { MIS_MODULES } from '../../data/modules.js';

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
        {[...Array(numAxes)].map((_, i) => {
          const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
          const x2 = center + center * 0.8 * Math.cos(angle);
          const y2 = center + center * 0.8 * Math.sin(angle);
          return <line key={i} x1={center} y1={center} x2={x2} y2={y2} stroke="rgba(255, 255, 255, 0.15)" />;
        })}
        {[0.25, 0.5, 0.75].map(r => (
           <circle key={r} cx={center} cy={center} r={center * 0.8 * r} fill="none" stroke="rgba(255, 255, 255, 0.15)" />
        ))}
        <polygon points={points} fill="rgba(59, 130, 246, 0.4)" stroke="#3B82F6" strokeWidth="2" />
        {points.split(' ').map((p, i) => {
           const [x, y] = p.split(',');
           return <circle key={i} cx={x} cy={y} r="3" fill="#3B82F6" stroke="white" strokeWidth="1"/>
        })}
      </svg>
      <div className="absolute inset-0">
        {labels.map((label, i) => {
          const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
          const x = 50 + 48 * Math.cos(angle);
          const y = 50 + 48 * Math.sin(angle);
          return <div key={label} className="absolute text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)'}}>{label}</div>
        })}
      </div>
    </div>
  );
};

// === Component: กราฟแท่งย้อนหลัง (Historical Chart) ===
const HistoricalChart = ({ data }) => {
  const maxScore = 100; 
  return (
    <div className="w-full">
      <h3 className="font-semibold text-base text-white mb-4">ประสิทธิภาพย้อนหลัง 6 เดือน</h3>
      {/* vvv --- MODIFIED --- vvv (ปรับปรุง Material) */}
      <div className="flex justify-between items-end h-40 p-4 bg-black/15 rounded-lg border border-white/10"> 
      {/* ^^^ --- MODIFIED --- ^^^ */}
        {data.map((item) => (
          <div key={item.month} className="flex flex-col items-center w-full group">
            <div className="relative flex-grow w-1/2 flex items-end justify-center">
              <div
                className="w-full bg-blue-500 rounded-t-sm transition-all duration-500 ease-out group-hover:bg-blue-400"
                style={{ height: `${(item.score / maxScore) * 100}%` }}
              >
                <div className="absolute -top-5 w-full text-center text-xs font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.score}
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-400 mt-2">{item.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// === Component: หน้าหลัก ===
export default function ModulesPage() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); 
  const searchParams = useSearchParams();

  useEffect(() => {
    const moduleIdFromUrl = searchParams.get('module');
    if (moduleIdFromUrl) {
      const moduleToSelect = MIS_MODULES.find(m => m.id === moduleIdFromUrl);
      if (moduleToSelect) {
        setSelectedModule(moduleToSelect);
        setActiveTab('overview'); 
      }
    } else {
        if (MIS_MODULES.length > 0) {
          setSelectedModule(MIS_MODULES[0]);
          window.history.replaceState(null, '', `?module=${MIS_MODULES[0].id}`);
        }
    }
  }, [searchParams]);

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    setActiveTab('overview'); 
    window.history.pushState(null, '', `?module=${module.id}`);
  };

  const tabs = [
    { id: 'overview', label: 'ภาพรวม' },
    { id: 'performance', label: 'ประสิทธิภาพ' },
    { id: 'details', label: 'รายละเอียด' },
  ];
  
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
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight animate-slide-up opacity-0">
                    ภาพรวมและประสิทธิภาพ
                  </h1>
                  <p className="mt-4 text-lg text-slate-300 animate-slide-up opacity-0" style={{ animationDelay: '0.15s' }}>
                    เลือกโมดูลเพื่อดูรายละเอียด และประเมินประสิทธิภาพการทำงานในมิติต่างๆ
                  </p>
                </div>
                
                {/* vvv --- MODIFIED --- vvv (ปรับปรุง Material ของ Panel) */}
                <div className="p-4 sm:p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl shadow-black/10">
                {/* ^^^ --- MODIFIED --- ^^^ */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {MIS_MODULES.map((m, index) => {
                      const isActive = selectedModule?.id === m.id;
                      return (
                        <div
                          key={m.id}
                          onClick={() => handleModuleSelect(m)}
                          className={`group p-4 rounded-xl shadow-lg transition-all duration-300 backdrop-blur-sm cursor-pointer flex flex-col items-center text-center animate-slide-up opacity-0
                            ${isActive 
                              ? 'bg-white/10 border-l-4 border-l-blue-400 border-t-white/10 border-r-white/10 border-b-white/10 shadow-lg shadow-blue-500/20' 
                              : 'bg-white/5 border border-white/10 hover:border-blue-400 hover:bg-white/10 hover:-translate-y-1'
                            }`}
                          style={{ animationDelay: `${0.2 + index * 0.05}s` }} 
                        >
                          <div className={`p-3 rounded-lg transition-all duration-500 mb-3
                            ${isActive 
                              ? 'bg-blue-500 text-white' 
                              : 'text-blue-400 bg-blue-500/10 group-hover:bg-blue-500 group-hover:text-white'
                            }`}>
                            <m.Icon size={32} strokeWidth={1.5} />
                          </div>
                          <h4 className={`text-sm font-bold transition-colors duration-300 text-center
                            ${isActive 
                              ? 'text-white'
                              : 'text-white group-hover:text-blue-300'
                            }`}>
                            {m.title}
                          </h4>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* === คอลัมน์ขวา (ส่วนแสดงผล) === */}
              <div className="lg:col-span-2">
                {/* vvv --- MODIFIED --- vvv (ปรับปรุง Material + เพิ่ม Animation) */}
                <div className="sticky top-24 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl shadow-black/10 h-full animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
                {/* ^^^ --- MODIFIED --- ^^^ */}
                  {selectedModule ? (
                    <div className="flex flex-col h-full">
                      {/* --- ส่วนหัวของโมดูล --- */}
                      {/* vvv --- MODIFIED --- vvv (ปรับปรุง Material) */}
                      <div className="p-6 border-b border-white/10">
                      {/* ^^^ --- MODIFIED --- ^^^ */}
                        <h2 className="text-xl font-bold text-white text-center mb-1">{selectedModule.title}</h2>
                        <p className="text-sm text-slate-400 text-center">{selectedModule.desc}</p>
                      </div>

                      {/* --- ปุ่ม Tabs --- */}
                      <div className="flex p-2 bg-black/10">
                        {tabs.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full text-center text-sm font-medium py-2 rounded-md transition-all
                              ${activeTab === tab.id 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                                : 'text-slate-300 hover:bg-white/10 hover:text-white'
                              }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      {/* --- เนื้อหาของ Tabs --- */}
                      {/* vvv --- MODIFIED --- vvv (ลบ Scrollbar ออก) */}
                      <div className="p-6 flex-grow"> 
                      {/* ^^^ --- MODIFIED --- ^^^ */}
                        {/* Tab: ภาพรวม */}
                        {activeTab === 'overview' && (
                          <div className="animate-fade-in">
                            <h3 className="font-semibold text-base text-white mb-2 text-center">Performance Metrics</h3>
                            <PerformanceChart metrics={selectedModule.performanceMetrics} />
                            {/* vvv --- MODIFIED --- vvv (ปรับปรุง Material) */}
                            <div className="mt-4 grid grid-cols-3 gap-4 text-center border-t border-white/10 pt-4">
                            {/* ^^^ --- MODIFIED --- ^^^ */}
                              {Object.entries(selectedModule.summaryStats).map(([key, value]) => (
                                <div key={key}>
                                  <div className="text-lg font-bold text-white">{value}</div>
                                  <div className="text-xs text-slate-400">{key}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Tab: ประสิทธิภาพ */}
                        {activeTab === 'performance' && (
                          <div className="animate-fade-in">
                            <HistoricalChart data={selectedModule.historicalPerformance} />
                          </div>
                        )}

                        {/* Tab: รายละเอียด */}
                        {activeTab === 'details' && (
                          <div className="animate-fade-in space-y-6">
                            {/* Key Features */}
                            <div>
                              <h3 className="font-semibold text-base text-white mb-3">ความสามารถหลัก (Key Features)</h3>
                              <ul className="space-y-2">
                                {selectedModule.features.map((feature, index) => (
                                  <li key={index} className="flex items-start gap-3">
                                    <span className="text-blue-400 mt-1 flex-shrink-0">✓</span>
                                    <span className="text-slate-300 text-sm">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Changelog */}
                            <div>
                              <h3 className="font-semibold text-base text-white mb-4">อัปเดตล่าสุด (Changelog)</h3>
                              {/* vvv --- MODIFIED --- vvv (ปรับปรุง Material) */}
                              <ul className="space-y-4 border-l-2 border-white/10 pl-4">
                              {/* ^^^ --- MODIFIED --- ^^^ */}
                                {selectedModule.changelog.map((entry, index) => (
                                  <li key={index} className="relative">
                                    <span className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-blue-500 border-2 border-slate-700"></span>
                                    <div className="text-xs text-slate-400 mb-0.5">{entry.date} (v{entry.version})</div>
                                    <div className="text-sm text-slate-200">{entry.details}</div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6">
                        <div className="text-5xl mb-4">📊</div>
                        <h3 className="text-xl font-bold text-white">เลือกโมดูล</h3>
                        <p className="text-slate-400">เพื่อดูข้อมูลประสิทธิภาพเชิงลึก</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <style jsx global>{`
        @keyframes slideUpFadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUpFadeIn 0.5s ease-out forwards;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}