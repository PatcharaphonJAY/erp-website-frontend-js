'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // --- 🚨 คำเตือนด้านความปลอดภัย ---
    // นี่คือการจำลองการล็อกอินเท่านั้น (Insecure)
    // ในโปรเจกต์จริง คุณต้องส่งค่านี้ไปให้ API ตรวจสอบ
    // และใช้ session หรือ JWT
    // ---------------------------------
    if (username === 'admin' && password === 'password1234') {
      // เมื่อสำเร็จ ให้ redirect ไปหน้า admin
      // ในแอปจริง คุณควรจะเก็บ Token ไว้ที่นี่
      router.push('/admin');
    } else {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#131e32] to-[#0a111a]">
      <div className="w-full max-w-md p-8 bg-[#1a293c] rounded-xl shadow-2xl border border-slate-700">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Admin Login
        </h1>
        <p className="text-center text-slate-400 mb-8">
          สำหรับผู้ดูแลระบบ ERP รพร.ด่านซ้าย
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-300"
            >
              ชื่อผู้ใช้ (Username)
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full mt-2 p-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="admin"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300"
            >
              รหัสผ่าน (Password)
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 p-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="password1234"
            />
          </div>

          {error && (
            <p className="text-sm text-center text-red-400">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-sky-600 text-white font-bold py-3 rounded-lg shadow-xl shadow-sky-500/30 hover:bg-sky-700 transition-all transform hover:scale-[1.01]"
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
}
