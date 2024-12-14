<template>
  <el-dialog v-model="fromOpenStatus" width="500" :show-close="false">
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">新增用户</h4>
      </div>
    </template>
    <el-form :model="userStore.commonform" label-width="80" :rules="formRules" ref="formRef">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userStore.commonform.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="userStore.commonform.nickname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userStore.commonform.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="userStore.commonform.mobile" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userStore.commonform.email" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="modal-style">
        <el-button @click="fromOpenStatus = false">取消</el-button>
        <el-button  type="primary"  text bg @click="addItem(formRef)">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { ComponentInternalInstance } from 'vue'
import useUserStore from '@/store/modules/user'
import { formRules } from '../types/form.rules'
//仓库
const userStore = useUserStore()
//获取当前组件实例
const instance: ComponentInternalInstance | null = getCurrentInstance();
//表单对象引用
const formRef = ref<FormInstance>()
//表单打开的状态
const fromOpenStatus = ref(false)
//接收刷新父组件数据的方法
const emit = defineEmits(['refreshData']);

// 打开modal框
const open = () => {
  instance?.proxy?.$resetObj(userStore.commonform)
  fromOpenStatus.value = true;
};

//点击添加按钮触发的事件
const addItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      userStore
        .addUser(userStore.commonform)
        .then(() => {
          fromOpenStatus.value = false
          emit('refreshData');
          ElMessage.success({ message: '添加成功' })
        })
        .catch((error) => {
          ElMessage.error({ message: error })
        })
    } else {
      //弹出数据校验失败的message
      ElMessage.error({ message: '请按提示填写完整' })
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
