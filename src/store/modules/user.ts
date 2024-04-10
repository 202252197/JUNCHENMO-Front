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
        return Promise.reject(new Error(result.msg))
      }
    },
    //退出登录
    async userLogout() {
      const result: logoutResponseData = await reqLogout()
      if (result.code == 200) {
        this.token = ''
        this.user.username = ''
        RENOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    //获取用户信息方法
    async userInfo() {
      const result: userInfoReponseData = await reqUserInfo()
      if (result.code == 200) {
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
      }
    },
    //添加用户
    async addUser(data: any) {
      const result: any = await reqAddUser(data)
      if (result.code == 200) {
        console.log(result)
        return result
      } else {
        return Promise.reject('添加用户失败')
      }
    },
  },
  getters: {
    getUserNameTextFirst(): string {
      return this.user.username?.charAt(0) as string
    },
    getMenu(): any {
      return this.menuRoutes.concat(this.asyncMenuRouter)
    },
  },
})

//对外暴露获取小仓库的方法
export default useUserStore
