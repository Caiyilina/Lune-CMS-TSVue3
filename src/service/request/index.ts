// 封装思路：有很多逻辑封装在一块，使用类来封装，类的封装性比函数强
import axios from "axios";
import type { AxiosInstance } from "axios";

import type { YLRequestInterceptors, YLRequestConfig } from "./type";
import { ElLoading } from "element-plus";
import { LoadingInstance } from "element-plus/lib/components/loading/src/loading";

const DEFAULT_LOADING = true;

// axios => axios的实例对象
class YLRequest {
  instance: AxiosInstance;
  interceptors?: YLRequestInterceptors;
  loading?: LoadingInstance;
  showLoading: boolean;
  // YLRequestConfig类型：在创建axios的实例对象时可以传入拦截器interceptor参数
  constructor(config: YLRequestConfig) {
    this.instance = axios.create(config); //创建axios的实例对象,传入不同的配置项时可以创建不同的axios对象

    // 保存基本信息
    this.interceptors = config.interceptors; // 从config中取出来的拦截器是axios实例对象中的拦截器

    this.showLoading = config.showLoading ?? DEFAULT_LOADING;

    // 使用拦截器-- 实例应用传进来的interceptor
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 所有的实例对象都有的拦截器
    this.instance.interceptors.request.use(
      (res) => {
        // console.log("所有的实例对象都有的拦截器-请求拦截成功", res);
        if (this.showLoading) {
          //showLoading存在 才展示loading
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据...",
            background: "rgba(0,0,0,.7)"
          });
        }
        return res;
      },
      (err) => {
        // console.log("所有的实例对象都有的拦截器-请求拦截失败");
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close();

        const data = res.data;
        if (data.returnCode === "-1001") {
          console.log("请求失败，错误信息");
        } else {
          return data;
        }
      },
      (err) => {
        // 将loading移除
        this.loading?.close();

        // 例子：判断不同的响应码显示不同错误信息
        if (err.response.status === 404) {
          console.log("404错误");
        }
        return err;
      }
    );
  }

  request<T = any>(config: YLRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1、单个请求对config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 2、判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1、单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // 2、把showLoading设置为true，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING;

          // 3、将结果resolve返回出去
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T = any>(config: YLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T = any>(config: YLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  push<T = any>(config: YLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PUSH" });
  }
  delete<T = any>(config: YLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  patch<T = any>(config: YLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}
export default YLRequest;
