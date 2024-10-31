<template>
  <el-row>
    <el-col :span="23">
      <el-scrollbar ref="scrollbarRef" @wheel.prevent="handleScroll">
        <!-- 面包屑动态的展示路由名字与标题 -->
        <div class="tabs-jcm">
          <transition-group name="tab">
            <div
              class="scrollbar-demo-item"
              v-for="tag in TabsStore.tabs"
              :key="tag"
            >
              <template v-if="tag.closable === true">
                <el-dropdown>
                  <el-check-tag
                    :closable="tag.closable"
                    :disable-transitions="false"
                    :checked="tag.checked"
                    class="el-check-tag-jcm"
                    @click="TabsStore.routerTab(tag, $router)"
                  >
                    <div style="display: flex; align-items: center">
                      <div>
                        <svg-icon :name="tag.icon" :color="iconColor"/>
                      </div>
                      <div style="margin-left: 3px">
                        <!-- 新增的分隔符 -->
                        <span :style="{color:iconColor}">{{ tag.title }}</span>
                      </div>
                    </div>
                  </el-check-tag>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item
                        @click="TabsStore.removeTab(tag, $router)"
                      >
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
                  <div style="display: flex; align-items: center">
                    <div>
                      <!-- <el-icon>
                           <component :is="tag.icon"></component>
                        </el-icon> -->
                        <svg-icon :name="tag.icon" :color="iconColor"/>
                    </div>
                    <div style="margin-left: 3px">
                      <!-- 新增的分隔符 -->
                      <span :style="{color:iconColor}">{{ tag.title }}</span>
                    </div>
                  </div>
                </el-check-tag>
              </template>
            </div>
          </transition-group>
        </div>
      </el-scrollbar>
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
              @click="TabsStore.removeOutherTab(route.path)"
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
//图标根据主题模式动态切换颜色
const iconColor = computed(() => LayoutSettingStore.theme? 'black' : 'white');
const $router = useRouter()
const route = useRoute()
let TabsStore = useTabsStore()

const defalutTag: any = ref([
  {
    title: '首页',
    closable: false,
    path: '/home',
    checked: true,
    icon: 'home',
  },
])
//**遍历添加默认的首页Tab */
defalutTag.value.forEach((element: any) => {
  TabsStore.addTab(element, $router)
})

//每次滚动左右移动10px
const scrollbarRef = ref<any>()
let currentPosition = 0

const handleScroll = (e: WheelEvent) => {
  const delta = Math.sign(e.deltaY) // get the direction of the scroll (1 for down, -1 for up)
  const newPosition = currentPosition + 10 * delta // calculate the new position based on the direction and step size
  if (
    newPosition >= 0 &&
    newPosition <=
      scrollbarRef.value.wrapRef.scrollWidth -
        scrollbarRef.value.wrapRef.clientWidth
  ) {
    // only update the scroll position if it's within bounds
    currentPosition = newPosition
    scrollbarRef.value.setScrollLeft(currentPosition)
  }
}
</script>

<style scoped>
.tabs-jcm {
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

.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  text-align: center;
}

/** 隐藏横向滚动条 */
.el-scrollbar__bar .is-horizontal {
  bottom: 0px;
}
</style>
