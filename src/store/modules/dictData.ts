//创建角色相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import {
   reqDictDataList,reqAddDictData,reqDelDictData,reqDictDataInfoList
} from '@/api/dictData'

//创建角色小仓库
const useDictDataStore = defineStore('dictData', {
  state: () => {
    return {}
  },
  actions: {
    //获取字典数据列表
    async dictDataList(data: any, pageNum: number, pageSize: number) {
      const result: any = await reqDictDataList(data, pageNum, pageSize)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //添加字典数据
    async addDictData(data: any) {
      const result: any = await reqAddDictData(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //删除字典数据
    async deleteDictData(data: any) {
      const result: any = await reqDelDictData(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    async dictDataInfoList(names:any) {
      const result: any = await reqDictDataInfoList(names)
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
