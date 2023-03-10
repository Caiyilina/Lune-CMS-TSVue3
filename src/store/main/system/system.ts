import { IRootState } from "@/store/types";
import { Module } from "vuex";
import { ISystemState } from "./types";
import {
  createPageData,
  deletePageData,
  editPageData,
  getPageListData
} from "@/service/main/system/system";
import { ElMessage } from "element-plus";
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0,
      categoryList: [],
      categoryCount: 0
    };
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
        // switch (pageName) {
        //   case "users":
        //     return state.usersList;
        //   case "role":
        //     return state.roleList;
        // }
      };
    },
    pageCountData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    }
  },
  mutations: {
    changeUsersList(state, list: any[]) {
      state.usersList = list;
    },
    changeUsersCount(state, count: number) {
      state.usersCount = count;
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list;
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count;
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list;
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count;
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list;
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count;
    },
    changeDepartmentList(state, list: any[]) {
      state.departmentList = list;
    },
    changeDepartmentCount(state, count: number) {
      state.departmentCount = count;
    },
    changeCategoryList(state, list: any[]) {
      state.categoryList = list;
    },
    changeCategoryCount(state, count: number) {
      state.categoryCount = count;
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      console.log(payload);

      // 1?????????pageUrl
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;

      // 1????????????????????????
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);

      console.log("?????????????????????", pageResult);

      const { list, totalCount } = pageResult.data;
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1); //?????????????????????

      commit(`change${changePageName}List`, list);
      commit(`change${changePageName}Count`, totalCount);
    },

    // ????????????
    async deletePageDataAction({ dispatch }, payload: any) {
      // 1?????????pageName???id
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;

      // 2???????????????????????????
      await deletePageData(pageUrl).then((res) => {
        if (res.code === 0) {
          ElMessage({
            type: "success",
            message: "????????????"
          });
        }
      });
      // 3???????????????????????????
      dispatch("getPageListAction", {
        pageName,
        queryInfo: { offset: 0, size: 10 }
      });
    },

    // ????????????
    async createPageDataAction({ dispatch }, payload: any) {
      // 1?????????pageName???newData
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;

      // 2???????????????????????????
      await createPageData(pageUrl, newData)
        .then((res) => {
          if (res.code === 0) {
            ElMessage({
              type: "success",
              message: "????????????"
            });
          }
        })
        .catch((err) => {
          ElMessage({
            type: "error",
            message: err
          });
        });
      // 3???????????????????????????
      dispatch("getPageListAction", {
        pageName,
        queryInfo: { offset: 0, size: 10 }
      });
    },
    // ????????????
    async editPageDataAction({ dispatch }, payload: any) {
      // 1?????????pageName???editData
      const { pageName, editData, id } = payload;
      const pageUrl = `/${pageName}/${id}`;

      // 2???????????????????????????
      await editPageData(pageUrl, editData)
        .then((res) => {
          if (res.code === 0) {
            ElMessage({
              type: "success",
              message: "????????????"
            });
          }
        })
        .catch((err) => {
          ElMessage({
            type: "error",
            message: err
          });
        });
      // 3???????????????????????????
      dispatch("getPageListAction", {
        pageName,
        queryInfo: { offset: 0, size: 10 }
      });
    }
  }
};

export default systemModule;
