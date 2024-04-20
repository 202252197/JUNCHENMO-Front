import useUserStore from '@/store/modules/user'

const userStore = useUserStore()

//isAdmin判断是否为管理员账号
export const isAdminByRole = () => {
  return userStore.roles.includes('admin')
}

//isAdmin判断是否为管理员账号
export const isAdminById = (id: any) => {
  return id === 1
}
