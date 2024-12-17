//统一管理项目角色相关的接口
import request from '@/utils/request'
// import type {  } from './type'

import API_ENUM from '@/enum/api-enum'

//日志模块相关的请求接口
export const API = {
  //获取操作日志
  LIST_URL: `${API_ENUM.SERVER_MODE_NAME.OPERACTION_LOG_DATA}/list`,
  //删除操作日志
  DELETE_URL: `${API_ENUM.SERVER_MODE_NAME.OPERACTION_LOG_DATA}/`,
  //清空操作日志
  CLEAR_URL: `${API_ENUM.SERVER_MODE_NAME.OPERACTION_LOG_DATA}/clear`,
  //获取操作日志可选操作人员名称
  OPER_NAME_OPTION_SELECT_URL: `${API_ENUM.SERVER_MODE_NAME.OPERACTION_LOG_DATA}/nameOptionSelect`,
  //获取操作日志可选操作模块标题
  TITLE_OPTION_SELECT_URL: `${API_ENUM.SERVER_MODE_NAME.OPERACTION_LOG_DATA}/titleOptionSelect`,
  //获取操作日志可选操作业务名称
  BUSINESS_NAME_CLEAR_URL: `${API_ENUM.SERVER_MODE_NAME.OPERACTION_LOG_DATA}/businessNameOptionSelectByTitle`,
}

/**
 * 获取操作日志列表
 * @param {Object} data - 查询条件
 * @param {number} pageNum - 当前页码
 * @param {number} pageSize - 每页数量
 */
export const reqOperationLogList = (
  data: any,
  pageNum: number,
  pageSize: number,
) =>
  request({
    method: 'post',
    url: API.LIST_URL,
    params: { pageNum, pageSize },
    data,
  })

/**
 * 删除操作日志的接口
 * @param {string} operationLogIds - 字典项ids
 */
export const reqDelOperationLog = (operationLogIds: any) =>
  request<any>({
    method: 'delete',
    url: API.DELETE_URL,
    data: operationLogIds,
  })

/**
 * 清空操作日志的接口
 */
export const reqClearOperationLog = () =>
  request<any>({
    method: 'delete',
    url: API.CLEAR_URL,
  })

/**
 * 获取操作日志可选操作人员名称
 */
export const reqOperNameOptionSelect = () =>
  request<any>({
    method: 'get',
    url: API.OPER_NAME_OPTION_SELECT_URL,
  })

/**
 * 获取操作日志可选模块标题
 */
export const reqTitleOptionSelect = () =>
  request<any>({
    method: 'get',
    url: API.TITLE_OPTION_SELECT_URL,
  })

/**
 * 获取操作日志可选模块标题的业务名称
 */
export const reqBusinessNameOptionSelect = (title: string) =>
  request<any>({
    method: 'get',
    url: API.BUSINESS_NAME_CLEAR_URL,
    params: { title },
  })
