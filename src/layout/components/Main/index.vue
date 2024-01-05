<template>
  <RouterView>
    <template #default="{ Component, route }">
      <template v-if="mode === 'production'">
        <transition :name="getTransitionName" appear mode="out-in">
          <keep-alive v-if="keepAliveComponents.length" :include="keepAliveComponents">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component :is="Component" v-else :key="route.fullPath" />
        </transition>
      </template>
      <template v-else>
        <keep-alive v-if="keepAliveComponents.length" :include="keepAliveComponents">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component :is="Component" v-else :key="route.fullPath" />
      </template>
    </template>
  </RouterView>
</template>

<script lang="ts" setup>
import { useAsyncRouteStore } from '@/store/asyncRoute'
import { useProjectSetting } from '@/layout/useProjectSetting'

const props = defineProps(['notNeedKey', 'animate'])
const {isPageAnimate, pageAnimateType} = useProjectSetting()
const asyncRouteStore = useAsyncRouteStore()
// 需要缓存的路由组件
const keepAliveComponents = computed(() => asyncRouteStore.keepAliveComponents)

const getTransitionName = computed(() => {
  return unref(isPageAnimate) ? unref(pageAnimateType) : ''
})

// const mode = import.meta.env.MODE
const mode = 'production'
</script>

<style lang="less" scoped></style>
