'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  PHR_DAN_SAI_PERSONNEL_DATA,
  ERP_ARTICLES_DATA,
  ANNOUNCEMENTS_DATA,
} from '../../data/adminData';

// --- ไอคอน SVG (ไม่ได้เปลี่ยนแปลง) ---
const IconPencil = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);
const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);
const IconSearch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
// --- สิ้นสุดไอคอน SVG ---


// ----------------------------------------------
// 2. Component สำหรับกลุ่มดาว (แก้ไขสี)
// ----------------------------------------------
const RisingStars = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const initialStars = Array.from({ length: 80 }, () => ({
      id: Math.random(),
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 10,
    }));
    setStars(initialStars);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute bg-yellow-400/70 rounded-full"
          style={{
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            transform: 'translateY(100vh) scale(0.5)',
            opacity: 0,
            animation: `rise ${star.duration}s linear ${star.delay}s infinite`,
          }}
        ></div>
      ))}

      {/* CSS Animation (ไม่ต้องแก้) */}
      <style jsx>{`
        @keyframes rise {
          from {
            transform: translateY(100vh) scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 0.9;
          }
          to {
            transform: translateY(-10vh) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
// ----------------------------------------------
// ▲▲▲ สิ้นสุด Component ดาว ▲▲▲
// ----------------------------------------------


// ----------------------------------------------
// 3. Main Admin Page Component (ปรับแก้ธีม)
// ----------------------------------------------

// ▼▼▼ 1. ลบ 'async' หน้าฟังก์ชันออก ▼▼▼
export default function AdminDashboardPage() {

  // ▼▼▼ 2. ลบโค้ด "หน่วงเวลา" 3 วินาที ออก ▼▼▼
  // (บรรทัด await new Promise... ถูกลบออกไปแล้ว)
  // ▲▲▲ สิ้นสุดการแก้ไข ▲▲▲

  const [activeView, setActiveView] = useState('personnel');
  const [personnel, setPersonnel] = useState(PHR_DAN_SAI_PERSONNEL_DATA);
  const [articles, setArticles] = useState(ERP_ARTICLES_DATA);
  const [announcements, setAnnouncements] = useState(ANNOUNCEMENTS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const SummaryStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm border-b-4 border-sky-500">
        <h3 className="text-sm font-medium text-slate-500">บุคลากรทั้งหมด</h3>
        <p className="text-3xl font-bold text-slate-800">{personnel.length}</p>
      </div>
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm border-b-4 border-emerald-500">
        <h3 className="text-sm font-medium text-slate-500">บทความทั้งหมด</h3>
        <p className="text-3xl font-bold text-slate-800">{articles.length}</p>
      </div>
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm border-b-4 border-orange-500">
        <h3 className="text-sm font-medium text-slate-500">ประกาศทั้งหมด</h3>
        <p className="text-3xl font-bold text-slate-800">{announcements.length}</p>
      </div>
    </div>
  );

  const AdminMenu = () => (
    <div className="flex space-x-2 p-1 bg-white/50 border border-slate-200 rounded-lg mb-6 shadow-sm">
      {menuItems.map((item) => (
        <button
          key={item.key}
          onClick={() => {
            setActiveView(item.key);
            setSearchTerm('');
          }}
          className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
            activeView === item.key
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-200/50'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  // ... (ส่วน useMemo, sourceData, filteredData, handle... ไม่ได้เปลี่ยนแปลง Logic) ...
  const { columns, dataSetter, fields } = useMemo(() => {
    switch (activeView) {
      case 'articles':
        return {
          columns: [
            { key: 'title', label: 'หัวข้อบทความ' },
            { key: 'category', label: 'หมวดหมู่' },
            { key: 'date', label: 'วันที่' },
            { key: 'imageUrl', label: 'รูปภาพ' },
          ],
          dataSetter: setArticles,
          fields: [
            { key: 'title', label: 'หัวข้อบทความ', type: 'text' },
            { key: 'category', label: 'หมวดหมู่', type: 'text' },
            { key: 'date', label: 'วันที่ (dd/mm/yyyy)', type: 'text' },
            { key: 'imageUrl', label: 'Image URL', type: 'text' },
          ],
        };
      case 'announcements':
        return {
          columns: [
            { key: 'title', label: 'หัวข้อประกาศ' },
            { key: 'category', label: 'หมวดหมู่' },
            { key: 'date', label: 'วันที่' },
            { key: 'description', label: 'รายละเอียด' },
          ],
          dataSetter: setAnnouncements,
          fields: [
            { key: 'title', label: 'หัวข้อประกาศ', type: 'text' },
            { key: 'category', label: 'หมวดหมู่', type: 'text' },
            { key: 'date', label: 'วันที่', type: 'text' },
            { key: 'description', label: 'รายละเอียด', type: 'textarea' },
          ],
        };
      case 'personnel':
      default:
        return {
          columns: [
            { key: 'name', label: 'ชื่อ-สกุล' },
            { key: 'position', label: 'ตำแหน่ง' },
            { key: 'iconInitial', label: 'อักษรย่อ' },
          ],
          dataSetter: setPersonnel,
          fields: [
            { key: 'name', label: 'ชื่อ-สกุล', type: 'text' },
            { key: 'position', label: 'ตำแหน่ง', type: 'text' },
            { key: 'iconInitial', label: 'อักษรย่อ (2 ตัว)', type: 'text' },
          ],
        };
    }
  }, [activeView]);

  const sourceData = useMemo(() => {
    switch (activeView) {
      case 'articles': return articles;
      case 'announcements': return announcements;
      default: return personnel;
    }
  }, [activeView, personnel, articles, announcements]);
  
  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return sourceData;
    }
    const searchLower = searchTerm.toLowerCase();
    return sourceData.filter(item => {
      return (
        item.name?.toLowerCase().includes(searchLower) ||
        item.position?.toLowerCase().includes(searchLower) ||
        item.iconInitial?.toLowerCase().includes(searchLower) ||
        item.title?.toLowerCase().includes(searchLower) ||
        item.category?.toLowerCase().includes(searchLower) ||
        item.date?.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower)
      );
    });
  }, [sourceData, searchTerm]);

  const handleAdd = () => {
    const newItem = fields.reduce((acc, field) => {
      acc[field.key] = '';
      return acc;
    }, {});
    setCurrentItem(newItem);
    setModalMode('add');
    setIsModalOpen(true);
  };
  const handleEdit = (item) => {
    setCurrentItem(item);
    setModalMode('edit');
    setIsModalOpen(true);
  };
  const handleDelete = (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) {
      dataSetter(sourceData.filter((item) => item.id !== id));
    }
  };
  const handleModalSave = (formData) => {
    if (modalMode === 'add') {
      const newItemWithId = { ...formData, id: Date.now() };
      dataSetter([...sourceData, newItemWithId]);
    } else {
      dataSetter(sourceData.map((item) => (item.id === formData.id ? formData : item)));
    }
    setIsModalOpen(false);
  };


  return (
    <div className="relative min-h-screen text-slate-700 p-8 overflow-hidden bg-slate-100">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] max-w-[1200px] h-[300px] bg-gradient-to-br from-sky-300/30 via-blue-300/20 to-emerald-300/30 blur-[120px] opacity-80 rounded-full animate-aurora z-0"></div>
      
      <style jsx>{`
        @keyframes aurora-sway {
          0% { transform: translate(-50%, -10%) rotate(0deg); }
          50% { transform: translate(-45%, 10%) rotate(3deg) scale(1.1); }
          100% { transform: translate(-50%, -10%) rotate(0deg); }
        }
        .animate-aurora {
          animation: aurora-sway 25s ease-in-out infinite;
        }
      `}</style>

      <RisingStars />

      <div className="relative z-10 container mx-auto max-w-7xl">
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800 mb-2">
              ระบบจัดการหลังบ้าน <span className="text-sky-600">(Admin Dashboard)</span>
            </h1>
            <p className="text-lg text-slate-500">
              จัดการข้อมูล บุคลากร, บทความ และประกาศ
            </p>
          </div>
          <Link
            href="/"
            className="bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 font-semibold py-2 px-5 rounded-lg shadow-sm transition-colors"
          >
            Logout
          </Link>
        </div>
        
        <SummaryStats />
        <AdminMenu />

        <div className="bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center p-5 border-b border-slate-200 gap-4">
            <h2 className="text-2xl font-bold text-slate-800">
              {menuItems.find((item) => item.key === activeView)?.label}
            </h2>
            
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.g.target.value)}
                placeholder="ค้นหา..."
                className="w-full p-2 pl-10 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <IconSearch />
              </div>
            </div>
          </div>

          <div className="p-5 flex justify-end">
            <button
              onClick={handleAdd}
              className="bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-sky-700 transition"
            >
              + เพิ่มข้อมูลใหม่
            </button>
          </div>

          <DataTable
            columns={columns}
            data={filteredData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {isModalOpen && (
        <CrudModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleModalSave}
          mode={modalMode}
          item={currentItem}
          fields={fields}
        />
      )}
    </div>
  );
}

// ----------------------------------------------
// 5. Data Table Component (ตาราง) (ปรับแก้ธีม)
// ----------------------------------------------
const DataTable = ({ columns, data, onEdit, onDelete }) => {

  let tableRows;

  if (data.length === 0) {
    tableRows = (
      <tr>
        <td colSpan={columns.length + 1} className="p-8 text-center text-slate-400">
          --- ไม่พบข้อมูล (หรือไม่มีข้อมูล) ---
        </td>
      </tr>
    );
  } else {
    tableRows = data.map((item) => (
      <tr key={item.id} className="hover:bg-slate-100/50 transition-colors">
        {columns.map((col) => (
          <td key={`${item.id}-${col.key}`} className="p-4 text-slate-600 align-top">
            {col.key === 'imageUrl' && item[col.key] ? (
              <img src={item[col.key]} alt="Item" className="w-16 h-16 object-cover rounded-md border border-slate-300" />
            ) : (
              <span className="line-clamp-2">{item[col.key]}</span>
            )}
          </td>
        ))}
        <td className="p-4 text-right space-x-2 align-top">
          <button
            onClick={() => onEdit(item)}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium text-yellow-500 bg-yellow-500/10 border border-yellow-500/30 rounded-md hover:bg-yellow-500/20"
          >
            <IconPencil />
            แก้ไข
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/30 rounded-md hover:bg-red-500/20"
          >
            <IconTrash />
            ลบ
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max text-left">
        <thead>
          <tr className="border-b border-t border-slate-200 bg-slate-100/30">
            {columns.map((col) => (
              <th key={col.key} className="p-4 text-sm font-semibold text-slate-500 uppercase">
                {col.label}
              </th>
            ))}
            <th className="p-4 text-sm font-semibold text-slate-500 uppercase text-right">
              Actions
            </th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-slate-200/50">
          {tableRows}
        </tbody>

      </table>
    </div>
  );
};

// ----------------------------------------------
// 6. Modal Component (หน้าต่าง Add/Edit) (ปรับแก้ธีม)
// ----------------------------------------------
const CrudModal = ({ isOpen, onClose, onSave, mode, item, fields }) => {
  const [formData, setFormData] = useState(item || {});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-2xl font-bold text-slate-800">
              {mode === 'add' ? 'เพิ่มข้อมูลใหม่' : 'แก้ไขข้อมูล'}
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {fields.map((field) =>
              field.type === 'textarea' ? (
                <div key={field.key}>
                  <label htmlFor={field.key} className="block text-sm font-medium text-slate-600 mb-1">
                    {field.label}
                  </label>
                  <textarea
                    id={field.key}
                    rows="4"
                    value={formData[field.key] || ''}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-100 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  ></textarea>
                </div>
              ) : (
                <div key={field.key}>
                  <label htmlFor={field.key} className="block text-sm font-medium text-slate-600 mb-1">
                    {field.label}
                  </label>
                  <input
                    id={field.key}
                    type={field.type}
                    value={formData[field.key] || ''}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-100 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
              )
            )}
          </div>
          <div className="p-6 border-t border-slate-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 font-medium rounded-lg hover:bg-slate-200 transition"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 transition"
            >
              {mode === 'add' ? 'บันทึก' : 'อัปเดต'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Data Config (ไม่ได้เปลี่ยนแปลง) ---
const menuItems = [
  { key: 'personnel', label: 'จัดการบุคลากร' },
  { key: 'articles', label: 'จัดการบทความ' },
  { key: 'announcements', label: 'จัดการประกาศ' },
];