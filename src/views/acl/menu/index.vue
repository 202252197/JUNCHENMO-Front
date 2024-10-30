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
            <el-button type="primary" @click="addButtenClick()">新增</el-button>
            <el-button type="primary" @click="searchList(searchform)">
              搜索
            </el-button>
            <el-button type="info" @click="resetSearchForm(searchFormRef)">
              重置
            </el-button>
            <el-button type="info" @click="expandHandle()">
              <template v-if="expandStatus">收起</template> 
              <template v-else>展开</template>
            </el-button>
            <el-button type="warning" @click="refreshCacheMenu()">
              刷新缓存
            </el-button>
          </div>
        </el-row>
      </el-form>
    </el-card>

    <!-- 权限列表卡片 -->
    <el-card style="margin-top: 20px">
 

      <el-table
        :data="dataList"
        table-layout="auto"
        row-key="menuId"
        :default-expand-all="expandStatus"
        :default-sort="{ prop: 'sort', order: 'ascending' }"
        v-if="isShow" 
        >
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="icon" label="图标"  align="center">
          <template #default="scope">
            <SvgIcon :name="scope.row.icon" :color="iconColor"/>
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
        <el-table-column prop="component" label="组件名称"  align="center"/>
        <el-table-column prop="link" label="链接路径"  align="center"/>
       
        <el-table-column prop="remark" label="操作"  align="center">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="addMenuItemClick(scope.row)"
              text
              v-show="scope.row.type!=2"
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
              @click="deleteItemClick(scope.row)"
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
        :rules="rules"
        ref="addFormRef"
      >
      <el-form-item v-show="!catalogueStatus" label="上级菜单" prop="parentId" required>
          <el-tree-select
            check-strictly
            v-model="commonform.parentId"
            :data="treeData"
            :render-after-expand="false"
          />
      </el-form-item>
        <el-form-item label="菜单名称" prop="name" required>
          <el-input v-model="commonform.name" autocomplete="off" placeholder="请输入菜单名称"/>
        </el-form-item>
        <el-form-item label="菜单类型" prop="type" required>
          <el-radio-group v-model="commonform.type" size="small">
            <el-radio-button label="目录" value="0" />
            <el-radio-button label="菜单" value="1" />
            <el-radio-button label="按钮" value="2" />
          </el-radio-group>
        </el-form-item>
        <el-form-item  v-show="!featureStatus" label="菜单图标" prop="icon">
          <IconSelect :icon="commonform.icon" style="width: 100%" ref="iconSelectRef" @selected="selected"/>
        </el-form-item>
        <el-form-item  v-show="!featureStatus" label="组件" prop="component">
          <el-input v-model="commonform.component" autocomplete="off" placeholder="路由组件名称"/>
        </el-form-item>
        <el-form-item v-show="!featureStatus" label="外联地址" prop="link">
          <el-input v-model="commonform.link" autocomplete="off" placeholder="组件名称与外联地址二选一"/>
        </el-form-item>
        <el-form-item v-show="featureStatus" label="菜单权限" prop="permission">
          <el-input v-model="commonform.permission" autocomplete="off" placeholder="菜单权限 system:user:list"/>
        </el-form-item>
        <el-form-item label="菜单顺序" prop="sort" required>
          <el-input-number v-model="commonform.sort" :min="0" />
        </el-form-item>
        <el-form-item  v-show="!featureStatus" label="是否可见" prop="visible" required>
          <el-switch
            v-model="commonform.visible"
            class="mb-2"
          />
        </el-form-item>
        <el-form-item v-show="!featureStatus" label="是否缓存" prop="keepAlive" required>
          <el-switch
            v-model="commonform.keepAlive"
            class="mb-2"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-divider border-style="double" />
        <div style="display: flex; justify-content: center">
          <el-button @click="addfromOpenStatus = false">取消</el-button>
          <el-button type="primary" @click="addItem(addFormRef)">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!--修改菜单弹出框-->
    <el-dialog v-model="updateInfofromOpenStatus" width="500" :show-close="false">
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">修改菜单</h4>
        </div>
      </template>
      <el-form
        :model="commonform"
        label-width="80"
        :rules="rules"
        ref="addFormRef"
      >
      <el-form-item v-show="!catalogueStatus" label="上级菜单" prop="parentId" required>
          <el-tree-select
            check-strictly
            v-model="commonform.parentId"
            :data="treeData"
            :render-after-expand="false"
          />
      </el-form-item>
        <el-form-item label="菜单名称" prop="name" required>
          <el-input v-model="commonform.name" autocomplete="off" placeholder="请输入菜单名称"/>
        </el-form-item>
        <el-form-item label="菜单类型" prop="type" required>
          <el-radio-group v-model="commonform.type" size="small">
            <el-radio-button label="目录" value="0" />
            <el-radio-button label="菜单" value="1" />
            <el-radio-button label="按钮" value="2" />
          </el-radio-group>
        </el-form-item>
        <el-form-item  v-show="!featureStatus" label="菜单图标" prop="icon">
          <IconSelect  :icon="commonform.icon" style="width: 100%"  @selected="selected" />
        </el-form-item>
        <el-form-item  v-show="!featureStatus" label="组件" prop="component">
          <el-input v-model="commonform.component" autocomplete="off" placeholder="路由组件名称"/>
        </el-form-item>
        <el-form-item v-show="!featureStatus" label="外联地址" prop="link">
          <el-input v-model="commonform.link" autocomplete="off" placeholder="组件名称与外联地址二选一"/>
        </el-form-item>
        <el-form-item v-show="featureStatus" label="菜单权限" prop="permission">
          <el-input v-model="commonform.permission" autocomplete="off" placeholder="菜单权限 system:user:list"/>
        </el-form-item>
        <el-form-item label="菜单顺序" prop="sort" required>
          <el-input-number v-model="commonform.sort" :min="0" />
        </el-form-item>
        <el-form-item  v-show="!featureStatus" label="是否可见" prop="visible" required>
          <el-switch
            v-model="commonform.visible"
            class="mb-2"
          />
        </el-form-item>
        <el-form-item v-show="!featureStatus" label="是否缓存" prop="keepAlive" required>
          <el-switch
            v-model="commonform.keepAlive"
            class="mb-2"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-divider border-style="double" />
        <div style="display: flex; justify-content: center">
          <el-button @click="updateInfofromOpenStatus = false">取消</el-button>
          <el-button type="primary" @click="updateInfoItem(addFormRef)">
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
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter, useRoute } from 'vue-router';
import useMenuStore from '@/store/modules/menu'
//获取设置相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
const LayoutSettingStore = useLayoutSettingStore()
const menuStore = useMenuStore()
const router = useRouter();
const route = useRoute();
// 获取子组件的引用
const iconSelectRef = ref();
//添加表单打开的状态
const addfromOpenStatus = ref(false)
//修改表单打开的状态
const updateInfofromOpenStatus = ref(false)
//表单Dom
const searchFormRef = ref<FormInstance>()
const addFormRef = ref<FormInstance>()
//表格展开状态
const expandStatus = ref(false)
//菜单选项显示隐藏状态
const catalogueStatus = ref(false)
const featureStatus = ref(false)
//扩展&折叠树形数据表格状态
const isShow = ref(true)
////上级菜单的树形列表
let treeData = ref([]) as any;
//表单规则
const rules = ref<FormRules>({
  name: [
    {
      required: true,
      message: '菜单名称不能为空',
      trigger: 'blur',
    },
  ],
})
//搜索表单填写的内容
const searchform = reactive({
  name: '',
  status: '',
})

