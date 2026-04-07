import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@tabler': path.resolve(__dirname, '../core'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: [
          path.resolve(__dirname, '../node_modules'),
          path.resolve(__dirname, '../core/node_modules'),
        ],
      },
    },
  },
})
