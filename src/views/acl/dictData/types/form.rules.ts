import { FormRules } from 'element-plus'

// 定义表单验证规则对象
export const formRules: FormRules = {
    name: [
    {
        required: true,
        message: '配置项不能为空',
        trigger: 'blur',
    },
    ],
    type: [
    {
        required: true,
        message: '配置值类型不能为空',
        trigger: 'blur',
    },
    ],
    description: [
    {
        required: true,
        message: '配置描述不能为空',
        trigger: 'blur',
    },
    ],
}
