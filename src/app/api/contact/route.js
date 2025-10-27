import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// 1. สร้าง instance ของ Resend
// (มันจะดึงคีย์จากไฟล์ .env.local ที่คุณสร้างไว้โดยอัตโนมัติ)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    // 2. รับข้อมูลจาก form ที่ส่งมา
    const body = await request.json();
    const { hospital, email, tel } = body;

    // 3. ตรวจสอบข้อมูล
    if (!hospital || !email || !tel) {
      return NextResponse.json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' }, { status: 400 });
    }

    // 4. ส่งอีเมล (แก้ไข 'from' และ 'to' ตามรูปของคุณ)
    const { data, error } = await resend.emails.send({
      
      // ⬇️ แก้ไขตามรูป (ดูคำเตือนด้านล่าง)
      from: 'onboarding@resend.dev', 
      
      // ⬇️ แก้ไขตามรูป (นี่คืออีเมลที่คุณจะได้รับข้อความ)
      to: ['patcharaphon10509@gmail.com'], 
      
      subject: `[ERP Contact] มีโรงพยาบาลติดต่อ: ${hospital}`,
      html: `
        <h2>มีผู้ติดต่อขอคำปรึกษา</h2>
        <p><strong>ชื่อโรงพยาบาล/หน่วยงาน:</strong> ${hospital}</p>
        <p><strong>อีเมลผู้ติดต่อ:</strong> ${email}</p>
        <p><strong>เบอร์โทรศัพท์:</strong> ${tel}</p>
      `,
    });

    // 5. จัดการ Error
    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: 'ไม่สามารถส่งอีเมลได้' }, { status: 500 });
    }

    // 6. ส่ง Response สำเร็จ
    return NextResponse.json({ message: 'ส่งข้อมูลสำเร็จ!' });

  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในระบบ' }, { status: 500 });
  }
}
