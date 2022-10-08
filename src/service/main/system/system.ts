import ylRequest from "../../index";
import type { IDataType } from "@/service/type";

export function getPageListData(url: string, queryInfo: any) {
  return ylRequest.post<IDataType>({
    url: url,
    data: queryInfo
  });
}
