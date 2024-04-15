//统一管理咱们项目用户相关的接口

import request from '@/utils/request'
import type {
  loginFormData,
  logoutResponseData,
  userInfoReponseData,
  userListRep,
} from './type'

//项目用户相关的请求地址
enum API {
  //获取图像验证码
  CODE_URL = '/code',
  //登录
  LOGIN_URL = '/auth/login',
  //登出
  LOGOUT_URL = '/auth/logout',
  //获取用户信息
  USERINFO_URL = '/system/user/getInfo',
  //获取用户列表
  USES_LIST_URL = '/system/user/list',
  //添加用户
  USES_ADD_URL = '/system/user/',
}
//登录接口
export const reqCode = () =>
  request<any>({
    method: 'get',
    url: API.CODE_URL,
  })

//登录接口
export const reqLogin = (data: loginFormData) =>
  request<any>({
    method: 'post',
    url: API.LOGIN_URL,
    data,
  })

//退出登录
export const reqLogout = () =>
  request<logoutResponseData>({
    method: 'delete',
    url: API.LOGOUT_URL,
  })

//获取用户信息
export const reqUserInfo = () =>
  request<userInfoReponseData>({
    method: 'get',
    url: API.USERINFO_URL,
  })

//用户列表获取接口
export const reqUserList = (data: any, pageNum: number, pageSize: number) =>
  request<userListRep>({
    method: 'post',
    url: API.USES_LIST_URL + `?pageNum=${pageNum}&pageSize=${pageSize}`,
    data,
  })

//添加用户接口
export const reqAddUser = (data: any) =>
  request<any>({
    method: 'post',
    url: API.USES_ADD_URL,
    data,
  })
