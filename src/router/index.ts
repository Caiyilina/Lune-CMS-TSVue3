import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router"; // type：声明导入的是type类型

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: () => import("@/views/login/login.vue")
  },
  {
    path: "/main",
    component: () => import("@/views/main/main.vue")
  }
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
});

export default router;
