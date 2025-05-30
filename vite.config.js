import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: false, // чтобы можно было писать { ReactComponent as ... }
    })
  ],
  server: {
    allowedHosts: ['f156-89-23-103-229.ngrok-free.app']
  }
});
