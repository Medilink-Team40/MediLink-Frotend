import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

// Plugin para eliminar console.log en producción
const removeConsolePlugin = () => {
  return {
    name: 'remove-console',
    transform(code: string, id: string) {
      if (process.env.NODE_ENV === 'production') {
        return {
          code: code
            .replace(/console\.log\([^)]*\);?/g, '')
            .replace(/console\.debug\([^)]*\);?/g, '')
            .replace(/console\.info\([^)]*\);?/g, ''),
          map: null
        }
      }
      return null
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    removeConsolePlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 5173,
    open: true,
  },
  define: {
    __DEV__: process.env.NODE_ENV === "development",
  },
  build: {

    commonjsOptions: {
      ignoreDynamicRequires: true,
      include: [/node_modules/],
      exclude: ['@zoom/meetingsdk'],

    },

    // Aumentar el límite de advertencia
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      external: ['@zoom/meetingsdk'],
      output: {
        globals: {
          '@zoom/meetingsdk': 'ZoomMtgEmbedded'
        },
        // Separar chunks manualmente para mejor caching
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-ui';
            }
            if (id.includes('keycloak')) {
              return 'vendor-keycloak';
            }
            // Otros vendors
            return 'vendor';
          }

          // Feature chunks
          if (id.includes('/features/landing/')) {
            return 'feature-landing';
          }
          if (id.includes('/features/Dashboard/')) {
            return 'feature-dashboard';
          }
          if (id.includes('/features/Parients/')) {
            return 'feature-patient';
          }
          if (id.includes('/features/Doctor/')) {
            return 'feature-doctor';
          }
          if (id.includes('/features/Admin/')) {
            return 'feature-admin';
          }
          if (id.includes('/features/auth/')) {
            return 'feature-auth';
          }
        },

        // Nombres de archivos más descriptivos
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },

    // Minificación con esbuild (más rápido que terser)
    minify: 'esbuild',

    // Source maps solo en desarrollo
    sourcemap: false,

    // Optimizar CSS
    cssMinify: false,

    // Target más moderno para bundles más pequeños
    target: 'es2015',
  },

  // Optimización de dependencias
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      'lodash', 'react', 'redux', 'redux-thunk'
    ],
    exclude: ['@zoom/meetingsdk'],
  },
});