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
        <el-button type="primary" v-if="isCreate"
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

      <template #handler>
        <div class="handle-btn">
          <el-button
            icon="edit"
            size="small"
            type="primary"
            link
            v-if="isUpdate"
            >编辑</el-button
          >
          <el-button
            icon="delete"
            size="small"
            type="danger"
            link
            v-if="isDelete"
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
  setup(props) {
    const store = useStore();

    // 0、获取操作的权限
    const isCreate = usePermission(props.pageName, "create");
    const isUpdate = usePermission(props.pageName, "update");
    const isDelete = usePermission(props.pageName, "delete");
    const isQuery = usePermission(props.pageName, "query");

    // 1、双向绑定pageInfo
    const pageInfo = ref({ currentPage: 0, pageSize: 10 });
    watch(pageInfo, () => getPageData());

    //2、 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      console.log("发送getPageData请求");
      // 检查是否有查询权限
      if (!isQuery) return false;
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
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

    return {
      dataList,
      dataCount,
      pageInfo,
      otherPropSlots,
      getPageData,
      isCreate,
      isUpdate,
      isDelete,
      isQuery
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
