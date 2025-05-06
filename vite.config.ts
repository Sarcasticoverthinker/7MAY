import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react', 'react-confetti', 'react-sound'],
  },
  build: {
    rollupOptions: {
      external: ['react-confetti', 'react-sound'], // Externalize these libraries if needed
    },
  },
});
