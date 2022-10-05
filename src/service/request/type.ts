import type { AxiosRequestConfig, AxiosResponse } from "axios";

// 通过接口传入hook（拦截器）
export interface YLRequestInterceptors<T = AxiosResponse> {
  //接口的泛型需要有默认值
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T; //类型定义中有不确定的类型需要使用泛型，将泛型提到接口上（接口可以接受泛型）
  responseInterceptorCatch?: (error: any) => any;
}

// YLRequestConfig继承AxiosRequestConfig，并添加 拦截器属性，拦截器的类型为YLRequestInterceptors
export interface YLRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // 该接口的目的：为了扩展类型 interceptors，
  interceptors?: YLRequestInterceptors<T>;
  // 扩展
  showLoading?: boolean;
}
