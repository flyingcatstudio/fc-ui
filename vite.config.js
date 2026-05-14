import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: 'examples',
  plugins: [react()],
  resolve: {
    alias: {
      '@fcstudio/fc-ui': path.resolve(__dirname, 'src/index.js'),
    },
  },
  server: { port: 5173, open: true },
});
