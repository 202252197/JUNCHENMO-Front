<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <template v-if="item.meta.frame">
        <el-menu-item v-if="item.meta.hidden"  @click="toFream(item.path)">
          <div>
              <svg-icon :name="item.meta.icon" />
            </div>
          <template #title>
            <span style="margin-left: 5px;">{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <template v-else>
        <el-menu-item v-if="item.meta.hidden" :index="item.path" @click="
          TabsStore.addTab(
            {
              path: item.path,
              closable: true,
              title: item.meta.title,
              checked: true,
              icon: item.meta.icon,
            },
            $router,
          )
          ">
          <template #title>
            <div>
              <svg-icon :name="item.meta.icon" />
            </div>
            <span style="margin-left: 5px;">{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </template>
    <!-- 有子路由但是只有一个子路由 -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item v-if="item.children[0].meta.hidden" :index="item.children[0].path" @click="
        TabsStore.addTab(
          {
            path: item.children[0].path,
            closable: true,
            title: item.children[0].meta.title,
            checked: true,
            icon: item.children[0].meta.icon,
          },
          $router,
        )
        ">
        <div>
          <svg-icon :name="item.children[0].meta.icon"  />
        </div>
        <template #title>
          <span style="margin-left: 5px;">{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由且个数大于一个 -->
    <template v-if="item.children && item.children.length > 1">
      <el-sub-menu v-if="item.meta.hidden" :index="item.path">
        <template #title>
          <div>
            <svg-icon :name="item.meta.icon" />
          </div>
          <span style="margin-left: 5px;">{{ item.meta.title }}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
//导入Router
import { useRouter } from 'vue-router'
//创建Tabs相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
import useTabsStore from '@/store/modules/layout/tabs'
const $router = useRouter()
const TabsStore = useTabsStore()
const LayoutSettingStore = useLayoutSettingStore()
//获取父组件传递过来的全部路由数组
defineProps(['menuList'])
//外联点击跳转
const toFream = (path: any) => {
  window.open(path + '')
}
</script>
<script lang="ts">
export default {
  name: 'Menu',
}
</script>
<style scoped></style>
