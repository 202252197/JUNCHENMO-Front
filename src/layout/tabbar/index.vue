<template>
  <div class="tabbar">
      <!-- logo -->
    <Logo class="logo"></Logo>
    <div class="tabbar_left">
      <div style="margin-left: 30px;">
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
import Setting from './setting/index.vue'
//引入左侧菜单logo子组件
import Logo from '../logo/index.vue'
//获取layout配置相关的仓库
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
