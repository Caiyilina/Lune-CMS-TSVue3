<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <component :is="iconName"></component>
    </el-icon>

    <div class="content">
      <yl-bread-crumb :breadCrumbs="breadCrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import UserInfo from "./user-info.vue";

import YlBreadCrumb from "@/base-ui/bread-crumb";
import { useStore } from "@/store";

import { pathMapBreadCrumbs } from "@/utils/map-menus";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { UserInfo, YlBreadCrumb },
  name: "nav-header",
  emits: ["foldChange"],
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const isFold = ref(false);
    const iconName = ref("expand");
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      console.log(isFold.value);
      if (isFold.value) {
        iconName.value = "fold";
      } else {
        iconName.value = "expand";
      }
      emit("foldChange", isFold.value); //发送事件给父组件
    };

    // 面包屑的数据
    const breadCrumbs = computed(() => {
      const userMenus = store.state.login.userMenus;
      const currentPath = route.path;
      return pathMapBreadCrumbs(userMenus, currentPath);
    });

    console.log(breadCrumbs);

    return {
      isFold,
      iconName,
      breadCrumbs,
      handleFoldClick
    };
  }
});
</script>
<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 20px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
