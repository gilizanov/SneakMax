import eslintPlugin from '@nabla/vite-plugin-eslint'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default {
  base: '/',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['swiper-container', 'swiper-slide'].includes(tag),
        },
      },
    }),
    eslintPlugin(),
    checker({
      vueTsc: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    open: true,
  },
  esbuild: {
    legalComments: 'none',
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[hash].js',
        entryFileNames: 'assets/js/entry-[hash].js',
        assetFileNames: 'assets/[ext]/[hash].[ext]',
      },
    },
  },
}
