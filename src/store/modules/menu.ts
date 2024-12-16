//创建用户相关的小仓库
import { defineStore } from 'pinia'
import router from '@/router'
import { error404 } from '@/router/routes'
import { isNotHttp } from '@/utils/common'
//导入请求
import { getRouters,reqAddMenu,reqMenuList,reqDelMenu,reqUpInfoMenu,reqLastSortMenu,reqHomeMenuIcon,reqRoleMenuList,reqUpStatusMenu} from '@/api/menu'
//导入layout组件
import Layout from '@/layout/index.vue'
//引入路由（常量路由）
import { constantRoutes } from '@/router/routes'
const modules = import.meta.glob('../../views/**/**/*.vue')
//创建用户小仓库
const useMenuStore = defineStore('Menu', {
  state: () => {
    return {
      routes: [] as any, //路由树
      sidebarRouters: [] as any, //左侧菜单树
      cacheRouterNames: [], //缓存的路由名称需要和组件名一致
      dataList: [],  //表格数据
      expandStatus: false, //表格展开状态
      refreshTable: true, //重新渲染表格状态
      searchform: {
        name: '',
        status: '',
      },
      commonform:{
        menuId:'',
        parentId: '0',
        name: '',
        type: 0,
        icon: '',
        component: '',
        link: '',
        sort:'',
        permission:'',
        visible:true,
        keepAlive:false,
      }
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
          RoutesData.forEach((route: any) => {
            console.log(route.path)
            if (isNotHttp(route.path)) {
              router.addRoute(route) // 动态添加可访问路由表
            }
          })
          resolve(RoutesData)
        })
      })
    },
    //获取菜单列表
    menuList(data: any) {
      return new Promise((resolve) => {
        reqMenuList(data).then((res) => {
          resolve(res.data)
        })
      })
    },
    //添加菜单
    async addMenu(data: any) {
      const result: any = await reqAddMenu(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //将菜单列表转换成select选项数据
    getTreeSelectData(inputData:any){
      return [{
        value: '0',
        label: '根菜单',
        children: this.transformData(inputData)
      }]
    },
    transformData(inputData:any) {
      let result:any = [];
      inputData.forEach((item:any) => {
        let newItem = {
          value: item.menuId.toString(),
          label: item.name,
          children: []
        };
        if (item.children && item.children.length > 0) {
          newItem.children = this.transformData(item.children);
        }
        result.push(newItem);
      });
      return result;
    },
    //删除用户
    async delMenu(data: any) {
      const result: any = await reqDelMenu(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //修改用户信息
    async upInfoMenu(data: any) {
      const result: any = await reqUpInfoMenu(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //修改菜单的状态以及所有子菜单的状态
    async upStatusMenu(data: any) {
      const result: any = await reqUpStatusMenu(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
     //获取子菜单的最后sort+100
    async lastSortMenu(data: any) {
      const result: any = await reqLastSortMenu(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
     //获取首页的ICON图标
    async homeIconMenu() {
        const result: any = await reqHomeMenuIcon()
        if (result.code == 200) {
          return result
        } else {
          return Promise.reject(result.msg)
        }
     },
    //获取角色的菜单列表
    async getRoleMenuList(data: any) {
      const result: any = await reqRoleMenuList(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //分配选择的菜单
    async selectRoleMenus(userId: any, rolesId: any) {
      const result: any = await reqSelectRoleMenus(userId, rolesId)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(result.msg)
      }
    },
  },
  getters: {},
})

//过滤路由方法封装
function filterAsyncRouter(asyncRouterMap: any) {
  //遍历后台传来的路由字符串，转换为组件对象
  return asyncRouterMap.filter((route: any) => {
    //将缓存的router名称添加进去
    if (route.meta&&route.meta.cache) {
      useMenuStore().cacheRouterNames.push(route.name)
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
    const dir = key.split('views')[1].split('.vue')[0]
    if (dir === view) {
      res = value
    }
  })
  return res
}
//对外暴露获取小仓库的方法
export default useMenuStore
