import { IForm } from "@/base-ui/form";

export const searchFormConfig: IForm = {
  labelWidth: "110px",
  formItems: [
    {
      id: 1,
      field: "name",
      type: "input",
      label: "商品名称",
      rules: [],
      placeholder: "请输入商品名称"
    },
    {
      id: 2,
      field: "newPrice",
      type: "input",
      label: "现价",
      placeholder: "请输入现价"
    },
    {
      id: 3,
      field: "desc",
      type: "input",
      label: "商品描述",
      placeholder: "请输入商品描述"
    },
    {
      id: 4,
      field: "status",
      type: "select",
      label: "商品状态",
      placeholder: "请选择商品状态",
      options: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 0 }
      ]
    },
    {
      id: 6,
      field: "address",
      type: "input",
      label: "发货地",
      placeholder: "请输入发货地"
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
