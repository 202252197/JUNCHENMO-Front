<template>
    <el-popover
        placement="top"
        width="350px"
        v-model:visible="showPopover"
        trigger="click">
        <template #reference>
            <div class="iconItem">
                <el-form-item label="菜单图标" prop="code">
                    <div v-if="icon" class="icon-container" > 
                        <SvgIcon :name="icon" />
                        <span class="colors">{{icon}}</span>
                    </div>   
                    <div v-else>
                        <span>请选择图标</span>
                    </div> 
                </el-form-item>
            </div>
        </template>
        <div class="search"> 
            <div class="search_input">
                <el-input 
                     placeholder="请输入图标名称" 
                    v-model="keyword" 
                    @input="searchKw"
                    @blur="searchKw"
                    @clear="clearIconPpopver"
                    clearable >
                </el-input>
            </div>       
            <div class="search_view">
                <el-scrollbar height="400px">
                    <el-row :gutter="10" style="padding-top: 10px;">
                        <el-col v-for="(item, index) in menuIcons" :key="index" :span="24/3">
                            <div @click="changeIcons(item)"  class="icon-container icon-select-transition" >
                                <SvgIcon :name="item" width="13px" height="13px"/>
                                <span>{{item}}</span>
                            </div>
                        </el-col>
                    </el-row>
                </el-scrollbar>
            </div>
        </div>
    </el-popover>
</template>
 
 
<script setup lang="ts">
import { ElPopover } from 'element-plus'
import { watch, ref, onMounted } from 'vue'
import { menuIcon } from '@/utils/menuIcons'  
 
const props = defineProps({
    icon:{
        type:String,
        default:''
    }
})
const menuIcons = ref([])
const icon = ref<string>()
const showPopover = ref<boolean>(false)
const keyword = ref<string>('')
// 搜索图标
const searchKw = () => {
    if(!menuIcons.value) return
    let list = menuIcons.value.filter(item => {
        return item.indexOf(keyword.value) >= 0
    })
    menuIcons.value = list
}
onMounted(() => {menuIcons.value = menuIcon})
const emit = defineEmits(['selected'])
 
// 选择图标
const changeIcons = ( item: string ) => {
    icon.value = item
    keyword.value = ''
    showPopover.value = false
    emit('selected',icon.value)
}
 
// 关闭
const clearIconPpopver = () => {
    keyword.value = ''
    menuIcons.value = []
}
watch([ keyword, ()=>props.icon],( newVal, oldVal ) => {
    icon.value = newVal[1]
    if(!keyword.value) menuIcons.value = menuIcon
    let list = menuIcons.value.filter(item => {
        return item.indexOf(keyword.value) >= 0
    })
    menuIcons.value = list
},{immediate:true})
</script>
<style scoped>


.icon-container {
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer; /* 设置鼠标指针为手型 */

}
.icon-select-transition{
   transition: all 0.3s ease;
}

.icon-select-transition:hover {
  border-radius: 5%;
  animation: touchAnimation 0.3s ease;
  background: linear-gradient(to bottom right, #4CAF50, #81C784);
}

@keyframes touchAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>