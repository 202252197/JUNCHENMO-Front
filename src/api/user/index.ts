//统一管理咱们项目用户相关的接口

import request from '@/utils/request'
import type {
  loginFormData,
  logoutResponseData,
  userInfoReponseData,
  userListRep,
} from './type'

import API_ENUM from '@/enum/api-enum'

//项目用户相关的请求地址
export const API = {
  //获取图像验证码
  CODE_URL: '/code',
  //登录
  LOGIN_URL: `${API_ENUM.SERVER_NAME.AUTH}/login`,
  //登出
  LOGOUT_URL: `${API_ENUM.SERVER_NAME.AUTH}/logout`,
  //获取用户信息
  USERINFO_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/getInfo`,
  //获取用户列表
  USER_LIST_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/list`,
  //添加用户
  USER_ADD_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/`,
  //删除用户
  USER_DEL_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/`,
  //修改用户信息
  USER_UP_INFO_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/`,
  //修改用户状态
  USER_UP_STATUS_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/changeStatus`,
  //修改用户密码
  USER_UP_PASSWORD_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/changePassword`,
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
    url: API.USER_LIST_URL + `?pageNum=${pageNum}&pageSize=${pageSize}`,
    data,
  })

//添加用户接口
export const reqAddUser = (data: any) =>
  request<any>({
    method: 'post',
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
    data,
  })
