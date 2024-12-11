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
            <el-button type="primary" @click="addButtonClick()">新增</el-button>
          </div>
        </div>
      </template>

      <el-table :data="dataList.list" table-layout="auto">
        <el-table-column prop="roleId" label="ID" align="center" />
        <el-table-column prop="name" label="角色名称" align="center" />
        <el-table-column prop="code" label="角色编码" align="center" />
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
              @click="allocationMenuButtonClick(scope.row)"
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

     <!--修改角色弹出框-->
    <el-dialog v-model="updateInfofromOpenStatus" width="500" :show-close="false">
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">新增角色</h4>
        </div>
      </template>
      <el-form
        :model="commonform"
        label-width="80"
        :rules="rules"
        ref="updateInfoFormRef"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="commonform.name" autocomplete="off" />
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

   <!--分配菜单弹出框-->
    <el-dialog v-model="allocationMenuFromOpenStatus" width="1000" :show-close="false">
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">分配菜单</h4>
        </div>
      </template>
      <grant-table ref="grantTableRef"></grant-table>
      <template #footer>
        <div style="display: flex; justify-content: center">
          <el-button @click="allocationMenuFromOpenStatus = false">取消</el-button>
          <el-button type="primary" @click="selectAuthRoleMenus(updateInfoFormRef)">
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
import useMenuStore from '@/store/modules/menu'
const roleStore = useRoleStore()
const menuStore = useMenuStore()
const { proxy } = getCurrentInstance();
//添加表单打开的状态
const addfromOpenStatus = ref(false)
//修改表单打开的状态
const updateInfofromOpenStatus = ref(false)
//分配菜单打开的状态
const allocationMenuFromOpenStatus = ref(false)

//表单Dom
const searchFormRef = ref<FormInstance>()
const addFormRef = ref<FormInstance>()
const updateInfoFormRef = ref<FormInstance>()

const grantTableRef = ref(null)
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
}) as any

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
//删除角色触发的事件
const deleteItem = (item: any) => {
  roleStore
    .deleteRole(item.roleId)
    .then(() => {
      searchList(searchform)
      ElMessage.success({ message: '删除成功' })
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

//点击添加按钮触发的事件
const addButtonClick = () => {
  proxy.$resetObj(commonform)
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

//分配角色触发的事件
const allocationMenuButtonClick = (item: any) => {
  commonform.roleId = item.roleId
  menuStore
      .getRoleMenuList(commonform.roleId)
      .then((resp) => {
        if(grantTableRef?.value){
          grantTableRef?.value.setValue(resp.data)
        }
        searchList(searchform)
      })
      .catch((error) => {
        ElMessage.error({ message: error })
      })

  allocationMenuFromOpenStatus.value = true
}

const selectAuthRoleMenus = (formEl: FormInstance | undefined) => {
  console.log( grantTableRef?.value.getValue())
  if(grantTableRef?.value){
    menuStore
      .selectRoleMenus(commonform.roleId, grantTableRef?.value.getValue())
      .then(() => {
        searchList(searchform)
        ElMessage.success({ message: '分配成功' })
      })
      .catch((error) => {
        ElMessage.error({ message: error })
      })
  }
  allocationMenuFromOpenStatus.value = false
}


//修改用户触发的事件
const updateInfoButtonClick = (item: any) => {
  updateInfofromOpenStatus.value = true
  Object.keys(commonform).forEach((key) => {
    commonform[key] = item[key];
  });
}
const updateInfoItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      roleStore
        .upInfoRole(commonform)
        .then(() => {
          updateInfofromOpenStatus.value = false
          resetobj(commonform)
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
