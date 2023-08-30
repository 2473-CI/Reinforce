import App from "./App.vue";
import ElementPlus from "element-plus";

import { createApp } from "vue";
import { router } from "./router/index";

import "./style.css";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

app.mount("#app");