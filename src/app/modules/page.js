// ไฟล์: src/app/modules/page.js

export const dynamic = 'force-dynamic'; // <--- เพิ่มบรรทัดนี้ครับ!

import { Suspense } from 'react';
import ModulesPageClient from './ModulesPageClient';

export default function ModulesPage() {
  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      <ModulesPageClient />
    </Suspense>
  );
}
// test deploy (บรรทัดนี้จะมีหรือไม่มีก็ได้ ไม่สำคัญครับ)