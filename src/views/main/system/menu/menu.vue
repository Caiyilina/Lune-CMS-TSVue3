<template>
  <div class="user">
    <!-- <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="HandleResetClick"
      @queryBtnClick="HandleQueryClick"
    /> -->

    <page-content
      pageName="menu"
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
    >
      <template #icon="scope">
        <el-icon>
          <component :is="scope.row.icon?.substring(8)"></component>
        </el-icon>
      </template>
      <template #menuType="scope">
        <span v-if="scope.row.type == '1' || scope.row.type == '2'">
          菜单
        </span>
        <el-button v-else-if="scope.row.type == '3'" size="small" plain
          >按钮</el-button
        >
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";

import { searchFormConfig } from "./config/search.config";

import { contentTableConfig } from "./config/content.config";
import { usePageSearch } from "@/hooks/userPageSearch";

export default defineComponent({
  name: "user",
  components: { PageContent },
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
