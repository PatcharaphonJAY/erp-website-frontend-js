'use client';

import React, { useState, useRef, useEffect } from 'react'; 
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion'; 

import Navbar from '../../components/Navbar'; 
import { MIS_MODULES } from '../../data/modules.js'; 

// === Component: กราฟแท่งแสดงเมตริกปัจจุบัน (Performance Bar Chart) ===
// (โค้ดส่วนนี้เหมือนเดิม)
const PerformanceBarChart = ({ metrics }) => {
    const maxScore = 100;
    const labels = Object.keys(metrics);
    const values = Object.values(metrics);

    return (
        <div className="w-full h-64 flex flex-col justify-end p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-sm text-blue-800 mb-4 text-center tracking-wider">PERFORMANCE METRICS</h3>
            <div className="flex justify-around items-end h-48">
                {labels.map((label, i) => {
                    const value = values[i];
                    return (
                        <div key={label} className="flex flex-col items-center w-1/6 group h-full">
                            <div className="relative flex-grow w-full flex items-end justify-center">
                                <div
                                    className="w-4/5 bg-blue-600 rounded-t-sm transition-all duration-500 ease-out hover:bg-blue-500"
                                    style={{ height: `${(value / maxScore) * 100}%` }}
                                >
                                    <div className="absolute -top-6 w-full text-center text-xs font-bold text-gray-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        {value}
                                    </div>
                                </div>
                            </div>
                            <div className="text-[10px] text-gray-600 mt-2 text-center whitespace-nowrap">{label}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// === Component: กราฟแท่งย้อนหลังรายเดือน (Monthly Historical Chart) ===
// (โค้ดส่วนนี้เหมือนเดิม)
const MonthlyBarChart = ({ data }) => {
    const maxScore = 100;
    return (
        <div className="w-full">
            <h3 className="font-semibold text-base text-blue-800 mb-4 tracking-wider">ประสิทธิภาพย้อนหลัง 6 เดือน</h3>
            <div className="flex justify-between items-end h-40 p-4 bg-white rounded-lg border border-gray-200 shadow-sm"> 
                {data.map((item) => (
                    <div key={item.month} className="flex flex-col items-center w-full group">
                        <div className="relative flex-grow w-1/2 flex items-end justify-center">
                            <div
                                className="w-full bg-blue-600 rounded-t-sm transition-all duration-500 ease-out group-hover:bg-blue-500"
                                style={{ height: `${(item.score / maxScore) * 100}%` }}
                            >
                                <div className="absolute -top-5 w-full text-center text-xs font-bold text-gray-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    {item.score}
                                </div>
                            </div>
                        </div>
                        <div className="text-xs text-gray-600 mt-2">{item.month}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// === Component: กราฟเส้นแนวโน้ม (Projected Trends Chart) ===
// (โค้ดส่วนนี้เหมือนเดิม)
const ProjectedTrendsChart = () => {
    const data = [
        { month: 'ม.ค.', value: 85 }, { month: 'ก.พ.', value: 88 }, { month: 'มี.ค.', value: 90 },
        { month: 'เม.ย.', value: 92 }, { month: 'พ.ค.', value: 95 }, { month: 'มิ.ย.', value: 97 }
    ];

    return (
        <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h3 className="font-semibold text-base text-blue-800 mb-4 tracking-wider">แนวโน้มประสิทธิภาพที่คาดการณ์</h3>
            <div className="h-32 relative">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                        d="M0,15 L20,12 L40,10 L60,8 L80,5 L100,3" 
                        fill="none"
                        stroke="#2563eb" 
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {data.map((item, index) => (
                        <circle 
                            key={item.month} 
                            cx={index * (100 / (data.length - 1))} 
                            cy={100 - item.value} 
                            r="1" 
                            fill="#2563eb"
                        />
                    ))}
                </svg>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                    {data.map(item => <span key={item.month}>{item.month}</span>)}
                </div>
            </div>
        </div>
    );
};

// === Component: ส่วนแสดงผลหลักทางขวา (รวม Hero และ Tabs) ===
// (โค้ดส่วนนี้เหมือนเดิม)
const ModuleDisplay = ({ module }) => {
    const [activeTab, setActiveTab] = useState('overview'); 

    useEffect(() => {
        setActiveTab('overview');
    }, [module]);

    if (!module) return (
        <div className="flex flex-col space-y-8">
            <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center h-56 animate-pulse"></div>
            <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 p-8 h-96 animate-pulse"></div>
        </div>
    );

    const tabs = [
        { id: 'overview', label: 'ภาพรวม' },
        { id: 'performance', label: 'ประสิทธิภาพ' },
        { id: 'details', label: 'รายละเอียด' },
    ];

    const slideInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div 
                key={module.id} 
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideInUp}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex flex-col space-y-8"
            >
                {/* 1. ModuleHero */}
                <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
                    <div className="p-4 bg-blue-100 text-blue-700 rounded-full inline-flex mb-4 shadow-inner">
                        <module.Icon size={64} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{module.title}</h2>
                    <p className="text-gray-600 max-w-md mx-auto">{module.desc}</p>
                </div>

                {/* 2. ModuleDetailPanel */}
                <div className="sticky top-24 bg-white rounded-lg shadow-lg border border-gray-200 h-full">
                    {/* --- Tabs --- */}
                    <div className="flex p-2 bg-gray-100 border-b border-gray-200">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full text-center text-sm font-medium py-2 rounded-md transition-all
                                    ${activeTab === tab.id 
                                        ? 'bg-blue-700 text-white shadow-sm' 
                                        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* --- Tab Content --- */}
                    <div className="p-6 flex-grow">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab} 
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'overview' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                            <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                                                <div className="text-4xl font-extrabold">{module.summaryStats.UPTIME}</div>
                                                <div className="text-sm uppercase opacity-80 mt-1">Uptime</div>
                                            </div>
                                            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                                                <div className="text-4xl font-extrabold">{module.summaryStats['ผู้ใช้ (ACTIVE)']}</div>
                                                <div className="text-sm uppercase opacity-80 mt-1">ผู้ใช้ปัจจุบัน</div>
                                            </div>
                                            <div className="bg-blue-400 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                                                <div className="text-4xl font-extrabold">{module.summaryStats['เวลาตอบสนอง']}</div>
                                                <div className="text-sm uppercase opacity-80 mt-1">Latency</div>
                                            </div>
                                        </div>
                                        <PerformanceBarChart metrics={module.performanceMetrics} />
                                        <ProjectedTrendsChart />
                                    </div>
                                )}
                                
                                {activeTab === 'performance' && (
                                    <div>
                                        <MonthlyBarChart data={module.historicalPerformance} />
                                    </div>
                                )}

                                {activeTab === 'details' && (
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="font-semibold text-base text-blue-800 mb-3 tracking-wider">ความสามารถหลัก (KEY FEATURES)</h3>
                                            <ul className="space-y-2">
                                                {module.features.map((feature, index) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        <span className="text-blue-600 mt-1 flex-shrink-0">✓</span>
                                                        <span className="text-gray-700 text-sm">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-base text-blue-800 mb-4 tracking-wider">อัปเดตล่าสุด (CHANGELOG)</h3>
                                            <ul className="space-y-4 border-l-2 border-gray-300 pl-4">
                                                {module.changelog.map((entry, index) => (
                                                    <li key={index} className="relative">
                                                        <span className="absolute -left-[10px] top-1 h-3.5 w-3.5 rounded-full bg-blue-600 border-2 border-white"></span>
                                                        <div className="text-xs text-gray-500 mb-0.5">{entry.date} (v{entry.version})</div>
                                                        <div className="text-sm text-gray-800">{entry.details}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};


// === Component: หน้าหลัก (ปรับปรุง Header) ===
export default function ModulesPage() {
    const [selectedModule, setSelectedModule] = useState(null);
    const [pointerTop, setPointerTop] = useState(0); 
    const sidebarRef = useRef(null); 
    const searchParams = useSearchParams();

    useEffect(() => {
        const moduleIdFromUrl = searchParams.get('module');
        let moduleToSelect = null;
        if (moduleIdFromUrl) {
            moduleToSelect = MIS_MODULES.find(m => m.id === moduleIdFromUrl);
        }
        
        if (!moduleToSelect && MIS_MODULES.length > 0) {
            moduleToSelect = MIS_MODULES[0];
            window.history.replaceState(null, '', `?module=${moduleToSelect.id}`);
        }
        setSelectedModule(moduleToSelect);
    }, [searchParams]);

    useEffect(() => {
        if (!selectedModule || !sidebarRef.current) {
            setPointerTop(-9999); 
            return;
        }

        const activeButton = sidebarRef.current.querySelector(`[data-module-id="${selectedModule.id}"]`);
        
        if (activeButton) {
            const topOffset = activeButton.offsetTop; 
            const buttonHeight = activeButton.clientHeight; 
            
            setPointerTop(topOffset + (buttonHeight / 2));
        }
    }, [selectedModule]);

    const handleModuleSelect = (module) => {
        setSelectedModule(module);
        window.history.pushState(null, '', `?module=${module.id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 overflow-x-hidden">
            
            <Navbar modules={MIS_MODULES} /> 

            {/* === START: Header Background with Curved Bottom (ส่วนปรับปรุง) === */}
            <div className="relative bg-[#141a2b] pt-32 pb-40"> {/* เพิ่ม pb เพื่อให้มีพื้นที่สำหรับส่วนโค้ง */}
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center lg:text-left">
                        {/* ปรับปรุงข้อความ Performance Dashboard */}
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter mb-4"
                        >
                            <span className="text-blue-300">Performance</span> Dashboard
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-4 text-xl text-blue-100 max-w-2xl lg:max-w-xl mx-auto lg:mx-0"
                        >
                            ภาพรวมประสิทธิภาพของโมดูลระบบ Enterprise Resource Planning (ERP) ทั้งหมด
                        </motion.p>
                    </div>
                </div>
               
            </div>
            {/* === END: Header Background with Curved Bottom === */}

            <main className="relative -mt-32"> {/* ปรับ -mt ให้สูงขึ้น */}
                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            
                            {/* คอลัมน์ซ้าย (Sidebar Menu) */}
                            <div className="lg:col-span-1">
                                <div ref={sidebarRef} className="sticky top-24 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 px-2">โมดูลทั้งหมด</h3>
                                    <nav className="flex flex-col space-y-1">
                                        {MIS_MODULES.map((m) => {
                                            const isActive = selectedModule?.id === m.id;
                                            return (
                                                <button
                                                    key={m.id}
                                                    data-module-id={m.id} 
                                                    onClick={() => handleModuleSelect(m)}
                                                    className={`flex items-center gap-3 w-full p-3 rounded-md transition-all duration-200 text-sm
                                                        ${isActive 
                                                            ? 'bg-blue-600 text-white font-semibold shadow-md' 
                                                            : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                                                        }`}
                                                >
                                                    <m.Icon size={20} strokeWidth={2} />
                                                    <span>{m.title}</span>
                                                </button>
                                            );
                                        })}
                                    </nav>
                                </div>
                            </div>

                            {/* คอลัมน์ขวา (Module Content) */}
                            <div className="lg:col-span-3 relative"> 
                                <motion.div
                                    className="absolute left-0 w-0 h-0 z-20"
                                    style={{
                                        borderTop: '12px solid transparent',
                                        borderBottom: '12px solid transparent',
                                        borderRight: '12px solid white', 
                                        left: '-12px', 
                                        transform: 'translateY(-50%)', 
                                    }}
                                    animate={{
                                        top: pointerTop, 
                                    }}
                                    transition={{ 
                                        duration: 0.35, 
                                        ease: "easeInOut" 
                                    }}
                                />

                                <ModuleDisplay module={selectedModule} />
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}