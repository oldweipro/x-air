import { createApp } from 'vue'
import { setupStore } from '@/store'
import App from './App.vue'
import { setupNaiveDiscreteApi } from '@/plugins/naiveDiscreteApi.ts'

const app = createApp(App)

// 挂载状态管理
setupStore(app)

// 挂载 naive-ui 脱离上下文的 Api
setupNaiveDiscreteApi()

// 创建一个全局方法
app.config.globalProperties.$myGlobalMethod = () => {
  // 在这里定义你的全局方法逻辑
  console.log('This is a global method!')
  // use global method
  // import { getCurrentInstance } from 'vue'
  // const vm = getCurrentInstance()
  // vm?.appContext.config.globalProperties.$myGlobalMethod()
}

app.mount('#app')
