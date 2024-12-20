//创建角色相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import {
  reqDictTypeList,
  reqAddDictType,
  reqDictTypeOptionSelect,
  reqDelDictType,
  reqUpInfoDictType,
} from '@/api/dictType'

//创建角色小仓库
const useDictTypeStore = defineStore('dictType', {
  state: () => {
    return {
      dictData: [], //字典数据数组
      extraSchemas: [], //额外参数[{"parament":"name","type":"string"}]
      multipleSelection: [], //选的数据列表
      searchform: {
        name: undefined,
        description: undefined,
        status: undefined,
      },
      commonform: {
        dictTypeId: undefined,
        name: undefined,
        type: undefined,
        description: undefined,
        extraSchema: undefined,
      },
    }
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
    //获取所有启用的字典项列表以及额外参数
    async dictTypeOptionSelect() {
      const result: any = await reqDictTypeOptionSelect()
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
    //修改字典项
    async upInfoDictType(data: any) {
      const result: any = await reqUpInfoDictType(data)
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
