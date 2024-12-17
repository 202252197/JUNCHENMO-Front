<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="dictTypeStore.searchform" class="searchForm" label-position="right" label-width="auto"
        ref="searchFormRef">
        <el-row style="display: flex">
          <el-form-item label="配置项" prop="name">
            <el-input v-model="dictTypeStore.searchform.name" />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="dictTypeStore.searchform.description" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="dictTypeStore.searchform.status">
              <el-option label="正常" value="0" />
              <el-option label="禁用" value="1" />
            </el-select>
          </el-form-item>
          <div style="margin-left: auto">
            <el-button type="info" @click="resetSearchForm(searchFormRef)">
              重置
            </el-button>
            <el-button  :color="LayoutSettingStore.getTheme" @click="searchList(dictTypeStore.searchform)">
              搜索
            </el-button>
          </div>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="card-table-style">
      <template #header>
        <div class="card-header-style">
          <div class="card-header">
            <span>字典配置项</span>
          </div>
          <div class="card-end">
            <el-button-group class="ml-4">
              <el-button :color="LayoutSettingStore.getTheme" @click="dictTypeAddFromModal?.open()">
                <template #icon>
                  <svg-icon name="加号"  color="white"/>
                </template>
                新增
              </el-button>
              <el-button :color="LayoutSettingStore.getTheme" @click="addButtenClick()">
                <template #icon>
                  <svg-icon name="刷新"  color="white"/>
                </template>
                刷新缓存
              </el-button>
              <el-button :color="LayoutSettingStore.getTheme" @click="deleteItems()">
                <template #icon>
                  <svg-icon name="垃圾桶"  color="white"/>
                </template>
                删除
              </el-button>
            </el-button-group>
          </div>
        </div>
      </template>

      <el-table :data="dataList.list" table-layout="auto"  @selection-change="handleSelectionChange">
        <el-table-column type="selection"  width="55" />
        <el-table-column prop="dictTypeId" label="ID" align="center" />
        <el-table-column prop="name" label="配置项" align="center" />
        <el-table-column prop="description" label="描述" align="center" />
        <el-table-column prop="type" label="类型" align="center">
          <template #default="scope">
            <el-tag size="small" style="color:white" :color="LayoutSettingStore.getTheme">
              {{ getStatusByType(scope.row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="extraSchema" label="额外配置" align="center" width="250">
          <template #default="scope">
            <template v-if="scope.row.extraSchema!==''">
              <template v-for="item in extraStrToJson(scope.row.extraSchema)">
                <el-tag checked size="small" :color="getColorByType(item.type)" style="margin-right: 2px;">
                  {{ item.parameter }}
              </el-tag>
              </template>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <template v-if="scope.row.status === 0">
              <el-tag checked size="small" :color="LayoutSettingStore.getTheme">
                启用
              </el-tag>
            </template>
            <template v-if="scope.row.status === 1">
              <el-tag checked size="small" color="#393e46">
                停用
              </el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right">
          <template #default="scope">
            <el-button size="small" type="primary" @click="getInfoButtonClick(scope.row)" text>
              查看
            </el-button>
            <el-button size="small" type="primary" @click="dictTypeUpdateFromModal?.open(scope.row)" text>
              修改
            </el-button>
            <el-button size="small" type="danger" @click="deleteItem(scope.row)" text>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <template #footer>
        <div class="pagination-style">
          <!--分页-->
          <el-pagination :page-sizes="[10, 20, 30, 40]" small="small" background="true"  :default-page-size="LayoutSettingStore.size"
            layout="total, sizes, prev, pager, next, jumper" :total="dataList.total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </div>
      </template>
    </el-card>


    <!--弹出框组件列表-->
    <DictTypeAddFromModal  ref="dictTypeAddFromModal" @refreshData="refreshData"></DictTypeAddFromModal>
    <DictTypeUpdateFromModal  ref="dictTypeUpdateFromModal" @refreshData="refreshData"></DictTypeUpdateFromModal>
    <!-- json 查看器模态框 -->
    <JsonEditor ref="dictTypeViewFromModal" />
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FromModal } from '@/utils/commonType'

//弹出窗
import DictTypeAddFromModal from './components/dict-type-add-from-modal.vue'
import DictTypeUpdateFromModal from './components/dict-type-update-from-modal.vue'
//仓库
import useDictTypeStore from '@/store/modules/dictType'
import useDictDataStore from '@/store/modules/dictData'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

const dictDataStore = useDictDataStore()
const dictTypeStore = useDictTypeStore()
const LayoutSettingStore = useLayoutSettingStore()

onMounted(() => {
  //手动触发更新页数的逻辑
  handleSizeChange(LayoutSettingStore.size)
  //进入页面初始化的数据
  searchList(dictTypeStore.searchform)
  //初始化字典数据
  loadDictData()
});

//表单对象
const searchFormRef = ref<FormInstance>()
//弹出窗对象
const dictTypeAddFromModal = ref<FromModal>()
const dictTypeUpdateFromModal = ref<FromModal>()
const dictTypeViewFromModal = ref();



//表格数据
const dataList = reactive({
  list: [],
  total: 0,
  page: 1,
  size: 10,
})

//根据搜索条件进行搜索
const searchList = (searchData: any) => {
  dictTypeStore
    .dictTypeList(searchData, dataList.page, dataList.size)
    .then((resp) => {
      console.log(resp.rows)
      dataList.list = resp.rows
      dataList.total = resp.total
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

//页码变更处理方法
const handleCurrentChange = (currentPage: number) => {
  dataList.page = currentPage
  searchList(dictTypeStore.searchform)
}
//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
  dataList.size = pageSize
  searchList(dictTypeStore.searchform)
}

//选中数据触发的事件
const handleSelectionChange = (val: []) => {
  dictTypeStore.multipleSelection = val
}

//删除字典类型触发的事件
const deleteItem = (item: any) => {
  dictTypeStore
    .deleteDictType([item.dictTypeId])
    .then(() => {
      searchList(dictTypeStore.searchform)
      ElMessage.success({ message: '删除成功' })
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

//删除多个字典类型触发的事件
const deleteItems = () => {
  const dictTypeIds = dictTypeStore.multipleSelection.map((item: any) => item.dictTypeId);
  dictTypeStore
    .deleteDictType(dictTypeIds)
    .then(() => {
      searchList(dictTypeStore.searchform)
      ElMessage.success({ message: '删除成功' })
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

//点击查看按钮触发的事件
const getInfoButtonClick = (item: any) =>{
  let extras = undefined
  dictDataStore.
    dictDataInfo(item.name)
    .then((resp) => {
      dictTypeViewFromModal?.value?.open(resp.data,item.name +' - '+item.description)
    })
    .catch((error) => {
      ElMessage.error({ message: error })
  })
  console.log(extras)
}

//加载所需要的字典数据
const loadDictData = () => {
  const dictNames = ['extrasDefaultTag','extrasDefaultStatus']
  dictDataStore
    .dictDataInfoList(dictNames)
    .then((resp) => {
      dictTypeStore.dictData=resp.data
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

const extraStrToJson = (item: any) => {
  console.log(item)
  if(undefined===item||item==='')return
  return JSON.parse(item)
}

//根据状态值转化为状态标签
const getStatusByType = (type: any) => {
  switch (type) {
    case 0:
      return '字符串';
    case 1:
      return '整数';
    case 2:
      return '小数';
    case 3:
      return '布尔值';
    case 4:
      return '颜色';
    default:
      return '未知状态';
  }
}

//根据状态值转化为颜色值
const getColorByType = (type: any) => {
  const typeNumber = Number.parseInt(type);
  switch (typeNumber) {
    case 0:
      return '#7a08fa';
    case 1:
      return '#4ecca3';
    case 2:
      return '#80d6ff';
    case 3:
      return '#355c7d';
    case 4:
      return '#e03e36';
  }
}
  
//提供给子组件刷新数据的方法
const refreshData = () => {
  searchList(dictTypeStore.searchform)
}

  //重置搜索表单
const resetSearchForm = (ruleFormRef: any) => {
  if (!ruleFormRef) return
  ruleFormRef.resetFields()
}

</script>
<script lang="ts">
export default {
  name: 'dictType',
}
</script>
<style scoped>
</style>