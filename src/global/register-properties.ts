import { App } from "vue";

import { formatUtcString } from "@/utils/date-format";

export default function registerProperties(app: App): void {
  // 添加全局过滤器 $开头
  app.config.globalProperties.$filters = {
    foo() {
      console.log("foo==");
    },
    formatTime(value: string) {
      return formatUtcString(value);
    }
  };
}
