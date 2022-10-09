<template>
  <div class="app">
    <!-- elementplus国际化 -->
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
// ele 局部引用
// import { ElButton } from "element-plus";

// defineComponent的作用，ts角度上做类型推导、类型限制
export default defineComponent({
  setup() {
    return {
      locale: zhCn
    };
  }
});
</script>
<style lang="less">
.app {
  height: 100%;
}
</style>
