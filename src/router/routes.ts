<<<<<<< HEAD
//对外暴露配置路由
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', //路由命名
    meta: {
      title: '登录', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
=======
/* Layout */
//导入layout组件
import Layout from '@/layout/index.vue'

/**
 * Note: 路由配置项
 *
 *                                  // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
  }
 */

//对外暴露配置路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录', //菜单标题
      hidden: false, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
>>>>>>> master
    },
  },
  {
    path: '/',
<<<<<<< HEAD
    component: () => import('@/layout/index.vue'),
    name: 'layout', //路由命名
    meta: {
      title: '', //菜单标题
      hidden: false, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
    },
=======
    component: Layout,
>>>>>>> master
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页', //菜单标题
<<<<<<< HEAD
          hidden: false, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
=======
          hidden: true, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
>>>>>>> master
          icon: 'HomeFilled', //Icon图标
        },
      },
    ],
  },
  {
<<<<<<< HEAD
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      title: '数据大屏', //菜单标题
      hidden: false, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
      icon: 'Platform', //Icon图标
    },
  },
  // {
  //   path: '/acl',
  //   component: () => import('@/layout/index.vue'),
  //   name: 'Acl',
  //   redirect: '/acl/user',
  //   meta: {
  //     title: '系统管理', //菜单标题
  //     hidden: false, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
  //     icon: 'Lock', //Icon图标
  //   },
  //   children: [
  //     {
  //       path: '/acl/user',
  //       component: () => import('@/views/acl/user/index.vue'),
  //       name: 'User',
  //       meta: {
  //         title: '用户管理', //菜单标题
  //         hidden: false, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
  //         icon: 'User', //Icon图标
  //       },
  //     },
  //     {
  //       path: '/acl/role',
  //       component: () => import('@/views/acl/role/index.vue'),
  //       name: 'Role',
  //       meta: {
  //         title: '角色管理', //菜单标题
  //         hidden: false, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
  //         icon: 'UserFilled', //Icon图标
  //       },
  //     },
  //     {
  //       path: '/acl/permission',
  //       component: () => import('@/views/acl/permission/index.vue'),
  //       name: 'Permission',
  //       meta: {
  //         title: '权限管理', //菜单标题
  //         hidden: false, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
  //         icon: 'Monitor', //Icon图标
  //       },
  //     },
  //   ],
  // },
  {
=======
>>>>>>> master
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404', //路由命名
    meta: {
<<<<<<< HEAD
      title: '404', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any', //路由命名
    meta: {
      title: '任意路由', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
    },
  },
]
//异步获取路由表
export const asyncRouter = []
=======
      hidden: false, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
    },
  },
]

//导出一个404页面，让动态路由引用，因为他必须放在路由的最后
export const error404 = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'Any', //路由命名
  meta: {
    hidden: false, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
  },
}
>>>>>>> master
