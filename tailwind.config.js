/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',       // якщо ти використовуєш /pages
      './app/**/*.{js,ts,jsx,tsx,mdx}',         // для Next.js 13+ із app router
      './components/**/*.{js,ts,jsx,tsx,mdx}',  // твої компоненти
      './styles/**/*.{css,scss}',               // кастомні стилі
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };