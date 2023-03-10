import { IForm } from "@/base-ui/form";

export const searchFormConfig: IForm = {
  labelWidth: "110px",
  formItems: [
    {
      id: 1,
      field: "name",
      type: "input",
      label: "角色名称",
      rules: [],
      placeholder: "请输入角色名称"
    },
    {
      id: 2,
      field: "intro",
      type: "input",
      label: "权限介绍",
      placeholder: "请输入权限介绍"
    },

    {
      id: 4,
      field: "createTime",
      type: "datepicker",
      label: "创建时间",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange"
      }
    }
  ],
  itemStyle: { padding: "0.4vw,0.9vw" }
};
