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
          <el-form-item v-show="more" label="手机号" prop="mobile">
            <el-input v-model="searchform.mobile" />
          </el-form-item>
          <el-form-item v-show="more" label="邮箱" prop="email">
            <el-input v-model="searchform.email" />
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
        <el-table-column prop="userId" label="ID" align="center" />
        <el-table-column prop="username" label="用户名" align="center" />
        <el-table-column prop="nickname" label="昵称" align="center" />
        <el-table-column prop="mobile" label="手机号" align="center" />
        <el-table-column prop="email" label="邮箱" align="center" />
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <el-tag
              checked
              size="small"
              style="color: aliceblue"
              :color="scope.row.status === 0 ? 'black' : 'red'"
            >
              {{ scope.row.status === 0 ? '正常' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="loginDate" label="最后登录时间" align="center" />
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="disableItem(scope.row)"
              :disabled="isAdminById(scope.row.userId)"
              text
            >
              <span style="font-weight: 900">停用</span>
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
              @click="handleDelete(scope.$index, scope.row)"
              text
            >
              详情
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="resetButtonClick(scope.row)"
              :disabled="isAdminById(scope.row.userId)"
              text
            >
              重置密码
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="allocationRoleButtonClick(scope.row)"
              :disabled="isAdminById(scope.row.userId)"
              text
            >
              分配角色
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="deleteItem(scope.row)"
              :disabled="isAdminById(scope.row.userId)"
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
    <el-dialog v-model="addfromOpenStatus" width="500" :show-close="false">
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">新增用户</h4>
        </div>
      </template>
      <el-form
        :model="commonform"
        label-width="80"
        :rules="rules"
        ref="addFormRef"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="commonform.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="commonform.nickname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="commonform.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="commonform.mobile" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="commonform.email" autocomplete="off" />
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
    <!--修改用户密码弹出框-->
    <el-dialog
      v-model="updatePasswordfromOpenStatus"
      width="500"
      :show-close="false"
    >
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">重置密码</h4>
        </div>
      </template>
      <el-form :model="commonform" label-width="60" ref="updatePasswordFormRef">
        <el-form-item label="用户名">
          <el-input v-model="commonform.username" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="commonform.nickname" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="commonform.password"
            autocomplete="off"
            type="password"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="display: flex; justify-content: center">
          <el-button @click="updatePasswordfromOpenStatus = false">
            取消
          </el-button>
          <el-button
            type="primary"
            @click="updatePasswordItem(updatePasswordFormRef)"
          >
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!--修改用户信息弹出框-->
    <el-dialog
      v-model="updateInfofromOpenStatus"
      width="500"
      :show-close="false"
    >
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">修改用户信息</h4>
        </div>
      </template>
      <el-form
        :model="commonform"
        label-width="60"
        ref="updateInfoFormRef"
        :rules="rules"
      >
        <el-form-item label="用户名">
          <el-input v-model="commonform.username" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="commonform.nickname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="commonform.mobile" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="commonform.email" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="display: flex; justify-content: center">
          <el-button @click="updateInfofromOpenStatus = false">取消</el-button>
          <el-button type="primary" @click="updateInfoItem(updateInfoFormRef)">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!--分配角色弹出框-->
    <el-dialog
      v-model="allocationRoleFromOpenStatus"
      width="500"
      :show-close="false"
    >
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">分配角色</h4>
        </div>
      </template>
      <el-form :model="commonform" label-width="60" ref="updateInfoFormRef">
        <el-form-item label="用户名">
          <el-input v-model="commonform.username" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="commonform.nickname" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="角色">
          <el-select
            v-model="userRoleList"
            multiple
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="3"
            placeholder="请选择角色"
          >
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.name"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="display: flex; justify-content: center">
          <el-button @click="allocationRoleFromOpenStatus = false">
            取消
          </el-button>
          <el-button type="primary" @click="selectAuthUserRoles()">
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
//仓库
import useUserStore from '@/store/modules/user'
import useRoleStore from '@/store/modules/role'
const userStore = useUserStore()
const roleStore = useRoleStore()
const { proxy } = getCurrentInstance();
//添加表单打开的状态
const addfromOpenStatus = ref(false)
//修改密码表单打开的状态
const updatePasswordfromOpenStatus = ref(false)
//修改用户信息表单打开的状态
const updateInfofromOpenStatus = ref(false)
//分配角色表单打开的状态
const allocationRoleFromOpenStatus = ref(false)
//更多按钮状态
const more = ref(false)
//表单Dom
const searchFormRef = ref<FormInstance>()
const addFormRef = ref<FormInstance>()
const updatePasswordFormRef = ref<FormInstance>()
const updateInfoFormRef = ref<FormInstance>()
//搜索表单填写的内容
const searchform = reactive({
  username: '',
  nickname: '',
  status: '',
  mobile: '',
  email: '',
})

//表单填写的内容
const commonform = reactive({
  userId: '',
  username: '',
  nickname: '',
  password: '',
  mobile: '',
  email: '',
})

//角色列表
let roleList = ref([])
//用户的角色
let userRoleList = ref([])

//表格数据
const dataList = reactive({
  list: [],
  total: 0,
  page: 1,
  size: 10,
})
//表单规则
const rules = ref<FormRules>({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
  ],
  nickname: [
    {
      required: true,
      message: '昵称不能为空',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
  ],
})
//根据搜索条件进行搜索
const searchList = (searchData: any) => {
  userStore
    .userList(searchData, dataList.page, dataList.size)
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
//删除用户触发的事件
const deleteItem = (item: any) => {
  userStore
    .delUser(item.userId)
    .then((resp) => {
      searchList(searchform)
      ElMessage.success({ message: '删除成功' })
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}
//停用用户触发的事件
const disableItem = (item: any) => {
  if (item.status == 1) {
    ElMessage.warning({ message: '用户已经是停用状态' })
  } else {
    userStore
      .upStatusUser(item)
      .then((resp) => {
        searchList(searchform)
        ElMessage.success({ message: '停用成功' })
      })
      .catch((error) => {
        ElMessage.error({ message: error })
      })
  }
}
//点击添加按钮触发的事件
const addButtenClick = () => {
  proxy.$resetObj(commonform)
  addfromOpenStatus.value = true
}
const addItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      userStore
        .addUser(commonform)
        .then(() => {
          addfromOpenStatus.value = false
          proxy.$resetObj(commonform)
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
//点击重置密码触发的事件
const resetButtonClick = (item: any) => {
  updatePasswordfromOpenStatus.value = true
  commonform.userId = item.userId
  commonform.username = item.username
  commonform.nickname = item.nickname
}
const updatePasswordItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      userStore
        .upPasswordUser(commonform)
        .then(() => {
          updatePasswordfromOpenStatus.value = false
          resetobj(commonform)
          ElMessage.success({ message: '密码重置成功' })
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
//修改用户触发的事件
const updateInfoButtonClick = (item: any) => {
  updateInfofromOpenStatus.value = true
  Object.keys(commonform).forEach((key) => {
    commonform[key] = item[key]
  })
}
const updateInfoItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      userStore
        .upInfoUser(commonform)
        .then(() => {
          updateInfofromOpenStatus.value = false
          proxy.$resetObj(commonform)
          searchList(searchform)
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

//点击详情触发的事件
const infoButtonClick = () => {}

//点击分配角色触发的事件
const allocationRoleButtonClick = async (item: any) => {
  // 1. 更新表单信息
  commonform.userId = item.userId
  commonform.username = item.username
  commonform.nickname = item.nickname

  try {
    // 2. 获取所有角色
    const rolesAll = await roleStore.roleNotDisabledAllList()
    // 3. 获取用户已有的角色
    const userRoles = await roleStore.getUserRoleList(item.userId)
    // 4. 更新角色列表
    userRoleList.value = userRoles.data
    roleList.value = rolesAll.data
    // 5. 所有异步操作完成后，更新状态
    allocationRoleFromOpenStatus.value = true
  } catch (error) {
    ElMessage.error({ message: error })
    // 根据需要处理错误
  }
}

const selectAuthUserRoles = () => {
  roleStore
    .selectUserRoles(commonform.userId, userRoleList.value)
    .then(() => {
      searchList(searchform)
      ElMessage.success({ message: '分配成功' })
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
  allocationRoleFromOpenStatus.value = false
}

//重置搜索表单
const resetSearchForm = (ruleFormRef: any) => {
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
.searchForm .el-form-item {
  margin-bottom: v-bind(more ? '18px': '0px');
}
* {
  font-weight: 900;
}
</style>
