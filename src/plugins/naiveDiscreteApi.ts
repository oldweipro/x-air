import * as NaiveUI from 'naive-ui'
// import { computed } from 'vue'
// import { useDesignSetting } from '@/store/modules/designSetting'

/**
 * 挂载 Naive-ui 脱离上下文的 API
 * 如果你想在 setup 外使用 useDialog、useMessage、useNotification、useLoadingBar，可以通过 createDiscreteApi 来构建对应的 API。
 * https://www.naiveui.com/zh-CN/dark/components/discrete
 */

export function setupNaiveDiscreteApi() {
  // const designStore = useDesignSetting()

  // const configProviderPropsRef = computed(() => ({
  //   theme: designStore.darkTheme ? NaiveUI.darkTheme : undefined,
  //   themeOverrides: {
  //     common: {
  //       // primaryColor: designStore.appTheme,
  //     },
  //     LoadingBar: {
  //       // colorLoading: designStore.appTheme,
  //     },
  //   },
  // }))
  const {message, dialog, notification, loadingBar} = NaiveUI.createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    {
      // configProviderProps: configProviderPropsRef,
    }
  )

  // Assigning to window in a more compact way
  Object.assign(window, {$message: message, $dialog: dialog, $notification: notification, $loading: loadingBar})
}
