<template>
  <div class="logo">
    <img :class="{ 'mr-2': !collapsed }" alt="" src="@/assets/vite.svg" />
    <h2 v-show="!collapsed" class="title">网站的标题</h2>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['collapsed'])
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;

  img {
    width: auto;
    height: 32px;
  }

  .title {
    margin: 0;
  }
}
</style>
