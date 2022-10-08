<template>
  <div class="yl-form">
    <div class="header">
      <!-- 具名插槽，父组件可以自定义组件 -->
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.id">
          <el-col :span="8" v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import { IFormItem } from "../types";
export default defineComponent({
  name: "yl-form",
  props: {
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: "0.5vw 1vw" })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xs: 24,
        sm: 12,
        md: 8,
        lg: 8,
        xl: 6
      })
    },
    modelValue: { type: Object, required: true }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue }); //深拷贝

    // 深度监听formData，改变时发送事件
    watch(
      formData,
      (newValue) => {
        emit("update:modelValue", newValue);
      },
      { deep: true }
    );
    return { formData };
  }
});
</script>
<style scoped lang="less">
.yl-form {
  padding-top: 22px;
}
</style>
