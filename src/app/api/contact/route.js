import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { hospital, email, tel, message } = body; 

    if (!hospital || !email || !tel || !message) {
      return NextResponse.json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' }, { status: 400 });
    }
    
    // ⬇️ --- (START) โค้ดที่ได้รับการปรับปรุงดีไซน์ใหม่ --- ⬇️

    // ⭐ ปรับปรุงเนื้อหาอีเมล (html) ให้มีดีไซน์ที่ดูดีขึ้น
    const emailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
                <div style="background-color: #0d47a1; color: #ffffff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">🚨 [ERP Contact] ผู้ติดต่อใหม่</h1>
        </div>

                <div style="padding: 25px; background-color: #ffffff; color: #333;">
          
          <p style="font-size: 16px; margin-bottom: 20px; color: #555;">
            มีผู้สนใจติดต่อขอคำปรึกษาผ่านแบบฟอร์มบนเว็บไซต์ รพร.ด่านซ้าย:
          </p>
          
                    <div style="border: 1px solid #bbdefb; border-radius: 8px; padding: 15px; background-color: #e3f2fd; margin-bottom: 25px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td style="padding: 5px 0;"><strong style="color: #1565c0;">&#127973; หน่วยงาน:</strong></td>
                <td style="padding: 5px 0; text-align: right;">${hospital}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0;"><strong style="color: #1565c0;">&#9993; อีเมล:</strong></td>
                <td style="padding: 5px 0; text-align: right;"><a href="mailto:${email}" style="color: #039be5; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 5px 0;"><strong style="color: #1565c0;">&#128222; เบอร์โทร:</strong></td>
                <td style="padding: 5px 0; text-align: right;"><a href="tel:${tel}" style="color: #039be5; text-decoration: none;">${tel}</a></td>
              </tr>
            </table>
          </div>
          
                    <h3 style="color: #333; font-size: 18px; border-bottom: 2px solid #0d47a1; padding-bottom: 5px; margin-top: 25px;">
            รายละเอียดที่ต้องการปรึกษา:
          </h3>
          <div style="padding: 15px; border: 1px dashed #90caf9; background-color: #f5f5f5; border-radius: 4px; margin-top: 15px;">
            <pre style="margin: 0; font-family: inherit; white-space: pre-wrap; word-wrap: break-word; font-size: 14px; color: #555;">${message}</pre>
          </div>

                    <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${email}" style="background-color: #4fc3f7; color: #1a293c; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;">
              ตอบกลับหาผู้ติดต่อทันที
            </a>
          </div>
        </div>

                <div style="background-color: #f0f0f0; padding: 15px; text-align: center; color: #888; font-size: 12px; border-top: 1px solid #e0e0e0;">
          อีเมลฉบับนี้สร้างโดยระบบ ERP Contact Form อัตโนมัติ 
        </div>

      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: ['patcharaphon10509@gmail.com'], 
      subject: `[ERP Contact] มีคนติดต่อ: ${hospital}`, // ปรับ Subject ให้เป็นทางการขึ้น
      html: emailHtml,
    });
    // ⬆️ --- (END) สิ้นสุดโค้ดที่ได้รับการปรับปรุงดีไซน์ใหม่ --- ⬆️

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
