import { Module } from "vuex";
import localCache from "@/utils/cache";
import { mapMenusToRoutes } from "@/utils/map-menus";
import type { ILoginState } from "./types";

import type { IRootState } from "../types";
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from "@/service/login/login";
import router from "@/router";
import type { IAccount } from "@/service/login/type";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: []
    };
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;
      // 将userMenus映射到routes
      const routes = mapMenusToRoutes(userMenus);
      console.log("菜单映射的routes:", routes);

      // 将routes 添加到 router.main.children
      routes.forEach((route) => {
        router.addRoute("main", route);
      });
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      console.log("执行账号登录action", payload);
      // 1、实现登录逻辑
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      commit("changeToken", token);
      localCache.setCache("token", token);

      // 2、请求用户信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;

      commit("changeUserInfo", userInfo);
      localCache.setCache("userInfo", userInfo);

      // 3、请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit("changeUserMenus", userMenus);
      localCache.setCache("userMenus", userMenus);

      // 4、跳转到首页
      router.push("/main");
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log("执行手机号登录action", payload);
    },

    // 加载登录的相关信息
    loadLocalLogin({ commit }) {
      const token = localCache.getCache("token");
      if (token) {
        commit("changeToken", token);
      }
      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
      const userMenus = localCache.getCache("userMenus");
      if (userMenus) {
        commit("changeUserMenus", userMenus);
      }
    }
  }
};

export default loginModule;
