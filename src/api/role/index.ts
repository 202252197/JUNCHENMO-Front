//统一管理咱们项目角色相关的接口

import request from '@/utils/request'
import type { roleListRep } from './type'

import API_ENUM from '@/enum/api-enum'

//角色模块相关的请求接口
export const API = {
  //获取全部角色列表
  ROLE_LIST_ALL_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_ROLE}/listAll`,
  //获取用户所拥有的角色列表
  USER_ROLES_LIST_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_ROLE}/queryUserRoles`,
  //获取角色列表
  ROLE_LIST_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_ROLE}/list`,
  //获取没有被禁用的角色列表
  ROLE_NOT_DISABLED_LIST_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_ROLE}/listNotDisabledAll`,
  //添加角色
  ROLE_ADD_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_ROLE}`,
  //删除角色
  ROLE_DEL_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_ROLE}`,
  //修改角色
  ROLE_UP_INFO_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_ROLE}`,
  //修改角色状态
  ROLE_UP_STATUS_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_ROLE}/changeStatus`,
  //选择授权用户的角色
  ROLE_SELECT_USER_ROLES: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_ROLE}/authUserRole/selectAll`,
}

/**
 * 获取全部角色列表的接口
 * @returns {Promise} - 返回一个Promise对象
 */
export const reqRoleAllList = () =>
  request<any>({
    method: 'get',
    url: API.ROLE_LIST_ALL_URL,
  })


/**
 * 获取没有被禁用的全部角色列表的接口
 * @returns {Promise} - 返回一个Promise对象
 */
export const reqRoleNotDisabledAllList = () =>
  request<any>({
    method: 'get',
    url: API.ROLE_NOT_DISABLED_LIST_URL,
  })


/**
 * 获取用户所拥有的角色列表的接口
 * @returns {Promise} - 返回一个Promise对象
 */
export const reqUserRoleList = (userId: any) =>
  request<any>({
    method: 'get',
    url: API.USER_ROLES_LIST_URL + '/' + userId,
  })

/**
 * 获取角色列表的接口
 * @param {Object} data - 查询条件
 * @param {number} pageNum - 当前页码
 * @param {number} pageSize - 每页数量
 * @returns {Promise} - 返回一个Promise对象
 */
export const reqRoleList = (data: any, pageNum: number, pageSize: number) =>
  request<roleListRep>({
    method: 'post',
    url: API.ROLE_LIST_URL + `?pageNum=${pageNum}&pageSize=${pageSize}`,
    data,
  })

/**
 * 添加角色的接口
 * @param {Object} data - 角色数据
 * @returns {Promise} - 返回一个Promise对象
 */
export const reqAddRole = (data: any) =>
  request<any>({
    method: 'post',
    url: API.ROLE_ADD_URL,
    data,
  })

/**
 * 删除角色的接口
 * @param {string} userId - 角色id
 * @returns {Promise} - 返回一个Promise对象
 */
export const reqDelRole = (userId: any) =>
  request<any>({
    method: 'delete',
    url: API.ROLE_DEL_URL + '/' + userId,
  })

/**
 * 修改角色的基本信息
 * @param {Object} data - 修改基本信息的数据
 * @returns {Promise} - 返回一个Promise对象
 */
export const reqUpInfoRole = (data: any) =>
  request<any>({
    method: 'put',
    url: API.ROLE_UP_INFO_URL,
    data,
})


/**
 * 修改角色的状态
 * @param {Object} data - 修改状态的数据
 * @returns {Promise} - 返回一个Promise对象
 */
export const reqUpStatusRole = (data: any) =>
  request<any>({
    method: 'put',
    url: API.ROLE_UP_STATUS_URL,
    data,
  })

/**
 * 分配用户选择的角色
 * @param {string} userId - 用户id
 * @param {Array<string>} rolesId - 角色id的数组
 * @returns {Promise} - 返回一个Promise对象
 */
export const reqSelectUserRoles = (userId: any, rolesId: any) =>
  request<any>({
    method: 'put',
    url: API.ROLE_SELECT_USER_ROLES,
    data: { userId: userId, rolesId: rolesId },
  })
