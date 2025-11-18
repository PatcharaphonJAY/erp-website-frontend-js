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
        },
      },
      animation: {
        'ring-bell': 'ring-bell 0.7s ease-in-out infinite', // ตั้งชื่อ class ว่า animate-ring-bell
      },
      // ▲▲▲ สิ้นสุดส่วนที่เพิ่ม ▲▲▲
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;