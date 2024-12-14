export interface User {
  userId?: number
  username: string
  password?: string
  nickname?: string
  remark?: string
  email?: string
  mobile?: string
  sex?: number
  avatar: string
  status?: number
  loginIp?: string
  loginDate?: string
  creator?: string
  createTime?: string
  updater?: string
  updateTime?: string
  deleted?: boolean
  admin?: boolean
}

//登录表单数据
export interface loginFormData {
  username: string
  password: string
  code: string
  uuid: string
}

//登录返回数据
export interface loginResponseData {
  code: number
  data?: loginData
  msg: string
}
export interface loginData {
  access_token: string
  expires_in: number
}

//登出返回数据
export interface logoutResponseData {
  code: number
  msg?: string
}

//用户信息返回数据
export interface userInfoReponseData {
  msg: string
  code: number
  permissions: []
  roles: []
  user: User
}

//user-list-rep
export interface userListRep {
  total?: string
  rows?: user[]
  code: number
  msg: string
}
