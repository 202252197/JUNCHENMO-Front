<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="searchform" class="demo-form-inline" label-position="right" label-width="auto"
        ref="searchFormRef">
        <el-row style="display: flex">
          <el-form-item label="配置项" prop="name">
            <el-input v-model="searchform.name" />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="searchform.description" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="searchform.status">
              <el-option label="正常" value="0" />
              <el-option label="禁用" value="1" />
            </el-select>
          </el-form-item>
          <div style="margin-left: auto">
            <el-button type="info" @click="resetSearchForm(searchFormRef)">
              重置
            </el-button>
            <el-button type="primary" @click="searchList(searchform)">
              搜索
            </el-button>
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
            <span>字典配置项</span>
          </div>
          <div class="card-end">
            <el-button type="primary" @click="addButtenClick()">新增</el-button>
            <el-button type="warning" @click="addButtenClick()">刷新缓存</el-button>
            <el-button type="danger" @click="addButtenClick()">删除</el-button>
          </div>
        </div>
      </template>

      <el-table :data="dataList.list" table-layout="auto">
        <el-table-column prop="dictTypeId" label="ID" align="center" />
        <el-table-column prop="name" label="配置项" align="center" />
        <el-table-column prop="description" label="描述" align="center" />
        <el-table-column prop="type" label="类型" align="center">
          <template #default="scope">
            <el-tag size="small" style="color: aliceblue" :color="getColorByType(scope.row.type)">
              {{ getStatusByType(scope.row.type) }}
            </el-tag>
          </template>
        </el-table-column>
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
            <el-button size="small" type="primary" @click="view.open(scope.row.ceshi, scope.row.name)" text>
              查看
            </el-button>
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

    <!--新增字典配置项弹出框-->
    <el-dialog v-model="addfromOpenStatus" width="500" :show-close="false">
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">新增字典配置项</h4>
        </div>
      </template>
      <el-form :model="commonform" label-width="100" :rules="rules" ref="addFormRef">
        <el-form-item label="配置项" prop="name">
          <el-input v-model="commonform.name" autocomplete="off" placeholder="请输入配置项" />
        </el-form-item>
        <el-form-item label="配置值类型" prop="type">
          <el-select v-model="commonform.type">
            <el-option label="字符串" value="0" />
            <el-option label="整数" value="1" />
            <el-option label="小数" value="2" />
            <el-option label="布尔值" value="3" />
            <el-option label="颜色" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="配置描述" prop="description">
          <el-input v-model="commonform.description" autocomplete="off" placeholder="请输入配置描述" />
        </el-form-item>
        <el-divider>
          额外参数定义
        </el-divider>
        <div v-for="(param, index) in extraSchemas" :key="index">
          <el-form-item :label="'额外参数' + (index + 1)" :prop="'extra' + (index + 1)">
            <el-select v-model="param.type" style="width: 30%;">
              <el-option label="字符串" value="0" />
              <el-option label="整数" value="1" />
              <el-option label="小数" value="2" />
              <el-option label="布尔值" value="3" />
              <el-option label="颜色" value="4" />
            </el-select>
            <el-input v-model="param.parameter" autocomplete="off" placeholder="参数名称" style="width: 60%;" />

            <el-button size="small" @click="deleteExtraClick(index)" text style="width: 10%;height: 100%;">
              <svg-icon name="减号" width="18px" height="18px" :color="LayoutSettingStore.theme ? 'black' : 'white'" />
            </el-button>

          </el-form-item>
        </div>

        <el-row :gutter="0" justify="space-evenly">
          <el-col :span="3"><el-tag type="info">status</el-tag></el-col>
          <el-col :span="3"><el-tag type="info">color</el-tag></el-col>
          <el-col :span="3"><el-tag type="info">dissss</el-tag></el-col>
          <el-col :span="3"><el-tag type="info">Tag 3</el-tag></el-col>
          <el-col :span="3"><el-tag type="info">Tag 3</el-tag></el-col>
          <el-col :span="4">
            <el-button size="small" type="info" @click="addExtraClick()" style="width: 100%;" text>
              <svg-icon name="加号" width="18px" height="18px" :color="LayoutSettingStore.theme ? 'black' : 'white'" />
            </el-button>
          </el-col>
        </el-row>

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

    <!-- json 查看器模态框 -->
    <JsonEditor ref="view" />
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import useDictTypeStore from '@/store/modules/dictType'
import { resetobj } from '@/utils/common'
//获取设置相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
//获取layout配置相关的仓库
const LayoutSettingStore = useLayoutSettingStore()
const dictTypeStore = useDictTypeStore()

//添加表单打开的状态
const addfromOpenStatus = ref(false)
//查看表单打开的状态
const viewfromOpenStatus = ref(false)
//表单Dom
const searchFormRef = ref<FormInstance>()
const addFormRef = ref<FormInstance>()
//编辑表单
const view = ref();

//搜索表单填写的内容
const searchform = reactive({
  name: undefined,
  description: undefined,
  status: undefined,
})

//新增表单填写的内容
const commonform = reactive({
  name: undefined,
  type: undefined,
  description: undefined,
  extraSchemas: undefined,
})
const extraSchemas = reactive<Array<any>>([]);

//表格数据
const dataList = reactive({
  list: [],
  total: 0,
  page: 1,
  size: 10,
})

//表单规则
const rules = ref<FormRules>({
  name: [
    {
      required: true,
      message: '配置项不能为空',
      trigger: 'blur',
    },
  ],
  type: [
    {
      required: true,
      message: '配置值类型不能为空',
      trigger: 'blur',
    },
  ],
  description: [
    {
      required: true,
      message: '配置描述不能为空',
      trigger: 'blur',
    },
  ],
})

const addExtraClick = () => {
  const newParam = {
    parameter: undefined,
    type: '0'
  };
  extraSchemas.push(newParam);
};


const deleteExtraClick = (index: number) => {
  extraSchemas.splice(index, 1);
};


//根据搜索条件进行搜索
const searchList = (searchData: any) => {
  dictTypeStore
    .dictTypeList(searchData, dataList.page, dataList.size)
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

//删除字典类型触发的事件
// const deleteItem = (item: any) => {
//   dictTypeStore
//     .deleteDictType(item.roleId)
//     .then(() => {
//       searchList(searchform)
//       ElMessage.success({ message: '删除成功' })
//     })
//     .catch((error) => {
//       ElMessage.error({ message: error })
//     })
// }

//点击添加按钮触发的事件
const addButtenClick = () => {
  resetobj(commonform)
  extraSchemas.length = 0;
  addfromOpenStatus.value = true
}
const addItem = (formEl: FormInstance | undefined) => {
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


//点击查看按钮触发的事件
const viewButtonClick = (item: any) => {
  viewModelTitle.value = item.name + " - " + item.description
  resetobj(commonform)
  viewfromOpenStatus.value = true

}

//重置搜索表单
const resetSearchForm = (ruleFormRef: any) => {
  if (!ruleFormRef) return
  ruleFormRef.resetFields()
}


//获取表格状态转意的字符串和颜色方法
const getColorByType = (type: any) => {
  switch (type) {
    case 0:
      return '#836FFF';
    case 1:
      return '#FF6A6A';
    case 2:
      return '#43CD80';
    case 3:
      return '#E1B5A5';
    case 4:
      return '#E4DCD0';
    default:
      return '#999';
  }
}
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

</script>
<script lang="ts">
export default {
  name: 'dictType',
}
</script>
<style scoped>
* {
  font-weight: 900;
}
</style>