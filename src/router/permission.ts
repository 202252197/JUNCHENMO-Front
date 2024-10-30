//路由鉴权
import router from '@/router'
//顶部加载进度条
import nprogress from 'nprogress'
//关闭加载的图标
nprogress.configure({ showSpinner: false })
//引入进度条样式
import '@/styles/nprogress/nprogress.scss'

import setting from '@/setting.ts'

import pinia from '@/store'
import useUserStore from '@/store/modules/user'
import usePermissionStore from '@/store/modules/menu'
const userStore = useUserStore(pinia)
const permissionStore = usePermissionStore(pinia)

import { GET_TOKEN } from '@/utils/token'


//放行的白名单路由
const whiteList = ['/login', '/register']
// 全局守卫；项目当中任意路由切换都会触发的钩子
// 全局前置守卫
router.beforeEach((to, from, next) => {
  nprogress.start()
  const token = GET_TOKEN()
  if (token) {
    document.title = `${setting.title} - ${to.meta.title}`
    if (to.path === '/login') {
      next('/')
    } else if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (userStore.roles.length === 0) {
        userStore
          .userInfo()
          .then(() => {
            permissionStore.generateRoutes().then(() => {
              next({ ...to, replace: true })
            })
          })
          .catch(() => {
            userStore.userLogout().then(() => {
              next('/')
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
    }
  }
})

//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})

