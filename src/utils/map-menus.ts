import { IBreadCrumb } from "@/base-ui/bread-crumb";
import { RouteRecordRaw } from "vue-router";

let firstMenu: any = null; //第一个菜单

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];

  // 1、先加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []; //所有的routes
  const routeFiles = require.context("../router/main", true, /\.ts/); //webpack的工具，帮助加载文件夹，在指定文件夹中递归地查找匹配 .ts结尾的文件
  routeFiles.keys().forEach((key) => {
    const route = require("../router/main" + key.split(".")[1]);
    allRoutes.push(route.default);
  });
  // console.log("所有的routes:", allRoutes);

  // 2、根据菜单获取需要添加的routes
  // 递归函数
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url); //找到所有routes中 路径跟 菜单的url 一样的 路由
        if (route) routes.push(route);
        if (firstMenu === null) {
          firstMenu = menu;
        }
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };

  _recurseGetRoute(userMenus);

  return routes;
}

// 根据路径匹配面包屑
export function pathMapBreadCrumbs(userMenus: any[], currentPath: string): any {
  const breadCrumbs: IBreadCrumb[] = [];
  pathMapToMenu(userMenus, currentPath, breadCrumbs);
  return breadCrumbs;
}

// 路径匹配菜单
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadCrumbs?: IBreadCrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type == 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        breadCrumbs?.push({ name: menu.name });
        breadCrumbs?.push({ name: findMenu.name });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

/*
// 根据路径匹配面包屑
export function pathMapBreadCrumbs(userMenus: any[], currentPath: string): any {
  const breadCrumbs: IBreadCrumb[] = [];
  for (const menu of userMenus) {
    if (menu.type == 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        breadCrumbs.push({ name: menu.name, path: menu.url });
        breadCrumbs.push({ name: findMenu.name, path: findMenu.url });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

// 路径匹配菜单
export function pathMapToMenu(userMenus: any[], currentPath: string): any {
  for (const menu of userMenus) {
    if (menu.type == 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
} */
export { firstMenu };
