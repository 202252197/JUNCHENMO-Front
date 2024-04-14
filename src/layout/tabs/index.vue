<template>
  <el-row>
    <el-col :span="23">
      <div class="tabs-jcm">
        <div class="tag-wrapper" v-for="tag in TabsStore.tabs" :key="tag">
          <template v-if="tag.closable === true">
            <el-dropdown>
              <el-check-tag
                :closable="tag.closable"
                :disable-transitions="false"
                :checked="tag.checked"
                class="el-check-tag-jcm"
                @click="TabsStore.routerTab(tag, $router)"
              >
                <el-icon>
                  <component :is="tag.icon"></component>
                </el-icon>
                {{ tag.title }}
              </el-check-tag>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="TabsStore.removeTab(tag, $router)">
                    <el-icon>
                      <CircleCloseFilled />
                    </el-icon>
                    关闭标签
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <el-check-tag
              :closable="tag.closable"
              :disable-transitions="false"
              :checked="tag.checked"
              class="el-check-tag-jcm"
              @click="TabsStore.routerTab(tag, $router)"
            >
              <el-icon>
                <component :is="tag.icon"></component>
              </el-icon>
              {{ tag.title }}
            </el-check-tag>
          </template>
        </div>
      </div>
    </el-col>
    <el-col :span="1">
      <el-dropdown class="el-dropdown-jcm">
        <el-button
          class="tabs-dropdown-button-jcm"
          icon="MoreFilled"
        ></el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              icon="CircleCloseFilled"
              @click="TabsStore.removeOutherTab(router.path)"
            >
              关闭其他标签
            </el-dropdown-item>
            <el-dropdown-item
              icon="CircleCloseFilled"
              @click="TabsStore.removeAllTab($router)"
            >
              关闭所有标签
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
//导入Router
import { useRouter, useRoute } from 'vue-router'
//获取设置相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
//创建Tabs相关的小仓库
import useTabsStore from '@/store/modules/layout/tabs'
let LayoutSettingStore = useLayoutSettingStore()
const $router = useRouter()
const router = useRoute()
let TabsStore = useTabsStore()

const defalutTag: any = ref([
  {
    title: '首页',
    closable: false,
    path: '/',
    checked: true,
    icon: 'HomeFilled',
  },
])
defalutTag.value.forEach((element: any) => {
  TabsStore.addTab(element, $router)
})
</script>

<style scoped>
.tabs-jcm {
  overflow: hidden; /* 隐藏默认的滚动条 */
  -ms-overflow-style: none; /* 隐藏 IE 和 Edge 的滚动条 */
  scrollbar-width: none; /* 隐藏 Firefox 的滚动条 */
  height: 100%;
  align-items: center;
  display: flex;
}
.el-dropdown-jcm {
  height: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.el-check-tag-jcm {
  margin-left: 10px;
  display: flex;
  align-items: center;
}
.tabs-dropdown-button-jcm {
  background-color: v-bind(
    'LayoutSettingStore.theme ? "$base-tabbar-sunny-tabs-background" : "$base-tabbar-moon-tabs-background"'
  );
  border: 0px;
}
</style>
