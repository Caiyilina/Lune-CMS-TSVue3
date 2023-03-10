import { createStore, Store, useStore as useVuexStore } from "vuex";
import type { IRootState, IStoreType } from "./types";

import login from "./login/login";
import system from "./main/system/system";
import dashboard from "./main/analysis/dashboard";

import { getPageListData } from "@/service/main/system/system";

const store = createStore<IRootState>({
  state: () => {
    return {
      name: "Lune",
      age: 15,
      height: 199,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    };
  },
  mutations: {
    changeName(state) {
      console.log(state);
    },
    changeEntireDepartment(state, list) {
      state.entireDepartment = list;
    },
    changeEntireRole(state, list) {
      state.entireRole = list;
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list;
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1、请求部门、角色数据、菜单数据
      const departmentResult = await getPageListData("/department/list", {
        offset: 0,
        size: 1000
      });
      const { list: departmentList } = departmentResult.data;
      const roleResult = await getPageListData("/role/list", {
        offset: 0,
        size: 1000
      });
      const { list: roleList } = roleResult.data;

      const menuResult = await getPageListData("/menu/list", {});
      const { list: menuList } = menuResult.data;

      // 2、保存数据
      commit("changeEntireDepartment", departmentList);
      commit("changeEntireRole", roleList);
      commit("changeEntireMenu", menuList);
    }
  },
  modules: { login, system, dashboard }
});

export function setupStore() {
  //  对store进行初始化
  store.dispatch("login/loadLocalLogin"); //加载登录相关的信息，这样网页刷新后，vuex中存储的登录信息可以重新加载
  // store.dispatch("getInitialDataAction");
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
