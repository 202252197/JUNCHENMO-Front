<template>
    <table class="grant-table" border="1">
        <thead>
            <tr class="header-row">
                <th class="parent-view-header">父页面</th>
                <th class="child-view-header">子页面</th>
                <th>功能</th>
            </tr>
        </thead>
        <tbody>
            <el-checkbox-group v-model="checkedKeys"  style="display: contents;">
                <template v-for="parentMenu in menuData" :key="parentMenu.menuId">
                    <!-- 有子菜单 -->
                    <template v-if="parentMenu.children?.length">
                        <tr v-for="(childrenMenu, i) in parentMenu.children" :key="childrenMenu.menuId">
                            <!-- 父菜单 -->
                            <td v-if="i === 0" :rowspan="parentMenu.children.length">
                                <el-checkbox :label="parentMenu.menuId">{{ parentMenu.name }}</el-checkbox>
                            </td>
                            <!-- 子菜单 -->
                            <td>
                                <el-checkbox :label="childrenMenu.menuId">{{ childrenMenu.name }}</el-checkbox>
                            </td>
                            <!-- 功能 -->
                            <td>
                                <el-row v-if="childrenMenu.children && childrenMenu.children.length">
                                    <el-col v-for="item in childrenMenu.children" :key="item.menuId" :span="8">
                                        <el-checkbox :label="item.menuId">{{ item.name }}</el-checkbox>
                                    </el-col>
                                </el-row>
                            </td>
                        </tr>
                    </template>
                    <!-- 无子菜单 -->
                    <template v-else>
                        <tr>
                            <!-- 父菜单 -->
                            <td>
                                <el-checkbox :label="parentMenu.menuId">{{ parentMenu.name }}</el-checkbox>
                            </td>
                            <!-- 子菜单 -->
                            <td></td>
                            <!-- 功能 -->
                            <td></td>
                        </tr>
                    </template>
                </template>
            </el-checkbox-group>
        </tbody>
    </table>
</template>


<script lang="ts" setup>
import useMenuStore from '@/store/modules/menu'
const menuStore = useMenuStore()
//选中的值数组
const checkedKeys = ref<Array<number>>([]);
//菜单数据
const menuData = ref([] as any)


// 初始化
const init = () => {
  menuStore
  .menuList({name: '',status: ''})
  .then((resp: any) => {
      menuData.value = resp
      console.log(menuData.value)
  })
  .catch((error) => {
      ElMessage.error({ message: error })
  })
};
init()
const setValue = (keys:number[]) => {
  return  checkedKeys.value = keys;
};
// 获取值
const getValue = () => {
  return checkedKeys.value;
};

defineExpose({ setValue, getValue});

// 监听级联变化
watch(checkedKeys, (after: Array<number>, before: Array<number>) => {
  const afterLength = after.length;
  const beforeLength = before.length;
  if (afterLength > beforeLength) {
    // 选择 一定是最后一个
    checkOrUncheckMenu(after[afterLength - 1], true);
  } else if (afterLength < beforeLength) {
    // 取消
    let uncheckedId = null;
    for (let i = 0; i < afterLength; i++) {
      if (after[i] !== before[i]) {
        uncheckedId = before[i];
        break;
      }
    }
    if (uncheckedId == null) {
      uncheckedId = before[beforeLength - 1];
    }
    checkOrUncheckMenu(uncheckedId, false);
  }
});

// 级联选择/取消选择菜单
const checkOrUncheckMenu = (menuId: number, check: boolean) => {
  // 获取所在子节点id
  const childrenId: number[] = getChildMenuIds(menuId, menuData.value);
  // 获取所在父节点Id
  // const parentId: number[] = getparentMenuIds(menuId, menuData.value);
  if(check){
      //选中
      checkedKeys.value = [...new Set([...checkedKeys.value, ...childrenId])];
  }else{
      // 取消选择
      checkedKeys.value = checkedKeys.value.filter(s => !childrenId.includes(s));
  }

};
  

const getChildMenuIds=(menuId:number, menuData:any)=> {
  let childMenuIds:Array<number> = [];
  const recursiveSearch = (id, data) => {
      for (const menu of data) {
          if (menu.parentId === id) {
              childMenuIds.push(menu.menuId);
              recursiveSearch(menu.menuId, menu.children);
          }else{
              recursiveSearch(id, menu.children);
          }
      }
  };
  recursiveSearch(menuId, menuData);
  return childMenuIds;
}

const getparentMenuIds = (menuId: number, menuData: any) => {
  let parentMenuIds: Array<number> = [];
  const findAncestor = (id: number, data: any) => {
      for (const menu of data) {
          // 找到当前菜单，更新currentMenu并将其menuId加入parentMenuIds
          if (menu.menuId == id) {
              parentMenuIds.push(menu.menuId);
              // 如果父菜单Id不为0，继续向上查找
              if (menu.parentId!= 0) {
                  findAncestor(menu.parentId, menuData);
              }
          } else {
              // 在子菜单中继续查找当前id对应的菜单
              findAncestor(id, menu.children);
          }
      }
  };
  findAncestor(menuId, menuData);
  return parentMenuIds;
}


</script>

<style scoped>
.grant-table {
    width: 100%;
    border: 1px solid black;
    text-indent: initial;
    border-spacing: 2px;
    border-collapse: collapse;
    user-select: none;
    color: white;
    tbody {
      td {
        padding: 6px 16px;
        border: 1px solid black;
      }
    }
  }

  .header-row {

    th {
      font-size: 17px;
      padding: 4px;
      font-weight: 500;
      text-align: center;
      background-color: #2a2a2b;
      color: var(--color-text-2);
    }

    .parent-view-header, .child-view-header {
      width: 200px;
    }
  }
</style>