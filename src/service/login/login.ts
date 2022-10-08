import ylRequest from "../index";

import type { IAccount, ILoginResult, IUserInfo } from "./type";

import type { IDataType } from "../type";

enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "/users/",
  UserMenus = "/role/" ///role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return ylRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  });
}

export function requestUserInfoById(id: number) {
  return ylRequest.get<IUserInfo>({
    url: LoginAPI.LoginUserInfo + id
  });
}

export function requestUserMenusByRoleId(id: number) {
  return ylRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + "/menu"
  });
}
