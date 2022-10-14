import { IForm } from "@/base-ui/form";

export const searchFormConfig: IForm = {
  labelWidth: "110px",
  formItems: [
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
      field: "realname",
      type: "input",
      label: "真实姓名",
      placeholder: "请输入真实姓名"
    },
    {
      id: 3,
      field: "cellphone",
      type: "input",
      label: "电话号码",
      placeholder: "请输入电话号码"
    },
    {
      id: 4,
      field: "enable",
      type: "select",
      label: "用户状态",
      placeholder: "请选择用户状态",
      options: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 0 }
      ]
    },
    {
      id: 5,
      field: "createAt",
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
