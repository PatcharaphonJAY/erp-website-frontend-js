// src/app/partners/page.jsx
import React from 'react';

// ข้อมูลจำลองผู้สนับสนุน (Mock Data)
const mockPartners = [
  { id: 1, name: 'Tech Consulting Hub', type: 'Implementation Partner', logo: '🛠️' },
  { id: 2, name: 'Cloud Service Pro', type: 'Infrastructure Provider', logo: '☁️' },
  { id: 3, name: 'Secure Audit Firm', type: 'Security & Compliance', logo: '🔒' },
  { id: 4, name: 'Data Insights Co.', type: 'Business Intelligence', logo: '📈' },
];

const PartnerLogoCard = ({ partner }) => (
  <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-xl transition duration-300">
    <span className="text-6xl mb-3">{partner.logo}</span>
    <h3 className="text-lg font-bold text-gray-900">{partner.name}</h3>
    <p className="text-sm text-blue-600 mt-1">{partner.type}</p>
  </div>
);

export default function PartnersPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-800">
          พันธมิตรและผู้สนับสนุนระบบ
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          เราทำงานร่วมกับผู้นำด้านเทคโนโลยีและบริการ เพื่อมอบโซลูชันที่ดีที่สุด
        </p>

        {/* Grid แสดงผู้สนับสนุน */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {mockPartners.map((partner) => (
            <PartnerLogoCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>
    </div>
  );
}