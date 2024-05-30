/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#008485",
      },
      fontFamily: {
        'noto-sans-kr': ['Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
