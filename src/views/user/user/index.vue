<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="userStore.searchform" class="searchForm" label-position="right" label-width="auto"
        ref="searchFormRef">
        <el-row>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userStore.searchform.username" />
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="userStore.searchform.nickname" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="userStore.searchform.status">
              <el-option label="启用" value="0" />
              <el-option label="禁用" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item v-show="more" label="手机号" prop="mobile">
            <el-input v-model="userStore.searchform.mobile" />
          </el-form-item>
          <el-form-item v-show="more" label="邮箱" prop="email">
            <el-input v-model="userStore.searchform.email" />
          </el-form-item>
          <div style="margin-left: auto" class="card-search-end">
            <JcmButton :buttonBgColor="LayoutSettingStore.getTheme" @click="resetSearchForm(searchFormRef)">
              <template #icon>
                <svg-icon name="擦除" />
              </template>
            </JcmButton>
            <JcmButton :buttonBgColor="LayoutSettingStore.getTheme" @click="searchList(userStore.searchform)">
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
            <span>用户列表</span>
          </div>
          <div class="card-end">
            <JcmButton :buttonBgColor="LayoutSettingStore.getTheme" @click="userAddFromModal?.open()">
              <template #icon>
                <svg-icon name="加号" />
              </template>
            </JcmButton>
          </div>
        </div>
      </template>
      <el-table :data="dataList.list" table-layout="auto">
        <el-table-column prop="userId" label="ID" align="center" />
        <el-table-column prop="username" label="用户名" align="center">
          <template #default="scope">
            <span @click="instance?.proxy?.$copyText(scope.row.username)" class="copy-span">{{
              scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" align="center" />
        <el-table-column prop="mobile" label="手机号" align="center" />
        <el-table-column prop="email" label="邮箱" align="center" />
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <template v-if="scope.row.status === 0">
              <el-tag checked size="small">
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
        <el-table-column prop="loginDate" label="最后登录时间" align="center" />
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <template v-if="!isAdminById(scope.row.userId)">
              <el-button size="small" type="primary" @click="disableItem(scope.row)" text>
                停用
              </el-button>
            </template>
            <el-button size="small" type="primary" @click="userUpdateFromModal?.open(scope.row)" text>
              修改
            </el-button>
            <el-button size="small" type="primary" @click="handleDelete(scope.$index, scope.row)" text>
              详情
            </el-button>
            <template v-if="!isAdminById(scope.row.userId)">
              <el-button size="small" type="primary" @click="userRestPasswordFromModal?.open(scope.row)" text>
                重置密码
              </el-button>
            </template>
            <template v-if="!isAdminById(scope.row.userId)">
              <el-button size="small" type="primary" @click="userAuthRolesFromModal?.open(scope.row)" text>
                分配角色
              </el-button>
            </template>
            <template v-if="!isAdminById(scope.row.userId)">
              <el-button size="small" type="primary" @click="deleteItem(scope.row)" text>
                删除
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <div class="pagination-style">
          <!--分页-->
          <el-pagination :page-sizes="[10, 20, 30, 40]" small="small" background="true"
            :default-page-size="LayoutSettingStore.size" layout="total, sizes, prev, pager, next, jumper"
            :total="dataList.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </template>
    </el-card>

    <!--弹出框组件列表-->
    <UserAddFromModal ref="userAddFromModal" @refreshData="refreshData"></UserAddFromModal>
    <UserUpdateFromModal ref="userUpdateFromModal" @refreshData="refreshData"></UserUpdateFromModal>
    <UserRestPasswordFromModal ref="userRestPasswordFromModal" @refreshData="refreshData"></UserRestPasswordFromModal>
    <UserAuthRolesFromModal ref="userAuthRolesFromModal" @refreshData="refreshData"></UserAuthRolesFromModal>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FromModal } from '@/utils/commonType'
import type { ComponentInternalInstance } from 'vue'
//导入类型
import type { User } from '@/api/user/type'
//弹出窗
import UserAddFromModal from './components/user-add-from-modal.vue'
import UserUpdateFromModal from './components/user-update-from-modal.vue'
import UserRestPasswordFromModal from './components/user-rest-password-from-modal.vue'
import UserAuthRolesFromModal from './components/user-auth-roles-from-modal.vue'
//仓库
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
//权限工具类
import { isAdminById } from '@/utils/permission'

//获取当前组件实例
const instance: ComponentInternalInstance | null = getCurrentInstance();
const userStore = useUserStore()
const LayoutSettingStore = useLayoutSettingStore()

onMounted(() => {
  //清空搜索条件
  userStore.searchform = <User>{}
  //手动触发更新页数的逻辑
  handleSizeChange(LayoutSettingStore.size)
  //进入页面初始化的数据
  searchList(userStore.searchform)
})

//表单对象
const searchFormRef = ref<FormInstance>()
//弹出窗对象
const userAddFromModal = ref<FromModal>()
const userUpdateFromModal = ref<FromModal>()
const userRestPasswordFromModal = ref<FromModal>()
const userAuthRolesFromModal = ref<FromModal>()
//更多按钮状态
const more = ref(false)

//表格数据,定义响应式的数据列表，初始为空
const dataList = reactive({
  list: [],
  total: 0,
  page: 1,
  size: 10
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

//页码变更触发的方法
const handleCurrentChange = (currentPage: number) => {
  dataList.page = currentPage
  searchList(userStore.searchform)
}
//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
  dataList.size = pageSize
  searchList(userStore.searchform)
}

//删除用户触发的事件
const deleteItem = (item: any) => {
  userStore
    .delUser(item.userId)
    .then((resp) => {
      searchList(userStore.searchform)
      ElMessage.success({ message: '删除成功' })
    })
    .catch((error) => {
      ElMessage.error({ message: "失败信息: " + error })
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
        searchList(userStore.searchform)
        ElMessage.success({ message: '停用成功' })
      })
      .catch((error) => {
        ElMessage.error({ message: "失败信息: " + error })
      })
  }
}

//提供给子组件刷新数据的方法
const refreshData = () => {
  searchList(userStore.searchform)
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
/* 这里可以添加组件内部特有的样式 */
.searchForm .el-form-item {
  margin-bottom: v-bind(more ? '18px' : '0px') !important;
}


</style>
