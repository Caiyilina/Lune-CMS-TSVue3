import ylRequest from "../../index";
import type { IDataType } from "@/service/type";

// 获取页面数据
export function getPageListData(url: string, queryInfo: any) {
  return ylRequest.post<IDataType>({
    url: url,
    data: queryInfo
  });
}
// 删除
export function deletePageData(url: string) {
  return ylRequest.delete<IDataType>({
    url: url
  });
}
