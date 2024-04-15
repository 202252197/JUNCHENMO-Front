<template>
  <el-row>
    <el-col :span="8" :xs="0" style="position: relative">
      <JCMCarousel
        :carouselArr="carouselArr"
        logoTitle="JUN CHEN MO"
        logoImg="http://101.43.254.243:1081/assets/logo.c75ce90e.svg"
      ></JCMCarousel>
    </el-col>
    <el-col :span="14" :xs="24">
      <el-row id="from">
        <el-col :span="8" :xs="2"></el-col>
        <el-col :span="8" :xs="20">
          <div style="display: flex; flex-direction: column">
            <div style="font-size: 20px; font-weight: 500; margin-bottom: 20px">
              登录 JUN CHEN MO
            </div>
            <el-form
              ref="ruleLoginRef"
              style="align-items: center"
              :model="from"
              :rules="rules"
              label-width="auto"
              status-icon
            >
              <el-form-item prop="username" style="margin-bottom: 20px">
                <el-input
                  v-model="from.username"
                  type="text"
                  placeholder="用户名"
                  :prefix-icon="User"
                  autofocus
                />
              </el-form-item>
              <el-form-item prop="password" style="margin-bottom: 20px">
                <el-input
                  v-model="from.password"
                  placeholder="密码"
                  type="password"
                  :prefix-icon="Lock"
                  show-password
                />
              </el-form-item>
              <v-row>
                <el-button
                  color="#626aef"
                  @click="submitForm(ruleLoginRef)"
                  :loading-icon="Eleme"
                  :loading="loadingBtn"
                  style="width: 100%"
                >
                  登录
                </el-button>
              </v-row>
            </el-form>
          </div>
        </el-col>
        <el-col :span="8" :xs="2"></el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import type { carouselObj } from '@/components/Login/Carousel/type'
import type { loginFormData } from '@/api/user/type'
import type { FormInstance, FormRules } from 'element-plus'
import { User, Lock, Eleme } from '@element-plus/icons-vue'
import { getTime } from '@/utils/time'
import UserStore from '@/store/modules/user'
import MenuStore from '@/store/modules/menu'
import { useRouter } from 'vue-router'
const $router = useRouter()
// 实例化容器
const useUserStore = UserStore()
const userMenuStore = MenuStore()
//登录按钮加载状态
const loadingBtn = ref(false)
//获取表单DOM
const ruleLoginRef = ref<FormInstance>()
//配置表单验证规则
const rules = ref<FormRules<loginFormData>>({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
  ],
})
//表单数据
let from = reactive<loginFormData>({
  username: '',
  password: '',
})

// 轮播图对象
let carouselArr = ref<carouselObj[]>([
  {
    title: '内置权限角色管理1',
    describe: '让每次一操作都安全可控可追溯1',
    imgPath: 'http://101.43.254.243:1081/assets/login-banner.426fb77f.png',
  },
  {
    title: '内置权限角色管理2',
    describe: '让每次一操作都安全可控可追溯2',
    imgPath: 'http://101.43.254.243:1081/assets/login-banner.426fb77f.png',
  },
  {
    title: '内置权限角色管理3',
    describe: '让每次一操作都安全可控可追溯3',
    imgPath: 'http://101.43.254.243:1081/assets/login-banner.426fb77f.png',
  },
])
//登录
const submitForm = async (formEl: FormInstance | undefined) => {
  loadingBtn.value = true
  if (!formEl) return
  //验证数据输入的规则是否正确
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        //请求登录接口
        await useUserStore.userLogin(from)
        //请求用户信息接口
        await useUserStore.userInfo()
        //请求路由信息接口
        await userMenuStore.generateRoutes()
        //跳转到主页
        $router.push('/')
        //弹出登录成功提示
        ElNotification.success({
          title: (getTime() + '好！' + useUserStore.user.username) as string,
          message: '登录成功',
          offset: 100,
        })
      } catch (error) {
        //弹出登录失败的message
        ElMessage.error({ message: '用户名或密码错误' })
      } finally {
        loadingBtn.value = false
      }
    } else {
      //弹出数据校验失败的message
      ElMessage.error({ message: '请将信息填写完整' })
      loadingBtn.value = false
    }
  })
}

//
</script>

<style scoped lang="scss">
#from {
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
