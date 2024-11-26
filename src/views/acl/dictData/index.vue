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
        <template v-for="item in selectDictType">
          <el-form-item :label="item.parameter" prop="sort">
            <el-input v-model="extraJson[item.dictTypeExtraId]" autocomplete="off" :placeholder="'请输入'+item.parameter" />
          </el-form-item>
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
  import { resetobj } from '@/utils/common'
  import useDictDataStore from '@/store/modules/dictData'
  import useDictTypeStore from '@/store/modules/dictType'
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
    name: undefined,
    description: undefined,
    value: undefined,
    sort: undefined,
  })
  //字典和额外参数全部列表
  let dictTypeWithExtra = reactive<Array<any>>([]);
  //选择的字典的额外参数
  let selectDictType = ref<[]>([]);
  
  //存储额外参数的对象
  let extraJson= ref<{}>({});

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
  
  //更改选择的选择项触发的事件
  const changeSelectDictType = (item:any) => {
   extraJson.value = {}
   selectDictType.value=item.typeExtraSchemas;
    for (let i = 0; i < selectDictType.value.length; i++) {
        const item = selectDictType.value[i];
        extraJson.value[item.dictTypeExtraId] = undefined;
    }
  }
  
  //点击添加按钮触发的事件
  const addButtenClick = async() => {
    resetobj(commonform)
    await dictTypeStore
      .dictTypeAllList()
      .then((resp) => {
        dictTypeWithExtra = resp.data
      }).catch((error) => {
        ElMessage.error({ message: error })
    })
    addfromOpenStatus.value = true
  }
  const addItem = (formEl: FormInstance | undefined) => {
    console.log(extraJson.value)
    if (!formEl) return
    // 验证参数
    formEl.validate((valid) => {
      if (valid) {
        commonform.extraSchemas = extraSchemas
        // 验证额外参数
        if (extraSchemas) {
          for (let i = 0; i < extraSchemas.length; i++) {
            const extraSchema = extraSchemas[i];
            // 为空
            if (!extraSchema.parameter) {
              ElMessage.warning({ message: '额外参数' + (i + 1) + '不能为空' })
              return false;
            }
            // 不合法
            if (!new RegExp(/^[a-zA-Z0-9_]{2,32}$/).test(extraSchema.parameter as string)) {
              ElMessage.warning({ message: '额外参数' + (i + 1) + '配置项需要为 2-32 位的数字,字母或下滑线' })
              return false;
            }
          }
        }
        dictTypeStore
          .addDictType(commonform)
          .then(() => {
            addfromOpenStatus.value = false
            searchList(searchform)
            ElMessage.success({ message: '添加成功' })
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