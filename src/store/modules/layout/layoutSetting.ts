//创建用户相关的小仓库
import { defineStore } from 'pinia'
//创建用户小仓库
const useSettinggStore = defineStore('SettinggStore', {
  state: () => {
    return {
      fold: false, //menu展开或者收起状态
      refsh: false, //刷新按钮点击状态
      settingDrawer: false, //抽屉展开或收起状态
      theme: true, //主题是否是暗黑模式还是白天模式
    }
  },
  actions: {},
  getters: {},
})

//对外暴露获取小仓库的方法
export default useSettinggStore
