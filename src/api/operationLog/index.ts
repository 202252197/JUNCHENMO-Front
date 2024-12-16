//统一管理项目角色相关的接口
import request from '@/utils/request'
// import type {  } from './type'

import API_ENUM from '@/enum/api-enum'

//日志模块相关的请求接口
export const API = {
  //获取操作日志
  OPERACTION_LOG_LIST_URL: `${API_ENUM.SERVER_MODE_NAME.OPERACTION_LOG_DATA}/list`,
  //删除操作日志
  OPERACTION_LOG_DELETE_URL: `${API_ENUM.SERVER_MODE_NAME.OPERACTION_LOG_DATA}/`,
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
    url:
      API.OPERACTION_LOG_LIST_URL + `?pageNum=${pageNum}&pageSize=${pageSize}`,
    data,
  })

/**
 * 删除操作日志的接口
 * @param {string} operationLogIds - 字典项ids
 * @returns {Promise} - 返回一个Promise对象
 */
export const reqDelOperationLog = (operationLogIds: any) =>
  request<any>({
    method: 'delete',
    url: API.OPERACTION_LOG_DELETE_URL,
    data: operationLogIds,
  })
