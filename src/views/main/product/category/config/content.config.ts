export const contentTableConfig = {
  title: "类别",
  showIndexColumn: true, //是否展示表格序号
  showSelectColumn: true, //是否展示多选框};
  propList: [
    {
      prop: "name",
      label: "类别名称",
      minWidth: "100"
    },

    {
      label: "创建时间",
      minWidth: "280",
      slotName: "createAt"
    },
    {
      label: "更新时间",
      minWidth: "280",
      slotName: "updateAt"
    },
    {
      label: "操作",
      minWidth: "150",
      slotName: "handler"
    }
  ]
};
