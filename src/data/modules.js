// src/data/modules.js

// Custom SVG Icons Component
export const Icons = {
  CreditCard: ({ size = 24, strokeWidth = 2, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  Users: ({ size = 24, strokeWidth = 2, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Package: ({ size = 24, strokeWidth = 2, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16.5 9.4l-9-5.19"/>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  ShieldCheck: ({ size = 24, strokeWidth = 2, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  ),
  FileText: ({ size = 24, strokeWidth = 2, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  ShoppingCart: ({ size = 24, strokeWidth = 2, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="9" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
  Settings: ({ size = 24, strokeWidth = 2, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m-2.8 2.8l-4.2 4.2m10.4 0l-4.2-4.2M7.8 7.8L3.6 3.6"/>
      <path d="M20.66 12A8.66 8.66 0 0 1 12 20.66 8.66 8.66 0 0 1 3.34 12 8.66 8.66 0 0 1 12 3.34 8.66 8.66 0 0 1 20.66 12z"/>
    </svg>
  ),
  Megaphone: ({ size = 24, strokeWidth = 2, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m3 11 18-5v12L3 14v-3z"/>
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
    </svg>
  ),
  BarChart3: ({ size = 24, strokeWidth = 2, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 3v18h18"/>
      <path d="M18 17V9"/>
      <path d="M13 17V5"/>
      <path d="M8 17v-3"/>
    </svg>
  ),
};

export const MIS_MODULES = [
  {
    id: 'fin',
    title: 'การเงิน & บัญชี (FIN)',
    desc: 'บริหารงบประมาณ การเบิกจ่าย และระบบสินไหมอัตโนมัติ',
    Icon: Icons.CreditCard,
    features: [
      "เชื่อมต่อระบบธนาคาร KTB Corporate Online",
      "ออกรายงานการเงินประจำวัน/เดือน/ปี อัตโนมัติ",
      "ตรวจสอบสิทธิ์การรักษาพยาบาลแบบ Real-time",
      "จัดการระบบบัญชีแยกประเภท (General Ledger)",
    ],
    performanceMetrics: { 'ประสิทธิภาพ': 92, 'ความเสถียร': 98, 'การยอมรับ': 85, 'ความปลอดภัย': 95, 'การเชื่อมต่อ': 88 },
    summaryStats: { 'Uptime': '99.98%', 'ผู้ใช้ (Active)': '45 คน', 'เวลาตอบสนอง': '120ms' },
    overallScore: 91,
    historicalPerformance: [
      { month: 'พ.ค.', score: 88 }, { month: 'มิ.ย.', score: 89 }, { month: 'ก.ค.', score: 90 },
      { month: 'ส.ค.', score: 92 }, { month: 'ก.ย.', score: 91 }, { month: 'ต.ค.', score: 92 },
    ],
    integrationPoints: ['HRM (ข้อมูลเงินเดือน)', 'INV (ข้อมูลการเบิกจ่าย)', 'HOSxP (ข้อมูลค่ารักษา)'],
    changelog: [
      { version: '2.1.5', date: '12 ต.ค. 2568', details: 'ปรับปรุงความเร็วในการออกรายงานสินไหม' },
      { version: '2.1.4', date: '28 ก.ย. 2568', details: 'เพิ่มการรองรับการชำระเงินผ่าน QR Code' },
    ],
  },
  {
    id: 'hrm',
    title: 'ทรัพยากรบุคคล (HRM)',
    desc: 'บริหารจัดการข้อมูลบุคลากร เงินเดือน และการบริหารเวร',
    Icon: Icons.Users,
    features: [
      "จัดการฐานข้อมูลและประวัติบุคลากร (HR Profile)",
      "คำนวณเงินเดือน ภาษี และประกันสังคม",
      "ระบบลงเวลาเข้า-ออกงาน (Time Attendance)",
      "จัดตารางเวรปฏิบัติงานและแลกเวร",
    ],
    performanceMetrics: { 'ประสิทธิภาพ': 88, 'ความเสถียร': 95, 'การยอมรับ': 92, 'ความปลอดภัย': 90, 'การเชื่อมต่อ': 85 },
    summaryStats: { 'Uptime': '99.99%', 'ผู้ใช้ (Active)': '150+ คน', 'เวลาตอบสนอง': '150ms' },
    overallScore: 90,
    historicalPerformance: [
      { month: 'พ.ค.', score: 85 }, { month: 'มิ.ย.', score: 86 }, { month: 'ก.ค.', score: 88 },
      { month: 'ส.ค.', score: 87 }, { month: 'ก.ย.', score: 90 }, { month: 'ต.ค.', score: 88 },
    ],
    integrationPoints: ['FIN (ข้อมูลเงินเดือน)', 'ทุกแผนก (ข้อมูลบุคลากร)'],
    changelog: [
      { version: '3.2.0', date: '05 ต.ค. 2568', details: 'ปรับปรุง UI หน้าจัดการเวรให้ใช้งานง่ายขึ้น' },
      { version: '3.1.8', date: '15 ก.ย. 2568', details: 'เพิ่มระบบการขออนุมัติลาออนไลน์' },
    ],
  },
  {
    id: 'inv',
    title: 'คลังเวชภัณฑ์ (INV)',
    desc: 'ควบคุมสต็อกคลังเวชภัณฑ์ การรับเข้า-เบิกออก',
    Icon: Icons.Package,
    features: [
      "ระบบแจ้งเตือนเมื่อสต็อกใกล้หมด (Re-order Point)",
      "รองรับการทำงานแบบ Barcode/QR Code",
      "จัดการ Lot Number และวันหมดอายุของยา",
      "ตัดสต็อกอัตโนมัติเมื่อมีการเบิกจ่าย",
    ],
    performanceMetrics: { 'ประสิทธิภาพ': 95, 'ความเสถียร': 96, 'การยอมรับ': 88, 'ความปลอดภัย': 92, 'การเชื่อมต่อ': 94 },
    summaryStats: { 'Uptime': '99.98%', 'ผู้ใช้ (Active)': '62 คน', 'เวลาตอบสนอง': '110ms' },
    overallScore: 93,
    historicalPerformance: [
        { month: 'พ.ค.', score: 90 }, { month: 'มิ.ย.', score: 91 }, { month: 'ก.ค.', score: 92 },
        { month: 'ส.ค.', score: 94 }, { month: 'ก.ย.', score: 93 }, { month: 'ต.ค.', score: 95 },
    ],
    integrationPoints: ['FIN (ข้อมูลการเบิกจ่าย)', 'PROC (ข้อมูลรับเข้า)', 'HOSxP (ข้อมูลยา)'],
    changelog: [
        { version: '4.0.1', date: '10 ต.ค. 2568', details: 'เพิ่มการรองรับคลังย่อย' },
        { version: '3.9.0', date: '25 ส.ค. 2568', details: 'ปรับปรุงระบบ Barcode ให้รวดเร็วยิ่งขึ้น' },
    ],
  },
  {
    id: 'qm',
    title: 'บริหารคุณภาพ (QM & RM)',
    desc: 'บริหารความเสี่ยง และติดตามตัวชี้วัดคุณภาพบริการ',
    Icon: Icons.ShieldCheck,
    features: [
      "ระบบรายงานอุบัติการณ์และความเสี่ยง",
      "เครื่องมือประเมินความเสี่ยงเชิงรุก",
      "ติดตามตัวชี้วัดคุณภาพโรงพยาบาล (KPI)",
      "จัดการข้อร้องเรียนและคำแนะนำจากผู้ป่วย",
    ],
    performanceMetrics: { 'ประสิทธิภาพ': 89, 'ความเสถียร': 97, 'การยอมรับ': 82, 'ความปลอดภัย': 96, 'การเชื่อมต่อ': 91 },
    summaryStats: { 'Uptime': '99.99%', 'ผู้ใช้ (Active)': '35 คน', 'เวลาตอบสนอง': '140ms' },
    overallScore: 91,
    historicalPerformance: [
        { month: 'พ.ค.', score: 86 }, { month: 'มิ.ย.', score: 88 }, { month: 'ก.ค.', score: 89 },
        { month: 'ส.ค.', score: 90 }, { month: 'ก.ย.', score: 92 }, { month: 'ต.ค.', score: 91 },
    ],
    integrationPoints: ['ทุกแผนก (รายงานอุบัติการณ์)', 'BI (ข้อมูล KPI)'],
    changelog: [
        { version: '1.5.0', date: '01 ก.ย. 2568', details: 'เพิ่ม Dashboard สรุปความเสี่ยง' },
        { version: '1.4.2', date: '18 ก.ค. 2568', details: 'ปรับปรุง Workflow การจัดการข้อร้องเรียน' },
    ],
  },
  {
    id: 'his',
    title: 'เวชระเบียน (HIS/EHR)',
    desc: 'เชื่อมต่อ HOSxP และจัดการเอกสารผู้ป่วยดิจิทัล',
    Icon: Icons.FileText,
    features: [
      "เชื่อมต่อข้อมูลกับ HOSxP แบบไร้รอยต่อ",
      "ระบบเวชระเบียนอิเล็กทรอนิกส์ (EMR)",
      "สแกนและจัดเก็บเอกสารเก่าในรูปแบบดิจิทัล",
      "รองรับมาตรฐานความปลอดภัยข้อมูล PDPA",
    ],
    performanceMetrics: { 'ประสิทธิภาพ': 96, 'ความเสถียร': 99, 'การยอมรับ': 94, 'ความปลอดภัย': 98, 'การเชื่อมต่อ': 99 },
    summaryStats: { 'Uptime': '99.99%', 'ผู้ใช้ (Active)': '200+ คน', 'เวลาตอบสนอง': '95ms' },
    overallScore: 97,
    historicalPerformance: [
        { month: 'พ.ค.', score: 94 }, { month: 'มิ.ย.', score: 95 }, { month: 'ก.ค.', score: 96 },
        { month: 'ส.ค.', score: 97 }, { month: 'ก.ย.', score: 96 }, { month: 'ต.ค.', score: 98 },
    ],
    integrationPoints: ['HOSxP (ข้อมูลหลัก)', 'ทุกแผนกทางคลินิก'],
    changelog: [
        { version: '5.0.0', date: '20 ส.ค. 2568', details: 'อัปเกรดการเชื่อมต่อ HOSxP API' },
        { version: '4.8.0', date: '01 มิ.ย. 2568', details: 'เพิ่มระบบจัดการเอกสาร Consent Form' },
    ],
  },
  {
    id: 'proc',
    title: 'การจัดซื้อจัดจ้าง (PROC)',
    desc: 'วางแผนจัดซื้อ ติดตามการเบิกจ่าย และควบคุมต้นทุน',
    Icon: Icons.ShoppingCart,
    features: [
      "ระบบขออนุมัติจัดซื้อ (Purchase Request)",
      "บริหารจัดการข้อมูลผู้ขาย (Supplier Management)",
      "ควบคุมงบประมาณและติดตามการเบิกจ่าย",
      "เชื่อมต่อกับระบบจัดซื้อจัดจ้างภาครัฐ (e-GP)",
    ],
    performanceMetrics: { 'ประสิทธิภาพ': 91, 'ความเสถียร': 97, 'การยอมรับ': 86, 'ความปลอดภัย': 93, 'การเชื่อมต่อ': 90 },
    summaryStats: { 'Uptime': '99.98%', 'ผู้ใช้ (Active)': '38 คน', 'เวลาตอบสนอง': '135ms' },
    overallScore: 91,
    historicalPerformance: [
        { month: 'พ.ค.', score: 88 }, { month: 'มิ.ย.', score: 89 }, { month: 'ก.ค.', score: 90 },
        { month: 'ส.ค.', score: 91 }, { month: 'ก.ย.', score: 92 }, { month: 'ต.ค.', score: 91 },
    ],
    integrationPoints: ['FIN (ข้อมูลการจ่ายเงิน)', 'INV (ข้อมูลรับเข้า)'],
    changelog: [
        { version: '2.2.0', date: '11 ก.ย. 2568', details: 'ปรับปรุงหน้า Supplier Portal' },
        { version: '2.1.0', date: '22 ก.ค. 2568', details: 'เชื่อมต่อ API ระบบ e-GP' },
    ],
  },
  {
    id: 'pm',
    title: 'ระบบซ่อมบำรุง (PM)',
    desc: 'วางแผนและติดตามการบำรุงรักษาอุปกรณ์และเครื่องมือแพทย์',
    Icon: Icons.Settings,
    features: [
      "วางแผนการบำรุงรักษาเชิงป้องกัน (Preventive Maintenance)",
      "ระบบแจ้งซ่อมและติดตามสถานะ (Work Order)",
      "ทะเบียนและประวัติการซ่อมเครื่องมือแพทย์",
      "วิเคราะห์ข้อมูลการซ่อมบำรุงเพื่อลดค่าใช้จ่าย",
    ],
    performanceMetrics: { 'ประสิทธิภาพ': 93, 'ความเสถียร': 98, 'การยอมรับ': 89, 'ความปลอดภัย': 91, 'การเชื่อมต่อ': 87 },
    summaryStats: { 'Uptime': '99.99%', 'ผู้ใช้ (Active)': '41 คน', 'เวลาตอบสนอง': '125ms' },
    overallScore: 92,
    historicalPerformance: [
        { month: 'พ.ค.', score: 89 }, { month: 'มิ.ย.', score: 90 }, { month: 'ก.ค.', score: 92 },
        { month: 'ส.ค.', score: 93 }, { month: 'ก.ย.', score: 91 }, { month: 'ต.ค.', score: 92 },
    ],
    integrationPoints: ['INV (ข้อมูลอะไหล่)', 'ทุกแผนก (แจ้งซ่อม)'],
    changelog: [
        { version: '3.0.0', date: '30 ก.ย. 2568', details: 'เพิ่มระบบ Mobile Application สำหรับช่าง' },
        { version: '2.8.5', date: '10 ส.ค. 2568', details: 'ปรับปรุงการแจ้งเตือน PM' },
    ],
  },
  {
    id: 'mktg',
    title: 'การตลาด & สื่อสารองค์กร',
    desc: 'บริหารจัดการแคมเปญส่งเสริมสุขภาพและการสื่อสารองค์กร',
    Icon: Icons.Megaphone,
    features: [
      "บริหารจัดการแคมเปญส่งเสริมสุขภาพ",
      "ระบบประกาศข่าวสารภายในองค์กร",
      "เครื่องมือบริหารความสัมพันธ์ผู้ป่วย (PRM)",
      "วิเคราะห์ข้อมูลการตลาดและกลุ่มเป้าหมาย",
    ],
    performanceMetrics: { 'ประสิทธิภาพ': 87, 'ความเสถียร': 96, 'การยอมรับ': 84, 'ความปลอดภัย': 94, 'การเชื่อมต่อ': 89 },
    summaryStats: { 'Uptime': '99.98%', 'ผู้ใช้ (Active)': '15 คน', 'เวลาตอบสนอง': '160ms' },
    overallScore: 90,
    historicalPerformance: [
        { month: 'พ.ค.', score: 85 }, { month: 'มิ.ย.', score: 86 }, { month: 'ก.ค.', score: 87 },
        { month: 'ส.ค.', score: 88 }, { month: 'ก.ย.', score: 89 }, { month: 'ต.ค.', score: 90 },
    ],
    integrationPoints: ['BI (ข้อมูลวิเคราะห์)', 'Website (ประกาศข่าวสาร)'],
    changelog: [
        { version: '1.2.0', date: '03 ต.ค. 2568', details: 'เพิ่มเครื่องมือสร้าง Landing Page' },
        { version: '1.1.0', date: '01 ก.ย. 2568', details: 'เชื่อมต่อ Facebook API สำหรับแคมเปญ' },
    ],
  },
  {
    id: 'bi',
    title: 'รายงานเชิงวิเคราะห์ (BI)',
    desc: 'ประมวลผลข้อมูลเพื่อแสดง Dashboard และสนับสนุนการตัดสินใจ',
    Icon: Icons.BarChart3,
    features: [
      "Dashboard สรุปภาพรวมสำหรับผู้บริหาร",
      "วิเคราะห์ข้อมูลผู้ป่วยนอกและผู้ป่วยใน (OPD/IPD Analytics)",
      "ติดตามตัวชี้วัดคุณภาพบริการ (Service KPI)",
      "Export รายงานเป็นไฟล์ Excel/PDF",
    ],
    performanceMetrics: { 'ประสิทธิภาพ': 85, 'ความเสถียร': 94, 'การยอมรับ': 80, 'ความปลอดภัย': 97, 'การเชื่อมต่อ': 99 },
    summaryStats: { 'Uptime': '99.97%', 'ผู้ใช้ (Active)': '25 คน', 'เวลาตอบสนอง': '350ms' },
    overallScore: 91,
    historicalPerformance: [
        { month: 'พ.ค.', score: 88 }, { month: 'มิ.ย.', score: 89 }, { month: 'ก.ค.', score: 90 },
        { month: 'ส.ค.', score: 92 }, { month: 'ก.ย.', score: 91 }, { month: 'ต.ค.', score: 92 },
    ],
    integrationPoints: ['ทุกโมดูล (ดึงข้อมูล)', 'ผู้บริหาร (แสดงผล)'],
    changelog: [
        { version: '4.5.0', date: '15 ต.ค. 2568', details: 'เพิ่ม Dashboard ใหม่: วิเคราะห์การใช้ยา' },
        { version: '4.4.0', date: '20 ก.ย. 2568', details: 'ปรับปรุงความเร็วในการโหลดข้อมูล' },
    ],
  },
];