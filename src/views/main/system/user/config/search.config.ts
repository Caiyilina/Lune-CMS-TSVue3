import { IForm } from "@/base-ui/form";

export const searchFormConfig: IForm = {
  labelWidth: "110px",
  formItems: [
    {
      id: 0,
      field: "id",
      type: "input",
      label: "id",
      rules: [],
      placeholder: "请输入id"
    },
    {
      id: 1,
      field: "name",
      type: "input",
      label: "用户名",
      rules: [],
      placeholder: "请输入用户名"
    },
    {
      id: 2,
      field: "password",
      type: "password",
      label: "密码",
      placeholder: "请输入密码"
    },
    {
      id: 3,
      field: "sport",
      type: "select",
      label: "喜欢的运动",
      placeholder: "请选择喜欢的运动",
      options: [
        { label: "打篮球", value: 1 },
        { label: "羽毛球", value: 2 },
        { label: "八段锦", value: 3 }
      ]
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
  itemLayout: { padding: "0.4vw,0.9vw" }
};
