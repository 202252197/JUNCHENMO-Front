<template>
  <!-- 顶部左侧静态 -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="LayoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包屑动态的展示路由名字与标题 -->
<<<<<<< HEAD
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- 图标 TODO::不太好看隐藏-->
      <!-- <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon> -->
      <span style="margin: 0px 5px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
=======
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        v-show="item.meta.title"
        :to="item.path"
      >
        <!-- 图标 TODO::不太好看隐藏-->
        <!-- <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon> -->
        <span style="margin: 0px 5px">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
>>>>>>> master
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
//获取路由对象
let $route = useRoute()
//获取layout配置相关的仓库
let LayoutSettingStore = useLayoutSettingStore()
const changeIcon = () => {
  LayoutSettingStore.fold = !LayoutSettingStore.fold
}
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>
<style lang="scss"></style>
