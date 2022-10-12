import { useStore } from "@/store";

// 查找页面pageName中是否有handleName的按钮权限
export function usePermission(pageName: string, handleName: string) {
  // 从store中取出权限列表
  const store = useStore();
  const permissions = store.state.login.permissions;

  const verifyPermission = `system:${pageName}:${handleName}`;
  // 检查store中的权限列表是否有handleName

  return permissions.find((item) => item === verifyPermission);
}
