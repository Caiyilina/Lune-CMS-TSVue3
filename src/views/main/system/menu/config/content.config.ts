export const contentTableConfig = {
  title: "菜单",
  showIndexColumn: false, //是否展示表格序号
  showSelectColumn: false, //是否展示多选框};
  propList: [
    { prop: "name", label: "菜单名称", minWidth: "150" },
    { prop: "type", label: "菜单类型", minWidth: "80", slotName: "menuType" },
    { prop: "url", label: "菜单url", minWidth: "200" },
    { prop: "icon", label: "菜单icon", minWidth: "60", slotName: "icon" },
    { prop: "permission", label: "按钮权限", minWidth: "100" },

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
  ],
  childrenProps: {
    rowKey: "id",
    treeProp: {
      children: "children"
    }
  },
  showFooter: false
};
