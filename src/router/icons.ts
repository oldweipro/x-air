import { h } from 'vue'
import { NIcon } from 'naive-ui'
import { AccountBookOutlined, DashboardOutlined } from '@vicons/antd'

//前端路由图标映射表
export const constantRouterIcon = {
  DashboardOutlined: renderIcon(DashboardOutlined),
  AccountBookOutlined: renderIcon(AccountBookOutlined),
}

function renderIcon(icon: any) {
  return () => h(NIcon, null, {default: () => h(icon)})
}
