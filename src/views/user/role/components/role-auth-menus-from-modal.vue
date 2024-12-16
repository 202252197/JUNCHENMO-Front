<template>
  <!--分配菜单弹出框-->
  <el-dialog v-model="fromOpenStatus" width="1000" :show-close="false">
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">分配菜单</h4>
        </div>
      </template>
      <grant-table ref="grantTableRef"></grant-table>
      <template #footer>
        <div  class="modal-style">
          <el-button @click="fromOpenStatus = false">取消</el-button>
          <el-button type="primary" text bg @click="selectAuthRoleMenus()">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </template>
  
  <script setup lang="ts">
  import useRoleStore from '@/store/modules/role'
  import useMenuStore from '@/store/modules/menu'
  //仓库
  const roleStore = useRoleStore()
  const menuStore = useMenuStore()
  //表单对象引用
  const grantTableRef = ref()
  //表单打开的状态
  const fromOpenStatus = ref(false)
  //接收刷新父组件数据的方法
  const emit = defineEmits(['refreshData']);
  
  // 打开modal框
  const open = async (item: any) => {
    roleStore.commonform.roleId = item.roleId
    fromOpenStatus.value = true;
    await menuStore
      .getRoleMenuList(roleStore.commonform.roleId)
      .then((resp) => {
        grantTableRef?.value.setValue(resp.data)
      })
      .catch((error) => {
        ElMessage.error({ message: error })
      })
  };
  
  //点击授权菜单按钮触发的事件
  const selectAuthRoleMenus = () => {
    if(grantTableRef?.value){
      const menusId = grantTableRef.value.getValue();
      roleStore
        .authRoleUser(roleStore.commonform.roleId, menusId)
        .then(() => {
            ElMessage.success({ message: '分配成功' })
        })
        .catch((error) => {
            ElMessage.error({ message: error })
        })
    }
    fromOpenStatus.value = false
  }

  
  defineExpose({ open });
  
  </script>
  
  <style scoped>
  </style>
  