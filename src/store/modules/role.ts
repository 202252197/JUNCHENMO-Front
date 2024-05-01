//创建角色相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import {
  reqRoleList,
  reqUpStatusRole,
  reqAddRole,
  reqRoleAllList,
} from '@/api/role'

//创建角色小仓库
const roleoleStore = defineStore('role', {
  state: () => {
    return {}
  },
  actions: {
    //获取全部角色列表
    async roleAllList() {
      const result: any = await reqRoleAllList()
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //获取角色列表
    async roleList(data: any, pageNum: number, pageSize: number) {
      const result: any = await reqRoleList(data, pageNum, pageSize)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //添加角色
    async addRole(data: any) {
      const result: any = await reqAddRole(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //修改角色状态
    async upStatusRole(data: any) {
      const result: any = await reqUpStatusRole(data)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(result.msg)
      }
    },
  },
  getters: {},
})

//对外暴露获取小仓库的方法
export default roleoleStore
