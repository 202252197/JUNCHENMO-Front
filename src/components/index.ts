import SvgIcon from './SvgIcon/index.vue'
import IconSelect from './IconSelect/index.vue'
import type { App, Component } from 'vue'
const components: { [name: string]: Component } = { SvgIcon,IconSelect }
//引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
export default {
  //注册项目全部的全局组件
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
    // 将element-plus提供图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
