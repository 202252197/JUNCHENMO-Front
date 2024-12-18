//统一管理项目用户相关的接口
import request from '@/utils/request'

import API_ENUM from '@/enum/api-enum'

//项目用户相关的请求地址
export const API = {
  //获取用户设置信息
  USER_SETTING_INFO_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER_SETTING}/getInfo`,
  //修改用户设置信息
  USER_SETTING_UP_INFO_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER_SETTING}`,
}

/**
 * 获取用户设置详细信息
 */
export const reqUserSettingInfo = () =>
  request<any>({
    method: 'get',
    url: API.USER_SETTING_INFO_URL,
  })


/**
 * 修改用户设置详细信息
 * @param data 用户设置数据
 */
export const reqUpUserSettinInfo = (data: any) =>
    request<any>({
      method: 'put',
      url: API.USER_SETTING_UP_INFO_URL,
      data,
})

