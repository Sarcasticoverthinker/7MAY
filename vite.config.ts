import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/sarcasticoverthinker.github.io/', // Replace with your GitHub repository name
  build: {
    outDir: 'dist', // Optional: You can change the output directory if needed
    rollupOptions: {
      external: ['react-sound', 'react-confetti'], // Exclude react-sound and react-confetti from the bundle
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react', 'react-sound', 'react-confetti'], // Exclude unnecessary dependencies
  },
});
