<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="HandleResetClick"
      @queryBtnClick="HandleQueryClick"
    />

    <page-content
      pageName="users"
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
    >
      <template #status="scope">
        <el-tag size="small" :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? "  启用" : "禁用" }}
        </el-tag>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";

import { searchFormConfig } from "./config/search.config";

import { contentTableConfig } from "./config/content.config";
import { usePageSearch } from "@/hooks/userPageSearch";

export default defineComponent({
  name: "user",
  components: { PageSearch, PageContent },
  setup() {
    const [pageContentRef, HandleResetClick, HandleQueryClick] =
      usePageSearch();
    /*  const pageContentRef = ref<InstanceType<typeof PageContent>>();

    const HandleResetClick = () => {
      console.log("reset");
      pageContentRef.value?.getPageData();
    };
    const HandleQueryClick = (queryInfo: any) => {
      console.log("query：", queryInfo);
      pageContentRef.value?.getPageData(queryInfo);
    }; */

    return {
      pageContentRef,
      searchFormConfig,
      contentTableConfig,
      HandleResetClick,
      HandleQueryClick
    };
  }
});
</script>

<style scoped></style>
