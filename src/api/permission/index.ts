//统一管理咱们项目用户相关的接口

import request from '@/utils/request'

//项目用户相关的请求地址
enum API {
  //获取用户路由列表
  USER_ROUTERS_URL = '/system/permission/getRouters',
}

//获取用户路由列表接口
export const getRouter = () =>
  request<any>({
    method: 'get',
    url: API.USER_ROUTERS_URL,
  })
