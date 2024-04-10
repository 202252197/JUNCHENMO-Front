//对外暴露配置路由
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', //路由命名
    meta: {
      title: '登录', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
    },
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout', //路由命名
    meta: {
      title: '', //菜单标题
      hidden: false, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页', //菜单标题
          hidden: false, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
          icon: 'HomeFilled', //Icon图标
        },
      },
    ],
  },
  {
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
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404', //路由命名
    meta: {
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
