<template>
  <!--新增字典配置值弹出框-->
  <el-dialog v-model="fromOpenStatus" width="500" :show-close="false">
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">新增字典配置值</h4>
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
            <el-input v-model="dictDataStore.extra[item.parameter]" autocomplete="off" :placeholder="'请输入' + item.parameter" />
          </el-form-item>
        </template>
        <template v-if="item.type == 3">
          <el-form-item :label="item.parameter" prop="sort">
            <el-input v-model="dictDataStore.extra[item.parameter]" autocomplete="off" :placeholder="'请输入' + item.parameter" />
          </el-form-item>
        </template>
      </template>
    </el-form>
    <template #footer>
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
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
import useDictDataStore from '@/store/modules/dictData'
import useDictTypeStore from '@/store/modules/dictType'
import { formRules } from '../types/form.rules'
//仓库
const LayoutSettingStore = useLayoutSettingStore()
const dictDataStore = useDictDataStore()
const dictTypeStore = useDictTypeStore()
//获取当前组件实例
const instance: ComponentInternalInstance | null = getCurrentInstance();
//表单对象引用
const formRef = ref<FormInstance>()
//表单打开的状态
const fromOpenStatus = ref(false)
//接收刷新父组件数据的方法
const emit = defineEmits(['refreshData']);

// 打开modal框
const open = async () => {
  instance?.proxy?.$resetObj(dictDataStore.commonform)
  await dictTypeStore
    .dictTypeAllList()
    .then((resp) => {
      dictDataStore.dictTypeWithExtra = resp.data
    }).catch((error) => {
      ElMessage.error({ message: error })
    })
  fromOpenStatus.value = true
};

//点击添加按钮触发的事件
const addItem = (formEl: FormInstance | undefined) => {
  dictDataStore.commonform.extra = JSON.stringify(dictDataStore.extra)
  dictDataStore
    .addDictData(dictDataStore.commonform)
    .then((resp) => {
      fromOpenStatus.value = false
      emit('refreshData');
      ElMessage.success({ message: "添加成功" })
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

//更改选择的选择项触发的事件
const changeSelectDictData = (item: any) => {
  dictDataStore.commonform.dictTypeId = item.dictTypeId
  let jsonArray = JSON.parse(item.extraSchema)
  dictDataStore.selectDictTypeExtra = jsonArray
  dictDataStore.extra = {}
  for (let i = 0; i < jsonArray.length; i++) {
    const item = jsonArray[i]
    dictDataStore.extra[item.parameter] = undefined
  }
}

defineExpose({ open });

</script>

<style scoped>
* {
  font-weight: 900;
}

.tag-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag-wrapper {
  margin-left: 18px;
  margin-right: 3px;
  /* 设置每个标签之间相隔5px */
  max-width: calc(10 / 9 * 100%);
  /* 最大el-tag可占用10/7的大小，这里使用calc函数结合百分比设置宽度 */
}

.flex-tag {
  cursor: pointer;
  width: auto;
  /* 让el-tag宽度自适应内容宽度 */
}

.button-wrapper {
  width: calc(10 / 1 * 100%);
  /* el-button占用10/3的宽度 */
}
</style>