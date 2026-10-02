import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/El-sendero-magico-de-Mari/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'serve-root-assets',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url && (req.url.startsWith('/assets/') || req.url.startsWith('/characters/'))) {
            req.url = '/El-sendero-magico-de-Mari' + req.url;
          }
          next();
        });
      },
    },
  ],
});
