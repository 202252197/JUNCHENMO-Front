import { createRouter, createWebHashHistory } from 'vue-router'
<<<<<<< HEAD
import { constantRoute } from './routes'
=======
import { constantRoutes } from './routes'
>>>>>>> master
//创建路由器
const router = createRouter({
  //路由模式hash
  history: createWebHashHistory(),
<<<<<<< HEAD
  routes: constantRoute,
=======
  routes: constantRoutes,
>>>>>>> master
})
export default router
