// src/components/ModulesOverview.jsx
import React from 'react';
import Link from 'next/link';

const modules = [
  'การเงินและบัญชี (Finance & Accounting)',
  'การผลิต (Manufacturing)',
  'การจัดการคลังสินค้า (Inventory & Warehouse)',
  'ทรัพยากรบุคคล (Human Resources - HR)',
  'การจัดซื้อจัดจ้าง (Procurement)',
  'การขายและ CRM (Sales & CRM)',
];

const ModulesOverview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-800">
          ทุกฟังก์ชันที่ธุรกิจคุณต้องการ
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          โมดูลที่ปรับแต่งได้เพื่อตอบโจทย์ทุกอุตสาหกรรม
        </p>

        {/* Module Tags */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {modules.map((moduleName, index) => (
            <span 
              key={index} 
              className="bg-blue-100 text-blue-800 text-lg font-medium px-5 py-2 rounded-full shadow-md hover:bg-blue-200 transition duration-300 cursor-default"
            >
              {moduleName}
            </span>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16">
          <Link 
            href="/modules" 
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-lg"
          >
            สำรวจรายละเอียดโมดูลทั้งหมด
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ModulesOverview;