<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="operationLogStore.searchform" class="searchForm" label-position="right"
        label-width="auto" ref="searchFormRef">
        <el-row style="display: flex">
          <el-form-item label="操作用户" prop="operName">
            <el-select v-model="operationLogStore.searchform.operName">
              <template v-for="name in operationLogStore.nameOptionSelect">
                <el-option :label="name" :value="name" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="操作模块" prop="title">
            <el-select v-model="operationLogStore.searchform.title" @change="changeTitle">
              <template v-for="title in operationLogStore.titleOptionSelect">
                <el-option :label="title" :value="title" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="业务名称" prop="businessName">
            <el-select v-model="operationLogStore.searchform.businessName">
              <template v-for="businessName in operationLogStore.businessNameOptionSelect">
                <el-option :label="businessName" :value="businessName" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item v-show="more" label="执行结果" prop="status">
            <el-select v-model="operationLogStore.searchform.status">
              <el-option label="成功" value="0" />
              <el-option label="失败" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item v-show="more" prop="searchTime" label="执行时间">
            <el-date-picker v-model="operationLogStore.searchform.searchTime" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss"
              start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd"
              time-format="A hh:mm:ss" />
          </el-form-item>
          <div style="margin-left: auto" class="card-search-end">
            <JcmButton :buttonBgColor="LayoutSettingStore.getTheme" @click="resetSearchForm(searchFormRef)">
              <template #icon>
                <svg-icon name="擦除" />
              </template>
            </JcmButton>
            <JcmButton :buttonBgColor="LayoutSettingStore.getTheme" @click="searchList(operationLogStore.searchform)">
              <template #icon>
                <svg-icon name="搜索" />
              </template>
            </JcmButton>
            <JcmButton :buttonBgColor="LayoutSettingStore.getTheme"  @click="more = true" v-show="!more">
              <template #icon>
                <svg-icon name="展开" />
              </template>
            </JcmButton>
            <JcmButton :buttonBgColor="LayoutSettingStore.getTheme" @click="more = false" v-show="more">
              <template #icon>
                <svg-icon name="收起" />
              </template>
            </JcmButton>
          </div>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="card-table-style">
      <template #header>
        <div class="card-header-style">
          <div class="card-header">
            <span>操作日志列表</span>
          </div>
          <div class="card-end">
            <JcmButton :buttonBgColor="LayoutSettingStore.getTheme" @click="clearItems()">
              <template #icon>
                <svg-icon name="清空" />
              </template>
            </JcmButton>
            <JcmButton :buttonBgColor="LayoutSettingStore.getTheme" @click="deleteItems()">
              <template #icon>
                <svg-icon name="垃圾桶" />
              </template>
            </JcmButton>
          </div>
        </div>
      </template>

      <el-table :data="dataList.list" table-layout="auto" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="operName" label="操作人员" align="center" />
        <el-table-column label="模块/业务" align="center">
          <template #default="scope">
            <span>{{ scope.row.title }} / {{ scope.row.businessName }}</span><br />
          </template>
        </el-table-column>
        <el-table-column prop="status" label="执行结果" align="center">
          <template #default="scope">
            <template v-if="scope.row.status === 0">
              <el-tag checked size="small" >
                成功
              </el-tag>
            </template>
            <template v-if="scope.row.status === 1">
              <el-tag checked size="small" color="#393e46">
                失败
              </el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="操作日志" align="center" >
          <template #default="scope">
            <div><span v-html="scope.row.description"></span></div>
            <template v-if="scope.row.errorMsg!=''">
              <div class="ellipsis-text"><span v-html="scope.row.errorMsg" ></span></div>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="requestTime" label="请求时间" align="center" />
        <el-table-column label="留痕地址" align="center">
          <template #default="scope">
            <span style="font-size: 13px;">{{ scope.row.operLocation }}</span><br />
            <span @click="instance?.proxy?.$copyText(scope.row.operIp)" class="copy-span"
              style="font-size: 12px;color: rgb( 134,144,156 );">{{ scope.row.operIp }}</span>
          </template>
        </el-table-column>
        <el-table-column label="耗时" align="center">
          <template #default="scope">
            <span>{{ scope.row.costTime }} 毫秒</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right">
          <template #default="scope">
            <el-button size="small" type="primary" @click="deleteItem(scope.row)" text>
              详情
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

  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { ComponentInternalInstance } from 'vue'
//仓库
import useOperationLogStore from '@/store/modules/operationLog'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

const operationLogStore = useOperationLogStore()
const LayoutSettingStore = useLayoutSettingStore()

//获取当前组件实例
const instance: ComponentInternalInstance | null = getCurrentInstance();

onMounted(() => {
  //手动触发更新页数的逻辑
  handleSizeChange(LayoutSettingStore.size)
  //进入页面初始化的数据
  searchList(operationLogStore.searchform)
  //加载可选操作人员名称选项
  loadOperNameSelect()
  //加载可选操作模块选项
  loadTitleSelect()
})
//表单对象
const searchFormRef = ref<FormInstance>()
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
  searchData.startRequestTime = searchData.searchTime[0]
  searchData.endRequestTime = searchData.searchTime[1]
  operationLogStore
    .operationLogList(searchData, dataList.page, dataList.size)
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
  searchList(operationLogStore.searchform)
}
//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
  dataList.size = pageSize
  searchList(operationLogStore.searchform)
}

//选中数据触发的事件
const handleSelectionChange = (val: []) => {
  operationLogStore.multipleSelection = val
}

//删除操作日志触发的事件
const deleteItem = (item: any) => {
  operationLogStore
    .deleteOperationLog([item.operId])
    .then(() => {
      searchList(operationLogStore.searchform)
      ElMessage.success({ message: '删除成功' })
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

//删除多个操作日志触发的事件
const deleteItems = () => {
  const operIds = operationLogStore.multipleSelection.map((item: any) => item.operId);
  operationLogStore
    .deleteOperationLog(operIds)
    .then(() => {
      searchList(operationLogStore.searchform)
      ElMessage.success({ message: '删除成功' })
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

//清空操作日志数据
const clearItems = () => {
  operationLogStore
    .clearOperationLog()
    .then(() => {
      searchList(operationLogStore.searchform)
      ElMessage.success({ message: '清空成功' })
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}


const loadOperNameSelect = () => {
  operationLogStore
    .getOperNameOptionSelect()
    .then((resp) => {
      operationLogStore.nameOptionSelect = resp.data
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

const loadTitleSelect = () => {
  operationLogStore
    .getTitleOptionSelect()
    .then((resp) => {
      operationLogStore.titleOptionSelect = resp.data
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

const changeTitle =()=>{
  const title =operationLogStore.searchform.title
  operationLogStore
    .getBusinessNameOptionSelect(title)
    .then((resp) => {
      operationLogStore.businessNameOptionSelect = resp.data
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

//重置搜索表单
const resetSearchForm = (ruleFormRef: any) => {
  if (!ruleFormRef) return
  ruleFormRef.resetFields()
}
</script>
<script lang="ts">
export default {
  name: 'operationLog',
}
</script>
<style scoped>
/* 这里可以添加组件内部特有的样式 */
.searchForm .el-form-item {
  margin-bottom: v-bind(more ? '18px' : '0px') !important;
}

.ellipsis-text {
  display: inline-block; /* 确保可以设置宽度等样式，对于行内元素生效 */
  max-width: 100px; /* 根据需要设置最大宽度，超出此宽度的文本将被省略 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
