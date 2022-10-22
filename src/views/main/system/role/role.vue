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
      @addBtnClick="handleAddData"
      @updateBtnClick="handleUpdateData"
    ></page-content>

    <!-- 弹出框 -->
    <page-modal
      ref="pageModalRef"
      pageName="role"
      :dialogTitle="dialogTitle"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      :modalConfig="modalConfigRef"
    >
      <div class="menu-tree">
        <el-tree
          ref="treeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{
            children: 'children',
            label: 'name'
          }"
          highlight-current
          @check="handleCheckChange"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from "vue";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import { searchFormConfig } from "./config/search.config";

import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";

import { usePageSearch } from "@/hooks/userPageSearch";
import { usePageModal } from "@/hooks/usePageModal";
import { useStore } from "@/store";
import { menuMapLeafKeys } from "@/utils/map-menus";
import { ElTree } from "element-plus";

export default defineComponent({
  name: "role",
  components: { PageContent, PageSearch, PageModal },
  setup() {
    const store = useStore();

    const [pageContentRef, HandleResetClick, HandleQueryClick] =
      usePageSearch();

    const treeRef = ref<InstanceType<typeof ElTree>>();

    // 1、处理pageModal的callback
    const editCbFn = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList); //树的叶子节点

      console.log("editCbFn：", leafKeys);
      nextTick(() => {
        console.log("tree组件的ref：", treeRef.value);
        // 编辑中同步树组件的选中
        treeRef.value?.setCheckedKeys(leafKeys, false);
      });
    };

    const [
      handleAddData,
      handleUpdateData,
      pageModalRef,
      defaultInfo,
      dialogTitle
    ] = usePageModal(undefined, editCbFn);

    // 将modalConfig配置转成响应式的
    const modalConfigRef = computed(() => {
      return modalConfig;
    });

    // 菜单数据
    const menus = computed(() => store.state.entireMenu);

    const otherInfo = ref({});

    // 树点击
    const handleCheckChange = (check: any, item: any) => {
      console.log("当前点击的:", check);
      console.log("选中的:", item);
      const checkedKeys = item.checkedKeys;
      const halfCheckedKeys = item.halfCheckedKeys;
      const menuList = [...checkedKeys, ...halfCheckedKeys];
      otherInfo.value = { menuList };
    };

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
      menus,
      otherInfo,
      handleCheckChange,
      treeRef
    };
  }
});
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 40px;
}
</style>
