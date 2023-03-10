//  service 统一出口
import localCache from "@/utils/cache";
import YLRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";
const ylRequest = new YLRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache("token");
      if (token) {
        if (config && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      // console.log("请求成功拦截：config", config);

      return config;
    },
    requestInterceptorCatch: (err) => {
      // console.log("请求成功失败：", err);

      return err;
    },
    responseInterceptor: (config) => {
      // console.log("响应成功拦截：", config);

      return config;
    },
    responseInterceptorCatch: (err) => {
      // console.log("响应失败拦截：", err);

      return err;
    }
  }
});

export default ylRequest;
