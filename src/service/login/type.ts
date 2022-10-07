export interface IAccount {
  name: string;
  password: string;
}

export interface ILoginResult {
  token: string;
  id: number;
  name: string;
}

export interface IDataType<T = any> {
  code: number;
  data: T;
}

export interface Role {
  id: number;
  name: string;
  intro: string;
  createAt: Date;
  updateAt: Date;
}

export interface Department {
  id: number;
  name: string;
  parentId?: any;
  createAt: Date;
  updateAt: Date;
  leader: string;
}

export interface Data {
  id: number;
  name: string;
  realname: string;
  cellphone: number;
  enable: number;
  createAt: Date;
  updateAt: Date;
  role: Role;
  department: Department;
}

export interface IUserInfo {
  code: number;
  data: Data;
}
