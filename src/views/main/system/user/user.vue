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
      pageName="users"
      :dialogTitle="dialogTitle"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfigRef"
    ></page-modal>
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

    // 1、pageModal相关的hook逻辑
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

    // 2、动态添加部门和角色列表，动态数据需要刷新的可以使用computed实现可响应
    const store = useStore();
    // 将modalConfig配置转成响应式的
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === "departmentId"
      );

      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { label: item.name, value: item.id };
      });

      const roleItem = modalConfig.formItems.find(
        (item) => item.field === "roleId"
      );
      roleItem!.options = store.state.entireRole.map((item) => {
        return { label: item.name, value: item.id };
      });
      console.log("部门：", departmentItem, "角色:", roleItem);

      return modalConfig;
    });

    //3、调用hook获取公共变量和函数
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
      modalConfigRef,

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
