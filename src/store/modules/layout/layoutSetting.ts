//创建用户相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import {
  reqUserSettingInfo,
  reqUpUserSettinInfo
} from '@/api/userSetting'
//创建用户小仓库
const useSettinggStore = defineStore('SettinggStore', {
  state: () => {
    return {
      refsh: false, //刷新按钮点击状态
      settingDrawer: false, //抽屉展开或收起状态
      fold: false, //menu展开或者收起状态
      theme: true, //主题是否是暗黑模式还是白天模式
      size: 20, //数据默认条数设置
      tabs: true, //tabs是否展示
      menu: true, //菜单是否展示
      copyright: true, //版权内容是否展示 
    }
  },
  actions: {
   //获取用户设置信息
   async userSettingInfo() {
    const result:any = await reqUserSettingInfo()
    if (result.code == 200) {
      console.log(result)
      nextTick(() => {
        console.log("刷新成功")
        this.theme = result.data.theme
        this.size = result.data.size
        this.tabs = result.data.tabs
        // this.menu = result.data.menu
        this.copyright = result.data.copyright
      })
   
      // this.topMenu = result.topMenu
      return Promise.resolve('ok')
    } else {
      return Promise.reject(result.msg)
    }
  },
  //修改用户设置信息
  async upUserSettinInfo(data: any) {
    const result: any = await reqUpUserSettinInfo(data)
    if (result.code == 200) {
      return result
    } else {
      return Promise.reject(result.msg)
    }
  },

  },
  getters: {
    getTheme: (state) => {
      return state.theme?"#157bff":"red"
    }
  },
})

//对外暴露获取小仓库的方法
export default useSettinggStore
