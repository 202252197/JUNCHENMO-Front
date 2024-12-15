//创建用户相关的小仓库
import { defineStore } from 'pinia'
//导入类型
import type {
  User,
  loginFormData,
  loginResponseData,
  logoutResponseData,
  userInfoReponseData,
} from '@/api/user/type'
//导入Token工具类
import { SET_TOKEN, GET_TOKEN, RENOVE_TOKEN } from '@/utils/token'
//导入请求
import {
  reqCode,
  reqLogin,
  reqLogout,
  reqUserInfo,
  reqUserList,
  reqAddUser,
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
      user: <User>{},
      permissions: [],
      roles: [],
      commonform: {
        userId: '',
        username: '',
        nickname: '',
        password: '',
        mobile: '',
        email: '',
      },
      searchform:{
        username: '',
        nickname: '',
        status: '',
        mobile: '',
        email: '',
      }
    }
  },
  actions: {
    //异步|逻辑的地方
    async code() {
      //登录请求
      const result: any = await reqCode()
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
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
      }
    },
    //添加用户
    async addUser(data: any) {
      const result: any = await reqAddUser(data)
      if (result.code == 200) {
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
      }
    },
  },
  getters: {
    //获取名称的第一个字符
    getUserNameTextFirst(): string {
      return this.user.username?.charAt(0) as string
    },
    //获取主题颜色
    getThemeColor:(state)=> {
      return (themeStatus:boolean) => themeStatus? '#5072e6' :'red';
    },
  },
})

//对外暴露获取小仓库的方法
export default useUserStore
