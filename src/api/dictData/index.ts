//统一管理咱们项目用户相关的接口
import request from '@/utils/request'
import API_ENUM from '@/enum/api-enum'

//菜单模块相关的请求接口
export const API = {
  //获取数据字典值列表
  DICT_DATA_LIST_URL : `${API_ENUM.SERVER_MODE_NAME.SYSTEM_DICT_DATA}/list`,
  //添加数据字典
  DICT_DATA_ADD_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_DICT_DATA}`,
}

//获取字典值列表
export const reqDictDataList = (data: any, pageNum: number, pageSize: number) =>
    request<any>({
      method: 'post',
      url: API.DICT_DATA_LIST_URL+ `?pageNum=${pageNum}&pageSize=${pageSize}`,
      data
})

/**
 * 添加字典项的接口
 * @param {Object} data - 字典项数据
 * @returns {Promise} - 返回一个Promise对象
 */
export const reqAddDictData = (data: any) =>
  request<any>({
    method: 'post',
    url: API.DICT_DATA_ADD_URL,
    data,
})
