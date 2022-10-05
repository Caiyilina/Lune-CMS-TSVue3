import axios from "axios";

// axios的实例对象
// axios.request({
//   method: "GET",
//   url: ""
// });
// 1、模拟get请求
axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
  console.log(res);
}); //axios.get 返回的是promise对象 Promise<AxiosResponse<any, any>>

// Promise本身可以有类型 （泛型）
/* new Promise<string>((resolve) => {
  resolve("abc");
}).then((res) => {
  console.log(res);
}); */

/* // 2、模拟get请求（传参）
axios
  .get("http://httpbin.org/get", {
    params: {
      name: "lune",
      age: 18
    }
  })
  .then((res) => {
    console.log("2、模拟get请求（传参）", res);
  });

// 3、post请求
axios
  .post("http://httpbin.org/post", {
    name: "lune",
    age: 18
  })
  .then((res) => {
    console.log("3、post请求", res);
  }); */

// 4、axios的配置选项 (针对全局)
axios.defaults.baseURL = "http://httpbin.org";
axios.defaults.timeout = 10000;
// axios.defaults.headers = {};
// 2、模拟get请求（传参）
axios
  .get("/get", {
    params: {
      name: "lune",
      age: 18
    },
    timeout: 5000 //请求单独的配置
  })
  .then((res) => {
    console.log("2、模拟get请求（传参）", res);
  });

// 3、post请求
axios
  .post("/post", {
    name: "lune",
    age: 18
  })
  .then((res) => {
    console.log("3、post请求", res);
  });

// 5、axios.all  --> 多个请求，一起返回
axios
  .all([
    axios.get("/get", { params: { name: "lune", age: 18 } }),
    axios.post("/post", { params: { name: "lune", age: 18 } })
  ])
  .then((res) => {
    console.log("axios.all  --> 多个请求，一起返回", res[0].data, res[1].data);
  });

// 6、axios的拦截器

// 6.1 拦截请求
// 参数1  ：请求发送成功会执行的函数； 参数2  ：请求发送失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    // 拦截请求的地方坐一些操作，例如：给请求添加token，添加loading动画
    console.log("请求成功的拦截");

    return config;
  },
  (err) => {
    console.log("请求失败的拦截");
    return err;
  }
);

// 6.2 拦截响应
// 参数1  ：数据响应成功（服务器正常返回了数据  200）； 参数2  ：响应失败的拦截 （4xx 5xx）
axios.interceptors.response.use(
  (config) => {
    console.log("响应成功的拦截");

    return config;
  },
  (err) => {
    console.log("响应失败的拦截");
    return err;
  }
);
