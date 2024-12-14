// 定义 UserFromModal 组件的接口类型，包含 open 方法的定义
export type FromModal = {
  open: (param?: any) => void; // 这里的 param 是可选的，根据实际传入 open 方法的参数类型修改，此处假设为 any 类型
}