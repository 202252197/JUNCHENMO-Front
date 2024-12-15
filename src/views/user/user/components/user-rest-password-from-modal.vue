<template>
    <!--修改用户密码弹出框-->
    <el-dialog v-model="fromOpenStatus" width="500" :show-close="false">
        <template #header="{ titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass">重置密码</h4>
            </div>
        </template>
        <el-form :model="userStore.commonform" label-width="60" :rules="formRules" ref="formRef">
            <el-form-item label="用户名">
                <el-input v-model="userStore.commonform.username" autocomplete="off" disabled />
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="userStore.commonform.nickname" autocomplete="off" disabled />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userStore.commonform.password" autocomplete="off" type="password" show-password />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="modal-style">
                <el-button @click="fromOpenStatus = false">
                    取消
                </el-button>
                <el-button type="primary" text bg @click="updatePasswordItem(formRef)">
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
const open = (item:any) => {
    userStore.commonform.userId = item.userId
    userStore.commonform.username = item.username
    userStore.commonform.nickname = item.nickname
    fromOpenStatus.value = true;
};

//点击修改密码按钮触发的事件
const updatePasswordItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      userStore
        .upPasswordUser(userStore.commonform)
        .then(() => {
          fromOpenStatus.value = false
          instance?.proxy?.$resetObj(userStore.commonform)
          ElMessage.success({ message: '密码重置成功' })
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
</style>
