<template>
  <div class="user">
    <div class="search">
      <yl-form v-bind="searchFormConfig" />
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import YlForm from "@/base-ui/form";

import { searchFormConfig } from "./config/search.config";

export default defineComponent({
  name: "user",
  components: { YlForm },
  setup() {
    return { searchFormConfig };
  }
});
</script>

<style scoped></style>
