export const contentTableConfig = {
  title: "用户",
  showIndexColumn: true, //是否展示表格序号
  showSelectColumn: true, //是否展示多选框};
  propList: [
    { prop: "name", label: "用户名", minWidth: "100" },
    { prop: "realname", label: "真实姓名", minWidth: "100" },
    { prop: "cellphone", label: "手机号码", minWidth: "120" },
    { prop: "enable", label: "状态", minWidth: "80", slotName: "status" },
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
