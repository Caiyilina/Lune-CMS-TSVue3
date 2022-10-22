<template>
  <div class="category">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="HandleResetClick"
      @queryBtnClick="HandleQueryClick"
    />
    <page-content
      pageName="category"
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      @addBtnClick="handleAddData"
      @updateBtnClick="handleUpdateData"
    ></page-content>

    <!-- 弹出框 -->
    <page-modal
      ref="pageModalRef"
      pageName="category"
      :dialogTitle="dialogTitle"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfigRef"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import { searchFormConfig } from "./config/search.config";

import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";

import { usePageSearch } from "@/hooks/userPageSearch";
import { usePageModal } from "@/hooks/usePageModal";

export default defineComponent({
  name: "category",
  components: { PageContent, PageSearch, PageModal },
  setup() {
    const [pageContentRef, HandleResetClick, HandleQueryClick] =
      usePageSearch();

    const [
      handleAddData,
      handleUpdateData,
      pageModalRef,
      defaultInfo,
      dialogTitle
    ] = usePageModal();

    // 将modalConfig配置转成响应式的
    const modalConfigRef = computed(() => {
      return modalConfig;
    });

    return {
      contentTableConfig,
      searchFormConfig,
      pageContentRef,
      HandleResetClick,
      HandleQueryClick,
      handleAddData,
      handleUpdateData,
      pageModalRef,
      defaultInfo,
      dialogTitle,
      modalConfigRef
    };
  }
});
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 40px;
}
</style>
