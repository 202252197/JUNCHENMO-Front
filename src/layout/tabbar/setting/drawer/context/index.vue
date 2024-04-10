<template>
  <el-divider>布局设置</el-divider>
  <div class="filed-style">
    <div>导航栏</div>
    <div>
      <el-switch
        v-model="value2"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
      />
    </div>
  </div>
  <div class="filed-style">
    <div>菜单栏</div>
    <div>
      <el-switch
        v-model="value2"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
      />
    </div>
  </div>
  <div class="filed-style">
    <div>顶部菜单栏栏</div>
    <div>
      <el-switch
        v-model="value2"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
      />
    </div>
  </div>
  <div class="filed-style">
    <div>底部页脚</div>
    <div>
      <el-switch
        v-model="value2"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
      />
    </div>
  </div>
  <div class="filed-style">
    <div>多页签</div>
    <div>
      <el-switch
        v-model="value2"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
      />
    </div>
  </div>
  <div class="filed-style">
    <div>菜单宽度(px)</div>
    <div>
      <el-input style="width: 60px" size="small" />
    </div>
  </div>
  <div>
    <el-divider>数据设置</el-divider>
  </div>
  <div>
    <el-divider>页面视图</el-divider>
  </div>
</template>

<script setup lang="ts">
let value2 = ref(true)
</script>

<script lang="ts">
export default {
  name: 'DrawerContext',
}
</script>
<style scoped>
.filed-style {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
</style>
