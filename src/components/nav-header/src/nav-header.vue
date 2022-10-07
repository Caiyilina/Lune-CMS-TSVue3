<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <component :is="iconName"></component>
    </el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "nav-header",
  emits: ["foldChange"],
  setup(props, { emit }) {
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

    return {
      isFold,
      iconName,
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
