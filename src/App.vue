<script lang="ts" setup>
import { dateZhCN, zhCN } from 'naive-ui'
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
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>

<style lang="less" scoped>
.full-height {
  height: 100vh;
}
</style>
