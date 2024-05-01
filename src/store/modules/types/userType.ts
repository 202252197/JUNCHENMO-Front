import { RouteRecordRaw } from 'vue-router'
import type { userInfo } from '@/api/user/type'
//定义小仓库数据state类型
export interface UserState {
  token: string | null
  user: userInfo
  menuRoutes: RouteRecordRaw[]
  asyncMenuRouter: RouteRecordRaw[]
}
