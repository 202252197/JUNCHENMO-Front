//创建用户相关的小仓库
import { defineStore } from 'pinia'
import { error404 } from '@/router/routes'
//导入请求
import { getRouters } from '@/api/menu'
//导入layout组件
import Layout from '@/layout/index.vue'
//引入路由（常亮路由）
import { constantRoutes } from '@/router/routes'
const modules = import.meta.glob('../../views/**/**/*.vue')
//创建用户小仓库
const usePermissionStore = defineStore('Menu', {
  state: () => {
    return {
      routes: [], //路由树
      sidebarRouters: [], //左侧菜单树
      cacheRouterNames: [], //缓存的路由名称需要和组件名一致
    }
  },
  actions: {
    //设置路由
    setRoutes(routes: any) {
      this.routes = constantRoutes.concat(routes)
    },
    //设置左侧菜单
    setSidebarRouters(routes: any) {
      this.sidebarRouters = constantRoutes.concat(routes)
    },
    generateRoutes() {
      return new Promise((resolve) => {
        getRouters().then((res) => {
          const RoutesData = filterAsyncRouter(res.data)
          //添加404页面
          RoutesData.push(error404)
          this.setRoutes(RoutesData)
          this.setSidebarRouters(RoutesData)
          resolve(RoutesData)
        })
      })
    },
  },

  getters: {},
})

//过滤路由方法封装
function filterAsyncRouter(asyncRouterMap: any) {
  //遍历后台传来的路由字符串，转换为组件对象
  return asyncRouterMap.filter((route: any) => {
    //将缓存的router名称添加进去
    if (route.meta.cache) {
      usePermissionStore().cacheRouterNames.push(route.name)
    }
    if (route.component) {
      if (route.component === 'Layout') {
        //Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = dynamicImportComponent(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

// 动态获取component
function dynamicImportComponent(view: any) {
  let res
  Object.entries(modules).forEach(([key, value]) => {
    const dir = key.split('views/')[1].split('.vue')[0]
    if (dir === view) {
      res = value
    }
  })
  return res
}
//对外暴露获取小仓库的方法
export default usePermissionStore
