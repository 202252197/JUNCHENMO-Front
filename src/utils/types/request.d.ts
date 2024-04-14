import type { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

// 自定义请求接口headers头参数类型
type RequestHeader = AxiosRequestHeaders & { token?: string }

// 自定义请求接口request参数类型，可以加一些自己自定义的参数
export interface RequestConfig extends AxiosRequestConfig {
  headers?: RequestHeader // 放入请求头
  noNeedToken?: boolean // 该接口是否需要token
}

// 主体后端返回格式
export interface ApiResponse<T = any> {
  code: number
  msg: string
  data: T // 这里定义请求返回data数据类型
}
