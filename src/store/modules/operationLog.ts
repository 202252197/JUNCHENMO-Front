//创建操作日志相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import {
  reqOperationLogList,
  reqDelOperationLog,
  reqClearOperationLog,
  reqOperNameOptionSelect,
  reqTitleOptionSelect,
  reqBusinessNameOptionSelect,
} from '@/api/operationLog'

//创建操作日志小仓库
const useOperationLogStore = defineStore('operationLog', {
  state: () => {
    return {
      nameOptionSelect: [],//操作人可选项
      titleOptionSelect: [],//模块标题可选项
      businessNameOptionSelect: [],//业务名称可选项
      multipleSelection: [], //选的数据列表
      //搜索表单
      searchform: {
        operName: '',
        title: '',
        businessName: '',
        status: '',
        requestTime: '',
        searchTime:[],
        startRequestTime: '',
        endRequestTime: '',
      },
    }
  },
  actions: {
    //获取操作日志列表
    async operationLogList(data: any, pageNum: number, pageSize: number) {
      const result: any = await reqOperationLogList(data, pageNum, pageSize)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //删除操作日志
    async deleteOperationLog(data: any) {
      const result: any = await reqDelOperationLog(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //清空操作日志
    async clearOperationLog() {
      const result: any = await reqClearOperationLog()
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //获取操作日志可选操作人员名称
    async getOperNameOptionSelect() {
      const result: any = await reqOperNameOptionSelect()
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //获取操作日志可选模块标题
    async getTitleOptionSelect() {
      const result: any = await reqTitleOptionSelect()
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //获取操作日志可选模块标题的业务名称
    async getBusinessNameOptionSelect(title:string) {
      const result: any = await reqBusinessNameOptionSelect(title)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
  },
  getters: {},
})

//对外暴露获取小仓库的方法
export default useOperationLogStore
