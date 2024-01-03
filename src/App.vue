<script lang="ts" setup>
import { darkTheme, dateZhCN, lightTheme, NButton, NConfigProvider, NLayout, NSpace, useOsTheme, zhCN } from 'naive-ui'
import { AppProvider } from '@/components/Application'

const osThemeRef = useOsTheme()
const isDarkTheme = ref(osThemeRef.value === 'dark')
const theme = computed(() => isDarkTheme.value ? darkTheme : lightTheme)
watch(osThemeRef, () => {
  isDarkTheme.value = osThemeRef.value === 'dark'
})
const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
}
</script>

<template>
  <NConfigProvider
      :date-locale="dateZhCN"
      :locale="zhCN"
      :theme="theme"
  >

    <AppProvider>
      <n-layout class="full-height">
        <n-space align="center" justify="space-around">
          <n-button type="primary" @click="toggleTheme">切换主题</n-button>
        </n-space>
      </n-layout>
    </AppProvider>
  </NConfigProvider>
</template>

<style lang="less" scoped>
.full-height {
  height: 100vh;
}
</style>
