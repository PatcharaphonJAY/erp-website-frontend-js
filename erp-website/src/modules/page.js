// src/app/modules/page.js
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import Navbar from '../../components/Navbar';
import { MIS_MODULES } from '../../data/modules.js';

// --- Components ย่อยสำหรับกราฟแต่ละชนิด ---

const RadarChart = ({ metrics }) => {
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
    <div className="relative w-full h-auto flex justify-center items-center p-4">
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
        {[...Array(numAxes)].map((_, i) => {
          const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
          const x2 = center + center * 0.8 * Math.cos(angle);
          const y2 = center + center * 0.8 * Math.sin(angle);
          return <line key={i} x1={center} y1={center} x2={x2} y2={y2} stroke="rgba(255, 255, 255, 0.1)" />;
        })}
        {[0.25, 0.5, 0.75].map(r => (
           <circle key={r} cx={center} cy={center} r={center * 0.8 * r} fill="none" stroke="rgba(255, 255, 255, 0.1)" />
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
          const x = 50 + 52 * Math.cos(angle);
          const y = 50 + 52 * Math.sin(angle);
          return <div key={label} className="absolute text-[10px] text-slate-300" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)'}}>{label}</div>
        })}
      </div>
    </div>
  );
};

const BarChart = ({ metrics }) => (
  <div className="w-full h-52 flex flex-col justify-end space-y-2 p-4">
    <div className="flex items-end justify-around h-full border-b-2 border-slate-700">
      {Object.entries(metrics).map(([key, value]) => (
        <div key={key} className="flex flex-col items-center group w-1/5">
          <div className="text-white text-xs mb-1 opacity-0 group-hover:opacity-100 transition-opacity">{value}</div>
          <div 
            className="w-8 bg-blue-600 hover:bg-blue-500 transition-all duration-300 rounded-t-sm" 
            style={{ height: `${value}%` }}
          ></div>
          <div className="text-slate-400 text-[10px] mt-2 whitespace-nowrap">{key}</div>
        </div>
      ))}
    </div>
  </div>
);

const DonutChart = ({ score }) => {
  const sqSize = 120;
  const strokeWidth = 12;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * score) / 100;

  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <svg width={sqSize} height={sqSize} viewBox={viewBox}>
        <circle className="text-slate-700" cx={sqSize/2} cy={sqSize/2} r={radius} strokeWidth={`${strokeWidth}px`} stroke="currentColor" fill="none" />
        <circle 
          className="text-blue-500"
          cx={sqSize/2} cy={sqSize/2} r={radius} strokeWidth={`${strokeWidth}px`} stroke="currentColor" fill="none"
          strokeLinecap="round"
          style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          transform={`rotate(-90 ${sqSize/2} ${sqSize/2})`}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-bold text-white">{score}</div>
        <div className="text-xs text-slate-400">Overall Score</div>
      </div>
    </div>
  );
};

const LineChart = ({ data }) => (
  <div className="w-full h-52 p-4 flex flex-col">
    <div className="flex-grow relative">
      <svg width="100%" height="100%" className="overflow-visible">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'rgba(59, 130, 246, 0.3)' }} />
            <stop offset="100%" style={{ stopColor: 'rgba(59, 130, 246, 0)' }} />
          </linearGradient>
        </defs>
        {[25, 50, 75, 100].map(y => (
          <line key={y} x1="0" y1={`${100 - y}%`} x2="100%" y2={`${100 - y}%`} stroke="#334155" strokeDasharray="2, 4" />
        ))}
        <polyline
          fill="url(#lineGradient)"
          stroke="#3B82F6" strokeWidth="2"
          points={data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - d.score}`).join(' ')}
        />
      </svg>
    </div>
    <div className="flex justify-between mt-2 text-xs text-slate-400">
      {data.map(d => <span key={d.month}>{d.month}</span>)}
    </div>
  </div>
);


// --- Component หลักของหน้า ---
export default function ModulesPage() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [activeChart, setActiveChart] = useState('radar');
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
        setSelectedModule(null);
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
  
  const chartTypes = [
    { id: 'radar', label: 'ภาพรวม' },
    { id: 'bar', label: 'เปรียบเทียบ' },
    { id: 'donut', label: 'คะแนนเฉลี่ย' },
    { id: 'line', label: 'แนวโน้ม' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e3a5f] to-[#1a2332] text-slate-200">
      <Navbar modules={MIS_MODULES} />
      <main className="relative z-10">
        <section className="pt-32 lg:pt-36 pb-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              
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

              <div className="lg:col-span-2">
                <div className="sticky top-24 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 h-full animate-fade-in">
                  {selectedModule ? (
                    <div className="flex flex-col h-full">
                      <h2 className="text-xl font-bold text-white text-center mb-1">{selectedModule.title}</h2>
                      <p className="text-sm text-slate-400 text-center">Performance Metrics</p>
                      
                      {/* === นี่คือส่วนของปุ่มสลับกราฟ ที่ขาดหายไป === */}
                      <div className="flex justify-center gap-2 my-4 p-1 bg-slate-800/50 rounded-lg">
                        {chartTypes.map(chart => (
                          <button key={chart.id} onClick={() => setActiveChart(chart.id)}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${activeChart === chart.id ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-white/10'}`}>
                            {chart.label}
                          </button>
                        ))}
                      </div>

                      <div className="flex-grow flex items-center justify-center">
                        {activeChart === 'radar' && <RadarChart metrics={selectedModule.performanceMetrics} />}
                        {activeChart === 'bar' && <BarChart metrics={selectedModule.performanceMetrics} />}
                        {activeChart === 'donut' && <DonutChart score={selectedModule.overallScore} />}
                        {activeChart === 'line' && <LineChart data={selectedModule.historicalPerformance} />}
                      </div>
                       <div className="mt-4 grid grid-cols-3 gap-4 text-center border-t border-white/10 pt-4">
                        {Object.entries(selectedModule.summaryStats).map(([key, value]) => (
                            <div key={key}>
                                <div className="text-lg font-bold text-white">{value}</div>
                                <div className="text-xs text-slate-400">{key}</div>
                            </div>
                        ))}
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
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
                    <div>
                      <h3 className="font-semibold text-lg text-white mb-4">ความสามารถหลัก (Key Features)</h3>
                      <ul className="space-y-3">
                        {selectedModule.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3"><span className="text-blue-400 mt-1">✓</span><span className="text-slate-300">{feature}</span></li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h3 className="font-semibold text-lg text-white mb-4">จุดเชื่อมต่อระบบ (Integrations)</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedModule.integrationPoints.map(point => (
                            <span key={point} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-md">{point}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-white mb-4">การอัปเดตล่าสุด (Changelog)</h3>
                        <ul className="space-y-3 border-l-2 border-slate-700 pl-4">
                          {selectedModule.changelog.map(log => (
                            <li key={log.version}>
                              <div className="font-semibold text-white">v{log.version} <span className="text-xs font-normal text-slate-400 ml-2">{log.date}</span></div>
                              <p className="text-sm text-slate-300">{log.details}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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