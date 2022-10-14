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
      @addBtnClick="handleAddData"
      @updateBtnClick="handleUpdateData"
    >
      <template #status="scope">
        <el-tag size="small" :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? "  启用" : "禁用" }}
        </el-tag>
      </template>
    </page-content>

    <!-- 弹出框 -->
    <page-modal
      ref="pageModalRef"
      :dialogTitle="dialogTitle"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import { searchFormConfig } from "./config/search.config";

import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";

import { usePageSearch } from "@/hooks/userPageSearch";
import { usePageModal } from "@/hooks/usePageModal";

export default defineComponent({
  name: "user",
  components: { PageSearch, PageContent, PageModal },
  setup() {
    // 1、pageSearch相关的hook逻辑
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
    };

    const pageModalRef = ref<InstanceType<typeof PageModal>>();
    const defaultInfo = ref({});
    const handleAddData = () => {
      if (pageModalRef.value) {
        pageModalRef.value.dialogVisible = true;
      }
    };
    const handleUpdateData = (item: any) => {
      console.log(item);
      defaultInfo.value = { ...item };
      if (pageModalRef.value) {
        pageModalRef.value.dialogVisible = true;
      }
    };*/

    // 1、pageMdal相关的hook逻辑
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      );
      passwordItem!.isHidden = false;
    };
    const oldCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      );
      passwordItem!.isHidden = true;
    };

    const [
      handleAddData,
      handleUpdateData,
      pageModalRef,
      defaultInfo,
      dialogTitle
    ] = usePageModal(newCallback, oldCallback);
    return {
      pageContentRef,
      searchFormConfig,
      contentTableConfig,
      modalConfig,

      HandleResetClick,
      HandleQueryClick,

      handleAddData,
      handleUpdateData,
      pageModalRef,
      defaultInfo,
      dialogTitle
    };
  }
});
</script>

<style scoped></style>
