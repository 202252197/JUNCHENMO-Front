//创建用户相关的小仓库
import { defineStore } from 'pinia'
//导入类型
import type {
  loginFormData,
  loginResponseData,
  logoutResponseData,
  userInfoReponseData,
} from '@/api/user/type'
//导入小仓库类型
import type { UserState } from '@/store/modules/types/userType'
//导入Token工具类
import { SET_TOKEN, GET_TOKEN, RENOVE_TOKEN } from '@/utils/token'
//导入请求
import {
  reqLogin,
  reqLogout,
  reqUserInfo,
  reqUserList,
  reqAddUser,
} from '@/api/user'

//创建用户小仓库
const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      user: {
        username: '', //存储username
        avatar: '',
      },
      permissions: [],
      roles: [],
    }
  },
  actions: {
    //异步|逻辑的地方
    async userLogin(data: loginFormData) {
      //登录请求
      const result: loginResponseData = await reqLogin(data)
      console.log(result)
      if (result.code == 200) {
        const resToken: string = result.data?.access_token as string
        SET_TOKEN(resToken)
        this.token = resToken
        return 'ok'
      } else {
        return Promise.reject(result.msg)
      }
    },
    //退出登录
    async userLogout() {
      const result: logoutResponseData = await reqLogout()
      if (result.code == 200) {
        this.token = ''
        RENOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(result.msg)
      }
    },
    //获取用户信息方法
    async userInfo() {
      const result: userInfoReponseData = await reqUserInfo()
      if (result.code == 200) {
        this.user.avatar = result.user.avatar
        this.user.username = result.user.username
        this.roles = result.roles
        this.permissions = result.permissions
        return Promise.resolve('ok')
      } else {
        return Promise.reject(result.msg)
      }
    },
    //获取用户
    async userList(data: any, pageNum: number, pageSize: number) {
      const result: any = await reqUserList(data, pageNum, pageSize)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //添加用户
    async addUser(data: any) {
      const result: any = await reqAddUser(data)
      if (result.code == 200) {
        console.log(result)
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
  },
  getters: {
    getUserNameTextFirst(): string {
      return this.user.username?.charAt(0) as string
    },
  },
})

//对外暴露获取小仓库的方法
export default useUserStore
