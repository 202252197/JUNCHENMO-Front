//导入类型
import type { router } from '@/api/permission/type'
//封装本地存储数据与读取数据方法
export const SET_ROUTER = (routers: router) => {
  localStorage.setItem('router', JSON.stringify(routers))
}
export const GET_ROUTER = () => {
  return JSON.parse(localStorage.getItem('router') as string)
}

export const RENOVE_ROUTER = () => {
  return localStorage.removeItem('router')
}
