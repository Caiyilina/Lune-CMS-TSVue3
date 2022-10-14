<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="30%"
      align-center
      destroy-on-close
    >
      <yl-form v-bind="modalConfig" v-model="formData"></yl-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import YlForm from "@/base-ui/form";

export default defineComponent({
  name: "page-modal",
  components: { YlForm },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    dialogTitle: {
      type: String,
      default: ""
    }
  },
  emits: [],
  setup(props, { emit }) {
    const dialogVisible = ref(false);

    const formData = ref<any>({});

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`];
        }
      }
    );
    return { formData, dialogVisible };
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
