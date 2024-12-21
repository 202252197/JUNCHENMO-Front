<template>
  <el-row class="row-tabs" :class="{
      moon: !LayoutSettingStore.theme,
      sunny: LayoutSettingStore.theme,
    }">
    <el-col :span="23" >
      <el-scrollbar ref="scrollbarRef"   @wheel.prevent="handleScroll" >
        <!-- 面包屑动态的展示路由名字与标题 -->
        <div class="tabs-jcm">
          <transition-group name="tab">
            <div
              class="scrollbar-demo-item"
              v-for="tag in TabsStore.tabs"
              :key="tag"
            >
              <template v-if="tag.closable === true">
                  <el-check-tag
                    :closable="tag.closable"
                    :disable-transitions="false"
                    :checked="tag.checked"
                    class="el-check-tag-jcm"
                    @click="TabsStore.routerTab(tag, $router)"
                  >
                    <div style="display: flex; align-items: center">
                      <!--隐藏图标-->
                      <!-- <div>
                        <svg-icon :name="tag.icon" :color="iconColor"/>
                      </div> -->
                      <div  class="jcm-tabs-titleWithIcon">
                        <!-- 新增的分隔符 -->
                        <span >{{ tag.title }}</span>
                        <svg-icon  class="jcm-tabs-icon" name="叉" :width="12" :height="12"  @click="TabsStore.removeTab(tag, $router)"/>
                      </div>
                    </div>
                  </el-check-tag>
              
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
                    <!--隐藏图标-->
                    <!-- <div>
                      <svg-icon :name="tag.icon" :color="iconColor"/>
                    </div> -->
                    <div class="jcm-tabs-titleWithIcon">
                      <!-- 新增的分隔符 -->
                      <span >{{ tag.title }}</span>
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
         <svg-icon class="tabs-dropdown-icon-jcm" name="下选"  width="20px" height="20px" :color="LayoutSettingStore.getThemeInvert"/>
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
import { ElScrollbar } from 'element-plus'
//获取设置相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
//创建Tabs相关的小仓库
import useTabsStore from '@/store/modules/layout/tabs'
const LayoutSettingStore = useLayoutSettingStore()
const TabsStore = useTabsStore()

const $router = useRouter()
const route = useRoute()

TabsStore.initTabs($router,route)
//每次滚动左右移动10px
const scrollbarRef = ref()
  
let currentPosition = 0

const handleScroll = (e: WheelEvent) => {
  const delta = Math.sign(e.deltaY) // get the direction of the scroll (1 for down, -1 for up)
  const newPosition = currentPosition + 15 * delta // calculate the new position based on the direction and step size
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

<style scoped lang="scss">
.row-tabs{
  margin-left: 7px;
}
.jcm-tabs-titleWithIcon{
  margin-left: 3px;
  display: flex;
  align-items: center;
  .jcm-tabs-icon{
    border-radius: 50%;
    margin-left: 3px;
    padding: 1px;
  }
  .jcm-tabs-icon:hover{
   background-color: #e7e7f5;
  }
}
.tabs-jcm {
  -ms-overflow-style: none; /* 隐藏 IE 和 Edge 的滚动条 */
  scrollbar-width: none; /* 隐藏 Firefox 的滚动条 */
  height: 100%;
  padding: 5px;
  align-items: center;
  display: flex;
}

.el-dropdown-jcm {
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.el-check-tag-jcm {
  margin-right: 10px;
  display: flex;
  align-items: center;
}
.tabs-dropdown-icon-jcm {
  cursor: pointer;
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
