export const contentTableConfig = {
  title: "部门",
  showIndexColumn: false, //是否展示表格序号
  showSelectColumn: true, //是否展示多选框};
  propList: [
    {
      prop: "id",
      label: "部门id",
      minWidth: "60"
    },
    {
      prop: "name",
      label: "部门名称",
      minWidth: "100"
    },
    {
      prop: "leader",
      label: "部门领导",
      minWidth: "120"
    },
    {
      prop: "parentId",
      label: "上级部门",
      minWidth: "120"
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
