// src/app/modules/page.jsx

import React from 'react';

// ข้อมูลจำลอง (Mock Data) - แทนที่ด้วยการดึง API ในอนาคต
const mockModules = [
  {
    id: 1,
    title: 'การเงินและบัญชี (Finance & Accounting)',
    icon: '💰',
    summary: 'จัดการบัญชีแยกประเภท, ลูกหนี้-เจ้าหนี้, งบประมาณ, และงบการเงินอย่างแม่นยำและเป็นไปตามข้อกำหนดทางกฎหมาย',
    tag: 'Financial',
  },
  {
    id: 2,
    title: 'การผลิต (Manufacturing)',
    icon: '⚙️',
    summary: 'วางแผนความต้องการวัสดุ (MRP), จัดการคำสั่งผลิต, ควบคุมคุณภาพ, และเพิ่มประสิทธิภาพของสายการผลิต',
    tag: 'Operations',
  },
  {
    id: 3,
    title: 'การจัดการคลังสินค้า (Inventory & WMS)',
    icon: '📦',
    summary: 'ติดตามและควบคุมระดับสินค้าคงคลังแบบ Real-time, บริหารจัดการพื้นที่จัดเก็บ, และเพิ่มความเร็วในการเบิกจ่าย',
    tag: 'Supply Chain',
  },
  {
    id: 4,
    title: 'ทรัพยากรบุคคล (Human Resources - HR)',
    icon: '🧑‍💼',
    summary: 'จัดการเงินเดือน, สวัสดิการ, เวลาเข้า-ออกงาน, การสรรหาบุคลากร, และการพัฒนาพนักงานในองค์กร',
    tag: 'HR',
  },
  {
    id: 5,
    title: 'การขายและ CRM (Sales & CRM)',
    icon: '🤝',
    summary: 'จัดการ Leads, โอกาสทางการขาย, ใบเสนอราคา, คำสั่งซื้อ, และประวัติลูกค้าเพื่อสร้างความสัมพันธ์ที่ดีในระยะยาว',
    tag: 'CRM',
  },
];

// Component สำหรับแสดง Card ของแต่ละโมดูล
const ModuleCard = ({ module }) => (
  <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-blue-500 hover:shadow-2xl transition duration-500">
    <div className="flex items-center mb-4">
      <span className="text-4xl mr-4">{module.icon}</span>
      <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{module.summary}</p>
    <div className="flex justify-between items-center">
        <span className="text-xs font-semibold uppercase px-3 py-1 bg-blue-100 text-blue-800 rounded-full">{module.tag}</span>
        {/* Link นี้ในอนาคตจะนำไปสู่ /modules/[id] หรือ /modules/finance */}
        <a href={`#`} className="text-blue-600 hover:text-blue-800 font-medium text-sm transition duration-300">
            ดูรายละเอียด →
        </a>
    </div>
  </div>
);

// Component หลักของหน้า /modules
export default function ModulesPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-800">
          สำรวจโมดูลของระบบ ERP
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          เชื่อมโยงทุกส่วนงานเข้าด้วยกัน เพื่อการดำเนินงานที่มีประสิทธิภาพสูงสุด
        </p>

        {/* Grid แสดงโมดูล */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
}