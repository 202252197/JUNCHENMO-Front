<template>
    <!--修改菜单弹出框-->
    <el-dialog v-model="fromOpenStatus" width="500" :show-close="false">
        <template #header="{ titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass">修改菜单</h4>
            </div>
        </template>
        <el-form :model="menuStore.commonform" label-width="80" :rules="formRules" ref="formRef">
            <el-form-item v-show="!catalogueStatus" label="上级菜单" prop="parentId" required>
                <el-tree-select check-strictly v-model="menuStore.commonform.parentId" :data="treeData"
                    :render-after-expand="false" />
            </el-form-item>
            <el-form-item label="菜单名称" prop="name" required>
                <el-input v-model="menuStore.commonform.name" autocomplete="off" placeholder="请输入菜单名称" />
            </el-form-item>
            <el-form-item label="菜单类型" prop="type" required>
                <el-radio-group v-model="menuStore.commonform.type" size="small">
                    <el-radio-button label="目录" value="0" />
                    <el-radio-button label="菜单" value="1" />
                    <el-radio-button label="按钮" value="2" />
                </el-radio-group>
            </el-form-item>
            <el-form-item v-show="!featureStatus" label="菜单图标" prop="icon">
                <IconSelect :icon="menuStore.commonform.icon" style="width: 100%" @selected="selected" />
            </el-form-item>
            <el-form-item v-show="!featureStatus" label="组件" prop="component">
                <el-input v-model="menuStore.commonform.component" autocomplete="off" placeholder="路由组件名称" />
            </el-form-item>
            <el-form-item v-show="!featureStatus" label="外联地址" prop="link">
                <el-input v-model="menuStore.commonform.link" autocomplete="off" placeholder="组件名称与外联地址二选一" />
            </el-form-item>
            <el-form-item v-show="featureStatus" label="菜单权限" prop="permission">
                <el-input v-model="menuStore.commonform.permission" autocomplete="off" placeholder="菜单权限 system:user:list" />
            </el-form-item>
            <el-form-item label="菜单顺序" prop="sort" required>
                <el-input-number v-model="menuStore.commonform.sort" :min="0" />
            </el-form-item>
            <el-form-item v-show="!featureStatus" label="是否可见" prop="visible" required>
                <el-switch v-model="menuStore.commonform.visible" class="mb-2" />
            </el-form-item>
            <el-form-item v-show="!featureStatus" label="是否缓存" prop="keepAlive" required>
                <el-switch v-model="menuStore.commonform.keepAlive" class="mb-2" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-divider border-style="double" />
            <div style="display: flex; justify-content: center">
                <el-button @click="fromOpenStatus = false">取消</el-button>
                <el-button type="primary" text bg @click="updateInfoItem(formRef)">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { ComponentInternalInstance } from 'vue'
import useMenuStore from '@/store/modules/menu'
import { formRules } from '../types/form.rules'
//仓库
const menuStore = useMenuStore()
//获取当前组件实例
const instance: ComponentInternalInstance | null = getCurrentInstance()
//表单对象引用
const formRef = ref<FormInstance>()
//表单打开的状态
const fromOpenStatus = ref(false)
//接收刷新父组件数据的方法
const emit = defineEmits(['refreshData'])

//上级菜单的树形列表
let treeData = ref([]) as any;
//菜单选项显示隐藏状态
const catalogueStatus = ref(false)
const featureStatus = ref(false)

// 打开modal框
const open =  (item: any)  => {
  treeData = menuStore.getTreeSelectData(menuStore.dataList)
  fromOpenStatus.value = true
  Object.keys(menuStore.commonform).forEach((key) => {
    if(key=="parentId"){
        menuStore.commonform.parentId = ""+item[key];
    }else{
        menuStore.commonform[key] = item[key];
    }
  });
}

//点击修改按钮触发的事件
const updateInfoItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      menuStore
        .upInfoMenu(menuStore.commonform)
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

//监听新增弹窗中，菜单的类型，如果是目录，则不展示父菜单选项，默认父菜单id是0
watch(() => menuStore.commonform.type, (newVal) => {
    catalogueStatus.value = (newVal== 0)
    featureStatus.value = (newVal== 2)
});

//选择图标子组件调用的方法
const selected = (val:any) => {menuStore.commonform.icon = val}


defineExpose({ open })
</script>

<style scoped>
</style>
