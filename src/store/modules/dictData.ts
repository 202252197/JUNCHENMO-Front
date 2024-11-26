//创建角色相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import {
   reqDictDataList,reqAddDictData
} from '@/api/dictData'

//创建角色小仓库
const useDictDataStore = defineStore('dictData', {
  state: () => {
    return {}
  },
  actions: {
    //获取字典项列表
    async dictDataList(data: any, pageNum: number, pageSize: number) {
      const result: any = await reqDictDataList(data, pageNum, pageSize)
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
export default useDictDataStore
