import { defineConfig } from 'vite'
// 配置@别名
import { resolve } from 'path'
import AutoImport from "unplugin-auto-import/vite"
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router",],
      dts: 'src/auto-import.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
  },
})
