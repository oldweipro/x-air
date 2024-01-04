import { defineConfig } from 'vite'
// 配置@别名
import { resolve } from 'path'
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue",
        "vue-router",
        {
          'naive-ui': [
            'useOsTheme',
            'lightTheme',
            'darkTheme',
          ],
        },
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: 'src/components.d.ts'
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
  },
})
