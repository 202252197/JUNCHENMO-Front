/**
 * 服务器名称
 * SYSTEM: 系统相关接口
 */
enum SERVER_NAME {
  /**
   * 系统相关接口
   */
  SYSTEM = '/system',
}

/**
 * 服务器模块名称
 * SYSTEM: 系统角色相关接口
 */
enum SERVER_MODE_NAME {
  /**
   * 系统角色相关接口
   */
  SYSTEM_ROLE = '/system/role',
}

export default {
  SERVER_NAME,
  SERVER_MODE_NAME,
}
