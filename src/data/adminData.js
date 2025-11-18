// หมายเหตุ: ผมได้เพิ่ม 'id' ที่ไม่ซ้ำกันในแต่ละอาร์เรย์
// ซึ่งจำเป็นมากสำหรับการทำ 'edit' และ 'delete' ใน React

export const PHR_DAN_SAI_PERSONNEL_DATA = [
  { id: 1, name: 'นายแพทย์สมศักดิ์ รักษาดี', position: 'ผู้อำนวยการโรงพยาบาล', iconInitial: 'MD' },
  { id: 2, name: 'พยาบาลวิชาชีพพรทิพย์ สุขสบาย', position: 'หัวหน้าพยาบาล', iconInitial: 'RN' },
  { id: 3, name: 'เภสัชกรหญิงอรุณี มีคุณธรรม', position: 'หัวหน้าฝ่ายเภสัชกรรม', iconInitial: 'PH' },
  { id: 4, name: 'เจ้าหน้าที่สมชาย พัฒนาการ', position: 'หัวหน้าฝ่ายไอที', iconInitial: 'IT' },
];

export const ERP_ARTICLES_DATA = [
  {
    id: 101,
    title: '5 กลยุทธ์เลือก ERP ให้เหมาะกับธุรกิจโรงพยาบาล',
    category: 'ERP Strategy',
    date: '15 ต.ค. 2568',
    imageUrl: 'https://...',
  },
  {
    id: 102,
    title: 'Case Study: รพร.ด่านซ้าย ลดต้นทุนคลังเวชภัณฑ์ด้วย ERP',
    category: 'Case Study',
    date: '10 ต.ค. 2568',
    imageUrl: 'https://...',
  },
  {
    id: 103,
    title: 'การเชื่อมต่อระบบ ERP กับ HOSxP เพื่อข้อมูลแบบไร้รอยต่อ',
    category: 'Integration',
    date: '5 ต.ค. 2568',
    imageUrl: 'https://...',
  },
];

export const ANNOUNCEMENTS_DATA = [
  {
    id: 201,
    category: 'อัปเดตระบบ',
    title: 'ปรับปรุงระบบ ERP เป็นเวอร์ชั่น 2.1',
    date: '15 ต.ค. 2568',
    description: 'ทีมพัฒนาได้ทำการอัปเดตระบบ ERP ครั้งใหญ่...',
  },
  {
    id: 202,
    category: 'ประกาศอบรม',
    title: 'อบรมการใช้งาน Dashboard ใหม่ในโมดูล BI',
    date: '12 ต.ค. 2568',
    description: 'ขอเชิญหัวหน้าแผนกทุกท่านเข้าร่วมอบรม...',
  },
  {
    id: 203,
    category: 'ซ่อมบำรุง',
    title: 'แจ้งปิดปรับปรุงระบบ Server ประจำเดือน',
    date: '10 ต.ค. 2568',
    description: 'ทีม IT จะทำการปิดปรับปรุง Server...',
  },
];