<template>
  <div>
    <!--权限列表条件卡片-->
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
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="searchform.name" />
          </el-form-item>
          <el-form-item label="菜单状态" prop="status">
            <el-select v-model="searchform.status">
              <el-option label="正常" value="0" />
              <el-option label="禁用" value="1" />
            </el-select>
          </el-form-item>
         
          <div style="margin-left: auto">
            <el-button type="info" @click="resetSearchForm(searchFormRef)">
              重置
            </el-button>
            <el-button type="info" @click="expandHandle()">
              <template v-if="expandStatus">收起</template> 
              <template v-else>展开</template>
            </el-button>
            <el-button type="primary" @click="searchList(searchform)">
              搜索
            </el-button>
          </div>
        </el-row>
      </el-form>
    </el-card>

    <!-- 权限列表卡片 -->
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
            <span>权限列表</span>
          </div>
          <div class="card-end">
            <el-button type="primary" @click="addButtenClick()">新增</el-button>
          </div>
        </div>
      </template>

      <el-table
        :data="dataList"
        table-layout="auto"
        row-key="menuId"
        :default-expand-all="expandStatus"
        v-if="isShow" 
        >
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="icon" label="图标"  align="center">
          <template #default="scope">
            <el-icon>
              <component :is="scope.row.icon"></component>
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center">
          <template #default="scope">
            <el-tag
              size="small"
              style="color: aliceblue"
              :color="getColorByType(scope.row.type)"
            >
              {{ getStatusByType(scope.row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center"/>
        <el-table-column prop="status" label="状态"  align="center">
          <template #default="scope">
            <el-tag
              checked
              size="small"
              style="color: aliceblue"
              :color="scope.row.status === 0 ? '#4165D7' : '#D05344'"
            >
              {{ scope.row.status === 0 ? '正常' : '禁用 ' }}
            </el-tag>
            <el-tag
                checked
                size="small"
                style="color: aliceblue;margin-left: 10px;"
                :color="scope.row.visible === false ? '#D05344' : '#4165D7'"
              >
              {{ scope.row.visible === false ? '隐藏' : '显示 ' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="permission" label="权限标识" align="center"/>
        <el-table-column prop="path" label="菜单路径"  align="center"/>
        <el-table-column prop="component" label="组件"  align="center"/>

        <el-table-column prop="remark" label="操作"  align="center">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="addMenuItem(scope.row)"
              text
            >
            新增
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
              type="danger"
              @click="deleteItem(scope.row)"
              text
            >
            删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

      <!--新增菜单弹出框-->
      <el-dialog v-model="addfromOpenStatus" width="500" :show-close="false">
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">新增菜单</h4>
        </div>
      </template>
      <el-form
        :model="commonform"
        label-width="80"
        ref="addFormRef"
      >
      <el-form-item label="上级菜单" prop="parentId">
          <el-tree-select
            check-strictly
            v-model="commonform.parentId"
            :data="data"
            :render-after-expand="false"
          />
      </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="commonform.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单类型" prop="code">
          <el-radio-group v-model="commonform.type" size="small">
            <el-radio-button label="目录" value="0" />
            <el-radio-button label="菜单" value="1" />
            <el-radio-button label="按钮" value="2" />
          </el-radio-group>
        </el-form-item>
        <IconSelect :icon="commonform.icon" style="width: 100%"  @selected="selected"/>
        <el-form-item label="组件/外联" prop="path">
          <el-input v-model="commonform.path" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单顺序" prop="sort">
          <el-input-number v-model="commonform.sort" :min="0" />
        </el-form-item>
        <el-form-item label="是否可见" prop="visible">
          <el-switch
            v-model="commonform.visible"
            class="mb-2"
          />
        </el-form-item>
        <el-form-item label="是否外联" prop="isFrame">
          <el-switch
            v-model="commonform.isFrame"
            class="mb-2"
          />
        </el-form-item>
        <el-form-item label="是否缓存" prop="keepAlive">
          <el-switch
            v-model="commonform.keepAlive"
            class="mb-2"
          />
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

<script lang="ts">
export default {
  name: 'menu',
}
</script>
<script lang="ts" setup>
import type { FormInstance} from 'element-plus'
import useMenuStore from '@/store/modules/menu'
const menuStore = useMenuStore()

//添加表单打开的状态
const addfromOpenStatus = ref(false)
//表单Dom
const searchFormRef = ref<FormInstance>()
//表格展开状态
const expandStatus = ref(false)
const isShow = ref(true)
//搜索表单填写的内容
const searchform = reactive({
  name: '',
  status: '',
})

//新增表单填写的内容
const commonform = reactive({
  parentId: '',
  name: '',
  type: '',
  icon: '',
  status: '',
  path: '',
  sort:'',
  visible:'',
  isFrame:'',
  keepAlive:'',
})
//表格数据
let dataList = ref([])

//根据搜索条件进行搜索
const searchList = (searchData: any) => {
  expandStatus.value = true
  menuStore
    .menuList(searchData)
    .then((resp:any) => {
      dataList.value=resp
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
  console.log(commonform)
}

//获取表格状态转意的字符串和颜色方法
const getColorByType=(type:any)=> {
    switch (type) {
      case 0:
        return '#836FFF';
      case 1:
        return '#FF6A6A';
      case 2:
        return '#43CD80'; // 假设第三种状态的颜色，可根据实际需求修改
      default:
        return '#999';
    }
}
const getStatusByType=(type:any)=> {
    switch (type) {
      case 0:
        return '父菜单';
      case 1:
        return '子菜单';
      case 2:
        return '按钮'; // 根据实际情况填写第三种状态的描述
      default:
        return '未知状态';
    }
}

//重置搜索表单
const resetSearchForm = (ruleFormRef: any) => {
  if (!ruleFormRef) return
  ruleFormRef.resetFields()
}

//扩展&折叠树形数据表格
const expandHandle = async() =>{
  isShow.value = false
  expandStatus.value=!expandStatus.value;
  await nextTick()
  isShow.value = true
}

//选择图标子组件调用的方法
const selected = (val:any) => {commonform.icon = val}
//上级菜单的树形列表
const data = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]
</script>

<style scoped>
*{
  font-weight: 900;
}
</style>
