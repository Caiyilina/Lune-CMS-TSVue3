<template>
  <div class="app">
    <!-- Login -->
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

// ele 局部引用
// import { ElButton } from "element-plus";

// defineComponent的作用，ts角度上做类型推导、类型限制
export default defineComponent({});
</script>
<style lang="less">
.app {
  height: 100%;
}
</style>
