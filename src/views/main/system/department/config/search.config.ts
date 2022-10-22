import { IForm } from "@/base-ui/form";

export const searchFormConfig: IForm = {
  labelWidth: "110px",
  formItems: [
    {
      label: "部门名称",
      type: "input",
      field: "name",
      placeholder: "请输入部门名称"
    },
    {
      label: "部门领导",
      type: "input",
      field: "leader",
      placeholder: "请输入领导名称"
    }
  ],
  itemStyle: { padding: "0.4vw,0.9vw" }
};
