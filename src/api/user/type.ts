//用户对象
export type User = {
  userId?: number
  username: string
  password?: string
  nickname?: string
  remark?: string
  email?: string
  mobile?: string
  sex?: string
  avatar?: string
  status?: string
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
export type loginFormData ={
  username: string
  password: string
  code: string
  uuid: string
}

//登录返回数据
export type loginResponseData = {
  code: number
  data?: loginData
  msg: string
}
export type loginData = {
  access_token: string
  expires_in: number
}

//登出返回数据
export type logoutResponseData = {
  code: number
  msg?: string
}

//用户信息返回数据
export type userInfoReponseData = {
  msg: string
  code: number
  permissions: []
  roles: []
  user: User
}

//user-list-rep
export type userListRep = {
  total?: string
  rows?: user[]
  code: number
  msg: string
}
