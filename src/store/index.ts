import { createStore, Store, useStore as useVuexStore } from "vuex";
import type { IRootState, IStoreType } from "./types";

import login from "./login/login";
import system from "./main/system/system";

const store = createStore<IRootState>({
  state: () => {
    return {
      name: "Lune",
      age: 15,
      height: 199
    };
  },
  mutations: {
    changeName(state) {
      console.log(state);
    }
  },
  actions: {},
  modules: { login, system }
});

export function setupStore() {
  //  对store进行初始化
  store.dispatch("login/loadLocalLogin"); //加载登录相关的信息，这样网页刷新后，vuex中存储的登录信息可以重新加载
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
