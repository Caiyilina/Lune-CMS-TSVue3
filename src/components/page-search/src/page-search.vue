<template>
  <div class="page-search">
    <yl-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2 class="header">高级检索</h2>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button type="info" icon="Refresh">重置</el-button>
          <el-button type="primary" icon="Search">搜索</el-button>
        </div>
      </template>
    </yl-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import YlForm from "@/base-ui/form";

export default defineComponent({
  name: "page-search",
  components: { YlForm },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  setup() {
    const formData = ref({
      id: "",
      name: "",
      password: "",
      sport: "",
      createTime: ""
    });
    return { formData };
  }
});
</script>
<style scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
