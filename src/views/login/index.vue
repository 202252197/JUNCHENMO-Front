<template>
  <iframe
    src="https://my.spline.design/3dtextbluecopy-fc5e4a8ea28d8ba3fc3b96ebdb1a5283/"
    frameborder="0"
    width="100%"
    height="100%"
    Scrolling="no"
    style="position: fixed; z-index: 1"
  ></iframe>
  <!--logo位置-->
  <div class="logo-div-jcm selector-disabled">
    <div>
      <img src="@/assets/logo.png" width="30px" draggable="false" />
    </div>
    <div>JUN CHEN MO</div>
  </div>
  <el-row>
    <el-col :span="8" :xs="24" :offset="8">
      <el-row id="from">
        <div class="form-card" style="z-index: 2">
          <div
            style="
              font-size: 20px;
              font-weight: 500;
              margin-bottom: 20px;
              color: black;
            "
          >
            登录RBAC管理系统
          </div>
          <el-form
            ref="ruleLoginRef"
            style="align-items: center"
            :model="from"
            :rules="rules"
            label-width="auto"
            status-icon
          >
            <el-form-item prop="username" class="form-item">
              <el-input
                v-model="from.username"
                type="text"
                placeholder="用户名"
                :prefix-icon="User"
                autofocus
              />
            </el-form-item>
            <el-form-item prop="password" class="form-item">
              <el-input
                v-model="from.password"
                placeholder="密码"
                type="password"
                :prefix-icon="Lock"
                show-password
              />
            </el-form-item>
            <el-row>
              <el-col :span="15">
                <el-form-item prop="code" class="form-item">
                  <el-input
                    v-model="from.code"
                    type="text"
                    placeholder="验证码"
                    autofocus
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="1">
                <img :src="codeImg" alt="验证码" @click="getCode" />
              </el-col>
            </el-row>
            <el-button
              color="#626aef"
              @click="submitForm(ruleLoginRef)"
              :loading-icon="Eleme"
              :loading="loadingBtn"
              style="width: 100%"
            >
              登录
            </el-button>
          </el-form>
        </div>
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
//验证码图片
const codeImg = ref('')
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
  code: [
    {
      required: true,
      message: '验证码不能为空',
      trigger: 'blur',
    },
  ],
})
//表单数据
let from = reactive<loginFormData>({
  username: '',
  password: '',
  code: '',
  uuid: '',
})

const getCode = async () => {
  const codeResult = await useUserStore.code()
  codeImg.value = 'data:image/jpeg;base64,' + codeResult.img
  from.uuid = codeResult.uuid
}

const init = async () => {
  try {
    await getCode()
  } catch (error) {
    //弹出登录失败的message
    ElMessage.error({ message: '验证码获取失败' })
  }
}

init()
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
        from.code = ''
        getCode()
        ElMessage.error({ message: error })
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
</script>

<style scoped lang="scss">
/* 将样式统一设置在一个类中 */
.form-item {
  margin-bottom: 20px;
}
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

.form-card {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: auto;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  filter: opacity(90%);
}
</style>
