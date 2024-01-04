import type { RouteRecordRaw } from 'vue-router'
import { isNavigationFailure, Router } from 'vue-router'
import { useUser } from '@/store/user'
import { useAsyncRoute } from '@/store/asyncRoute'
import { PageEnum } from '@/enums/pageEnum'
import { ErrorPageRoute } from '@/router'

const LOGIN_PATH = PageEnum.BASE_LOGIN
const whitePathList = [LOGIN_PATH] // no redirect whitelist

export function createRouterGuards(router: Router) {
  const userStore = useUser()
  const asyncRouteStore = useAsyncRoute()
  // 全局前置守卫 https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
  router.beforeEach(async (to, from, next) => {
    if (from.path === LOGIN_PATH && to.name === 'errorPage') {
      next(PageEnum.BASE_HOME)
      return
    }

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      next()
      return
    }

    // 这里的token决定了是否登陆，如果token为空则进入登录页
    const token = "1111"

    if (!token) {
      // You can access without permissions. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next()
        return
      }
      // redirect login page
      const redirectData: { path: string; replace: boolean; query?: Record<string, string> } = {
        path: LOGIN_PATH,
        replace: true,
      }
      if (to.path) {
        redirectData.query
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        }
      }
      next(redirectData)
      return
    }

    if (asyncRouteStore.getIsDynamicRouteAdded) {
      next()
      return
    }

    const userInfo = await userStore.getInfo()

    const routes = await asyncRouteStore.generateRoutes(userInfo)

    // 动态添加可访问路由表
    routes.forEach((item: unknown) => {
      router.addRoute(item as RouteRecordRaw)
    })

    //添加404
    const isErrorPage = router.getRoutes().findIndex((item) => item.name === ErrorPageRoute.name)
    if (isErrorPage === -1) {
      router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw)
    }

    const redirectPath = (from.query.redirect || to.path) as string
    const redirect = decodeURIComponent(redirectPath)
    const nextData = to.path === redirect ? {...to, replace: true} : {path: redirect}
    asyncRouteStore.setDynamicRouteAdded(true)
    next(nextData)
  })

  router.afterEach((to, _, failure) => {
    document.title = (to?.meta?.title as string) || document.title
    if (isNavigationFailure(failure)) {
      console.log('failed navigation', failure)
    }
    const asyncRouteStore = useAsyncRoute()
    // 在这里设置需要缓存的组件名称
    const keepAliveComponents = asyncRouteStore.keepAliveComponents
    const currentComName: any = to.matched.find((item) => item.name == to.name)?.name
    if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
      // 需要缓存的组件
      keepAliveComponents.push(currentComName)
    } else if (!to.meta?.keepAlive || to.name == 'Redirect') {
      // 不需要缓存的组件
      const index = asyncRouteStore.keepAliveComponents.findIndex((name) => name == currentComName)
      if (index != -1) {
        keepAliveComponents.splice(index, 1)
      }
    }
    asyncRouteStore.setKeepAliveComponents(keepAliveComponents)
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
