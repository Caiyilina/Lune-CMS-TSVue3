export const contentTableConfig = {
  title: "商品",
  showIndexColumn: true, //是否展示表格序号
  showSelectColumn: true, //是否展示多选框};
  propList: [
    { prop: "name", label: "商品名称", minWidth: "200" },
    { prop: "oldPrice", label: "原价", minWidth: "80", slotName: "oldPrice" },
    { prop: "newPrice", label: "现价", minWidth: "80", slotName: "newPrice" },

    { prop: "desc", label: "商品描述", minWidth: "120" },
    { prop: "status", label: "状态", minWidth: "80", slotName: "status" },
    {
      prop: "imgUrl",
      label: "商品图片",
      minWidth: "200",
      slotName: "image"
    },
    {
      prop: "saleCount",
      label: "销量",
      minWidth: "70"
    },
    {
      prop: "favorCount",
      label: "收藏数",
      minWidth: "80"
    },
    {
      prop: "address",
      label: "发货地",
      minWidth: "80"
    },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "180",
      slotName: "createAt"
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "180",
      slotName: "updateAt"
    },
    {
      label: "操作",
      minWidth: "150",
      slotName: "handler"
    }
  ]
};
