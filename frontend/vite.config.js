import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { spawn } from 'child_process'
import net from 'net'
import path from 'path'
import { fileURLToPath } from 'url'

import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function cleanAssetsPlugin() {
  return {
    name: 'clean-assets-plugin',
    buildStart() {
      const assetsDir = path.resolve(__dirname, '../backend/public/assets');
      if (fs.existsSync(assetsDir)) {
        try {
          const files = fs.readdirSync(assetsDir);
          for (const file of files) {
            fs.unlinkSync(path.join(assetsDir, file));
          }
          console.log(`\x1b[32m%s\x1b[0m`, `[Ruang Paham] Berhasil membersihkan ${files.length} file aset usang dari backend/public/assets.`);
        } catch (e) {
          console.warn('[Ruang Paham] Gagal membersihkan folder assets:', e.message);
        }
      }
    }
  };
}

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
  plugins: [react(), autoBackendPlugin(), cleanAssetsPlugin()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err, req, res) => {
            console.warn('[Vite Proxy] Backend 127.0.0.1:8000 belum siap:', err.message);
            // Coba trigger auto-start jika belum jalan
            const socket = new net.Socket();
            socket.setTimeout(400);
            socket.on('error', () => {
              socket.destroy();
              try {
                const backendDir = path.resolve(__dirname, '../backend');
                const child = spawn('php', ['artisan', 'serve', '--host=127.0.0.1', '--port=8000'], {
                  cwd: backendDir,
                  stdio: 'ignore',
                  detached: true
                });
                child.unref();
              } catch (_) {}
            });
            socket.on('connect', () => socket.destroy());
            socket.connect(8000, '127.0.0.1');

            if (res && !res.headersSent && typeof res.writeHead === 'function') {
              res.writeHead(503, { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
              });
              res.end(JSON.stringify({
                message: 'Server backend sedang bersiap atau belum aktif (port 8000). Silakan tunggu sebentar dan coba lagi.',
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

