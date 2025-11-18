//หมวดหมู่

'use client';

import React from 'react';
import Navbar from '../../components/Navbar';

// ตัวอย่างข้อมูลจำลองของการเงิน & บัญชี
const FINANCE_DATA = [
  { title: 'งบประมาณประจำปี', desc: 'จัดการงบประมาณและแผนการใช้จ่ายของโรงพยาบาล' },
  { title: 'รายงานการเงิน', desc: 'สร้างรายงานการเงินรายเดือนและรายปี' },
  { title: 'การเบิกจ่าย', desc: 'ติดตามคำขอเบิกจ่ายและอนุมัติการจ่ายเงิน' },
  { title: 'ระบบสินไหม', desc: 'ตรวจสอบและจัดการการเคลมประกันหรือสินไหม' },
  { title: 'สรุปค่าใช้จ่าย', desc: 'วิเคราะห์และสรุปค่าใช้จ่ายของแต่ละแผนก' },
  { title: 'กราฟและแดชบอร์ด', desc: 'แสดงผลภาพรวมทางการเงินในรูปแบบ Dashboard' },
];

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e3a5f] to-[#1a2332] text-slate-200">
      <Navbar modules={[]} /> {/* ใส่ modules ว่างได้ หรือจะใส่จริงจาก MIS_MODULES ก็ได้ */}

      <main className="container mx-auto px-4 max-w-7xl pt-24 pb-16">
        {/* ประกาศชื่อหน้า */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            โมดูล: การเงิน & บัญชี (FIN)
          </h1>
          <p className="text-slate-300 mt-2">
            หน้านี้แสดงข้อมูลจำลองสำหรับโมดูลการเงิน & บัญชี โรงพยาบาล
          </p>
        </div>

        {/* Grid แสดงข้อมูล */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {FINANCE_DATA.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg hover:border-blue-400 hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
