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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
