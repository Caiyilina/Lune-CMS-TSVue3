<template>
  <div class="bread-crumb">
    <el-breadcrumb separator="/">
      <template v-for="(item, index) in breadCrumbs" :key="index">
        <el-breadcrumb-item :to="{ path: item.path }">
          {{ item.name }}</el-breadcrumb-item
        >
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IBreadCrumb } from "../types";
export default defineComponent({
  name: "bread-crumb",
  props: {
    breadCrumbs: {
      type: Array as PropType<IBreadCrumb[]>
    }
  },
  setup() {
    return {};
  }
});
</script>
<style scoped>
.bread-crumb {
}
</style>
