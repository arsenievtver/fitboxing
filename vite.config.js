import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    // разрешаем использование указанного домена
    allowedHosts: ['f156-89-23-103-229.ngrok-free.app']
  },
  plugins: [react()],
})
