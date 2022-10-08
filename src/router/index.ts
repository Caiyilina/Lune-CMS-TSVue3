import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router"; // type：声明导入的是type类型
import localCache from "@/utils/cache";

import { firstMenu } from "@/utils/map-menus";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: () => import("@/views/login/login.vue"),
    name: "login"
  },
  {
    path: "/main",
    component: () => import("@/views/main/main.vue"),
    name: "main"
    // children: [] ,根据userMenus来决定的
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/not-found/not-found.vue"),
    name: "not-found"
  }
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
});

// 导航守卫
router.beforeEach((to) => {
  if (to.path !== "/login") {
    // 只有不是登录页，判断有没有token
    const token = localCache.getCache("token");
    if (!token) {
      return "/login";
    }

    console.log("666：", router.getRoutes());

    console.log("即将要跳转的：", to);
    if (to.path === "/main") {
      // 默认跳转到一个菜单的路由
      return firstMenu.url;
    }
  }
});

export default router;
