<template>
  <div class="department">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="HandleResetClick"
      @queryBtnClick="HandleQueryClick"
    />
    <page-content
      pageName="department"
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      @addBtnClick="handleAddData"
      @updateBtnClick="handleUpdateData"
    ></page-content>

    <!-- 弹出框 -->
    <page-modal
      ref="pageModalRef"
      pageName="department"
      :dialogTitle="dialogTitle"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfigRef"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import { searchFormConfig } from "./config/search.config";

import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";

import { usePageSearch } from "@/hooks/userPageSearch";
import { usePageModal } from "@/hooks/usePageModal";
import { useStore } from "@/store";

export default defineComponent({
  name: "department",
  components: { PageContent, PageSearch, PageModal },
  setup() {
    const store = useStore();

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
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === "parentId"
      );

      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { label: item.name, value: item.id };
      });

      return modalConfig;
    });

    // 菜单数据
    const menus = computed(() => store.state.entireMenu);

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
      modalConfigRef,
      menus
    };
  }
});
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 40px;
}
</style>
