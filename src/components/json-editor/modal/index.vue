<template>
  <!--查看字典配置项弹出框-->
  <el-dialog v-model="visible" width="700"  show-close="true">
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">{{ title }}</h4>
      </div>
    </template>
    <editor v-model="value" :readonly="readonly" :theme="LayoutSettingStore.theme"/>
  </el-dialog>

</template>

<script setup lang="ts">

//获取设置相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
let LayoutSettingStore = useLayoutSettingStore()

const props = withDefaults(defineProps<Partial<{
  readonly: boolean;
}>>(), {
  readonly: true,
});

const title = ref<string>();
const visible = ref<boolean>();
const value = ref<string | any>();

// 打开
const open = (editorValue: string | any, editorTitle = 'json') => {
  title.value = editorTitle;
  value.value = JSON.stringify(editorValue, undefined, 4);;
  visible.value = true;
};

defineExpose({ open });

// 关闭
const handleClose = () => {
  visible.value = false;
};
</script>