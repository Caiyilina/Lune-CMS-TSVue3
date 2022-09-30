<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch>
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon><UserFilled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button class="login-btn" type="primary" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { UserFilled, Iphone } from "@element-plus/icons-vue";
import LoginAccount from "./login-account.vue";
import LoginPhone from "./login-phone.vue";

export default defineComponent({
  name: "login-panel",
  components: { UserFilled, Iphone, LoginAccount, LoginPhone },
  setup() {
    const isKeepPassword = ref(false);

    // 获取account组件实例的组件类型
    const accountRef = ref<InstanceType<typeof LoginAccount>>();

    const handleLoginClick = () => {
      console.log("立即登录");
      accountRef.value?.loginAction();
    };
    return { isKeepPassword, handleLoginClick, accountRef };
  }
});
</script>
<style scoped lang="less">
.login-panel {
  margin: 0 auto;
  width: 320px;
  .title {
    text-align: center;
  }
  .account-control {
    font-size: 12px;
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 5px;
  }
}
</style>
