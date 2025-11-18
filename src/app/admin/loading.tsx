import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    // ▼▼▼ 1. เปลี่ยนสีพื้นหลังให้ตรงกับ Admin page (bg-slate-100) ▼▼▼
    <div className="flex h-screen w-full items-center justify-center bg-slate-100">
      
      {/* ▼▼▼ 2. เปลี่ยนสีตัวหมุนให้เป็นสีหลักของธีม (text-sky-600) ▼▼▼ */}
      <Loader2 className="h-12 w-12 animate-spin text-sky-600" />
    
    </div>
  );
}