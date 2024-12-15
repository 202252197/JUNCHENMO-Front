<template>
  <div>
    <el-card>
      <el-form
        :inline="true"
        :model="roleStore.searchform"
        class="searchForm"
        label-position="right"
        label-width="auto"
        ref="searchFormRef"
      >
        <el-row style="display: flex">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleStore.searchform.name" />
          </el-form-item>
          <el-form-item label="角色编码" prop="code">
            <el-input v-model="roleStore.searchform.code" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="roleStore.searchform.status">
              <el-option label="启用" value="0" />
              <el-option label="禁用" value="1" />
            </el-select>
          </el-form-item>
          <div style="margin-left: auto">
            <el-button type="info" @click="resetSearchForm(searchFormRef)">
              重置
            </el-button>
            <el-button :color="LayoutSettingStore.theme?'#5072e6':'red'" @click="searchList(roleStore.searchform)">
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
            <span>用户列表</span>
          </div>
          <div class="card-end">
            <el-button-group class="ml-4">
              <el-button :color="LayoutSettingStore.theme?'#5072e6':'red'"  @click="roleAddFromModal?.open()">
                <template #icon>
                  <svg-icon name="加号"  color="white"/>
                </template>
                新增
              </el-button>
            </el-button-group>
          </div>
        </div>
      </template>

      <el-table :data="dataList.list" table-layout="auto" @selection-change="handleSelectionChange">
        <el-table-column type="selection"  width="55" />
        <el-table-column prop="roleId" label="ID" align="center" />
        <el-table-column prop="name" label="角色名称" align="center" />
        <el-table-column prop="code" label="角色编码" align="center" />
        <el-table-column prop="status" label="角色状态" align="center">
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
              @click="roleUpdateFromModal?.open(scope.row)"
              text
            >
             修改
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="roleAuthMenusFromModal?.open(scope.row)"
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
        <div class="pagination-style">
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
    


    <!--弹出框组件列表-->
    <RoleAddFromModal ref="roleAddFromModal" @refreshData="refreshData"></RoleAddFromModal>
    <RoleAuthMenusFromModal ref="roleAuthMenusFromModal" @refreshData="refreshData"></RoleAuthMenusFromModal>
    <RoleUpdateFromModal ref="roleUpdateFromModal" @refreshData="refreshData"></RoleUpdateFromModal>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FromModal } from '@/utils/commonType'

//弹出窗
import RoleAddFromModal from './components/role-add-from-modal.vue'
import RoleAuthMenusFromModal from './components/role-auth-menus-from-modal.vue'
import RoleUpdateFromModal from './components/role-update-from-modal.vue'
//仓库
import useRoleStore from '@/store/modules/role'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
//权限工具类
import { isAdminById } from '@/utils/permission'

const roleStore = useRoleStore()
const LayoutSettingStore = useLayoutSettingStore()


onMounted(() => {
  //进入页面初始化的数据
  searchList(roleStore.searchform)
})

//表单对象
const searchFormRef = ref<FormInstance>()
//user弹出窗对象
const roleAddFromModal = ref<FromModal>()
const roleAuthMenusFromModal = ref<FromModal>()
const roleUpdateFromModal = ref<FromModal>()


//表格数据
const dataList = reactive({
  list: [],
  total: 0,
  page: 1,
  size: 10,
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

//页码变更处理方法
const handleCurrentChange = (currentPage: number) => {
  dataList.page = currentPage
  searchList(roleStore.searchform)
}
//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
  dataList.size = pageSize
  searchList(roleStore.searchform)
}

//选中数据触发的事件
const handleSelectionChange = (val: []) => {
  useRoleStore.multipleSelection = val
}

//删除角色触发的事件
const deleteItem = (item: any) => {
  roleStore
    .deleteRole(item.roleId)
    .then(() => {
      searchList(roleStore.searchform)
      ElMessage.success({ message: '删除成功' })
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

//停用用户触发的事件
const disableItem = (item: any) => {
  if(item.status==1){
    ElMessage.warning({ message: '角色已经是停用状态' })
  }else{
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
}

//提供给子组件刷新数据的方法
const refreshData = () => {
  searchList(roleStore.searchform)
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
*{
  font-weight: 900;
}
</style>
