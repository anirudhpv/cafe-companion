/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        google: {
          blue: '#4285F4',
          red: '#EA4335',
          yellow: '#FBBC05',
          green: '#34A853',
        },
        cafe: {
          bg: '#FAFAF7',
          surface: '#FFFFFF',
          border: '#E8E6DF',
          muted: '#6E6B65',
          dark: '#1C1917',
          accent: '#A0522D',
          amber: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['Google Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
