import { App } from "vue";
// import registerElement from "./register-element";
import registerIcon from "./register-icon";
import registerProperties from "./register-properties";

export function globalRegister(app: App): void {
  // registerElement(app);
  registerIcon(app);

  // 注册全局属性
  registerProperties(app);
}
