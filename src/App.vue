<template>
  <!-- el-config-provider 组件可以传递给 Element Plus 其他组件的共享 props -->
  <el-config-provider :locale="locale" :button="config">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
//配置国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
let locale = zhCn

//配置按钮自动插入空格
const config = reactive({
  autoInsertSpace: true,
})
</script>

<style lang="scss" scoped></style>
