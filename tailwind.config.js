/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        confidence: {
          1: '#ef4444',
          2: '#f97316',
          3: '#facc15',
          4: '#84cc16',
          5: '#16a34a'
        }
      }
    }
  },
  plugins: []
};
