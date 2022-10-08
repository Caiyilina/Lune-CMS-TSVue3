<template>
  <div class="user">
    <div class="search">
      <page-search :searchFormConfig="searchFormConfig" />
    </div>
    <div class="content">
      <yl-table :listData="userList" :propList="propList">
        <template #status="scope">
          <el-tag> {{ scope.row.enable ? "  启用" : "禁用" }} </el-tag>
        </template>
        <template #createAt="scope">
          <strong>{{ scope.row.createAt }}</strong>
        </template>
      </yl-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

import PageSearch from "@/components/page-search";

import { searchFormConfig } from "./config/search.config";
import { useStore } from "@/store";
import YlTable from "@/base-ui/table";

export default defineComponent({
  name: "user",
  components: { PageSearch, YlTable },
  setup() {
    const store = useStore();

    store.dispatch("system/getPageListAction", {
      pageUrl: "/users/list",
      queryInfo: {
        offset: 0,
        size: 10
      }
    });

    const userList = computed(() => store.state.system.userList);
    const userCount = computed(() => store.state.system.userCount);

    const propList = [
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
      }
    ];

    return { searchFormConfig, userList, userCount, propList };
  }
});
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
