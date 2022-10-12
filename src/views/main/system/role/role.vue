<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="HandleResetClick"
      @queryBtnClick="HandleQueryClick"
    />
    <page-content
      pageName="role"
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";

import { searchFormConfig } from "./config/search.config";

import { contentTableConfig } from "./config/content.config";

import { usePageSearch } from "@/hooks/userPageSearch";

export default defineComponent({
  name: "role",
  components: { PageContent, PageSearch },
  setup() {
    const [pageContentRef, HandleResetClick, HandleQueryClick] =
      usePageSearch();

    return {
      contentTableConfig,
      searchFormConfig,
      pageContentRef,
      HandleResetClick,
      HandleQueryClick
    };
  }
});
</script>

<style scoped></style>
