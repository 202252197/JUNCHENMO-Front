//统一管理咱们项目角色相关的接口

import request from '@/utils/request'
import type { roleListRep } from './type'
enum SERVER_NAME {
  SYSTEM = '/system',
}
//项目角色相关的请求地址
enum API {
  //获取全部角色列表
  ROLE_LIST_ALL_URL = SERVER_NAME.SYSTEM + '/role/listAll',
  //获取角色列表
  ROLE_LIST_URL = SERVER_NAME.SYSTEM + '/role/list',
  //添加角色
  ROLE_ADD_URL = SERVER_NAME.SYSTEM + '/role/',
  //删除角色
  ROLE_DEL_URL = SERVER_NAME.SYSTEM + '/role/',
  //修改角色
  ROLE_UP_INFO_URL = SERVER_NAME.SYSTEM + '/role/',
  //修改角色状态
  ROLE_UP_STATUS_URL = SERVER_NAME.SYSTEM + '/role/changeStatus',
}

//全部角色列表获取接口
export const reqRoleAllList = () =>
  request<any>({
    method: 'get',
    url: API.ROLE_LIST_ALL_URL,
  })

//角色列表获取接口
export const reqRoleList = (data: any, pageNum: number, pageSize: number) =>
  request<roleListRep>({
    method: 'post',
    url: API.ROLE_LIST_URL + `?pageNum=${pageNum}&pageSize=${pageSize}`,
    data,
  })

//添加角色接口
export const reqAddRole = (data: any) =>
  request<any>({
    method: 'post',
    url: API.ROLE_ADD_URL,
    data,
  })

//删除角色接口
export const reqDelRole = (userId: any) =>
  request<any>({
    method: 'delete',
    url: API.ROLE_DEL_URL + '/' + userId,
  })

//修改角色的状态
export const reqUpStatusRole = (data: any) =>
  request<any>({
    method: 'put',
    url: API.ROLE_UP_STATUS_URL,
    data,
  })
