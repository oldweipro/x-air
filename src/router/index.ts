import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'
import { createRouterGuards } from '@/router/guards.ts'
import { IModuleType } from '@/router/types.ts'


const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', {eager: true})

const routeModuleList: RouteRecordRaw[] = Object.keys(modules).reduce((list: any[], key: string) => {
  const mod = modules[key].default ?? {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  return [...list, ...modList]
}, [])

function sortRoute(a: any, b: any) {
  return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0)
}

routeModuleList.sort(sortRoute)
export const asyncRoutes = [...routeModuleList]

const RedirectName = 'Redirect'
export const RedirectRoute: RouteRecordRaw = {
  path: '/redirect',
  name: RedirectName,
  component: () => import('@/layout/index.vue'),
  meta: {
    title: RedirectName,
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: RedirectName,
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        title: RedirectName,
        hideBreadcrumb: true,
      },
    },
  ],
}
export const ErrorPageRoute: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: () => import('@/layout/index.vue'),
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPageSon',
      component: () => import('@/views/exception/404.vue'),
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
      },
    },
  ],
}
export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/dashboard',
  meta: {
    title: 'Root',
  },
}

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
  },
}

export const constantRouter: RouteRecordRaw[] = [LoginRoute, RootRoute, RedirectRoute]
const router = createRouter({
  history: createWebHistory(),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({left: 0, top: 0}),
})

export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}

export default router