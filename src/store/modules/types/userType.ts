import { RouteRecordRaw } from 'vue-router'
import type { userInfo } from '@/api/user/type'
//定义小仓库数据state类型
export interface UserState {
  token: string | null //token
  user: userInfo //用户信息
  permissions: any[] //用户的所有权限
  roles: any[] //用户的所有角色
}
