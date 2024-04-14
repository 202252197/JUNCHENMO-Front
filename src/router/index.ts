import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'
//创建路由器
const router = createRouter({
  //路由模式hash
  history: createWebHashHistory(),
  routes: constantRoutes,
})
export default router
