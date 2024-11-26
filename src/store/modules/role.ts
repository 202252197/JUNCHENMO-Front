//创建角色相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import {
  reqRoleList,
  reqRoleNotDisabledAllList,
  reqUpInfoRole,
  reqUpStatusRole,
  reqAddRole,
  reqRoleAllList,
  reqSelectUserRoles,
  reqUserRoleList,
  reqDelRole,
} from '@/api/role'

//创建角色小仓库
const useRoleStore = defineStore('role', {
  state: () => {
    return {}
  },
  actions: {
    //获取用户的角色列表
    async getUserRoleList(data: any) {
      const result: any = await reqUserRoleList(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //获取全部角色列表
    async roleAllList() {
      const result: any = await reqRoleAllList()
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //获取没有停用的全部角色列表
    async roleNotDisabledAllList() {
      const result: any = await reqRoleNotDisabledAllList()
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
     //删除角色
    async deleteRole(data: any) {
      const result: any = await reqDelRole(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //修改角色信息
    async upInfoRole(data: any) {
      const result: any = await reqUpInfoRole(data)
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
    //分配选择的角色
    async selectUserRoles(userId: any, rolesId: any) {
      const result: any = await reqSelectUserRoles(userId, rolesId)
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
export default useRoleStore
