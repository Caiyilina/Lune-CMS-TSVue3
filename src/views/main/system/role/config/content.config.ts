export const contentTableConfig = {
  title: "角色",
  showIndexColumn: true, //是否展示表格序号
  showSelectColumn: true, //是否展示多选框};
  propList: [
    { prop: "name", label: "角色名", minWidth: "100" },
    { prop: "intro", label: "权限介绍", minWidth: "100" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "200",
      slotName: "createAt"
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "200",
      slotName: "updateAt"
    },
    {
      label: "操作",
      minWidth: "150",
      slotName: "handler"
    }
  ]
};
