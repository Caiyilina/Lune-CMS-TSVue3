<template>
  <div class="yl-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}列表</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>

    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="70"
      ></el-table-column>
      <template v-for="(propItem, index) in propList" :key="index">
        <el-table-column align="center" v-bind="propItem" show-overflow-tooltip>
          <template #default="scope">
            <!-- 模板中放插槽，插槽有默认元素，动态给插槽名字，父组件可以通过具名插槽来修改默认元素 -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "yl-table",
  props: {
    title: { type: String, default: "" },
    // 表格属性
    propList: {
      type: Object
      // required: true
    },
    // 表格数据
    listData: {
      type: Array,
      required: true
    },
    // 分页数据
    dataCount: { type: Number, default: 0 },
    // 是否展示索引
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    // 是否展示多选框
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    // 双向绑定page
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    // 树形数据配置
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    // 是否展示footer
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ["selectionChange", "update:page"],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      console.log("表格选中的数据：", value);
      emit("selectionChange", value); //发送事件
    };
    const handleSizeChange = (pageSize: number) => {
      console.log("当前pageSize改变：", pageSize);
      emit("update:page", { ...props.page, pageSize });
    };
    const handleCurrentChange = (currentPage: number) => {
      console.log("当前页改变：", currentPage);

      emit("update:page", { ...props.page, currentPage });
    };
    return { handleSelectionChange, handleSizeChange, handleCurrentChange };
  }
});
</script>
<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
