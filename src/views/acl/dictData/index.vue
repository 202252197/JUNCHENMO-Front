<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="dictDataStore.searchform" class="searchForm" label-position="right"
        label-width="auto" ref="searchFormRef">
        <el-row>
          <el-form-item label="配置项" prop="name">
            <el-input v-model="dictDataStore.searchform.name" />
          </el-form-item>
          <el-form-item label="配置值" prop="value">
            <el-input v-model="dictDataStore.searchform.value" />
          </el-form-item>
          <el-form-item label="配置描述" prop="description">
            <el-input v-model="dictDataStore.searchform.description" />
          </el-form-item>
          <el-form-item v-show="more" label="配置参数" prop="extra">
            <el-input v-model="dictDataStore.searchform.extra" />
          </el-form-item>
          <div style="margin-left: auto" class="ceshi">
            <el-button type="info" @click="resetSearchForm(searchFormRef)">
              重置
            </el-button>
            <el-button  :color="LayoutSettingStore.theme?'#5072e6':'red'" @click="searchList(dictDataStore.searchform)">
              搜索
            </el-button>
            <el-button text @click="more = true" v-show="!more">更多</el-button>
            <el-button text @click="more = false" v-show="more">收起</el-button>
          </div>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="card-table-style">
      <template #header>
        <div class="card-header-style">
          <div class="card-header">
            <span>字典配置值列表</span>
          </div>
          <div class="card-end">
            <el-button-group class="ml-4">
              <el-button :color="LayoutSettingStore.theme?'#5072e6':'red'" @click="dictDataAddFromModal?.open()">
                <template #icon>
                  <svg-icon name="加号"  color="white"/>
                </template>
                新增
              </el-button>
              <el-button :color="LayoutSettingStore.theme?'#5072e6':'red'" @click="deleteItems()">
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
        <el-table-column prop="value" label="配置值" align="center" />
        <el-table-column prop="extra" width="240" label="额外参数" align="center" show-overflow-tooltip>
          <template #default="scope">
            <el-tooltip class="box-item" effect="dark" :content="scope.row.extra" placement="top">
              {{ scope.row.extra }}
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="配置描述" align="center" />
        <el-table-column prop="sort" label="排序" align="center" />
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <template v-if="scope.row.status === 0">
              <el-tag checked size="small" :color="LayoutSettingStore.theme ? '#5072e6' : 'red'">
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
            <el-button size="small" type="primary" @click="dictDataUpdateFromModal?.open(scope.row)" text>
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
          <el-pagination :page-sizes="[10, 20, 30, 40]" small="small" background="true"
            layout="total, sizes, prev, pager, next, jumper" :total="dataList.total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </div>
      </template>
    </el-card>

  <!--弹出框组件列表-->
  <DictDataAddFromModal  ref="dictDataAddFromModal" @refreshData="refreshData"></DictDataAddFromModal>
  <DictDataUpdateFromModal  ref="dictDataUpdateFromModal" @refreshData="refreshData"></DictDataUpdateFromModal>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FromModal } from '@/utils/commonType'

//弹出窗
import DictDataAddFromModal from './components/dict-data-add-from-modal.vue'
import DictDataUpdateFromModal from './components/dict-data-update-from-modal.vue'
//仓库
import useDictDataStore from '@/store/modules/dictData'
import useDictTypeStore from '@/store/modules/dictType'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

const dictDataStore = useDictDataStore()
const dictTypeStore = useDictTypeStore()
const LayoutSettingStore = useLayoutSettingStore()

onMounted(() => {
  //进入页面初始化的数据
  searchList(dictDataStore.searchform)
  //加载字典类型选项的数据
  loadDictTypeSelect()
});

//表单对象
const searchFormRef = ref<FormInstance>()
//弹出窗对象
const dictDataAddFromModal = ref<FromModal>()
const dictDataUpdateFromModal = ref<FromModal>()
//更多按钮状态
const more = ref(false)

//表格数据
const dataList = reactive({
  list: [],
  total: 0,
  page: 1,
  size: 10,
})

//根据搜索条件进行搜索
const searchList = (searchData: any) => {
  dictDataStore
    .dictDataList(searchData, dataList.page, dataList.size)
    .then((resp) => {
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
  searchList(dictDataStore.searchform)
}

//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
  dataList.size = pageSize
  searchList(dictDataStore.searchform)
}


//选中数据触发的事件
const handleSelectionChange = (val: []) => {
  dictDataStore.multipleSelection = val
}

// 删除字典值触发的事件
const deleteItem = (item: any) => {
  dictDataStore
    .deleteDictData([item.dictDataId])
    .then(() => {
      searchList(dictDataStore.searchform)
      ElMessage.success({ message: '删除成功' })
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

//删除多个字典值触发的事件
const deleteItems = () => {
  const dictDataIds = dictDataStore.multipleSelection.map((item: any) => item.dictDataId);
  dictDataStore
    .deleteDictData(dictDataIds)
    .then(() => {
      searchList(dictDataStore.searchform)
      ElMessage.success({ message: '删除成功' })
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

//加载字典类型选项的数据
const loadDictTypeSelect=()=>{
  dictTypeStore
    .dictTypeAllList()
    .then((resp) => {
      dictDataStore.dictTypeWithExtra = resp.data
    }).catch((error) => {
      ElMessage.error({ message: error })
    })
}

//提供给子组件刷新数据的方法
const refreshData = () => {
  searchList(dictDataStore.searchform)
}

//重置搜索表单
const resetSearchForm = (ruleFormRef: any) => {
  if (!ruleFormRef) return
  ruleFormRef.resetFields()
}

</script>
<script lang="ts">
export default {
  name: 'dictData',
}
</script>
<style scoped>
.searchForm .el-form-item {
  margin-bottom: v-bind(more ? '18px' : '0px') !important;
}
.ceshi{
  height: 30px;
}
* {
  font-weight: 900;
}
</style>