//统一管理咱们项目用户相关的接口

import request from '@/utils/request'

//项目用户相关的请求地址
enum API {
  //获取用户路由列表
  USER_ROUTERS_URL = '/system/permission/getRouters',
  MENU_LIST_URL = '/system/permission/list',
}

//获取菜单列表
export const reqRoleList = (data: any) =>
  request<any>({
    method: 'post',
    url: API.MENU_LIST_URL,
    data
})


//获取用户路由列表接口
export const getRouters = () =>
  request<any>({
    method: 'get',
    url: API.USER_ROUTERS_URL,
})

