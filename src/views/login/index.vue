<script lang="ts" setup>
import { getCurrentInstance } from 'vue'

// use global method
const vm = getCurrentInstance()

const toggleTheme = () => {
  const globalProperties = vm?.appContext.config.globalProperties
  globalProperties?.$myGlobalMethod()
  window['$message'].info('hi')
}
</script>

<template>
  <n-layout class="full-height">
    <n-space align="center" justify="space-around">
      <n-button type="primary" @click="toggleTheme">按钮</n-button>
    </n-space>
  </n-layout>
</template>

<style lang="less" scoped>

</style>