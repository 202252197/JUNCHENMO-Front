<template>
  <div class="layout_container">
    <!-- TODO 面包屑点击上一级路径跳转是空页面，路由上没有进行重定向，而且标签页也需要进行改变颜色 -->

    <!-- 偏好设置 -->
    <Drawer></Drawer>
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
      :class="{
        fold: LayoutSettingStore.fold,
        moon: !LayoutSettingStore.theme,
        sunny: LayoutSettingStore.theme,
      }"
    >
      <!-- logo -->
      <Logo></Logo>
      <!-- 展示菜单 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          :collapse="LayoutSettingStore.fold"
          :default-active="$route.path"
          router
        >
<<<<<<< HEAD
          <Menu :menuList="userStore.getMenu"></Menu>
=======
          <Menu :menuList="usePermissionStore.sidebarRouters"></Menu>
>>>>>>> master
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{
        fold: LayoutSettingStore.fold,
        moon: !LayoutSettingStore.theme,
        sunny: LayoutSettingStore.theme,
      }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 顶部tabs -->
    <div
      class="layout_tabs"
      :class="{
        fold: LayoutSettingStore.fold,
        moon: !LayoutSettingStore.theme,
        sunny: LayoutSettingStore.theme,
      }"
    >
      <Tabs></Tabs>
    </div>

    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{
        fold: LayoutSettingStore.fold,
        moon: !LayoutSettingStore.theme,
        sunny: LayoutSettingStore.theme,
      }"
    >
<<<<<<< HEAD
      <el-watermark
        :content="setting.watermarkContent"
        :font="{ color: 'blue' }"
      >
        <Main></Main>
      </el-watermark>
=======
      <!-- <el-watermark
        :content="setting.watermarkContent"
        :font="{ color: 'blue' }"
      > -->
      <Main></Main>
      <!-- </el-watermark> -->
>>>>>>> master
    </div>
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
//引入全局设置
import setting from '@/setting'
=======
>>>>>>> master
//导入右侧抽屉
import Drawer from './tabbar/setting/drawer/index.vue'
//引入左侧菜单logo子组件
import Logo from './logo/index.vue'
//引入菜单组件
import Menu from './menu/index.vue'
//引入内容组件
import Main from './main/index.vue'
//引入顶部tabbar组件
import Tabbar from './tabbar/index.vue'
//引入顶部tabs组件
import Tabs from './tabs/index.vue'
//引入当前路由
import { useRoute } from 'vue-router'
//获取用户相关的小仓库
<<<<<<< HEAD
import useUserStore from '@/store/modules/user'
=======
import PermissionStore from '@/store/modules/menu'
>>>>>>> master
//获取设置相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
//获取layout配置相关的仓库
let LayoutSettingStore = useLayoutSettingStore()
<<<<<<< HEAD
const userStore = useUserStore()
=======
const usePermissionStore = PermissionStore()
>>>>>>> master
const $route = useRoute()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<style scoped lang="scss">
.layout_container {
  position: relative;
  width: 100%;
  height: 100vh;
  .layout_slider {
    top: 0px;
    position: fixed;
    width: $base-menu-width;
    height: 100vh;
    transition: all 0.5s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
    &.fold {
      width: $base-menu-min-width;
    }
    &.moon {
      background-color: $base-menu-moon-background;
    }
    &.sunny {
      background-color: $base-menu-sunny-background;
    }
  }
  .layout_tabbar {
    z-index: 1;
    top: 0px;
    left: $base-menu-width;
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.5s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
    &.moon {
      background-color: $base-tabbar-moon-background;
    }
    &.sunny {
      background-color: $base-tabbar-sunny-background;
    }
  }
  .layout_tabs {
    z-index: 1;
    top: $base-tabbar-height;
    left: $base-menu-width;
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabs-height;
    transition: all 0.5s;
    &.fold {
      width: calc(100% - $base-tabbar-height);
      left: $base-menu-min-width;
    }
    &.moon {
      background-color: $base-tabbar-moon-tabs-background;
    }
    &.sunny {
      background-color: $base-tabbar-sunny-tabs-background;
    }
  }
  .layout_main {
    overflow-y: auto;
    position: absolute;
    width: calc(100% - $base-menu-width);
    left: $base-menu-width;
    top: calc($base-tabbar-height + $base-tabs-height);
    padding: $base-main-context-padding;
    transition: all 0.5s;
    height: calc(100vh - $base-tabs-height - $base-tabs-height - 20px);
    scrollbar-width: thin;
    .context {
      width: 100%;
      height: 100vh;
      overflow: auto;
    }
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
    &.moon {
      background-color: $base-main-moon-background;
    }
    &.sunny {
      background-color: $base-main-sunny-background;
    }
  }
}
</style>
