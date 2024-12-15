<template>
    <!--修改字典配置值弹出框-->
    <el-dialog v-model="fromOpenStatus" width="500" :show-close="false">
        <template #header="{ titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass">修改字典配置值</h4>
            </div>
        </template>
        <el-form :model="dictDataStore.commonform" label-width="100" :rules="formRules" ref="formRef">
            <el-form-item label="配置项" prop="name">
                <el-select v-model="dictDataStore.commonform.name" filterable placeholder="请输入配置项">
                    <el-option v-for="item in dictDataStore.dictTypeWithExtra" :key="item.dictTypeId"
                        :label="(item.name + ' - ' + item.description)" :value="(item.name + ' - ' + item.description)"
                        @click="changeSelectDictData(item)" />
                </el-select>
            </el-form-item>
            <el-form-item label="配置描述" prop="description">
                <el-input v-model="dictDataStore.commonform.description" autocomplete="off" placeholder="请输入配置描述" />
            </el-form-item>
            <el-form-item label="配置值" prop="value">
                <el-input v-model="dictDataStore.commonform.value" autocomplete="off" placeholder="请输入配置值" />
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input v-model="dictDataStore.commonform.sort" autocomplete="off" placeholder="请输入排序" />
            </el-form-item>
            <!-- 额外参数列表 -->
            <template v-for="item in dictDataStore.selectDictTypeExtra">
                <template v-if="item.type == 0 || item.type == 1 || item.type == 2">
                    <el-form-item :label="item.parameter" prop="sort">
                        <el-input v-model="dictDataStore.extra[item.parameter]" autocomplete="off"
                            :placeholder="'请输入' + item.parameter" />
                    </el-form-item>
                </template>
                <template v-if="item.type == 3">
                    <el-form-item :label="item.parameter" prop="sort">
                        <el-switch v-model="dictDataStore.extra[item.parameter]" />
                    </el-form-item>
                </template>
                <template v-if="item.type == 4">
                    <el-form-item :label="item.parameter">
                        <el-input v-model="dictDataStore.extra[item.parameter]" autocomplete="off" placeholder="请输入颜色"
                            style="width: 91%;" />
                        <el-color-picker v-model="dictDataStore.extra[item.parameter]" />
                    </el-form-item>
                </template>
            </template>
        </el-form>
        <template #footer>
            <div class="modal-style">
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
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
import useDictDataStore from '@/store/modules/dictData'
import { formRules } from '../types/form.rules'
//仓库
const LayoutSettingStore = useLayoutSettingStore()
const dictDataStore = useDictDataStore()
//获取当前组件实例
const instance: ComponentInternalInstance | null = getCurrentInstance();
//表单对象引用
const formRef = ref<FormInstance>()
//表单打开的状态
const fromOpenStatus = ref(false)
//接收刷新父组件数据的方法
const emit = defineEmits(['refreshData']);


// 打开modal框
const open = (item: any) => {
    dictDataStore.commonform.dictTypeId = item.dictTypeId
    dictDataStore.commonform.dictDataId = item.dictDataId
    dictDataStore.commonform.name = item.name
    dictDataStore.commonform.description = item.description
    dictDataStore.commonform.value = item.value
    dictDataStore.commonform.sort = item.sort

    const extraJson = JSON.parse(item.extra)
    //查询字典值所依赖的字典项并遍历出所有的额外参数
    const dictTypeObj = dictDataStore.dictTypeWithExtra.find((obj: any) => obj.dictTypeId == item.dictTypeId);
    extraSchemaswhthExtra(dictTypeObj.extraSchema, true, extraJson)
    fromOpenStatus.value = true
};

//点击修改按钮触发的事件
const updateInfoItem = (formEl: FormInstance | undefined) => {
    console.log(dictDataStore.extra)
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            // 验证额外参数
            for (let key in dictDataStore.extra) {
                if (dictDataStore.extra.hasOwnProperty(key)) {
                    // 判断额外参数是否为空，如果是boolean类型则不判断
                    if (typeof dictDataStore.extra[key] !== "boolean" && !dictDataStore.extra[key]) {
                        ElMessage.warning({ message: '额外参数' + key + '不能为空' })
                        return false;
                    }
                }
            }
            dictDataStore.commonform.extra = JSON.stringify(dictDataStore.extra)
            dictDataStore
                .upInfoDictData(dictDataStore.commonform)
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

//更改选择的选择项触发的事件
const changeSelectDictData = (item: any) => {
    dictDataStore.commonform.dictTypeId = item.dictTypeId
    extraSchemaswhthExtra(item.extraSchema, false)
}

/**
 * @param extraSchema 额外参数项
 * @param type true就是复制，false就是不复制
 * @param extraJson 额外参数值对象
 */
const extraSchemaswhthExtra = (extraSchema: any, type: boolean, extraJson?: any) => {
    let jsonArray = JSON.parse(extraSchema)
    dictDataStore.selectDictTypeExtra = jsonArray
    dictDataStore.extra = {}
    for (let i = 0; i < jsonArray.length; i++) {
        const item = jsonArray[i]
        if (type) {
            dictDataStore.extra[item.parameter] = extraJson[item.parameter]
        } else {
            dictDataStore.extra[item.parameter] = undefined
        }
    }
}


defineExpose({ open });

</script>

<style scoped></style>