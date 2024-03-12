### 1.创建项目

[vite官方文档](https://cn.vitejs.dev/guide/)

在终端执行创建项目的命令

```shell
pnpm create vite vdsim --template vue-ts
```

### 2.集成pinia状态管理

[pinia官方文档](https://pinia.vuejs.org/zh/getting-started.html)

安装pinia

```shell
pnpm add pinia
pnpm add -D @types/node
```

设置@别名,在tsconfig.json中添加

```json
{
  "compilerOptions": {
    // 配置@别名
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  }
}
```

在vite.config.ts中添加

```typescript
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
      imports: ["vue", "vue-router", "naive-ui"],
      dts: 'src/auto-import.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
  },
})
```

### 3.集成vueRouter

[vueRouter官方文档](https://router.vuejs.org/zh/installation.html)

```shell
pnpm add vue-router
```

### 4.集成NaiveUI

[按需引入自动引入](https://www.naiveui.com/zh-CN/light/docs/import-on-demand)

```shell
pnpm add -D naive-ui

pnpm add -D unplugin-auto-import
pnpm add -D unplugin-vue-components
```

### 5.配置Eslint

```shell
pnpm i -D eslint
pnpm create @eslint/config
```
