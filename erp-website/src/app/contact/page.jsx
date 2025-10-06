// src/app/contact/page.jsx
import React from 'react';

// Component สำหรับแสดงข้อมูลการติดต่อด้านข้าง
const ContactInfo = () => (
  <div className="bg-blue-700 text-white p-8 rounded-lg shadow-xl">
    <h3 className="text-2xl font-bold mb-4">ข้อมูลติดต่อ</h3>
    <p className="mb-4">
      หากมีข้อสงสัยหรือต้องการนัดนำเสนอระบบ กรุณาติดต่อเราผ่านช่องทางด้านล่าง
    </p>
    <ul className="space-y-3">
      <li className="flex items-center">
        <span>📧</span><span className="ml-3">Email: sales@erp-website.com</span>
      </li>
      <li className="flex items-center">
        <span>📞</span><span className="ml-3">โทรศัพท์: +66 8x xxx xxxx</span>
      </li>
      <li className="flex items-center">
        <span>📍</span><span className="ml-3">ที่อยู่: อาคาร ERP Solution Center, กรุงเทพฯ</span>
      </li>
    </ul>
  </div>
);

// Component สำหรับแบบฟอร์มติดต่อ
const ContactForm = () => {
  // ใน Next.js App Router ฟังก์ชันนี้จะทำหน้าที่ส่งข้อมูลไปยัง Backend (PHP API)
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("แบบฟอร์มถูกส่ง (ฟังก์ชันการส่งข้อมูลจะถูกเพิ่มในภายหลัง)");
    // Logic การส่งข้อมูล (POST Request) ไปยัง PHP Backend จะอยู่ที่นี่
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">ชื่อ - นามสกุล</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">อีเมลติดต่อ</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="company" className="block text-gray-700 font-semibold mb-2">ชื่อบริษัท</label>
        <input 
          type="text" 
          id="company" 
          name="company" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">ข้อความ/รายละเอียดที่ต้องการสอบถาม</label>
        <textarea 
          id="message" 
          name="message" 
          rows="4" 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
      >
        ส่งข้อความ
      </button>
    </form>
  );
};

// Component หลักของหน้า /contact
export default function ContactPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-800">
          ติดต่อเราเพื่อเริ่มต้น
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          ผู้เชี่ยวชาญของเราพร้อมให้คำปรึกษาแก่คุณ
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <ContactInfo />
          </div>
          <div className="md:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}