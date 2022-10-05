<template>
  <div>
    <el-form label-width="90px" :rules="rules">
      <el-form-item label="手机号码:" prop="phone">
        <el-input v-model="account.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码:" prop="code">
        <div class="get-code">
          <el-input v-model="account.code"></el-input>
          <el-button type="primary" class="getBtn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { rules } from "../config/phone-config";

export default defineComponent({
  name: "login-phone",
  setup() {
    const account = reactive({
      phone: "",
      code: ""
    });

    return { account, rules };
  }
});
</script>
<style scoped lang="less">
.get-code {
  display: flex;
  .getBtn {
    margin-left: 5px;
  }
}
</style>
