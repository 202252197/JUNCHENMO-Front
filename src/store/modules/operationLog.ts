//创建操作日志相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import { reqOperationLogList,reqDelOperationLog } from '@/api/operationLog'

//创建操作日志小仓库
const useOperationLogStore = defineStore('operationLog', {
  state: () => {
    return {
      multipleSelection:[], //选的数据列表
      //搜索表单
      searchform :{
        operName: '',
        title: '',
        businessName: '',
        status: '',
        requestTime: '',
      }
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
    
  },
  getters: {},
})

//对外暴露获取小仓库的方法
export default useOperationLogStore
