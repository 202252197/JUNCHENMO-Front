<template>
  <el-row style="background-color: black">
    <el-col :span="8" :xs="0" style="position: relative">
      <!--logo位置-->
      <div class="logo-div-jcm selector-disabled">
        <div>
          <img src="@/assets/logo.png" width="30px" draggable="false" />
        </div>
        <div>JUN CHEN MO</div>
      </div>
      <!--轮播图-->
      <el-carousel
        :interval="3000"
        motion-blur="true"
        height="100vh"
        arrow="never"
        pause-on-hover="true"
      >
        <el-carousel-item v-for="item in carouselArr" :key="item">
          <div id="juzhong">
            <el-row style="margin-bottom: 10px">
              <el-col :span="24" style="text-align: center">
                <h1 style="color: aliceblue">{{ item.title }}</h1>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 50px">
              <el-col :span="24" style="text-align: center">
                <p style="color: #676767">{{ item.describe }}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="text-align: center">
                <svg-icon
                  :name="item.imgPath"
                  width="260px"
                  height="260px"
                ></svg-icon>
              </el-col>
            </el-row>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-col>
    <el-col :span="14" :xs="24">
      <iframe
        src="https://my.spline.design/robotfollowcursorforlandingpage-cf6f84125c4731c4d75add91835fd9cc/"
        frameborder="0"
        width="100%"
        height="100%"
        style="position: fixed; z-index: 1"
      ></iframe>
      <el-row id="from">
        <el-col :span="8" :xs="20" style="z-index: 2">
          <div style="display: flex; flex-direction: column">
            <div
              style="
                font-size: 20px;
                font-weight: 500;
                margin-bottom: 20px;
                color: aliceblue;
              "
            >
              登录 WMS管理系统
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
import type { loginFormData } from '@/api/user/type'
import type { FormInstance, FormRules } from 'element-plus'
import { User, Lock, Eleme } from '@element-plus/icons-vue'
import UserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
const $router = useRouter()
// 实例化容器
const useUserStore = UserStore()
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
let carouselArr = reactive([
  {
    title: '内置权限角色管理',
    describe: '让每次一操作都安全可控可追溯',
    imgPath: 'banner1',
  },
  {
    title: '内置系统监控',
    describe: '让系统更加稳定',
    imgPath: 'banner2',
  },
  {
    title: '内置日志管理',
    describe: '快速定位Bug位置',
    imgPath: 'banner3',
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
        $router.push('/')
        // //弹出登录成功提示
        ElMessage.success({ message: '登陆成功' })
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
.logo-div-jcm {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 10px;
  color: aliceblue;
  font-size: 18px;
}

.el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
