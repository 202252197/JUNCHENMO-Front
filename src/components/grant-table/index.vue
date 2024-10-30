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
import { da } from 'element-plus/es/locales.mjs';
const menuStore = useMenuStore()
//选中的值数组
const checkedKeys = ref<Array<number>>([]);
//菜单数据
const menuData = ref([] as any)
const menu={
            name: '',
            status: '',
        }

  // 初始化
  const init = () => {
    menuStore
    .menuList(menu)
    .then((resp: any) => {
        menuData.value = resp
        console.log(menuData.value)
    })
    .catch((error) => {
        ElMessage.error({ message: error })
    })
  };
  init()

  // 获取值
  const getValue = () => {
    return checkedKeys.value;
  };

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
    console.log("测试数据")
    console.log(menuId+"==="+check)
    // 获取所在子节点id
    const childrenId: number[] = getChildMenuIds(menuId, menuData.value);
    console.log(childrenId)
    if(check){
        //选中
        checkedKeys.value = [...new Set([...checkedKeys.value, ...childrenId])];
    }else{
        // 取消选择
        checkedKeys.value = checkedKeys.value.filter(s => !childrenId.includes(s));
    }
    // // 查询当前节点
    // const node = findNode(id, menuData.value, 'id');
    // if (!node) {
    //   return;
    // }
    // const childrenId: number[] = [];
    // // 获取所在子节点id
    // flatNodeKeys(node.children, childrenId, 'id');
    // if (check) {
    //   // 选中
    //   checkedKeys.value = [...new Set([...checkedKeys.value, ...childrenId])];
    // } else {
    //   // 取消选择
    //   checkedKeys.value = checkedKeys.value.filter(s => !childrenId.includes(s));
    // }
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
// // 获取所有节点
// const flatNodes = (nodes:any, result:any) => {
//   if (!nodes || !nodes.length) {
//     return;
//   }
//   nodes.forEach(s => {
//     result.push(s);
//     flatNodes(s.children, result);
//   });
// };

// // 寻找当前节点
// const findNode = (key: any,nodes:any, keyName = 'key')  => {
//   if (!nodes || !nodes.length) {
//     return undefined as unknown;
//   }
//   for (let node of nodes) {
//     if (node[keyName] === key) {
//       return node;
//     }
//   }
//   // 寻找子级
//   for (let node of nodes) {
//     if (node.children?.length) {
//       const childrenNode = findNode(key, node.children, keyName);
//       if (childrenNode) {
//         return childrenNode;
//       }
//     }
//   }
//   return undefined as unknown;
// };

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