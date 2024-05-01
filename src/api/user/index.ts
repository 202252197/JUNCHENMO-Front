//统一管理咱们项目用户相关的接口

import request from '@/utils/request'
import type {
  loginFormData,
  logoutResponseData,
  userInfoReponseData,
  userListRep,
} from './type'
<<<<<<< HEAD

//项目用户相关的请求地址
enum API {
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
export const reqLogin = (data: loginFormData) =>
  request<loginFormData>({
=======
enum SERVER_NAME {
  SYSTEM = '/system',
  AUTH = '/auth',
}
//项目用户相关的请求地址
enum API {
  //获取图像验证码
  CODE_URL = '/code',
  //登录
  LOGIN_URL = SERVER_NAME.AUTH + '/login',
  //登出
  LOGOUT_URL = SERVER_NAME.AUTH + '/logout',
  //获取用户信息
  USERINFO_URL = SERVER_NAME.SYSTEM + '/user/getInfo',
  //获取用户列表
  USER_LIST_URL = SERVER_NAME.SYSTEM + '/user/list',
  //添加用户
  USER_ADD_URL = SERVER_NAME.SYSTEM + '/user/',
  //删除用户
  USER_DEL_URL = SERVER_NAME.SYSTEM + '/user/',
  //修改用户信息
  USER_UP_INFO_URL = SERVER_NAME.SYSTEM + '/user/',
  //修改用户状态
  USER_UP_STATUS_URL = SERVER_NAME.SYSTEM + '/user/changeStatus',
  //修改用户密码
  USER_UP_PASSWORD_URL = SERVER_NAME.SYSTEM + '/user/changePassword',
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
>>>>>>> master
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
<<<<<<< HEAD
    url: API.USES_LIST_URL + `?pageNum=${pageNum}&pageSize=${pageSize}`,
=======
    url: API.USER_LIST_URL + `?pageNum=${pageNum}&pageSize=${pageSize}`,
>>>>>>> master
    data,
  })

//添加用户接口
export const reqAddUser = (data: any) =>
  request<any>({
    method: 'post',
<<<<<<< HEAD
    url: API.USES_ADD_URL,
=======
    url: API.USER_ADD_URL,
    data,
  })

//删除用户接口
export const reqDelUser = (userId: any) =>
  request<any>({
    method: 'delete',
    url: API.USER_DEL_URL + '/' + userId,
  })

//修改用户的状态
export const reqUpStatusUser = (data: any) =>
  request<any>({
    method: 'put',
    url: API.USER_UP_STATUS_URL,
    data,
  })

//修改用户的密码
export const reqUpPasswordUser = (data: any) =>
  request<any>({
    method: 'put',
    url: API.USER_UP_PASSWORD_URL,
    data,
  })

//修改用户的基本信息
export const reqUpInfoUser = (data: any) =>
  request<any>({
    method: 'put',
    url: API.USER_UP_INFO_URL,
>>>>>>> master
    data,
  })
