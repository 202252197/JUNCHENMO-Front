//创建角色相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import {
   reqDictDataList,reqAddDictData,reqDelDictData,reqDictDataInfoList,reqDictDataInfo
} from '@/api/dictData'

//创建角色小仓库
const useDictDataStore = defineStore('dictData', {
  state: () => {
    return {
      dictTypeWithExtra:[],  //字典和额外参数全部列表
      selectDictTypeExtra:[],  //选择的字典的以及额外参数
      extra:{},  //存储额外参数的对象
      multipleSelection:[], //选的数据列表
      searchform:{
        name: undefined,
        description: undefined,
        value: undefined,
        extra: undefined
      },
      commonform:{
        dictTypeId:undefined,
        name: undefined,
        description: undefined,
        value: undefined,
        sort: undefined,
        extra: undefined
      }
    }
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
    async dictDataInfo(name:string) {
      const result: any = await reqDictDataInfo(name)
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
