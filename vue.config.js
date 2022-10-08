// const path = require("path");

module.exports = {
  // outputDir: "./build",
  // publicPath: "./", //部署到服务器不要改，测试打包环境

  // 解决跨域
  devServer: {
    proxy: {
      "^/api": {
        target: "http://152.136.185.210:5000",
        pathRewrite: {
          "^/api": ""
        },
        changeOrigin: true
      }
    }
    // historyApiFallBack: true
  },

  configureWebpack: {
    resolve: {
      alias: {
        views: "@/views",
        components: "@/components"
      }
    }
  }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     "@": path.resolve(__dirname, "src"),
  //     views: "@/views"
  //   };
  // },
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set("@", path.resolve(__dirname, "src"))
  //     .set("views", "@/views")
  //     .set("components", "@/components");
  // }
};
