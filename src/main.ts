import { createApp } from 'vue'
import router from '@/router'
import App from '@/App.vue'
import pinia from '@/store'
import { copyText,resetObj } from './utils/common.js';
//配置ElementUIDark样式
import 'element-plus/theme-chalk/dark/css-vars.css'
//配置路由守卫（鉴权+进度条）
import '@/router/permission'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//配置全局自定义组件
import gloablComponent from '@/components/index'
//配置全局scss样式
import '@/styles/index.scss'
import 'animate.css';
// main.ts
const app = createApp(App)
app.use(router)
app.use(pinia)
app.config.globalProperties.$copyText = copyText;
app.config.globalProperties.$resetObj = resetObj;
// 全局注册自定义组件的插件
app.use(gloablComponent)
app.mount('#app')