//新增表单填写的内容
const commonform = reactive({
  menuId:'',
  parentId: '0',
  name: '',
  type: 0,
  icon: '',
  component: '',
  link: '',
  sort:'',
  permission:'',
  visible:true,
  keepAlive:false,
}) as any
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

//点击最上层新增按钮触发的事件
const addButtenClick = () => {
  clearCommonFrom()
  getMenuLastSort(0)
  catalogueStatus.value = ( commonform.type == 0)
  treeData = menuStore.getTreeSelectData(dataList.value)
  addfromOpenStatus.value = true
}
//点击数据表格中item新增按钮触发的事件
const addMenuItemClick = (item: any)=>{
  clearCommonFrom()
  getMenuLastSort(item.menuId)
  if (iconSelectRef.value) {
    iconSelectRef.value.clearIconInputValue();
  }
  treeData = menuStore.getTreeSelectData(dataList.value)
  commonform.type = item.type + 1;
  commonform.parentId = `${item.menuId}`
  catalogueStatus.value = ( commonform.type == 0)
  addfromOpenStatus.value = true
}

//获取菜单最后的顺序号+100
const getMenuLastSort=(menuId:any)=>{
  menuStore
  .lastSortMenu(menuId)
  .then((resp:any) => {
    commonform.sort = resp.data
  })
}
const addItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      menuStore
        .addMenu(commonform)
        .then(() => {
          addfromOpenStatus.value = false
          searchList(searchform)
          ElMessage.success({ message: '添加成功' })
        })
        .catch((error:any) => {
          ElMessage.error({ message: error })
        })
    } else {
      //弹出数据校验失败的message
      ElMessage.error({ message: '请将信息填写完整' })
    }
  })
}

