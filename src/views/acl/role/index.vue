<template>
  <div>
    <el-card>
      <el-form
        :inline="true"
        :model="searchform"
        class="demo-form-inline"
        label-position="right"
        label-width="auto"
        ref="searchFormRef"
      >
        <el-row style="display: flex">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="searchform.name" />
          </el-form-item>
          <el-form-item label="角色编码" prop="code">
            <el-input v-model="searchform.code" />
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
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div class="card-header">
            <span>用户列表</span>
          </div>
          <div class="card-end">
            <el-button type="primary" @click="addButtenClick()">新增</el-button>
          </div>
        </div>
      </template>

      <el-table :data="dataList.list" table-layout="auto">
        <el-table-column type="index" label="序列" width="70" align="center" />
        <el-table-column prop="name" label="角色名称" align="center" />
        <el-table-column prop="code" label="角色编码" align="center" />
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <el-tag
              checked
              size="small"
              style="color: aliceblue"
              :color="scope.row.status === 0 ? '#4165D7' : '#D05344'"
            >
              {{ scope.row.status === 0 ? '正常' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="disableItem(scope.row)"
              :disabled="isAdminById(scope.row.roleId)"
              text
            >
            停用
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="updateInfoButtonClick(scope.row)"
              text
            >
              
             修改
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="updateInfoButtonClick(scope.row)"
              :disabled="isAdminById(scope.row.roleId)"
              text
            >
            分配菜单
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="deleteItem(scope.row)"
              :disabled="isAdminById(scope.row.roleId)"
              text
            >
             
            删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <template #footer>
        <div style="display: flex; justify-content: center">
          <!--分页-->
          <el-pagination
            :page-sizes="[10, 20, 30, 40]"
            small="small"
            background="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="dataList.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </template>
    </el-card>
    <!--新增角色弹出框-->
    <el-dialog v-model="addfromOpenStatus" width="500" :show-close="false">
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">新增角色</h4>
        </div>
      </template>
      <el-form
        :model="commonform"
        label-width="80"
        :rules="rules"
        ref="addFormRef"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="commonform.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="commonform.code" autocomplete="off" />
        </el-form-item>
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
import type { FormInstance, FormRules } from 'element-plus'
import { isAdminById } from '@/utils/permission'
import useRoleStore from '@/store/modules/role'
const roleStore = useRoleStore()
//添加表单打开的状态
const addfromOpenStatus = ref(false)

//表单Dom
const searchFormRef = ref<FormInstance>()
const addFormRef = ref<FormInstance>()

//搜索表单填写的内容
const searchform = reactive({
  name: '',
  code: '',
  status: '',
})

//新增表单填写的内容
const commonform = reactive({
  roleId: '',
  name: '',
  code: '',
})

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
      message: '角色名称不能为空',
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: true,
      message: '角色编码不能为空',
      trigger: 'blur',
    },
  ],
})

//根据搜索条件进行搜索
const searchList = (searchData: any) => {
  roleStore
    .roleList(searchData, dataList.page, dataList.size)
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

//点击添加按钮触发的事件
const addButtenClick = () => {
  addfromOpenStatus.value = true
}
const addItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      roleStore
        .addRole(commonform)
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

//停用用户触发的事件
const disableItem = (item: any) => {
  roleStore
    .upStatusRole(item)
    .then((resp) => {
      searchList(searchform)
      ElMessage.success({ message: '停用成功' })
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
  name: 'role',
}
</script>
<style scoped>
.searchForm .el-form-item {
  margin-bottom: v-bind(more ? '18px': '0px');
}
*{
  font-weight: 900;
}
</style>
