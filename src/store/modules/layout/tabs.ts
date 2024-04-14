//创建用户相关的小仓库
import { defineStore } from 'pinia'

//创建用户相关的小仓库
import type { Tag } from '../types/tabsType'
//创建用户小仓库
const useTabsStore = defineStore('Tabs', {
  state: () => {
    return {
      tabs: [] as any,
    }
  },
  actions: {
    //添加Tag
    addTab(tag: Tag, $router: any) {
      //全部变为未选择灰色
      this.tabNotSelected()
      if (this.exitsTab(tag)) {
        this.tabSelected(tag)
        $router.push(tag.path)
      } else {
        this.tabs.push(tag)
        $router.push(tag.path)
      }
    },
    //关闭标签
    removeTab(menuTag: Tag, $router: any) {
      if (!menuTag.checked) {
        this.tabs = this.tabs.filter((tag: Tag) => tag.path != menuTag.path)
      } else {
        this.tabs = this.tabs.filter((tag: Tag) => tag.path != menuTag.path)
        //全部变为未选择灰色
        this.tabNotSelected()
        const tabLast = this.tabs[this.tabs.length - 1]
        this.tabSelected(tabLast)
        $router.push(tabLast.path)
      }
    },
    //关闭其他标签
    removeOutherTab(currentTagPath: string) {
      this.tabs = this.tabs.filter(
        (tag: Tag) => tag.path == currentTagPath || tag.closable == false,
      )
    },
    //关闭所有标签
    removeAllTab($router: any) {
      this.tabs = this.tabs.filter((tag: Tag) => tag.closable == false)
      const tabLast = this.tabs[this.tabs.length - 1]
      this.tabSelected(tabLast)
      $router.push(tabLast.path)
    },
    //判断当前是否已经添加了Tag
    exitsTab(menuTag: Tag) {
      let include = false
      this.tabs.some((tab: any) => {
        if (menuTag.path == tab.path) {
          include = true
        }
      })
      return include
    },
    //点击Tag进行路由
    routerTab(menuTag: Tag, $router: any) {
      //全部变为未选择灰色
      this.tabNotSelected()
      this.tabSelected(menuTag)
      $router.push(menuTag.path)
    },
    //Tag全部设置为没有点击状态
    tabNotSelected() {
      this.tabs.some((tab: any) => {
        tab.checked = false
      })
    },
    //设置Tag为选择状态
    tabSelected(menuTag: Tag) {
      this.tabs.some((tab: any) => {
        if (menuTag.path === tab.path) {
          tab.checked = true
        }
      })
    },
  },
  getters: {},
})

//对外暴露获取小仓库的方法
export default useTabsStore
