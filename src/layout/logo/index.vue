<template>
  <div class="logo noselect" v-if="setting.logoHidden">
    <img :src="setting.logo" draggable="false" />
    <div
      class="selector-disabled"
      style="color: #0C9FA6; font-size: 20px"
    >
      {{ setting.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
//获取设置相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
let LayoutSettingStore = useLayoutSettingStore()
//引入设置标题与logog配置文件
import setting from '@/setting'
</script>

<style scoped>
.logo {
  padding-left: 30px;
  width: 200px;
  height: 40px;
  align-items: center;
  display: flex;
  img {
    width: 30px;
    height: 30px;
  }
  p {
    padding-left: 5px;
    font-size: 15px;
    font-weight: 800;
  }
}
</style>
