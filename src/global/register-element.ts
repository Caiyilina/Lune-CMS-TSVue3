import {
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge
} from "element-plus";
import { App } from "vue";
const components = [
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge
];
export default function (app: App): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn);
  }
}
