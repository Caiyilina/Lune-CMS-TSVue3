// 方式1，手动修改环境变量 （不推荐，会忘记切换环境变量）
// const BASE_URL = "http://httpbin.org/dev";
// const BASE_URL = "http://httpbin.org/prod";
// const BASE_URL = "http://httpbin.org/test";

// 方式2，根据process.env.NODE_ENV 进行区分
let BASE_URL = "";
const TIME_OUT = 10000;
if (process.env.NODE_ENV === "development") {
  // BASE_URL = "http://152.136.185.210:5000";
  BASE_URL = "/api";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://152.136.185.210:5000";
} else if (process.env.NODE_ENV === "test") {
  BASE_URL = "http://152.136.185.210:5000";
}
console.log(
  "环境变量：",
  process.env.NODE_ENV,
  "请求地址：",
  BASE_URL,
  "timeout：",
  TIME_OUT
);

export { BASE_URL, TIME_OUT };

// 方式3，vue cli支持的
/*
创建文件：  .env.development、.env.production、.env.test
在该文件中注入变量(BASE_URL)，可以在项目中任何地方使用

*/
