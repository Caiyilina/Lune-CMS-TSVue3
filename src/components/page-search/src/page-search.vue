<template>
  <div class="page-search">
    <yl-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2 class="header">高级检索</h2>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button type="info" icon="Refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button type="primary" icon="Search" @click="handleSearch"
            >搜索</el-button
          >
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
  setup(props) {
    // 1、双向绑定过的属性应该是由配置项的field来决定的
    const formItems = props.searchFormConfig?.formItems ?? [];
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }

    const formData = ref(formOriginData);

    // 2、方法
    const handleResetClick = () => {
      // formData.value = formOriginData;  不生效

      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]; //修改属性的值
      }
      console.log("重置", formData.value);
    };
    const handleSearch = () => {
      console.log();
    };
    return { formData, handleResetClick, handleSearch };
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
