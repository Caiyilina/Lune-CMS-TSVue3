<template>
  <div>
    <el-table :data="listData" border style="width: 100%">
      <template v-for="(propItem, index) in propList" :key="index">
        <el-table-column align="center" v-bind="propItem">
          <template #default="scope">
            <!-- 模板中放插槽，插槽有默认元素，动态给插槽名字，父组件可以通过具名插槽来修改默认元素 -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "yl-table",
  props: {
    propList: {
      type: Object,
      required: true
    },
    listData: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {};
  }
});
</script>
<style scoped></style>
