<template>
  <div class="page-content">
    <yl-table :listData="dataList" v-bind="contentTableConfig">
      <!-- 1、header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="medium">新建用户</el-button>
      </template>
      <!-- 2、表格列中的插槽 -->
      <template #status="scope">
        <el-tag size="small" :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? "  启用" : "禁用" }}
        </el-tag>
      </template>
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <template #handler>
        <div class="handle-btn">
          <el-button icon="edit" size="mini" type="text">编辑</el-button>
          <el-button icon="delete" size="mini" type="text">删除</el-button>
        </div>
      </template>
    </yl-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import YlTable from "@/base-ui/table";
import { useStore } from "@/store";
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

    store.dispatch("system/getPageListAction", {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    });

    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    );
    // const usersCount = computed(() => store.state.system.usersCount);
    return { dataList };
  }
});
</script>
<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
