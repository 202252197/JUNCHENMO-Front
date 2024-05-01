<template>
<<<<<<< HEAD
  <router-view v-slot="{ Component }">
    <!-- 渲染layout一级路由组件的子路由 -->
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
//获取设置相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
let LayoutSettingStore = useLayoutSettingStore()
=======
  <div>
    <router-view v-slot="{ Component, route }">
      <!-- 渲染layout一级路由组件的子路由 -->
      <transition name="slide" mode="out-in" appear>
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
import PermissionStore from '@/store/modules/menu'

let useLayoutSettingStore = LayoutSettingStore()
let usePermissionStore = PermissionStore()
>>>>>>> master
//控制当前组件是否销毁重建
let flag = ref(true)
// 监听仓库内部数据是否发生变化，如果发生变化，说明用户点击过刷新按钮

watch(
<<<<<<< HEAD
  () => LayoutSettingStore.refsh,
=======
  () => useLayoutSettingStore.refsh,
>>>>>>> master
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

<<<<<<< HEAD
<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0; //透明度
}
.fade-enter-active {
  transition: all 1s; //过度1秒
}
.fade-enter-to {
  opacity: 1; //透明度
}
</style>
=======
<style lang="scss" scoped></style>
>>>>>>> master
