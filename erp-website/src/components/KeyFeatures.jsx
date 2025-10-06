// src/components/KeyFeatures.jsx
"use client";

import React, { useState, useEffect, useRef } from 'react';

// ----------------------------------------------------------------------
// Icon Definitions (Modern SVG Icons)
// ----------------------------------------------------------------------

// 1. ตารางเวรซับซ้อนอัตโนมัติ (Schedule)
const IconSchedule = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zm10.707-9.293a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414z" />
    </svg>
);

// 2. การควบคุมใบอนุญาตวิชาชีพ (Compliance)
const IconCompliance = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.103A.842.842 0 0021 6.5v10a.842.842 0 00-1.382.46l-4.288 3.518a.842.842 0 01-1.076.01L12 18l-3.254 2.47a.842.842 0 01-1.076-.01l-4.288-3.518A.842.842 0 003 16.5v-10c0-.528.423-.974.954-1.078l7-1.432a1.002 1.002 0 01.192 0l7 1.432c.531.104.954.55.954 1.078z" />
    </svg>
);

// 3. การวิเคราะห์สมรรถนะบุคลากร (Performance Analytics)
const IconAnalytics = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 6-6M9 10V4.07M21 12H3" />
    </svg>
);


// ----------------------------------------------------------------------
// Component: FeatureCard (เพิ่ม Logic Fade-in ต่อ Card)
// ----------------------------------------------------------------------
const FeatureCard = ({ icon, title, description }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // เมื่อ Component เข้ามาในหน้าจอ (Threshold 0.1: 10% ของ Card ปรากฏ)
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    // ทำให้ Card หายไป (Opacity: 0) เมื่อเลื่อนพ้นขอบเขต
                    setIsVisible(false);
                }
            },
            { threshold: 0.1 } 
        );

        if (ref.current) {
            observer.observe(ref.current);
        }
        
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div 
            ref={ref}
            // Transition effect: ค่อยๆ เลื่อนขึ้นและจางเข้า
            className={`
                bg-white p-8 rounded-xl shadow-xl border-t-4 border-indigo-500
                transition-all duration-700 ease-out transform
                hover:-translate-y-1 hover:shadow-2xl hover:border-indigo-700  /* เพิ่มลูกเล่น Hover Effect */
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                cursor-pointer /* เพิ่ม cursor pointer เพื่อบ่งบอกว่าสามารถโต้ตอบได้ */
            `}
        >
            {/* Icon Area: เปลี่ยนสีพื้นหลังเล็กน้อย */}
            <div className="p-3 inline-block rounded-lg bg-indigo-50 mb-4">
                <span className="text-4xl text-indigo-600">{icon}</span>
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
            <p className="text-gray-600 text-base">
                {description}
            </p>
        </div>
    );
};

// ----------------------------------------------------------------------
// Component: KeyFeatures (Logic หลัก)
// ----------------------------------------------------------------------
const KeyFeatures = () => {
    
    // อัปเดตคุณสมบัติหลักให้เข้ากับระบบ HR/Medical ERP และใช้ SVG Icon
    const features = [
        { 
            icon: IconSchedule, 
            title: 'ตารางเวรซับซ้อนอัตโนมัติ', 
            description: 'จัดการตารางแพทย์ พยาบาล และเจ้าหน้าที่เทคนิค รวมถึงการคำนวณชั่วโมง OT และวันหยุดได้อย่างแม่นยำตามข้อบังคับวิชาชีพ' 
        },
        { 
            icon: IconCompliance, 
            title: 'การควบคุมใบอนุญาตวิชาชีพ', 
            description: 'ติดตามสถานะ วันหมดอายุ และการต่อใบอนุญาตประกอบวิชาชีพของบุคลากรทางการแพทย์ทั้งหมดโดยอัตโนมัติ เพื่อรักษามาตรฐาน' 
        },
        { 
            icon: IconAnalytics, 
            title: 'การวิเคราะห์สมรรถนะบุคลากร', 
            description: 'ประเมินผลงาน (KPIs) จัดทำรายงานชั่วโมงทำงาน และวางแผนพัฒนาพนักงานเฉพาะทางด้วยข้อมูลเชิงลึกแบบ Real-time' 
        },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
                    จุดเด่นเฉพาะด้านสำหรับโรงพยาบาล
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        // FeatureCard แต่ละใบจะจัดการ Animation ของตัวเอง
                        <FeatureCard key={index} {...feature} /> 
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KeyFeatures;
