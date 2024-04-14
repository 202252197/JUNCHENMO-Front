<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <!-- 渲染layout一级路由组件的子路由 -->
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="usePermissionStore.cacheRouterNames">
          <component :is="Component" v-if="flag" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
//获取设置仓库
import LayoutSettingStore from '@/store/modules/layout/layoutSetting'
//获取权限仓库
import PermissionStore from '@/store/modules/permission'

let useLayoutSettingStore = LayoutSettingStore()
let usePermissionStore = PermissionStore()
//控制当前组件是否销毁重建
let flag = ref(true)
// 监听仓库内部数据是否发生变化，如果发生变化，说明用户点击过刷新按钮

watch(
  () => useLayoutSettingStore.refsh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<script lang="ts">
export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Main',
}
</script>

<style lang="scss" scoped></style>
