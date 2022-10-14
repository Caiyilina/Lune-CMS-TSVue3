import ylRequest from "../../index";
import type { IDataType } from "@/service/type";

// 获取页面数据
export function getPageListData(url: string, queryInfo: any) {
  return ylRequest.post<IDataType>({
    url: url,
    data: queryInfo
  });
}
// 删除  /users/id
export function deletePageData(url: string) {
  return ylRequest.delete<IDataType>({
    url: url
  });
}
// 新建
export function createPageData(url: string, newData: any) {
  return ylRequest.post<IDataType>({
    url: url,
    data: newData
  });
}
// 新建
export function editPageData(url: string, newData: any) {
  return ylRequest.patch<IDataType>({
    url: url,
    data: newData
  });
}
