<template>
    <div>
      <el-card>
      <el-form
        :inline="true"
        :model="searchform"
        class="searchForm"
        label-position="right"
        label-width="auto"
        ref="searchFormRef"
      >
        <el-row>
          <el-form-item label="配置项" prop="name">
            <el-input v-model="searchform.name" />
          </el-form-item>
          <el-form-item label="配置值" prop="value">
            <el-input v-model="searchform.value" />
          </el-form-item>
          <el-form-item label="配置描述" prop="description">
            <el-input v-model="searchform.description" />
          </el-form-item>
          <el-form-item v-show="more" label="配置参数" prop="extra">
            <el-input v-model="searchform.extra" />
          </el-form-item>
          <div style="margin-left: auto">
            <el-button type="info" @click="resetSearchForm(searchFormRef)">
              重置
            </el-button>
            <el-button type="primary" @click="searchList(searchform)">
              搜索
            </el-button>
            <el-button text @click="more = true" v-show="!more">更多</el-button>
            <el-button text @click="more = false" v-show="more">收起</el-button>
          </div>
        </el-row>
      </el-form>
    </el-card>
      <el-card style="margin-top: 20px">
        <template #header>
          <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              ">
            <div class="card-header">
              <span>字典配置值列表</span>
            </div>
            <div class="card-end">
              <el-button type="primary" @click="addButtenClick()">新增</el-button>
              <el-button type="danger" @click="addButtenClick()">删除</el-button>
            </div>
          </div>
        </template>
  
        <el-table :data="dataList.list" table-layout="auto">
          <el-table-column prop="dictTypeId" label="ID" align="center" />
          <el-table-column prop="name" label="配置项" align="center" />
          <el-table-column prop="value" label="配置值" align="center"/>
          <el-table-column prop="extra" width="240" label="额外参数" align="center" show-overflow-tooltip>
            <template #default="scope">
              <el-tooltip
                class="box-item"
                effect="dark"
                :content="scope.row.extra"
                placement="top"
              >
                {{ scope.row.extra }}
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="配置描述" align="center"/>
          <el-table-column prop="sort" label="排序" align="center"/>
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              <el-tag checked size="small" style="color: aliceblue"
                :color="scope.row.status === 0 ? '#4165D7' : '#D05344'">
                {{ scope.row.status === 0 ? '正常' : '停用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" fixed="right">
            <template #default="scope">
              <el-button size="small" type="primary" @click="updateInfoButtonClick(scope.row)" text>
                修改
              </el-button>
              <el-button size="small" type="danger" @click="deleteItem(scope.row)" text>
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
  
        <template #footer>
          <div style="display: flex; justify-content: center">
            <!--分页-->
            <el-pagination :page-sizes="[10, 20, 30, 40]" small="small" background="true"
              layout="total, sizes, prev, pager, next, jumper" :total="dataList.total" @size-change="handleSizeChange"
              @current-change="handleCurrentChange" />
          </div>
        </template>
      </el-card>
  
    <!--新增字典配置值弹出框-->
    <el-dialog v-model="addfromOpenStatus" width="500" :show-close="false">
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">新增字典配置值</h4>
        </div>
      </template>
      <el-form :model="commonform" label-width="100" ref="addFormRef">
        <el-form-item label="配置项" prop="name">
          <el-select
            v-model="commonform.name"
            filterable
            placeholder="请输入配置项"
          >
            <el-option
              v-for="item in dictTypeWithExtra"
              :key="item.dictTypeId"
              :label="(item.name + ' - ' + item.description )"
              :value="(item.name + ' - ' + item.description )"
              @click="changeSelectDictType(item)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="配置描述" prop="description">
          <el-input v-model="commonform.description" autocomplete="off" placeholder="请输入配置描述" />
        </el-form-item>
        <el-form-item label="配置值" prop="value">
          <el-input v-model="commonform.value" autocomplete="off" placeholder="请输入配置值" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="commonform.sort" autocomplete="off" placeholder="请输入排序" />
        </el-form-item>
        <!-- 额外参数列表 -->
        <template v-for="item in selectDictTypeExtra">
          <template v-if="item.type==0||item.type==1||item.type==2">
            <el-form-item :label="item.parameter" prop="sort">
              <el-input v-model="extra[item.parameter]" autocomplete="off" :placeholder="'请输入'+item.parameter" />
            </el-form-item>
          </template>
          <template v-if="item.type==3">
            <el-form-item :label="item.parameter" prop="sort">
              <el-input v-model="extra[item.parameter]" autocomplete="off" :placeholder="'请输入'+item.parameter" />
            </el-form-item>
          </template>
        </template>
        
      </el-form>
      <template #footer>
        <div style="display: flex; justify-content: center">
          <el-button @click="addfromOpenStatus = false">取消</el-button>
          <el-button type="primary" @click="addItem(addFormRef)">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { FormInstance} from 'element-plus'
  import useDictTypeStore from '@/store/modules/dictType'
  import useDictDataStore from '@/store/modules/dictData'
  const { proxy } = getCurrentInstance();
  const dictTypeStore = useDictTypeStore()
  const dictDataStore = useDictDataStore()

  //更多按钮状态
  const more = ref(false)
  //添加表单打开的状态
  const addfromOpenStatus = ref(false)
  //表单Dom
  const searchFormRef = ref<FormInstance>()

  //搜索表单填写的内容
  const searchform = reactive({
    name: undefined,
    description: undefined,
    value: undefined,
    extra: undefined
  })
  
  //新增表单填写的内容
  const commonform = reactive({
    dictTypeId:undefined,
    name: undefined,
    description: undefined,
    value: undefined,
    sort: undefined,
    extra: undefined
  })
  //字典和额外参数全部列表
  let dictTypeWithExtra = reactive<Array<any>>([]);
  //选择的字典的以及额外参数
  let selectDictTypeExtra = ref<[]>([]);
  //存储额外参数的对象
  let extra= ref<{}>({});

  
  const addItem = (formEl: FormInstance | undefined) => {
    commonform.extra=JSON.stringify(extra.value)
    dictDataStore
      .addDictData(commonform)
      .then((resp) => {
        addfromOpenStatus.value = false
        searchList(searchform)
        ElMessage.success({ message: "添加成功" })
      })
      .catch((error) => {
        ElMessage.error({ message: error })
      })
    console.log(commonform)
  }
  
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
  //进入页面初始化的数据
  searchList(searchform)
  function  ceshi(){
    console.log("获取数据中")
    const names = ["tag"]
    dictDataStore
      .dictDataInfoList(names)
      .then((resp) => {
        console.log(resp)
        ElMessage.success({ message: "获取成功" })
      })
      .catch((error) => {
        ElMessage.error({ message: error })
      })
  }
  ceshi()
  //页码变更处理方法
  const handleCurrentChange = (currentPage: number) => {
    dataList.page = currentPage
    searchList(searchform)
  }
  //页数切换触发的事件
  const handleSizeChange = (pageSize: number) => {
    dataList.size = pageSize
    searchList(searchform)
  }

  // 删除字典值触发的事件
const deleteItem = (item: any) => {
  dictDataStore
    .deleteDictData(item.dictDataId)
    .then(() => {
      searchList(searchform)
      ElMessage.success({ message: '删除成功' })
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}
  
  //更改选择的选择项触发的事件
  const changeSelectDictType = (item:any) => {
   commonform.dictTypeId=item.dictTypeId
   let jsonArray = JSON.parse(item.extraSchema)
   selectDictTypeExtra.value=jsonArray
   extra.value = {}
   for (let i = 0; i < jsonArray.length; i++) {
        const item = jsonArray[i]
        extra.value[item.parameter] = undefined
    }
  }
  
  //点击添加按钮触发的事件
  const addButtenClick = async() => {
    proxy.$resetObj(commonform)
    await dictTypeStore
      .dictTypeAllList()
      .then((resp) => {
        dictTypeWithExtra = resp.data
      }).catch((error) => {
        ElMessage.error({ message: error })
    })
    addfromOpenStatus.value = true
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
    margin-bottom: v-bind(more ? '18px': '0px');
  }
  * {
    font-weight: 900;
  }
  </style>