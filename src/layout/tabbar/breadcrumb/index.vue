<template>
  <!-- 顶部左侧静态 -->
  <el-icon class="foldwithExpand" @click="changeIcon">
    <component :is="LayoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包屑动态的展示路由名字与标题 -->
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in route.matched"
        :key="index"
        v-show="item.meta.title"
        :to="item.path"
        @click="tabClick(item)"
      >
      <div style="display: flex; align-items: center;">
        <div><svg-icon :name="item.meta.icon" :color="LayoutSettingStore.theme ? 'black' : 'white'"/></div>
        <div><span style="margin: 0px 5px">{{ item.meta.title }}</span></div>
      </div>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
//创建用户相关的小仓库
import type { Tag } from '@/store/modules/types/tabsType'
//创建Tabs相关的小仓库
import useTabsStore from '@/store/modules/layout/tabs'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
//获取路由对象
const route = useRoute()
const $router = useRouter()
//获取layout配置相关的仓库
const LayoutSettingStore = useLayoutSettingStore()

const TabsStore = useTabsStore()
const changeIcon = () => {
  LayoutSettingStore.fold = !LayoutSettingStore.fold
}


const tabClick = (item:any) => {
  const myTag: Tag = {
    title: '',
    closable: true,
    path: item.redirect,
    checked: false,
    icon: ''
  };
  TabsStore.routerTab(myTag, $router)
}
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>
<style lang="scss" scoped>
.foldwithExpand{
  margin-right: 10px;
  cursor: pointer;
}
</style>
