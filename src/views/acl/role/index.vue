<template>
  <el-card>
    <div
      class="block"
      style="display: flex; justify-content: flex-start; align-items: center"
    >
      <el-avatar
        :size="50"
        src="https://images.pexels.com/photos/19561749/pexels-photo-19561749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        style="
          /* 通过SVG过滤器应用微型阴影 */
          filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.2));
        "
      />

      <div>
        <div
          style="
            font-size: 12px;
            font-weight: 600;
            margin-left: 20px;
            margin-top: 5px;
            color: #767676;
          "
        >
          你跑得快 耳边全是风声 你跑得慢 自然会听到杂言碎语
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts"></script>
<script lang="ts">
export default {
  name: 'role',
}
</script>
<style scoped></style>
