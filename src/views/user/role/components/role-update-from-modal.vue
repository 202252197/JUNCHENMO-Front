<template>
     <!--修改角色弹出框-->
     <el-dialog v-model="fromOpenStatus" width="500" :show-close="false">
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">新增角色</h4>
        </div>
      </template>
      <el-form
        :model="roleStore.commonform"
        label-width="80"
        :rules="formRules"
        ref="formRef"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleStore.commonform.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div  class="modal-style">
          <el-button @click="fromOpenStatus = false">取消</el-button>
          <el-button type="primary" @click="updateInfoItem(formRef)">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance} from 'element-plus'
import type { ComponentInternalInstance } from 'vue'
import useRoleStore from '@/store/modules/role'
import { formRules } from '../types/form.rules'
//仓库
const roleStore = useRoleStore()
//获取当前组件实例
const instance:ComponentInternalInstance | null  = getCurrentInstance();
//表单对象引用
const formRef = ref<FormInstance>()
//添加表单打开的状态
const fromOpenStatus = ref(false)
//接收刷新父组件数据的方法
const emit = defineEmits(['refreshData']);


// 打开
const open = (item: any) => {
  instance?.proxy?.$resetObj(roleStore.commonform)
  Object.keys(roleStore.commonform).forEach((key) => {
    roleStore.commonform[key] = item[key];
  });
  fromOpenStatus.value = true;
};

const updateInfoItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      roleStore
        .upInfoRole(roleStore.commonform)
        .then(() => {
          fromOpenStatus.value = false
          emit('refreshData');
          ElMessage.success({ message: '信息修改成功' })
        })
        .catch((error) => {
          ElMessage.error({ message: error })
        })
    } else {
      //弹出数据校验失败的message
      ElMessage.error({ message: '请将信息填写完整' })
    }
  })
}

defineExpose({ open });


</script>

<style scoped>
* {
  font-weight: 900;
}
</style>
