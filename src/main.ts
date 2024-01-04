import { createApp } from 'vue'
import { setupStore } from '@/store'
import App from './App.vue'
import { setupNaiveDiscreteApi } from '@/plugins'
import router, { setupRouter } from '@/router'

const app = createApp(App)

// 挂载状态管理
setupStore(app)

// 挂载 naive-ui 脱离上下文的 Api
setupNaiveDiscreteApi()

// 创建一个全局方法
app.config.globalProperties.$myGlobalMethod = () => {
  // 在这里定义你的全局方法逻辑
  console.log('This is a global method!')
}

// 挂载路由
setupRouter(app)

// 路由准备就绪后挂载 APP 实例
// https://router.vuejs.org/api/interfaces/router.html#isready
await router.isReady()

app.mount('#app')
