import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/chem-final-sg/',
  build: { outDir: 'dist' }
});
