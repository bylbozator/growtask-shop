import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base задаётся через VITE_BASE при сборке на GitHub Pages (проектный сайт
// отдаётся по пути /<repo>/). Локально и в обычной сборке остаётся '/'.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    // Прокси к API в dev-режиме: запрос уходит с сервера разработки,
    // поэтому не блокируется CORS (у growtask API нет CORS-заголовков).
    proxy: {
      '/test-front': {
        target: 'https://growtask.ru',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
