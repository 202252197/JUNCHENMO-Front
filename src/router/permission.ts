//路由鉴权
import router from '@/router'
//顶部加载进度条
import nprogress from 'nprogress'
//关闭加载的图标
nprogress.configure({ showSpinner: false })
//引入进度条样式
import '@/styles/nprogress/nprogress.scss'
<<<<<<< HEAD
import setting from '@/setting.ts'
//获取用户相关的小仓库内部token数据，去判断用户是否登录成功
import pinia from '@/store'
//获取用户相关的小仓库内部token数据，去判断用户是否登录成功
import useUserStore from '@/store/modules/user'
import usePermissionStore from '@/store/modules/permission'
const userStore = useUserStore(pinia)
const permissionStore = usePermissionStore(pinia)
//导入Permission工具类
import { GET_ROUTER, SET_ROUTER } from '@/utils/permission'
//导入类型
import type { router as routeTYpe } from '@/api/permission/type'
//导入layout组件
import Layout from '@/layout/index.vue'
const modules = import.meta.glob('../views/**/**/*.vue')
let getRouter: any
// 全局守卫；项目当中任意路由切换都会触发的钩子
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title} - ${to.meta.title}`
  nprogress.start()
  //获取token，去判断用户登录、还是未登录
  const token = userStore.token
  //用户登录判断
  if (token) {
    //登录成功，访问login,不能访问，指向首页
    try {
      await routerGo()
      if (to.path == '/login') {
        next({ path: '/' })
      } else {
        //如果没有用户信息，在守卫这里发请求获取到了用户信息再放行
        await userStore.userInfo()
        next()
      }
    } catch (error) {
      console.log(error)
      //如果获取信息的时候token过期了，或者是发生异常则需要把token删除定位到login页面
      await userStore.userLogout()
      next({ path: '/login', query: { redirect: to.path } })
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
=======

import setting from '@/setting.ts'

import pinia from '@/store'
import useUserStore from '@/store/modules/user'
import usePermissionStore from '@/store/modules/menu'
const userStore = useUserStore(pinia)
const permissionStore = usePermissionStore(pinia)

import { GET_TOKEN } from '@/utils/token'
import { isNotHttp } from '@/utils/common'

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
      nprogress.done()
    } else if (whiteList.indexOf(to.path) !== -1) {
      next()
      nprogress.done()
    } else {
      if (userStore.roles.length === 0) {
        userStore
          .userInfo()
          .then(() => {
            permissionStore.generateRoutes().then((accessRoutes: any) => {
              accessRoutes.forEach((route: any) => {
                if (isNotHttp(route.path)) {
                  router.addRoute(route) // 动态添加可访问路由表
                }
              })
              next({ ...to, replace: true })
            })
          })
          .catch((error) => {
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
      nprogress.done()
    } else {
      next(`/login?redirect=${to.fullPath}`)
      nprogress.done()
>>>>>>> master
    }
  }
})

//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})
<<<<<<< HEAD

// 添加路由
export async function routerGo() {
  //获取token，去判断用户登录、还是未登录
  const token = userStore.token
  //用户登录判断
  if (token) {
    if (!GET_ROUTER()) {
      getRouter = await permissionStore.getRouter()
      console.log(getRouter)
      SET_ROUTER(getRouter)
    } else {
      //从localStorage拿到了路由
      getRouter = GET_ROUTER() //拿到路由
    }
    userStore.asyncMenuRouter = []
    getRouter = filterAsyncRouter(getRouter) // 过滤路由
    for (const key in getRouter) {
      router.addRoute(getRouter[key])
      userStore.asyncMenuRouter.push(getRouter[key])
    }
  }
}

// 动态获取component
function dynamicImportComponent(path: any) {
  for (const key in modules) {
    if (key.startsWith('../views/' + path)) {
      return modules[key]
    }
  }
  return null
}

//过滤路由方法封装
function filterAsyncRouter(asyncRouterMap: any) {
  //遍历后台传来的路由字符串，转换为组件对象
  return asyncRouterMap.filter((route: routeTYpe) => {
    if (route.component) {
      if (route.component === 'Layout') {
        //Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = dynamicImportComponent(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route.name)
    }
    return true
  })
}
=======
>>>>>>> master
