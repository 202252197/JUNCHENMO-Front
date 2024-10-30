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
              <el-button type="primary" @click="addButtenClick()">新增</el-button>
            </div>
          </div>
        </template>
  
        <el-table :data="dataList.list" table-layout="auto">
          <el-table-column type="index" label="序列" width="70" align="center" />
          <el-table-column prop="name" label="角色名称" align="center" />
          <el-table-column prop="code" label="角色编码" align="center" />
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              <el-tag
                checked
                size="small"
                style="color: aliceblue"
                :color="scope.row.status === 0 ? '#4165D7' : '#D05344'"
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
                @click="updateInfoButtonClick(scope.row)"
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
  
      
      </el-card>

    </div>
  </template>
  
  <script setup lang="ts">
  import type { FormInstance, FormRules } from 'element-plus'
  import { resetobj } from '@/utils/common'
  import { isAdminById } from '@/utils/permission'
  import useRoleStore from '@/store/modules/role'

  </script>
  <script lang="ts">
  export default {
    name: 'operationLog',
  }
  </script>
  <style scoped>
  .searchForm .el-form-item {
    margin-bottom: v-bind(more ? '18px': '0px');
  }
  *{
    font-weight: 900;
  }
  </style>
  