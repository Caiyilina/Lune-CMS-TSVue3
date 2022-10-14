<template>
  <div class="page-content">
    <yl-table
      :listData="dataList"
      :dataCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1、header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" v-if="isCreate" @click="handleAddClick"
          >新建{{ contentTableConfig.title }}</el-button
        >
      </template>
      <!-- 2、表格列中的插槽 -->

      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>

      <template #handler="scope">
        <div class="handle-btn">
          <el-button
            icon="edit"
            size="small"
            type="primary"
            link
            v-if="isUpdate"
            @click="handleUpdateClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            icon="delete"
            size="small"
            type="danger"
            link
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 3、剩余的动态插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"> </slot>
        </template>
      </template>
    </yl-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import YlTable from "@/base-ui/table";
import { useStore } from "@/store";
import { usePermission } from "@/hooks/usePermission";
export default defineComponent({
  name: "page-content",
  props: {
    contentTableConfig: { type: Object, required: true },
    pageName: {
      type: String,
      required: true
    }
  },
  components: { YlTable },
  emits: ["addBtnClick", "updateBtnClick"],
  setup(props, { emit }) {
    const store = useStore();

    // 0、获取操作的权限
    const isCreate = usePermission(props.pageName, "create");
    const isUpdate = usePermission(props.pageName, "update");
    const isDelete = usePermission(props.pageName, "delete");
    const isQuery = usePermission(props.pageName, "query");

    // 1、双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });
    watch(pageInfo, () => getPageData());

    //2、 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      console.log("发送getPageData请求");
      // 检查是否有查询权限
      if (!isQuery) return false;
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      });
    };
    getPageData();

    //3、 从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    );
    const dataCount = computed(() =>
      store.getters[`system/pageCountData`](props.pageName)
    );

    // 4、获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === "createAt") return false;
        if (item.slotName === "updateAt") return false;
        if (item.slotName === "handler") return false;
        return true;
      }
    );

    // 5、新建、编辑、删除按钮
    const handleAddClick = (item: any) => {
      console.log("新建：", item);
      emit("addBtnClick");
    };
    const handleUpdateClick = (item: any) => {
      console.log("编辑：", item);
      emit("updateBtnClick", item);
    };
    const handleDeleteClick = (item: any) => {
      console.log("删除：", item);

      ElMessageBox.confirm("确定删除该数据", "删除提醒", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 调用store中的请求
          store.dispatch("system/deletePageDataAction", {
            pageName: props.pageName,
            id: item.id
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除"
          });
        });
    };

    return {
      dataList,
      dataCount,
      pageInfo,
      otherPropSlots,
      getPageData,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      handleAddClick,
      handleUpdateClick,
      handleDeleteClick
    };
  }
});
</script>
<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
