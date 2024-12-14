//统一管理咱们项目用户相关的接口
import request from '@/utils/request'
import API_ENUM from '@/enum/api-enum'

//菜单模块相关的请求接口
export const API = {
  //获取数据字典值列表
  DICT_DATA_LIST_URL : `${API_ENUM.SERVER_MODE_NAME.SYSTEM_DICT_DATA}/list`,
  //添加数据字典
  DICT_DATA_ADD_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_DICT_DATA}`,
  //删除数据字典值
  DICT_DATA_DELETE_URL : `${API_ENUM.SERVER_MODE_NAME.SYSTEM_DICT_DATA}/`,
  //获取字典数据项详情数据列表
  DICT_DATA_INFO_LIST_URL : `${API_ENUM.SERVER_MODE_NAME.SYSTEM_DICT_DATA}/getInfoByNames`,
  //获取字典数据项详情数据
  DICT_DATA_INFO_URL : `${API_ENUM.SERVER_MODE_NAME.SYSTEM_DICT_DATA}/getInfoByName`,
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


/**
 * 删除字典值的接口
 * @param {string} dictDataId - 字典值id
 * @returns {Promise} - 返回一个Promise对象
 */
export const reqDelDictData = (dictDataId: any) =>
  request<any>({
    method: 'delete',
    url: API.DICT_DATA_DELETE_URL + '/' + dictDataId,
})


//获取所有的字典项值的数据值和扩展参数
export const reqDictDataInfoList = (names:any) =>
  request<any>({
    method: 'post',
    url: API.DICT_DATA_INFO_LIST_URL,
    data:names
})

//获取字典项值的数据值和扩展参数
export const reqDictDataInfo = (name:string) =>
  request<any>({
    method: 'get',
    url: API.DICT_DATA_INFO_URL + '/' + name,
})