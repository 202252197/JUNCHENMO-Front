import { FormRules } from 'element-plus'

// 定义表单验证规则对象
export const formRules: FormRules = {
    name: [
        {
            required: true,
            message: '菜单名称不能为空',
            trigger: 'blur',
        },
    ],
}
