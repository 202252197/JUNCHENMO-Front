/**
 * 服务器名称
 * SYSTEM: 系统相关接口
 */
enum SERVER_NAME {
  /**
   * 认证相关接口
   */
  AUTH = '/auth',
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
   * 系统用户相关接口
   */
  SYSTEM_USER = '/system/user',
  /**
   * 系统角色相关接口
   */
  SYSTEM_ROLE = '/system/role',
  /**
   * 系统菜单相关接口
   */
  SYSTEM_MENU = '/system/menu',
}

export default {
  SERVER_NAME,
  SERVER_MODE_NAME,
}
