<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" ref="formRef" :model="account">
      <el-form-item label="账号:" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="account.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import { rules } from "../config/account-config";

export default defineComponent({
  name: "login-account",
  setup() {
    const account = reactive({
      name: "",
      password: ""
    });

    const formRef = ref<InstanceType<typeof ElForm>>();

    const loginAction = () => {
      console.log(formRef.value);
      formRef.value?.validate((valid) => {
        console.log("666:", valid);
      });
      // console.log("account正在登录");
    };

    return { account, rules, loginAction, formRef };
  }
});
</script>
<style scoped></style>
