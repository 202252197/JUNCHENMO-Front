<template>
  <el-drawer
    v-model="LayoutSettingStore.settingDrawer"
    :before-close="handleClose"
    direction="rtl"
    size="20%"
  >
    <template #header>
      <span style="font-weight: 700">偏好设置</span>
    </template>
    <template #default>
      <DrawerContext></DrawerContext>
    </template>
  </el-drawer>
</template>

<script lang="ts">
export default {
  name: 'Drawer',
}
</script>
<script setup lang="ts">
import DrawerContext from './context/index.vue'
//获取设置相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
let LayoutSettingStore = useLayoutSettingStore()
//打开或关闭偏好设置抽屉
const handleClose = () => {
  LayoutSettingStore.settingDrawer = !LayoutSettingStore.settingDrawer
}
</script>
<style lang="scss">
.el-drawer__header {
  margin: 0px;
}
</style>
