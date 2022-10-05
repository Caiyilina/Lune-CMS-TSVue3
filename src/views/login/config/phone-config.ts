// 校验规则
export const rules = {
  phone: [
    { required: true, message: "请输入手机号码", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: "用户名必须是5-10个字母或者数字",
      trigger: "blur"
    }
  ],
  code: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: "密码必须是6位以上的字母或者数字",
      trigger: "blur"
    }
  ]
};
