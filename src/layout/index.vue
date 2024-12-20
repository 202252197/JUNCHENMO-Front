<template>
  <div class="layout_container">
    <!-- 偏好设置 -->
    <Drawer></Drawer>
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{
      fold: LayoutSettingStore.fold,
      moon: !LayoutSettingStore.theme,
      sunny: LayoutSettingStore.theme,
      showMenu: LayoutSettingStore.menu,
      hidenMenu: !LayoutSettingStore.menu,
    }">
    
      <!-- 展示菜单 -->
      <el-scrollbar class="scrollbar" v-show="LayoutSettingStore.menu">
        <!-- 菜单组件 -->
        <el-menu :collapse="LayoutSettingStore.fold" :default-active="$route.path" router
          class="menu-collapse-animation">
          <Menu :menuList="usePermissionStore.sidebarRouters"></Menu>
        </el-menu>
        <!-- 顶部左侧静态 -->
        <el-button :color="LayoutSettingStore.theme ? 'white' : '#121212'"
          class="foldwithExpand menu-collapse-animation" v-show="LayoutSettingStore.menu"
          :class="{ fold: LayoutSettingStore.fold }" @click="changeIcon">
          <svg-icon :name="LayoutSettingStore.fold ? '折叠-展开' : '折叠-收起'"
            :color="LayoutSettingStore.theme ? 'black' : 'white'" width="26px" height="16px" />
        </el-button>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{
      fold: LayoutSettingStore.fold,
      moon: !LayoutSettingStore.theme,
      sunny: LayoutSettingStore.theme,
      hidenTabs: !LayoutSettingStore.tabs,
      showMenu: LayoutSettingStore.menu,
      hidenMenu: !LayoutSettingStore.menu,
    }">
      <Tabbar></Tabbar>
    </div>
    <!-- 顶部tabs -->
    <div class="layout_tabs" :class="{
      fold: LayoutSettingStore.fold,
      moon: !LayoutSettingStore.theme,
      sunny: LayoutSettingStore.theme,
      showMenu: LayoutSettingStore.menu,
      hidenMenu: !LayoutSettingStore.menu,
    }" v-show="LayoutSettingStore.tabs">
      <Tabs></Tabs>
    </div>

    <!-- 内容展示区域 -->
    <div class="layout_main" :class="{
      fold: LayoutSettingStore.fold,
      moon: !LayoutSettingStore.theme,
      sunny: LayoutSettingStore.theme,
      showTabs: LayoutSettingStore.tabs,
      hidenTabs: !LayoutSettingStore.tabs,
      showMenu: LayoutSettingStore.menu,
      hidenMenu: !LayoutSettingStore.menu,
    }">
      <!-- <el-watermark
        :content="setting.watermarkContent"
        :font="{ color: 'blue' }"
      > -->
      <Breadcrumb style="margin-bottom: 12px"></Breadcrumb>
      <Main></Main>
      <copyright v-show="LayoutSettingStore.copyright"></copyright>
      <!-- </el-watermark> -->
    </div>
  </div>
</template>

<script setup lang="ts">
//导入右侧抽屉
import Drawer from './tabbar/setting/drawer/index.vue'
//引入菜单组件
import Menu from './menu/index.vue'
//引入内容组件
import Main from './main/index.vue'
//引入顶部tabbar组件
import Tabbar from './tabbar/index.vue'
//引入顶部tabs组件
import Tabs from './tabs/index.vue'
//引入顶部面包屑组件
import Breadcrumb from './tabbar/breadcrumb/index.vue'
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

const changeIcon = () => {
  LayoutSettingStore.fold = !LayoutSettingStore.fold
}
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<style scoped lang="scss">
/* 定义el-menu收起动画的类名和样式 */
.menu-collapse-animation {
  /* 设置过渡效果，这里针对宽度属性进行过渡，过渡时间为0.01秒，过渡效果为ease（先加速后减速） */
  transition: width 0.01s ease;
}

