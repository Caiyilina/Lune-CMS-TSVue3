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

      <!-- 默认插槽 -->
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import YlForm from "@/base-ui/form";
import { useStore } from "@/store";

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
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [],
  setup(props) {
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

    const store = useStore();

    // 确定按钮的逻辑
    const handleConfirmClick = () => {
      dialogVisible.value = false;

      // 通过判断表单参数的长度确定是新建还是编辑
      if (Object.keys(props.defaultInfo).length) {
        store.dispatch("system/editPageDataAction", {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        });
      } else {
        store.dispatch("system/createPageDataAction", {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        });
      }
    };
    return { formData, dialogVisible, handleConfirmClick };
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
