import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { store } from '@/store'
import { constantRouter } from '@/router'
import { generateDynamicRoutes } from '@/router/generator.ts'

export interface IAsyncRouteState {
  menus: RouteRecordRaw[];
  routers: any[];
  routersAdded: any[];
  keepAliveComponents: string[];
  isDynamicRouteAdded: boolean;
}

export const useAsyncRouteStore = defineStore({
  id: 'app-async-route',
  state: (): IAsyncRouteState => ({
    menus: [],
    routers: constantRouter,
    routersAdded: [],
    keepAliveComponents: [],
    // Whether the route has been dynamically added
    isDynamicRouteAdded: false,
  }),
  getters: {
    getMenus(): RouteRecordRaw[] {
      return this.menus
    },
    getIsDynamicRouteAdded(): boolean {
      return this.isDynamicRouteAdded
    },
  },
  actions: {
    getRouters() {
      return toRaw(this.routersAdded)
    },
    setDynamicRouteAdded(added: boolean) {
      this.isDynamicRouteAdded = added
    },
    // 设置动态路由
    setRouters(routers: RouteRecordRaw[]) {
      this.routersAdded = routers
      this.routers = constantRouter.concat(routers)
    },
    setMenus(menus: RouteRecordRaw[]) {
      // 设置动态路由
      this.menus = menus
    },
    setKeepAliveComponents(compNames: string[]) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames
    },
    async generateRoutes(data: any) {
      let accessedRouters: any[] = []
      const permissionsList = data.permissions ?? []
      const routeFilter = (route: any) => {
        const {meta} = route
        const {permissions} = meta || {}
        if (!permissions) return true
        return permissionsList.some((item: any) => permissions.includes(item.value))
      }
      // 动态获取菜单
      accessedRouters = await generateDynamicRoutes()
      accessedRouters = accessedRouters.filter(routeFilter)
      this.setRouters(accessedRouters)
      this.setMenus(accessedRouters)
      return toRaw(accessedRouters)
    },
  },
})

// Need to be used outside the setup
export function useAsyncRoute() {
  return useAsyncRouteStore(store)
}
