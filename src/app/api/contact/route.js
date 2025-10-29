import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { hospital, email, tel } = body;

    if (!hospital || !email || !tel) {
      return NextResponse.json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' }, { status: 400 });
    }
    
    // ⬇️ --- (START) โค้ดทดสอบ (ใช้ onboarding@resend.dev) --- ⬇️

    // ⭐ สร้างเนื้อหาอีเมล (html) ให้ดูเป็นระบบ
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
        <h2 style="color: #333;">[TEST] มีผู้ติดต่อใหม่</h2>
        <p>รายละเอียดผู้ติดต่อ:</p>
        <ul style="list-style-type: none; padding-left: 0;">
          <li><strong>โรงพยาบาล/หน่วยงาน:</strong> ${hospital}</li>
          <li><strong>อีเมลติดต่อกลับ:</strong> ${email}</li>
          <li><strong>เบอร์โทร:</strong> ${tel}</li>
        </ul>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      // 1. "from" ต้องเป็น onboarding@resend.dev
      from: 'onboarding@resend.dev', 
      
      // 2. "to" ต้องเป็นอีเมลที่คุณใช้สมัคร Resend เท่านั้น
      to: ['patcharaphon10509@gmail.com'], 
      
      subject: `[TEST] มีคนติดต่อ: ${hospital}`,

      // 3. ⭐ ใช้ตัวแปร emailHtml ที่เราสร้างไว้
      html: emailHtml,
      
      // 4. (ห้ามใส่ reply_to เมื่อใช้ onboarding@resend.dev)
    });
    // ⬆️ --- (END) สิ้นสุดโค้ดทดสอบ --- ⬆️

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: 'ไม่สามารถส่งอีเมลได้', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'ส่งข้อมูลสำเร็จ! (นี่คืออีเมลทดสอบ)' });

  } catch (err) {
    console.error("API Error (Catch):", err);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในระบบ' }, { status: 500 });
  }
}