//统一管理咱们项目用户相关的接口

import request from '@/utils/request'

import API_ENUM from '@/enum/api-enum'

//菜单模块相关的请求接口
export const API = {
  //获取数据字典项列表
  DICT_TYPE_LIST_URL : `${API_ENUM.SERVER_MODE_NAME.SYSTEM_DICT_TYPE}/list`,
  //获取全部的数据字典序以及扩展参数
  DICT_TYPE_LIST_ALL_URL : `${API_ENUM.SERVER_MODE_NAME.SYSTEM_DICT_TYPE}/listAll`,
  //添加数据字典
  DICT_TYPE_ADD_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_DICT_TYPE}`,
}

//获取字典项列表
export const reqDictTypeList = (data: any, pageNum: number, pageSize: number) =>
    request<any>({
      method: 'post',
      url: API.DICT_TYPE_LIST_URL+ `?pageNum=${pageNum}&pageSize=${pageSize}`,
      data
})

//获取全部字典项列表以及额外参数
export const reqDictTypeListAll = () =>
  request<any>({
    method: 'get',
    url: API.DICT_TYPE_LIST_ALL_URL
})


/**
 * 添加字典项的接口
 * @param {Object} data - 字典项数据
 * @returns {Promise} - 返回一个Promise对象
 */
export const reqAddDictType = (data: any) =>
  request<any>({
    method: 'post',
    url: API.DICT_TYPE_ADD_URL,
    data,
})
