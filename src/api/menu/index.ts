//统一管理咱们项目用户相关的接口

import request from '@/utils/request'

import API_ENUM from '@/enum/api-enum'

//菜单模块相关的请求接口
export const API = {
  //获取用户路由列表
  USER_ROUTERS_URL : `${API_ENUM.SERVER_MODE_NAME.SYSTEM_MENU}/getRouters`,
  //获取菜单列表
  MENU_LIST_URL : `${API_ENUM.SERVER_MODE_NAME.SYSTEM_MENU}/list`,
  //添加菜单
  MENU_ADD_URL : `${API_ENUM.SERVER_MODE_NAME.SYSTEM_MENU}/`,
  //删除菜单
  MENU_DELETE_URL : `${API_ENUM.SERVER_MODE_NAME.SYSTEM_MENU}/`,
  //修改用户信息
  MENU_UP_INFO_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_MENU}/`,
  //获取子菜单的最后sort+100
  MENU_LAST_SORT_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_MENU}/getChildLastSort`,
  //动态获取首页的ICON图标
  MENU_HOME_ICON_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_MENU}/getHomeMenuIcon`,
  //获取用户所拥有的角色列表
  ROLE_MENUS_LIST_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_MENU}/queryRoleMenus`,
  //选择授权角色的菜单
  MENU_SELECT_USER_ROLES: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_MENU}/authRoleMenu/selectAll`,
}


//获取菜单列表
export const reqMenuList = (data: any) =>
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

/**
 * 添加菜单的接口
 * @param {Object} data - 菜单数据
 * @returns {Promise} - 返回一个Promise对象
 */
export const reqAddMenu = (data: any) =>
  request<any>({
    method: 'post',
    url: API.MENU_ADD_URL,
    data,
  })

/**
 * 删除菜单的接口
 * @param {string} menuId - 菜单id
 * @returns {Promise} - 返回一个Promise对象
 */
export const reqDelMenu = (menuId: any) =>
  request<any>({
    method: 'delete',
    url: API.MENU_DELETE_URL + '/' + menuId,
})

//修改菜单的基本信息
export const reqUpInfoMenu = (data: any) =>
  request<any>({
    method: 'put',
    url: API.MENU_UP_INFO_URL,
    data,
})

//获取子菜单的最后sort+100
export const reqLastSortMenu = (parentId: any) =>
  request<any>({
    method: 'get',
    url: API.MENU_LAST_SORT_URL + '/' + parentId,
})

//获取首页的ICON图标
export const reqHomeMenuIcon = () =>
  request<any>({
    method: 'get',
    url: API.MENU_HOME_ICON_URL,
})

/**
 * 获取角色所拥有的菜单列表的接口
 * @returns {Promise} - 返回一个Promise对象
 */
export const reqRoleMenuList = (roleId: any) =>
  request<any>({
    method: 'get',
    url: API.ROLE_MENUS_LIST_URL + '/' + roleId,
 })


/**
 * 分配用户选择的菜单
 * @param {string} roleId - 用户id
 * @param {Array<string>} menusId - 菜单id的数组
 * @returns {Promise} - 返回一个Promise对象
 */
export const reqSelectRoleMenus = (roleId: any, menusId: any) =>
  request<any>({
    method: 'put',
    url: API.MENU_SELECT_USER_ROLES,
    data: { roleId: roleId, menusId: menusId },
  })
