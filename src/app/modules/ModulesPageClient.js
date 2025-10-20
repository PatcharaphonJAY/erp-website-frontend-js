'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Navbar from '../../components/Navbar'; // สมมติว่าคุณมีไฟล์นี้
import { MIS_MODULES } from '../../data/modules.js';

// === Component: กราฟแท่งแสดงเมตริกปัจจุบัน (Performance Bar Chart) ===
// (ไม่มีการแก้ไขหลัก)
const PerformanceBarChart = ({ metrics }) => {
    const maxScore = 100;
    const labels = Object.keys(metrics);
    const values = Object.values(metrics);

    return (
        <div className="w-full h-64 flex flex-col justify-end p-4 bg-[#283857] rounded-lg border border-blue-400/20 shadow-inner">
            <h3 className="font-semibold text-sm text-blue-300 mb-4 text-center tracking-wider">PERFORMANCE METRICS</h3>
            <div className="flex justify-around items-end h-48">
                {labels.map((label, i) => {
                    const value = values[i];
                    return (
                        <div key={label} className="flex flex-col items-center w-1/6 group h-full">
                            <div className="relative flex-grow w-full flex items-end justify-center">
                                <div
                                    className="w-4/5 bg-sky-500 rounded-t-sm transition-all duration-500 ease-out hover:bg-sky-400"
                                    style={{ height: `${(value / maxScore) * 100}%` }}
                                >
                                    <div className="absolute -top-6 w-full text-center text-xs font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        {value}
                                    </div>
                                </div>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-2 text-center whitespace-nowrap">{label}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// === Component: กราฟแท่งย้อนหลังรายเดือน (Monthly Historical Chart) ===
// (ไม่มีการแก้ไขหลัก)
const MonthlyBarChart = ({ data }) => {
    const maxScore = 100;
    return (
        <div className="w-full">
            <h3 className="font-semibold text-base text-blue-300 mb-4 tracking-wider">ประสิทธิภาพย้อนหลัง 6 เดือน</h3>
            <div className="flex justify-between items-end h-40 p-4 bg-[#283857] rounded-lg border border-blue-400/20 shadow-inner"> 
                {data.map((item) => (
                    <div key={item.month} className="flex flex-col items-center w-full group">
                        <div className="relative flex-grow w-1/2 flex items-end justify-center">
                            <div
                                className="w-full bg-sky-500 rounded-t-sm transition-all duration-500 ease-out group-hover:bg-sky-400"
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

// === Component: หน้าหลัก (ปรับปรุงดีไซน์) ===
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
        // เปลี่ยนสีพื้นหลังให้เข้มขึ้นเล็กน้อยเพื่อความ Professional
        <div className="min-h-screen bg-[#131e32] text-slate-200 overflow-x-hidden">
            
            {/* ส่วนพื้นหลังเสริมความงาม (เอา Blob ที่เคลื่อนไหวออกเพื่อให้ดูมืออาชีพและนิ่งขึ้น) */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#131e32] to-[#0a111a] opacity-80 pointer-events-none"></div>

            <Navbar modules={MIS_MODULES} /> 

            <main className="relative z-10">
                <section className="pt-32 lg:pt-36 pb-20">
                    <div className="container mx-auto px-4 max-w-7xl">
                        {/* === โครงสร้าง Grid หลัก (ซ้าย-ขวา) === */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                            
                            {/* === คอลัมน์ซ้าย (ส่วนควบคุม) === */}
                            <div className="lg:col-span-3">
                                <div className="text-center lg:text-left mb-10">
                                    {/* ปรับขนาดฟอนต์ให้ดูเป็น Enterprise Headings มากขึ้น */}
                                    <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter">
                                        Performance Dashboard
                                    </h1>
                                    <p className="mt-4 text-xl text-slate-400">
                                        ภาพรวมและประสิทธิภาพของโมดูลระบบ Enterprise Resource Planning (ERP)
                                    </p>
                                </div>
                                
                                {/* vvv --- ปรับปรุง Material และ Shadow ให้ดู Professional --- vvv */}
                                <div className="p-6 bg-[#1a293c] rounded-xl shadow-2xl shadow-black/50 border border-slate-700/50">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {MIS_MODULES.map((m, index) => {
                                            const isActive = selectedModule?.id === m.id;
                                            return (
                                                <div
                                                    key={m.id}
                                                    onClick={() => handleModuleSelect(m)}
                                                    // ปรับสไตล์การ์ดให้ดู Minimalist & Professional
                                                    className={`group p-4 rounded-lg transition-all duration-300 cursor-pointer flex flex-col items-center text-center
                                                        ${isActive 
                                                            // สไตล์ Active: ใช้สีน้ำเงินเข้มเป็นพื้นหลัง และมีขอบเน้น
                                                            ? 'bg-sky-600/20 border border-sky-500 shadow-lg shadow-sky-500/30 -translate-y-1' 
                                                            // สไตล์ Inactive: ใช้พื้นหลังเข้มขึ้น และมี Border บางๆ
                                                            : 'bg-[#203045] border border-slate-700 hover:border-sky-500/50 hover:bg-[#283857]'
                                                        }`}
                                                >
                                                    <div className={`p-3 rounded-md transition-all duration-300 mb-2
                                                        ${isActive 
                                                            ? 'bg-sky-500 text-white shadow-md shadow-sky-500/50' 
                                                            : 'text-sky-400 bg-sky-500/10 group-hover:bg-sky-500 group-hover:text-white'
                                                        }`}>
                                                        <m.Icon size={28} strokeWidth={2} />
                                                    </div>
                                                    <h4 className="text-sm font-semibold text-white transition-colors duration-300 text-center">
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
                                {/* vvv --- ปรับปรุง Material ให้ดูเป็น Panel ที่นิ่งขึ้น --- vvv */}
                                <div className="sticky top-24 bg-[#1a293c] rounded-xl shadow-2xl shadow-black/50 border border-slate-700/50 h-full">
                                    {selectedModule ? (
                                        <div className="flex flex-col h-full">
                                            {/* --- ส่วนหัวของโมดูล --- */}
                                            <div className="p-6 border-b border-slate-700/50">
                                                <h2 className="text-xl font-bold text-white text-center mb-1">{selectedModule.title}</h2>
                                                <p className="text-sm text-slate-400 text-center">{selectedModule.desc}</p>
                                            </div>

                                            {/* --- ปุ่ม Tabs --- */}
                                            <div className="flex p-2 bg-[#203045] border-b border-slate-700/50">
                                                {tabs.map((tab) => (
                                                    <button
                                                        key={tab.id}
                                                        onClick={() => setActiveTab(tab.id)}
                                                        className={`w-full text-center text-sm font-medium py-2 rounded-md transition-all
                                                            ${activeTab === tab.id 
                                                                ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/30' 
                                                                : 'text-slate-300 hover:bg-[#283857] hover:text-white'
                                                            }`}
                                                    >
                                                        {tab.label}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* --- เนื้อหาของ Tabs --- */}
                                            <div className="p-6 flex-grow"> 
                                                {/* Tab: ภาพรวม - ใช้ PerformanceBarChart */}
                                                {activeTab === 'overview' && (
                                                    <div className="space-y-6">
                                                        <PerformanceBarChart metrics={selectedModule.performanceMetrics} />
                                                        {/* ปรับสไตล์ Summary Stats */}
                                                        <div className="grid grid-cols-3 gap-4 text-center border-t border-slate-700/50 pt-4">
                                                            {Object.entries(selectedModule.summaryStats).map(([key, value]) => (
                                                                <div key={key} className="bg-[#203045] p-3 rounded-lg border border-slate-700/50">
                                                                    <div className="text-xl font-bold text-sky-400">{value}</div>
                                                                    <div className="text-xs text-slate-400 mt-1 uppercase">{key}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                {/* Tab: ประสิทธิภาพ - ใช้ MonthlyBarChart (กราฟแท่งย้อนหลัง) */}
                                                {activeTab === 'performance' && (
                                                    <div>
                                                        <MonthlyBarChart data={selectedModule.historicalPerformance} />
                                                    </div>
                                                )}

                                                {/* Tab: รายละเอียด - ปรับสไตล์ Changelog ให้ดู Minimalist ขึ้น */}
                                                {activeTab === 'details' && (
                                                    <div className="space-y-8">
                                                        {/* Key Features */}
                                                        <div>
                                                            <h3 className="font-semibold text-base text-blue-300 mb-3 tracking-wider">ความสามารถหลัก (KEY FEATURES)</h3>
                                                            <ul className="space-y-2">
                                                                {selectedModule.features.map((feature, index) => (
                                                                    <li key={index} className="flex items-start gap-3">
                                                                        <span className="text-sky-400 mt-1 flex-shrink-0">✓</span>
                                                                        <span className="text-slate-300 text-sm">{feature}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        
                                                        {/* Changelog */}
                                                        <div>
                                                            <h3 className="font-semibold text-base text-blue-300 mb-4 tracking-wider">อัปเดตล่าสุด (CHANGELOG)</h3>
                                                            <ul className="space-y-4 border-l-2 border-slate-700 pl-4">
                                                                {selectedModule.changelog.map((entry, index) => (
                                                                    <li key={index} className="relative">
                                                                        <span className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-sky-500 border-2 border-[#1a293c]"></span>
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
                                            <div className="text-5xl mb-4 text-sky-500">📊</div>
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
                /* เอา Keyframes Animation ออกเพื่อให้ดูนิ่งและเป็นมืออาชีพขึ้น */
                /* @keyframes slideUpFadeIn, @keyframes fadeIn, @keyframes floatSlow, @keyframes floatReverseSlow ถูกลบออก */
                
                /* ใช้ CSS ธรรมดาแทน Animation ที่เน้นความฉูดฉาด */
                .animate-slide-up, .animate-fade-in {
                    opacity: 1;
                    transform: none;
                    animation: none;
                }
            `}</style>
        </div>
    );
}