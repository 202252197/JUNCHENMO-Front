<template>
  <div class="tabbar">
    <div class="tabbar_left">

     <!-- 菜单组件 -->
     <el-menu  :default-active="$route.path"   mode="horizontal"    :popper-offset="16"
    style="max-width: 1000px" router  v-if="LayoutSettingStore.menu&&LayoutSettingStore.topMenu">
          <Menu :menuList="usePermissionStore.sidebarRouters"></Menu>
     </el-menu>
      <div v-else  style="margin-left: 30px;">
        人生就像下棋一样，每一步都要慎重考虑；
      </div>
    </div>
    <div class="tabbar_right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入菜单组件
import Menu from '@/layout/menu/index.vue'
import Setting from './setting/index.vue'
//获取用户相关的小仓库
import PermissionStore from '@/store/modules/menu'
//获取设置相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
//获取layout配置相关的仓库
const LayoutSettingStore = useLayoutSettingStore()
const usePermissionStore = PermissionStore()
</script>
<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>
<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .tabbar_left {
    display: flex;
    align-items: center;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
