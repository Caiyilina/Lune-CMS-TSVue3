import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// ele 全局引用
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "normalize.css"; //样式重置
import "./assets/css/base.css";

import { setupStore } from "./store";

// import ylRequest from "./service";

/* ylRequest.request({
  url: "/home/multidata",
  method: "get",
  interceptors: {
    requestInterceptor: (config) => {
      console.log("单独请求的config");
      return config;
    },
    responseInterceptor: (config) => {
      console.log("单独响应的config");

      return config;
    }
  }
}); */
/* interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}
ylRequest
  .request<DataType>({
    url: "/home/multidata",
    method: "get",
    showLoading: false
  })
  .then((res) => {
    console.log("promise:", res);
    return res;
  }); */

const app = createApp(App);
import { globalRegister } from "./global/index";
// globalRegister(app);
app.use(globalRegister); //注册elementplus、icon

app.use(store);
setupStore(); //初始化store
app.use(router);
app.use(ElementPlus);
app.mount("#app");
