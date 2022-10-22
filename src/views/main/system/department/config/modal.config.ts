import { IForm } from "@/base-ui/form";

export const modalConfig: IForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "部门名称：",
      rules: [],
      placeholder: "请输入部门名称"
    },
    {
      field: "leader",
      type: "input",
      label: "部门领导：",
      placeholder: "请输入部门领导"
    },
    {
      field: "parentId",
      type: "select",
      options: [],
      label: "上级部门：",
      placeholder: "请选择上级部门"
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
};
