import { FormRules } from 'element-plus'

// 定义表单验证规则对象
export const formRules: FormRules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
  ],
  nickname: [
    {
      required: true,
      message: '昵称不能为空',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        // 密码正则表达式
        const reg = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
        if (!reg.test(value) && value != '') {
          // 抛出异常，验证规则有错
          callback(new Error('密码必须是英文和数字混合且 8 位以上'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],
  mobile: [
    {
      required: true,
      message: '电话号码不能为空',
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        // 手机号正则表达式
        const reg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (!reg.test(value) && value != '') {
          // 抛出异常，验证规则有错
          callback(new Error('请输入正确的电话号码'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],
  email: [
    {
      required: true,
      message: '邮箱不能为空',
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        // 邮箱正则表达式
        const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!reg.test(value) && value != '') {
          // 抛出异常，验证规则有错
          callback(new Error('请输入正确的邮箱格式'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],
}
