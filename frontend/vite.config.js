import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { spawn } from 'child_process'
import net from 'net'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function autoBackendPlugin() {
  return {
    name: 'auto-backend-plugin',
    configureServer() {
      // Cek apakah backend di port 8000 sudah berjalan
      const socket = new net.Socket();
      socket.setTimeout(600);
      socket.on('connect', () => {
        socket.destroy();
      });
      socket.on('error', () => {
        socket.destroy();
        console.log('\x1b[36m%s\x1b[0m', '⚡ [Ruang Paham] Backend port 8000 belum aktif, otomatis menyalakan php artisan serve...');
        try {
          const backendDir = path.resolve(__dirname, '../backend');
          const child = spawn('php', ['artisan', 'serve', '--host=127.0.0.1', '--port=8000'], {
            cwd: backendDir,
            stdio: 'ignore',
            detached: true
          });
          child.unref();
        } catch (e) {
          console.warn('[Ruang Paham] Gagal menyalakan php artisan serve:', e.message);
        }
      });
      socket.on('timeout', () => {
        socket.destroy();
      });
      socket.connect(8000, '127.0.0.1');
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), autoBackendPlugin()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err, req, res) => {
            console.warn('[Vite Proxy] Menghubungi backend 127.0.0.1:8000...', err.message);
            if (res && !res.headersSent && typeof res.writeHead === 'function') {
              res.writeHead(503, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                message: 'Server backend sedang memulai (port 8000). Silakan coba 2 detik lagi.',
                errors: { server: ['Backend port 8000 sedang bersiap.'] }
              }));
            }
          });
        }
      }
    }
  },
  build: {
    outDir: '../backend/public',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('lucide-react')) return 'vendor-icons';
            return 'vendor';
          }
        }
      }
    }
  }
})

