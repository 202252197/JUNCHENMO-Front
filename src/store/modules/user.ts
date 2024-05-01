//创建用户相关的小仓库
import { defineStore } from 'pinia'
//导入类型
import type {
<<<<<<< HEAD
=======
  user,
>>>>>>> master
  loginFormData,
  loginResponseData,
  logoutResponseData,
  userInfoReponseData,
} from '@/api/user/type'
<<<<<<< HEAD
//导入小仓库类型
import type { UserState } from '@/store/modules/types/userType'
=======
>>>>>>> master
//导入Token工具类
import { SET_TOKEN, GET_TOKEN, RENOVE_TOKEN } from '@/utils/token'
//导入请求
import {
  reqLogin,
  reqLogout,
  reqUserInfo,
  reqUserList,
  reqAddUser,
<<<<<<< HEAD
} from '@/api/user'
//引入路由（常亮路由）
import { constantRoute } from '@/router/routes'
//创建用户小仓库
const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      user: {
        username: '', //存储username
        avatar: '',
      },
      menuRoutes: constantRoute, //仓库存储生成菜单需要的数组
      asyncMenuRouter: [],
=======
  reqDelUser,
  reqUpStatusUser,
  reqUpPasswordUser,
  reqUpInfoUser,
} from '@/api/user'

//创建用户小仓库
const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      user: <user>{},
      permissions: [],
      roles: [],
>>>>>>> master
    }
  },
  actions: {
    //异步|逻辑的地方
    async userLogin(data: loginFormData) {
      //登录请求
      const result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        const resToken: string = result.data?.access_token as string
        SET_TOKEN(resToken)
        this.token = resToken
        return 'ok'
      } else {
<<<<<<< HEAD
        return Promise.reject(new Error(result.msg))
=======
        return Promise.reject(result.msg)
>>>>>>> master
      }
    },
    //退出登录
    async userLogout() {
      const result: logoutResponseData = await reqLogout()
      if (result.code == 200) {
        this.token = ''
<<<<<<< HEAD
        this.user.username = ''
        RENOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.msg))
=======
        RENOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(result.msg)
>>>>>>> master
      }
    },
    //获取用户信息方法
    async userInfo() {
      const result: userInfoReponseData = await reqUserInfo()
      if (result.code == 200) {
<<<<<<< HEAD
        this.user.avatar = result.user.avatar
        this.user.username = result.user.username
        return 'ok'
      } else {
        return Promise.reject('获取用户失败')
      }
    },
    //获取用户
    async userList(data: any, pageNum: number, pageSize: number) {
      const result: any = await reqUserList(data, pageNum, pageSize)
      if (result.code == 200) {
        console.log(result)
        return result
      } else {
        return Promise.reject('获取用户列表失败')
=======
        this.user = result.user
        this.roles = result.roles
        this.permissions = result.permissions
        return Promise.resolve('ok')
      } else {
        return Promise.reject(result.msg)
      }
    },
    //获取用户列表
    async userList(data: any, pageNum: number, pageSize: number) {
      const result: any = await reqUserList(data, pageNum, pageSize)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
>>>>>>> master
      }
    },
    //添加用户
    async addUser(data: any) {
      const result: any = await reqAddUser(data)
      if (result.code == 200) {
<<<<<<< HEAD
        console.log(result)
        return result
      } else {
        return Promise.reject('添加用户失败')
=======
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //删除用户
    async delUser(data: any) {
      const result: any = await reqDelUser(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //修改用户状态
    async upStatusUser(data: any) {
      const result: any = await reqUpStatusUser(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //修改用户密码
    async upPasswordUser(data: any) {
      const result: any = await reqUpPasswordUser(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //修改用户信息
    async upInfoUser(data: any) {
      const result: any = await reqUpInfoUser(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
>>>>>>> master
      }
    },
  },
  getters: {
<<<<<<< HEAD
    getUserNameTextFirst(): string {
      return this.user.username?.charAt(0) as string
    },
    getMenu(): any {
      return this.menuRoutes.concat(this.asyncMenuRouter)
    },
=======
    //获取名称的第一个字符
    getUserNameTextFirst(): string {
      return this.user.username?.charAt(0) as string
    },
>>>>>>> master
  },
})

//对外暴露获取小仓库的方法
export default useUserStore
