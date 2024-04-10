<template>
  <el-card>
    <el-form
      :inline="true"
      :model="searchform"
      class="demo-form-inline"
      label-position="right"
      label-width="auto"
      ref="ruleFormRef"
    >
      <el-row style="display: flex">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="searchform.username" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="searchform.nickname" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="searchform.status">
            <el-option label="正常" value="0" />
            <el-option label="禁用" value="1" />
          </el-select>
        </el-form-item>
        <template v-if="more">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="searchform.mobile" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="searchform.email" />
          </el-form-item>
        </template>
        <div style="margin-left: auto">
          <el-button type="info" @click="resetForm(ruleFormRef)">
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
      <div style="display: flex; justify-content: space-between">
        <div class="card-header">
          <span>用户列表</span>
        </div>
        <div class="card-end">
          <el-button type="primary" @click="addButenClick()">新增</el-button>
        </div>
      </div>
    </template>

    <el-table
      :data="dataList.list"
      table-layout="auto"
      stripe
      style="width: 100%"
    >
      <el-table-column type="index" label="序列" width="70" align="center" />
      <el-table-column prop="username" label="用户名" align="center" />
      <el-table-column prop="nickname" label="昵称" align="center" />
      <el-table-column prop="mobile" label="手机号" align="center" />
      <el-table-column prop="email" label="邮箱" align="center" />
      <el-table-column prop="status" label="状态" align="center">
        <template #default="scope">
          <el-tag effect="dark" round v-if="scope.row.status == '0'">
            正常
          </el-tag>
          <el-tag
            type="danger"
            effect="dark"
            round
            v-if="scope.row.status == '1'"
          >
            停用
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="loginDate" label="最后登录时间" align="center" />
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button size="small" @click="disableUser(scope.row)" text>
            停用
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            text
          >
            修改
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            text
          >
            详情
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            text
          >
            重置密码
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            text
          >
            分配角色
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
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

  <!--新增用户弹出框-->
  <el-dialog
    v-model="fromOpenStatus"
    width="500"
    :show-close="false"
    style="border-radius: 12px"
  >
    <el-form :model="form" label-width="60">
      <el-form-item label="用户名">
        <el-input v-model="addform.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="addform.nickname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="addform.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="addform.mobile" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="addform.email" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="display: flex; justify-content: center">
        <el-button @click="fromOpenStatus = false">取消</el-button>
        <el-button type="primary" @click="addItem()">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import useUserStore from '@/store/modules/user'
//from表单打开的状态
const fromOpenStatus = ref(false)
const userStore = useUserStore()
//更多按钮状态
const more = ref(false)
//表单Dom
const ruleFormRef = ref<FormInstance>()

//搜索表单填写的内容
const searchform = reactive({
  username: '',
  nickname: '',
  status: '',
  mobile: '',
  email: '',
})

//新增表单填写的内容
const addform = reactive({
  username: '',
  nickname: '',
  password: '',
  mobile: '',
  email: '',
})

const dataList = reactive({
  list: [{}],
  total: 0,
  page: 1,
  size: 10,
})

//根据搜索条件进行搜索
const searchList = (searchData: any) => {
  console.log(searchData)
  userStore.userList(searchData, dataList.page, dataList.size).then((resp) => {
    dataList.list = resp.rows
    dataList.total = resp.total
  })
}

//进入页面初始化的数据
const getList = () => {
  userStore.userList(searchform, dataList.page, dataList.size).then((resp) => {
    dataList.list = resp.rows
    dataList.total = resp.total
  })
}
getList()

//页码变更处理方法
const handleCurrentChange = (currentPage: number) => {
  dataList.page = currentPage
  userStore.userList(searchform, currentPage, dataList.size).then((resp) => {
    dataList.list = resp.rows
    dataList.total = resp.total
  })
}
//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
  dataList.size = pageSize
  userStore.userList(searchform, dataList.page, pageSize).then((resp) => {
    dataList.list = resp.rows
    dataList.total = resp.total
  })
}
//删除用户触发的事件
const deleteItem = () => {}

//修改用户触发的事件
const updateItem = () => {}

//停用用户触发的事件
const disableItem = () => {}

//点击详情触发的事件
const infoItem = () => {}

//点击重置密码触发的事件
const resetItem = () => {}

//点击分配角色触发的事件
const allocationRole = () => {}

//点击添加按钮触发的事件
const addButenClick = () => {
  fromOpenStatus.value = true
}

//点击添加按钮触发的事件
const addItem = () => {
  console.log(addform)
  userStore.addUser(addform)
  fromOpenStatus.value = false
}

//重置表单
const resetForm = (ruleFormRef: any) => {
  if (!ruleFormRef) return
  ruleFormRef.resetFields()
}
</script>
<script lang="ts">
export default {
  name: 'user',
}
</script>
<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 225px;
}

.demo-form-inline .el-select {
  --el-select-width: 225px;
}
</style>
