<template>
  <div class="yl-form">
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
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                >
                  <el-option v-for="option in item.options" :key="option.value">
                    {{ option.label }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker style="width: 100%" v-bind="item.otherOptions">
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IFormItem, IForm } from "../types";
export default defineComponent({
  name: "form",
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
    }
  },
  setup() {
    return {};
  }
});
</script>
<style scoped lang="less">
.yl-form {
  padding-top: 22px;
}
</style>