/* 给包含el-menu的父div添加样式和动画效果 */
.layout_slider {
  /* 设置过渡效果，针对宽度、高度和透明度属性进行过渡，过渡时间为0.1秒，过渡效果为ease（先加速后减速） */
  transition:
    width 0.1s ease,
    height 0.1s ease,
    opacity 1s ease;
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
    position: fixed;
    width: $base-menu-width;
    top: 45px;
    // 页面折叠
    &.fold {
      width: $base-menu-min-width;
    }
    &.hidenMenu {
      height: 45px;
     
      &.moon {
        background: #171717;
        filter: drop-shadow(-10px 3px 5px $base-theme-moon-color);
      }

      &.sunny {
        background: #fafafb;
        filter: drop-shadow(-10px 3px 5px $base-theme-sunny-color);
      }
    }
    &.showMenu {
      z-index: 4;
      height: 100vh;
      &.moon {
        background: #171717;
        filter: drop-shadow(3px 0px 1px $base-theme-moon-color) !important;
      }
      &.sunny {
        background: #fafafb;
        filter: drop-shadow(3px 0px 1px $base-theme-sunny-color) !important;
      }
      .scrollbar {
        margin-top: 2px;
        width: 100%;
        height: calc(100vh - $base-menu-logo-height);
        .el-menu {
          border-right: none;
        }
      }
      .foldwithExpand {
        position: absolute;
        bottom: 0;
        right: 2px;
        padding: 5px;

        &.fold {
          transform: translateX(-14px);
          /* 这里假设从0到14px的变化可以通过 translateX 来模拟 */
        }
      }
    }
   
  }

  .layout_tabbar {
    z-index: 1;
    top: 0px;
    position: fixed;
    width: 100%;
    height: $base-tabbar-height;

    &.hidenMenu {
      &.moon {
        background: #171717;
        filter: drop-shadow(-12px 3px 5px $base-theme-moon-color);
      }

      &.sunny {
        background: #fafafb;
        filter: drop-shadow(-12px 3px 5px $base-theme-sunny-color);
      }
    }
    &.showMenu {
      &.hidenTabs {
        &.moon {
          background:#171717;
          filter: drop-shadow(0px 3px 5px $base-theme-moon-color) !important;
        }
      }

      &.hidenTabs {
        &.sunny {
          background: #fafafb;
          filter: drop-shadow(0px 3px 5px $base-theme-sunny-color) !important;
        }
      }

      &.fold {
        width: calc(100% - $base-menu-min-width);
        left: $base-menu-min-width;
      }
    }
  }

  .layout_tabs {
    z-index: 3;
    top: $base-tabbar-height;
    scrollbar-width: thin;
    position: fixed;
    height: $base-tabs-height;
    &.showMenu {
      width: calc(100% - $base-menu-width);
      left: $base-menu-width;
    }

    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }

    &.hidenMenu {
      left: 0;
      width: 100%;
    }

    &.moon {
      background: $base-moon-color;
      filter: drop-shadow(0px -3px 0px $base-theme-moon-color) !important;
    }

    &.sunny {
      background: #fafafb;
      filter: drop-shadow(0px -3px 0px $base-theme-sunny-color) !important;
    }
  }

  .layout_main {
    overflow-y: auto;
    position: absolute;
    padding: $base-main-context-padding;
    scrollbar-width: thin;

    &.showTabs {
      top: calc($base-tabbar-height + $base-tabs-height);
      height: calc(100vh - $base-tabs-height - $base-tabs-height);
    }

    &.hidenTabs {
      top: $base-tabbar-height;
      height: calc(100vh - $base-tabs-height);
    }

    &.showMenu {
      width: calc(100% - $base-menu-width);
      left: $base-menu-width;
    }

    .context {
      width: 100%;
      height: 100vh;
      overflow: auto;
    }

    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }

    &.hidenMenu {
      left: 0;
      width: 100%;
    }

    &.moon {
      background: $base-main-moon-background;
    }

    &.sunny {
      background: $base-main-sunny-background;
    }
  }
}

</style>
