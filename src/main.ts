//@ts-ignore
import "./assets/output.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import i18n from "@/plugins/i18n";
import router from "./router";
import "@/plugins/vee-validate/rules";
import "@/plugins/vee-validate/index";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(i18n);
app.use(router);

app.mount("#app");
