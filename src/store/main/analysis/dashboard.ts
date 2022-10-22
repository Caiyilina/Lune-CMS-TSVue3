import { Module } from "vuex";

import type { IDashboardState } from "./types";
import type { IRootState } from "@/store/types";
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from "@/service/main/analysis/dashboard";

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    };
  },
  mutations: {
    setCategoryGoodsCount(state, result) {
      state.categoryGoodsCount = result;
    },
    setCategoryGoodsSale(state, result) {
      state.categoryGoodsSale = result;
    },
    setCategoryGoodsFavor(state, result) {
      state.categoryGoodsFavor = result;
    },
    setAddressGoodsSale(state, result) {
      state.addressGoodsSale = result;
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount();
      commit("setCategoryGoodsCount", categoryCountResult.data);

      const categorySaleResult = await getCategoryGoodsSale();
      commit("setCategoryGoodsSale", categorySaleResult.data);

      const categoryFavorResult = await getCategoryGoodsFavor();
      commit("setCategoryGoodsFavor", categoryFavorResult.data);

      const addressSaleResult = await getAddressGoodsSale();
      commit("setAddressGoodsSale", addressSaleResult.data);
    }
  }
};

export default dashboardModule;
