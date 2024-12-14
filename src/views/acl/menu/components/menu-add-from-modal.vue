<template>
    <!--新增菜单弹出框-->
    <el-dialog v-model="fromOpenStatus" width="500" :show-close="false">
        <template #header="{ titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass">新增菜单</h4>
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
                <icon-select :icon="menuStore.commonform.icon" style="width: 100%" ref="iconSelectRef" @selected="selected" />
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
                <el-button type="primary" @click="addItem(formRef)">
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
const instance: ComponentInternalInstance | null = getCurrentInstance();
//表单对象引用
const formRef = ref<FormInstance>()
// 获取子组件的引用
const iconSelectRef = ref();
//表单打开的状态
const fromOpenStatus = ref(false)
//接收刷新父组件数据的方法
const emit = defineEmits(['refreshData']);

//上级菜单的树形列表
let treeData = ref([]) as any;
//菜单选项显示隐藏状态
const catalogueStatus = ref(false)
const featureStatus = ref(false)


// 打开modal框
const open = (item: any) => {
  //清除表单填写的内容
  clearCommonFrom()
  if(item==undefined){
    getMenuLastSort(0)
  }else{
    getMenuLastSort(item.menuId)
    if (iconSelectRef.value) {
        iconSelectRef.value.clearIconInputValue();
    }
    menuStore.commonform.type = item.type + 1;
    menuStore.commonform.parentId = `${item.menuId}`
  }
  treeData = menuStore.getTreeSelectData(menuStore.dataList)
  catalogueStatus.value = ( menuStore.commonform.type == 0)
  fromOpenStatus.value = true
};

//点击添加按钮触发的事件
const addItem = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
        menuStore
            .addMenu(menuStore.commonform)
            .then(() => {
            fromOpenStatus.value = false
            emit('refreshData');
            ElMessage.success({ message: '添加成功' })
            })
            .catch((error:any) => {
            ElMessage.error({ message: error })
            })
        } else {
        //弹出数据校验失败的message
        ElMessage.error({ message: '请将信息填写完整' })
        }
    })
}

//选择图标子组件调用的方法
const selected = (val:any) => {menuStore.commonform.icon = val}

//获取菜单最后的顺序号+100
const getMenuLastSort=(menuId:any)=>{
  menuStore
  .lastSortMenu(menuId)
  .then((resp:any) => {
    menuStore.commonform.sort = resp.data
  })
}


//监听新增弹窗中，菜单的类型，如果是目录，则不展示父菜单选项，默认父菜单id是0
watch(() => menuStore.commonform.type, (newVal) => {
    catalogueStatus.value = (newVal== 0)
    featureStatus.value = (newVal== 2)
});

/**
 *  commonform表单重置
 *  将commonform的parentId,type,visible,keepAlive
 *  分别设置为0,0,false,false
 *  除parentId,type,visible,keepAlive外的其他字段
 *  都设置为"",包括name,icon,sort,remark,component,url
 *  @function clearCommonFrom
 *  @return {void}
 */
const clearCommonFrom = ()=>{
  Object.keys(menuStore.commonform).forEach((key) => {
    if(key=="parentId"){
      menuStore.commonform.parentId = "0";
    }else if(key=="type"){
      menuStore.commonform.type = 0;
    }else if(key=="visible"){
      menuStore.commonform.visible = true;
    }else if(key=="keepAlive"){
      menuStore.commonform.keepAlive = false;
    }else{
      menuStore.commonform[key] = '';
    }
  });
}

defineExpose({ open });

</script>

<style scoped>
* {
    font-weight: 900;
}
</style>