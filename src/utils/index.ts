import { NIcon } from 'naive-ui'
import {
  AllowedComponentProps,
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  EmitsOptions,
  VNodeProps
} from 'vue'

export function renderIcon(icon: DefineComponent<{}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<globalThis.ExtractPropTypes<{}>>, {}, {}>) {
  return () => h(NIcon, null, {default: () => h(icon)})
}