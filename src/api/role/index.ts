//统一管理项目角色相关的接口
import request from '@/utils/request'
import type { roleListRep } from './type'

import API_ENUM from '@/enum/api-enum'

//角色模块相关的请求接口
export const API = {
  //添加角色
  ROLE_ADD_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_ROLE}`,
  //删除角色
  ROLE_DEL_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_ROLE}`,
  //修改角色
  ROLE_UP_INFO_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_ROLE}`,
  //获取角色列表
  ROLE_LIST_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_ROLE}/list`,
  //获取用户所拥有的角色列表
  USER_ROLES_LIST_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_ROLE}/authUser/allocatedList`,
  //获取角色选择框列表
  ROLE_OPTION_SELECT_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_ROLE}/optionSelect`,
  //修改角色状态
  ROLE_UP_STATUS_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_ROLE}/changeStatus`,
  //角色授权权限
  ROLE_AUTH_MENU_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_ROLE}/authMenu`,
}

/**
 * 添加角色
 * @param {Object} data - 角色数据
 */
export const reqAddRole = (data: any) =>
  request<any>({
    method: 'post',
    url: API.ROLE_ADD_URL,
    data,
  })

/**
 * 删除角色
 * @param {string} roleIds - 角色ids
 */
export const reqDelRole = (roleIds: any) =>
  request<any>({
    method: 'delete',
    url: API.ROLE_DEL_URL,
    data: roleIds
})


/**
 * 修改角色
 * @param {Object} data - 角色数据
 */
export const reqUpInfoRole = (data: any) =>
  request<any>({
    method: 'put',
    url: API.ROLE_UP_INFO_URL,
    data,
  })

/**
 * 获取角色列表
 * @param {Object} data - 查询条件
 * @param {number} pageNum - 当前页码
 * @param {number} pageSize - 每页数量
 */
export const reqRoleList = (data: any, pageNum: number, pageSize: number) =>
  request<roleListRep>({
    method: 'post',
    url: API.ROLE_LIST_URL + `?pageNum=${pageNum}&pageSize=${pageSize}`,
    data,
  })

/**
 * 获取用户所拥有的角色列表的接口
 * @param userId 用户ID
 */
export const reqUserRoleList = (userId: any) =>
  request<any>({
    method: 'get',
    url: API.USER_ROLES_LIST_URL + '/' + userId,
  })

/**
 * 获取没有被禁用的全部角色列表的接口
 */
export const reqRoleOptionSelect = () =>
  request<any>({
    method: 'get',
    url: API.ROLE_OPTION_SELECT_URL,
  })

/**
 * 修改角色的状态
 * @param {Object} data - 角色数据
 */
export const reqUpStatusRole = (data: any) =>
  request<any>({
    method: 'put',
    url: API.ROLE_UP_STATUS_URL,
    data,
  })


/**
 * 分配角色选择的菜单
 * @param {any} data - 角色id和菜单id集合
 */
export const reqAuthMenu = (data:any) =>
  request<any>({
    method: 'put',
    url: API.ROLE_AUTH_MENU_URL,
    params: data,
  })
