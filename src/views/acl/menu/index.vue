<template>
  <div>
    <!--权限列表条件卡片-->
    <el-card>
      <el-form :inline="true" :model="menuStore.searchform" class="searchForm" label-position="right" label-width="auto"
        ref="searchFormRef">
        <el-row>
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="menuStore.searchform.name" />
          </el-form-item>
          <el-form-item label="菜单状态" prop="status">
            <el-select v-model="menuStore.searchform.status">
              <el-option label="启用" value="0" />
              <el-option label="禁用" value="1" />
            </el-select>
          </el-form-item>

          <div style="margin-left: auto">
            <el-button :color="LayoutSettingStore.theme ? '#5072e6' : 'red'"
              @click="menuAddFromModal?.open(undefined)">新增</el-button>
            <el-button :color="LayoutSettingStore.theme ? '#5072e6' : 'red'" @click="searchList(menuStore.searchform)">
              搜索
            </el-button>
            <el-button type="info" @click="resetSearchForm(searchFormRef)">
              重置
            </el-button>
            <el-button type="info" @click="expandHandle()">
              <template v-if="menuStore.expandStatus">收起</template>
              <template v-else>展开</template>
            </el-button>
            <el-button @click="refreshCacheMenu()" :color="LayoutSettingStore.theme ? '#1e56a0' : '#f73859'">
              刷新缓存
            </el-button>
          </div>
        </el-row>
      </el-form>
    </el-card>

    <!-- 权限列表卡片 -->
    <el-card class="card-table-style">
      <el-table :data="menuStore.dataList" table-layout="auto" row-key="menuId"
        :default-expand-all="menuStore.expandStatus" :default-sort="{ prop: 'sort', order: 'ascending' }"
        v-if="menuStore.refreshTable">
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="icon" label="图标" align="center">
          <template #default="scope">
            <svg-icon :name="scope.row.icon" :color="iconColor" />
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center">
          <template #default="scope">
            <el-tag size="small" :color="LayoutSettingStore.theme ? '#5072e6' : 'red'">
              {{ getStatusByType(scope.row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" />
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <!--状态-->
            <el-popconfirm width="200" icon-color="#626AEF"
              :title="scope.row.status === 0 ? '确定要将当前节点以及所有子节点改为禁用状态?' : '确定要将当前节点以及所有子节点改为正常状态?'"
              @confirm="tagUpdateStatusButtonClick(scope.row)">
              <template #reference>
                <template v-if="scope.row.status === 0">
                  <el-tag checked size="small" :color="LayoutSettingStore.theme ? '#5072e6' : 'red'"
                    class="menu-status-tag">
                    <el-tooltip class="box-item" effect="dark" content="点击切换状态" placement="top">
                      启用
                    </el-tooltip>
                  </el-tag>
                </template>
                <template v-if="scope.row.status === 1">
                  <el-tag checked size="small" color="#393e46" class="menu-status-tag">
                    <el-tooltip class="box-item" effect="dark" content="点击切换状态" placement="top">
                      停用
                    </el-tooltip>
                  </el-tag>
                </template>
              </template>
              <template #actions>
                <el-button size="small">取消</el-button>
                <el-button type="danger" size="small">
                  确定
                </el-button>
              </template>
            </el-popconfirm>
            <!--显示隐藏-->
            <el-popconfirm width="200" icon-color="#626AEF"
              :title="scope.row.visible === 0 ? '确定要将当前节点以及所有子节点改为隐藏?' : '确定要将当前节点以及所有子节点改为显示?'"
              @confirm="tagUpdateVisibleButtonClick(scope.row)">
              <template #reference>
                <template v-if="scope.row.visible">
                  <el-tag checked size="small" :color="LayoutSettingStore.theme ? '#5072e6' : 'red'"
                    class="menu-status-tag menu-status-tag-margin">
                    <el-tooltip class="box-item" effect="dark" content="点击切换状态" placement="top">
                      显示
                    </el-tooltip>
                  </el-tag>
                </template>
                <template v-if="!scope.row.visible">
                  <el-tag checked size="small" color="#393e46" class="menu-status-tag menu-status-tag-margin">
                    <el-tooltip class="box-item" effect="dark" content="点击切换状态" placement="top">
                      隐藏
                    </el-tooltip>
                  </el-tag>
                </template>
              </template>
              <template #actions>
                <el-button size="small">取消</el-button>
                <el-button type="danger" size="small">
                  确定
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
        <el-table-column prop="permission" label="权限标识" align="center" >
          <template #default="scope">
            <span @click="instance?.proxy?.$copyText(scope.row.permission)" class="copy-span">{{ scope.row.permission}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="component" label="组件名称" align="center" >
          <template #default="scope">
            <span @click="instance?.proxy?.$copyText(scope.row.component)" class="copy-span">{{ scope.row.component}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="link" label="链接路径" align="center" />
        <el-table-column prop="remark" label="操作" align="center">
          <template #default="scope">
            <el-button size="small" type="primary" @click="menuAddFromModal?.open(scope.row)" text
              v-show="scope.row.type != 2">
              新增
            </el-button>
            <el-button size="small" type="primary" @click="menuUpdateFromModal?.open(scope.row)" text>
              修改
            </el-button>
            <el-button size="small" type="danger" @click="deleteItemClick(scope.row)" text>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


    <!--弹出框组件列表-->
    <MenuAddFromModal ref="menuAddFromModal" @refreshData="refreshData"></MenuAddFromModal>
    <MenuUpdateFromModal ref="menuUpdateFromModal" @refreshData="refreshData"></MenuUpdateFromModal>
  </div>
</template>

<script lang="ts">
export default {
  name: 'menu',
}
</script>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import type { FromModal } from '@/utils/commonType'
import type { ComponentInternalInstance } from 'vue'
//弹出窗
import MenuAddFromModal from './components/menu-add-from-modal.vue'
import MenuUpdateFromModal from './components/menu-update-from-modal.vue'
//仓库
import useMenuStore from '@/store/modules/menu'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

//获取当前组件实例
const instance: ComponentInternalInstance | null = getCurrentInstance();
const menuStore = useMenuStore()
const LayoutSettingStore = useLayoutSettingStore()

onMounted(() => {
  //进入页面初始化的数据
  searchList(menuStore.searchform)
})

//表单对象
const searchFormRef = ref<FormInstance>()
//user弹出窗对象
const menuAddFromModal = ref<FromModal>()
const menuUpdateFromModal = ref<FromModal>()


//根据搜索条件进行搜索
const searchList = (searchData: any) => {
  menuStore.expandStatus = true
  menuStore
    .menuList(searchData)
    .then((resp: any) => {
      menuStore.dataList = resp
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

//删除菜单触发的事件
const deleteItemClick = (item: any) => {
  menuStore
    .delMenu(item.menuId)
    .then(() => {
      searchList(menuStore.searchform)
      ElMessage.success({ message: '删除成功' })
    })
    .catch((error: any) => {
      ElMessage.error({ message: error })
    })
}

//图标根据主题模式动态切换颜色
const iconColor = computed(() => LayoutSettingStore.theme ? 'black' : 'white');

//点击标签更改状态中的启用/禁用
const tagUpdateStatusButtonClick = (item: any) => {
  item.status = item.status == 0 ? 1 : 0
  menuStore
    .upStatusMenu(item)
    .then(() => {
      searchList(menuStore.searchform)
      ElMessage.success({ message: '状态更新成功' })
    })
    .catch((error: any) => {
      ElMessage.error({ message: error })
    })
}

//点击标签更改状态中的显示/隐藏
const tagUpdateVisibleButtonClick = (item: any) => {
  item.visible = item.visible == 0 ? 1 : 0
  menuStore
    .upStatusMenu(item)
    .then(() => {
      searchList(menuStore.searchform)
      ElMessage.success({ message: '状态更新成功' })
    })
    .catch((error: any) => {
      ElMessage.error({ message: error })
    })
}

const getStatusByType = (type: any) => {
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

//提供给子组件刷新数据的方法
const refreshData = () => {
  searchList(menuStore.searchform)
}

//重置搜索表单
const resetSearchForm = async (ruleFormRef: any) => {
  if (!ruleFormRef) return
  ruleFormRef.resetFields()
}


//扩展&折叠树形数据表格
const expandHandle = async () => {
  menuStore.refreshTable = false
  menuStore.expandStatus = !menuStore.expandStatus;
  await nextTick()
  menuStore.refreshTable = true
}

//刷新缓存
const refreshCacheMenu = () => {
  menuStore.generateRoutes();
  ElMessage.success({ message: '缓存刷新完成' })
}


</script>

<style scoped>
.menu-status-tag {
  cursor: pointer;
}

.menu-status-tag-margin {
  margin-left: 5px;
}

* {
  font-weight: 900;
}
</style>
