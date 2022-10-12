<template>
  <div class="user">
    <!-- <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="HandleResetClick"
      @queryBtnClick="HandleQueryClick"
    /> -->

    <page-content
      pageName="goods"
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
    >
      <template #image="scope">
        <el-image
          style="width: 60px; height: auto"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
        >
        </el-image>
      </template>
      <template #status="scope">
        <el-tag size="small" :type="scope.row.status ? 'success' : 'danger'">
          {{ scope.row.status ? "  启用" : "禁用" }}
        </el-tag>
      </template>
      <template #oldPrice="scope">
        <span class="oldP">{{ "￥" + scope.row.oldPrice }}</span>
      </template>
      <template #newPrice="scope">
        <span class="newP">{{ "￥" + scope.row.newPrice }}</span>
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
  name: "goods",
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

<style scoped>
.oldP {
  color: darkgrey;
}
.newP {
  color: crimson;
  font-weight: 700;
}
</style>
