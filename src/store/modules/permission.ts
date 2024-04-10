//创建用户相关的小仓库
import { defineStore } from 'pinia'
//导入类型
import type { routerRespone } from '@/api/permission/type'
//导入请求
import { getRouter } from '@/api/permission'
//创建用户小仓库
const usePermissionStore = defineStore('Permission', {
  state: () => {
    return {}
  },
  actions: {
    //获取用户所拥有的路由列表
    async getRouter() {
      const result: routerRespone = await getRouter()
      if (result.code == 200) {
        return result.data
      } else {
        return Promise.reject('获取路由列表失败')
      }
    },
  },
  getters: {},
})

//对外暴露获取小仓库的方法
export default usePermissionStore
