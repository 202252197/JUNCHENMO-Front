<template>
  <!--分配角色弹出框-->
  <el-dialog
      v-model="fromOpenStatus"
      width="500"
      :show-close="false"
    >
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">分配角色</h4>
        </div>
      </template>
      <el-form :model="userStore.commonform" label-width="60" ref="formRef">
        <el-form-item label="用户名">
          <el-input v-model="userStore.commonform.username" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userStore.commonform.nickname" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="角色">
          <el-select
            v-model="userRoleList"
            multiple
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="3"
            placeholder="请选择角色"
          >
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.name"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="modal-style">
          <el-button @click="fromOpenStatus = false">
            取消
          </el-button>
          <el-button type="primary" text bg @click="selectAuthUserRoles()">
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
import useRoleStore from '@/store/modules/role'
//仓库
const roleStore = useRoleStore()
const userStore = useUserStore()
//获取当前组件实例
const instance:ComponentInternalInstance | null  = getCurrentInstance();
//表单对象引用
const formRef = ref<FormInstance>()
//表单打开的状态
const fromOpenStatus = ref(false)
//接收刷新父组件数据的方法
const emit = defineEmits(['refreshData']);

//角色列表
let roleList = ref([])
//用户的角色
let userRoleList = ref([])


// 打开modal框
const open = async (item: any) => {
  instance?.proxy?.$resetObj(userStore.commonform)
  // 1. 更新表单信息
  userStore.commonform.userId = item.userId
  userStore.commonform.username = item.username
  userStore.commonform.nickname = item.nickname
  try {
    // 2. 获取所有启用的角色选项
    const rolesAll = await roleStore.roleOptionSelect()
    // 3. 获取用户已有的角色
    const userRoles = await roleStore.getUserRoleList(item.userId)
    // 4. 更新角色列表
    userRoleList.value = userRoles.data
    roleList.value = rolesAll.data
    // 5. 所有异步操作完成后，更新状态
    fromOpenStatus.value = true;
  } catch (error) {
    ElMessage.error({ message: error })
  }
};

//点击授权角色按钮触发的事件
const selectAuthUserRoles = () => {
  if(userRoleList.value.length<=0){
    ElMessage.success({ message: '分配的角色不能为空' });
    return;
  }
  userStore
    .authRoleUser(userStore.commonform.userId, userRoleList.value)
    .then(() => {
      ElMessage.success({ message: '分配成功' })
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    });
    fromOpenStatus.value = false;
}


defineExpose({ open });

</script>

<style scoped>
</style>
