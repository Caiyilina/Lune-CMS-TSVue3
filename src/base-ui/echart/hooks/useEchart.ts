import * as echarts from "echarts";

import chinaMapData from "../data/china.json";

echarts.registerMap("china", chinaMapData);

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el);

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options);
  };

  const updateSize = () => {
    echartInstance.resize();
  };

  // 监听浏览器的resize事件，实现echarts图响应式
  window.addEventListener("resize", () => {
    echartInstance.resize();
  });

  return {
    echartInstance,
    setOptions,
    updateSize
  };
}
