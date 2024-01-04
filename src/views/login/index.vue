<script lang="ts" setup>
import { getCurrentInstance } from 'vue'
import { LockClosedOutline, PersonOutline } from '@vicons/ionicons5'
import { PageEnum } from '@/enums/pageEnum.ts'

// use global method
const vm = getCurrentInstance()

const toggleTheme = () => {
  const globalProperties = vm?.appContext.config.globalProperties
  globalProperties?.$myGlobalMethod()
  window['$message'].info('hi')
}

const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME

const message = useMessage()
const formRef = ref()
const loading = ref(false)

const router = useRouter()
const route = useRoute()

const formInline = reactive({
  username: 'admin',
  password: '123456',
})

const rules = {
  username: {required: true, message: '请输入用户名', trigger: 'blur'},
  password: {required: true, message: '请输入密码', trigger: 'blur'},
}

const handleSubmit = (e) => {
  e.preventDefault()
  formRef.value.validate(async (errors) => {
    if (!errors) {
      const {username, password} = formInline
      console.log('用户名:', username, '密码:', password)
      message.loading('登录中...')
      loading.value = true
      try {
        message.destroyAll()
        const toPath = decodeURIComponent((route.query?.redirect || '/') as string)
        message.success('登录成功，即将进入系统')
        if (route.name === LOGIN_NAME) {
          await router.replace('/')
        } else {
          await router.replace(toPath)
        }
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<template>
  <n-layout>
    <div class="view-account">
      <div></div>
      <div class="view-account-container">
        <div class="view-account-top">
          <div>
            <img alt="" src="@/assets/vite.svg" />
          </div>
        </div>
        <div>
          <n-form
              ref="formRef"
              :model="formInline"
              :rules="rules"
              label-placement="left"
              size="large"
          >
            <n-form-item path="username">
              <n-input v-model:value="formInline.username" placeholder="请输入用户名">
                <template #prefix>
                  <n-icon color="#808695" size="18">
                    <PersonOutline />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item path="password">
              <n-input
                  v-model:value="formInline.password"
                  placeholder="请输入密码"
                  show-password-on="click"
                  type="password"
              >
                <template #prefix>
                  <n-icon color="#808695" size="18">
                    <LockClosedOutline />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item>
              <n-button :loading="loading" block size="large" type="primary" @click="handleSubmit">
                登录
              </n-button>
            </n-form-item>
          </n-form>
        </div>
      </div>
    </div>
  </n-layout>
</template>

<style lang="less" scoped>
.view-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  &-container {
    flex: 1;
    padding: 132px 12px;
    max-width: 384px;
    min-width: 320px;
    margin: 0 auto;
  }

  &-top {
    padding: 32px 0;
    text-align: center;
  }
}
</style>
