/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  disableColorModernization: true,

  theme: {
    extend: {
      // ▼▼▼ ส่วนที่เพิ่มสำหรับสั่นกระดิ่ง ▼▼▼
      keyframes: {
        'ring-bell': {
          '0%, 100%': { transform: 'rotate(-3deg)' }, // หมุนซ้าย
          '50%': { transform: 'rotate(3deg)' },     // หมุนขวา
          'gradient-shift': { // ◄◄◄ เพิ่ม
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        }
        },
      },
      animation: {
        'ring-bell': 'ring-bell 0.7s ease-in-out infinite', // ตั้งชื่อ class ว่า animate-ring-bell
        'gradient-shift': 'gradient-shift 15s ease infinite',
        },
      // ▲▲▲ สิ้นสุดส่วนที่เพิ่ม ▲▲▲
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;