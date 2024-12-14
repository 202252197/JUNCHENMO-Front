<template>
    <!--修改用户信息弹出框-->
    <el-dialog
      v-model="fromOpenStatus"
      width="500"
      :show-close="false"
    >
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">修改用户信息</h4>
        </div>
      </template>
      <el-form
        :model="userStore.commonform"
        label-width="60"
        ref="formRef"
        :rules="formRules"
      >
        <el-form-item label="用户名">
          <el-input v-model="userStore.commonform.username" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="userStore.commonform.nickname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userStore.commonform.mobile" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userStore.commonform.email" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="modal-style">
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
import useUserStore from '@/store/modules/user'
import { formRules } from '../types/form.rules'
//仓库
const userStore = useUserStore()
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
  instance?.proxy?.$resetObj(userStore.commonform)
  Object.keys(userStore.commonform).forEach((key) => {
    userStore.commonform[key] = item[key];
  });
  fromOpenStatus.value = true;
};

const updateInfoItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      userStore
        .upInfoUser(userStore.commonform)
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
