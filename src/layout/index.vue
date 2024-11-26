<template>
  <div class="layout_container">
    <!-- 偏好设置 -->
    <Drawer></Drawer>
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{
      fold: LayoutSettingStore.fold,
      moon: !LayoutSettingStore.theme,
      sunny: LayoutSettingStore.theme,
    }">
      <!-- logo -->
      <Logo></Logo>
      <!-- 展示菜单 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu :collapse="LayoutSettingStore.fold" :default-active="$route.path" router  class="menu-collapse-animation">
          <Menu :menuList="usePermissionStore.sidebarRouters"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{
      fold: LayoutSettingStore.fold,
      moon: !LayoutSettingStore.theme,
      sunny: LayoutSettingStore.theme,
    }">
      <Tabbar></Tabbar>
    </div>
    <!-- 顶部tabs -->
    <div class="layout_tabs" :class="{
      fold: LayoutSettingStore.fold,
      moon: !LayoutSettingStore.theme,
      sunny: LayoutSettingStore.theme,
    }">
      <Tabs></Tabs>
    </div>

    <!-- 内容展示区域 -->
    <div class="layout_main" :class="{
      fold: LayoutSettingStore.fold,
      moon: !LayoutSettingStore.theme,
      sunny: LayoutSettingStore.theme,
    }">
      <!-- <el-watermark
        :content="setting.watermarkContent"
        :font="{ color: 'blue' }"
      > -->
      <Main></Main>
      <copyright></copyright>
      <!-- </el-watermark> -->
    </div>
  </div>
</template>

<script setup lang="ts">
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
import PermissionStore from '@/store/modules/menu'
//获取设置相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
//获取layout配置相关的仓库
const LayoutSettingStore = useLayoutSettingStore()
const usePermissionStore = PermissionStore()
const $route = useRoute()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<style scoped lang="scss">
/* 定义el-menu收起动画的类名和样式 */
.menu-collapse-animation {
  /* 设置过渡效果，这里针对宽度属性进行过渡，过渡时间为0.3秒，过渡效果为ease（先加速后减速） */
  transition: width 0.01s ease;
}
/* 给包含el-menu的父div添加样式和动画效果 */
.layout_slider {
  /* 设置过渡效果，针对宽度、高度和透明度属性进行过渡，过渡时间为0.3秒，过渡效果为ease（先加速后减速） */
  transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
  /* 设置初始透明度为1，表示完全不透明 */
  opacity: 1;
}
/* 定义当菜单收起时layout_slider的样式 */
.layout_slider.fold {
  /* 降低透明度，使div看起来逐渐消失，这里设置为0.5，表示半透明 */
  opacity: 0.8;
}
.layout_container {
  position: relative;
  width: 100%;
  height: 100vh;
  .layout_slider {
    z-index: 2;
    top: 0px;
    position: fixed;
    width: $base-menu-width;
    height: 100vh;
    .scrollbar {
      margin-top: 2px;
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
      background: $base-moon-color;
      filter: drop-shadow(3px 0px 1px $base-theme-moon-color) !important;
    }

    &.sunny {
      background: $base-sunny-color;
      filter: drop-shadow(3px 0px 1px $base-theme-sunny-color) !important;
    }
  }

  .layout_tabbar {
    z-index: 1;
    top: 0px;
    left: $base-menu-width;
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }

    &.moon {
      background: $base-moon-color;
    }

    &.sunny {
      background: $base-sunny-color;
    }
  }
  .layout_tabs {
    z-index: 1;
    top: $base-tabbar-height;
  
    left: $base-menu-width;
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabs-height;

    &.fold {
      width: calc(100% - $base-tabbar-height);
      left: $base-menu-min-width;
    }

    &.moon {
      background: $base-moon-color;
      filter: drop-shadow(0px -3px 0px $base-theme-moon-color) !important;
    }

    &.sunny {
      background: $base-sunny-color;
      filter: drop-shadow(0px -3px 0px $base-theme-sunny-color) !important;
    }
  }

  .layout_main {
    overflow-y: auto;
    position: absolute;
    width: calc(100% - $base-menu-width);
    left: $base-menu-width;
    top: calc($base-tabbar-height + $base-tabs-height) ;
    padding: $base-main-context-padding;
    height: calc(100vh - $base-tabs-height - $base-tabs-height);
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
      background: $base-main-moon-background;
    }

    &.sunny {
      background: #dedfe1;
    }
  }
}
</style>