//删除菜单触发的事件
const deleteItemClick = (item: any) => {
  menuStore
    .delMenu(item.menuId)
    .then(() => {
      searchList(searchform)
      ElMessage.success({ message: '删除成功' })
    })
    .catch((error:any) => {
      ElMessage.error({ message: error })
    })
}

//修改菜单触发的事件
const updateInfoButtonClick = (item: any) => {
  treeData = menuStore.getTreeSelectData(dataList.value)
  updateInfofromOpenStatus.value = true
  Object.keys(commonform).forEach((key) => {
    if(key=="parentId"){
      commonform.parentId = ""+item[key];
    }else{
      commonform[key] = item[key];
    }
  });
}
/**
 * @description: 提交修改用户信息表单
 * @param {FormInstance | undefined} formEl  FormInstance 对象
 * @return {void}
 */
const updateInfoItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      menuStore
        .upInfoMenu(commonform)
        .then(() => {
          updateInfofromOpenStatus.value = false
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
//图标根据主题模式动态切换颜色
const iconColor = computed(() => LayoutSettingStore.theme? 'black' : 'white');
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
        return '目录';
      case 1:
        return '菜单';
      case 2:
        return '按钮'; // 根据实际情况填写第三种状态的描述
      default:
        return '未知状态';
    }
}

//重置搜索表单
const resetSearchForm = async(ruleFormRef: any) => {
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

//刷新缓存
const refreshCacheMenu = () =>{
  menuStore.generateRoutes();
  // 先获取当前路由路径
  const currentPath = route.path;
  // 使用replace方法刷新路由
  router.replace(currentPath).then(() => {
      // 可以在这里添加一些加载动画或者其他逻辑
  });
  ElMessage.success({ message: '缓存刷新完成' })
}

/**
 *  commonform表单重置
 *  将commonform的parentId,type,visible,keepAlive
 *  分别设置为0,0,false,false
 *  除parentId,type,visible,keepAlive外的其他字段
 *  都设置为"",包括name,icon,sort,remark,component,url
 *  @function clearCommonFrom
 *  @return {void}
 */
const clearCommonFrom = ()=>{
  Object.keys(commonform).forEach((key) => {
    if(key=="parentId"){
      commonform.parentId = "0";
    }else if(key=="type"){
      commonform.type = 0;
    }else if(key=="visible"){
      commonform.visible = true;
    }else if(key=="keepAlive"){
      commonform.keepAlive = false;
    }else{
      commonform[key] = '';
    }
  });
}

//监听新增弹窗中，菜单的类型，如果是目录，则不展示父菜单选项，默认父菜单id是0
watch(() => commonform.type, (newVal) => {
    catalogueStatus.value = (newVal== 0)
    featureStatus.value = (newVal== 2)
});

//选择图标子组件调用的方法
const selected = (val:any) => {commonform.icon = val}

</script>

<style scoped>
*{
  font-weight: 900;
}
</style>
