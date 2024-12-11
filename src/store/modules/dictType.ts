//创建角色相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import {
   reqDictTypeList,reqAddDictType,reqDictTypeListAll,reqDelDictType
} from '@/api/dictType'

//创建角色小仓库
const useDictTypeStore = defineStore('dictType', {
  state: () => {
    return {}
  },
  actions: {
    //获取字典项列表
    async dictTypeList(data: any, pageNum: number, pageSize: number) {
      const result: any = await reqDictTypeList(data, pageNum, pageSize)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //获取全部字典项列表以及额外参数
    async dictTypeAllList() {
      const result: any = await reqDictTypeListAll()
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //添加字典项
    async addDictType(data: any) {
      const result: any = await reqAddDictType(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //删除字典项
    async deleteDictType(data: any) {
      const result: any = await reqDelDictType(data)
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
export default useDictTypeStore
