<template>
  <div>
    <el-form label-width="90px" :rules="rules" ref="formRef" :model="account">
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
import { ElForm } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import { rules } from "../config/phone-config";
import { useStore } from "vuex";

import localCache from "@/utils/cache";

export default defineComponent({
  name: "login-phone",
  setup() {
    const store = useStore();

    const account = reactive({
      phone: localCache.getCache("phone") ?? "",
      code: localCache.getCache("code") ?? ""
    });
    const formRef = ref<InstanceType<typeof ElForm>>();

    const loginAction = (isKeepPassword: boolean) => {
      console.log(formRef.value);
      formRef.value?.validate((valid) => {
        if (valid) {
          //  1、判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache("phone", account.phone);
            localCache.setCache("code", account.code);
          } else {
            localCache.deleteCache("phone");
            localCache.deleteCache("code");
          }
          console.log("phone正在登录");
          // 2、开始进行登录验证
          store.dispatch("login/phoneLoginAction", { ...account });
        }
      });
    };

    return { account, rules, formRef, loginAction };
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
