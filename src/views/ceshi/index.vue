<template>
  <el-card>
          你跑得快 耳边全是风声 你跑得慢 自然会听到杂言碎语
  </el-card>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
// 实例化容器
const userStore = useUserStore()
</script>

<style scoped></style>
