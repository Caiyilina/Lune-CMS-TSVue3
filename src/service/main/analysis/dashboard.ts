import ylRequest from "../../index";
import type { IDataType } from "@/service/type";

enum DashBoardAPI {
  categoryGoodsCount = "/goods/category/count",
  categoryGoodsSale = "/goods/category/sale",
  categoryGoodsFavor = "/goods/category/favor",
  addressGoodsSale = "/goods/address/sale"
}

// 获取商品的数量
export function getCategoryGoodsCount() {
  return ylRequest.get({
    url: DashBoardAPI.categoryGoodsCount
  });
}
// 获取商品的销量
export function getCategoryGoodsSale() {
  return ylRequest.get({
    url: DashBoardAPI.categoryGoodsSale
  });
}
// 获取商品的收藏树
export function getCategoryGoodsFavor() {
  return ylRequest.get({
    url: DashBoardAPI.categoryGoodsFavor
  });
}
// 获取不同城市的销售数据
export function getAddressGoodsSale() {
  return ylRequest.get({
    url: DashBoardAPI.addressGoodsSale
  });
}
