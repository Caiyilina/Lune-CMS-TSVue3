type IFormType = "input" | "password" | "select" | "datepicker";
export interface IFormItem {
  id: number;
  field: string;
  type: IFormType;
  label: string;
  rules?: any[];
  placeholder?: string;
  options?: any[]; //针对select
  otherOptions?: any; //针对其他属性
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any;
  itemLayout?: any;
}
