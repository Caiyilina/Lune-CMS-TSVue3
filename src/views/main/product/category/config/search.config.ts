import { IForm } from "@/base-ui/form";

export const searchFormConfig: IForm = {
  labelWidth: "110px",
  formItems: [
    {
      label: "分类名称",
      type: "input",
      field: "name",
      placeholder: "请输入分类名称"
    }
  ],
  itemStyle: { padding: "0.4vw,0.9vw" }
};
