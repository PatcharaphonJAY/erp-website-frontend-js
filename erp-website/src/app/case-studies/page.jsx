// src/app/case-studies/page.jsx
import React from 'react';

// ข้อมูลจำลองผู้ใช้งาน (Mock Data) - แทนที่ด้วยการดึง API ในอนาคต
const mockUsers = [
  { id: 1, name: 'บริษัท โกลบอลเทค จำกัด', industry: 'การผลิตชิ้นส่วนรถยนต์', benefit: 'ลดของเสียในสายการผลิต 15%', logo: '⚙️' },
  { id: 2, name: 'เครือ เดอะริชชี่ กรุ๊ป', industry: 'ค้าปลีกและกระจายสินค้า', benefit: 'จัดการคลังสินค้าได้รวดเร็วขึ้น 2 เท่า', logo: '🛒' },
  { id: 3, name: 'ไฟแนนซ์ พลัส คอร์ป', industry: 'บริการทางการเงิน', benefit: 'ปิดงบการเงินได้ภายใน 3 วันทำการ', logo: '🏦' },
  { id: 4, name: 'ฟาร์มสุข ออร์แกนิก', industry: 'การเกษตรและอาหาร', benefit: 'ติดตามผลผลิตและต้นทุนได้แบบ Real-time', logo: '🌱' },
];

const CaseStudyCard = ({ user }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 border-l-4 border-yellow-500">
    <div className="text-5xl mb-3">{user.logo}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h3>
    <p className="text-sm text-gray-500 mb-3">{user.industry}</p>
    <p className="text-base font-semibold text-blue-600">
      ผลลัพธ์: {user.benefit}
    </p>
    <a href={`#`} className="mt-3 inline-block text-sm text-yellow-600 hover:text-yellow-700 transition duration-300">
      อ่านกรณีศึกษาฉบับเต็ม →
    </a>
  </div>
);

export default function CaseStudiesPage() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-800">
          เรื่องราวความสำเร็จของลูกค้า
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          ลูกค้าหลากหลายอุตสาหกรรมไว้วางใจระบบ ERP ของเรา
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockUsers.map((user) => (
            <CaseStudyCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}