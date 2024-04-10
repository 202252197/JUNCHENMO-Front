//登录表单数据
export interface routerRespone {
  msg: string
  code: number
  data: router
}

export interface router {
  path: string
  component: string
  name: string
  meta: meta
  children: router[]
}

export interface meta {
  title: string
  hidden: boolean
  icon: string
  noCache: boolean
}
