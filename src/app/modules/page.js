// ไฟล์: src/app/modules/page.js (ไฟล์ใหม่)

import { Suspense } from 'react';
import ModulesPageClient from './ModulesPageClient'; // <-- Import โค้ดหน้าเดิมของคุณ

export default function ModulesPage() {
  return (
    // นี่คือ "Suspense Boundary" ที่ Vercel ต้องการ
    // มันจะบอก Next.js ว่า "เดี๋ยวค่อยโหลด ModulesPageClient นะ ให้แสดง Loading... ไปก่อน"
    <Suspense fallback={<div>Loading Page...</div>}>
      <ModulesPageClient />
    </Suspense>
  );
}