//统一管理项目用户相关的接口
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
  //添加用户
  USER_ADD_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/`,
  //删除用户
  USER_DEL_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/`,
  //修改用户
  USER_UP_INFO_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/`,
  //获取用户列表
  USER_LIST_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/list`,
  //获取用户信息
  USER_INFO_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/getInfo`,
  //修改用户状态
  USER_UP_STATUS_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/changeStatus`,
  //修改用户密码
  USER_UP_PASSWORD_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/changePassword`,
  //用户授权角色
  USER_AUTH_ROLE_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/authRole`,
}

/**
 * 获取验证码
 */
export const reqCode = () =>
  request<any>({
    method: 'get',
    url: API.CODE_URL,
  })

/**
 * 登录接口
 * @param data 登录数据
 */
export const reqLogin = (data: loginFormData) =>
  request<any>({
    method: 'post',
    url: API.LOGIN_URL,
    data,
  })

/**
 * 退出登录
 */
export const reqLogout = () =>
  request<logoutResponseData>({
    method: 'delete',
    url: API.LOGOUT_URL,
  })

/**
 * 添加用户
 * @param data 用户数据
 */
export const reqAddUser = (data: any) =>
  request<any>({
    method: 'post',
    url: API.USER_ADD_URL,
    data,
  })

/**
 * 删除用户
 * @param userId 用户Id
 */
export const reqDelUser = (userId: any) =>
  request<any>({
    method: 'delete',
    url: API.USER_DEL_URL + '/' + userId,
  })

/**
 * 修改用户
 * @param data 用户数据
 */
export const reqUpInfoUser = (data: any) =>
  request<any>({
    method: 'put',
    url: API.USER_UP_INFO_URL,
    data,
  })

/**
 * 获取用户列表
 * @param {Object} data - 查询条件
 * @param {number} pageNum - 当前页码
 * @param {number} pageSize - 每页数量
 */
export const reqUserList = (data: any, pageNum: number, pageSize: number) =>
  request<userListRep>({
    method: 'post',
    url: API.USER_LIST_URL + `?pageNum=${pageNum}&pageSize=${pageSize}`,
    data,
  })

/**
 * 获取用户信息
 */
export const reqUserInfo = () =>
  request<userInfoReponseData>({
    method: 'get',
    url: API.USER_INFO_URL,
  })

/**
 * 修改用户的状态
 * @param data 用户数据
 */
export const reqUpStatusUser = (data: any) =>
  request<any>({
    method: 'put',
    url: API.USER_UP_STATUS_URL,
    data,
  })

/**
 * 修改用户的密码
 * @param data 用户数据
 */
export const reqUpPasswordUser = (data: any) =>
  request<any>({
    method: 'put',
    url: API.USER_UP_PASSWORD_URL,
    data,
  })


/**
 * 分配用户选择的角色
 * @param {any} data - 用户id和角色id集合
 */
export const reqAuthRole = (data:any) =>
  request<any>({
    method: 'put',
    url: API.USER_AUTH_ROLE_URL,
    params: data,
  })
