/* Layout */
//导入layout组件
import Layout from '@/layout/index.vue'
//对外暴露配置路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录', //菜单标题
      hidden: false, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
    },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页', //菜单标题
          hidden: true, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
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
      hidden: true, //代表路由标题在菜单中是否隐藏 true:隐藏 false:不隐藏
      icon: 'Platform', //Icon图标
    },
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404', //路由命名
    meta: {
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
