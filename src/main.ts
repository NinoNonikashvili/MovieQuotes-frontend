//@ts-ignore
import "./assets/output.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import i18n from "@/plugins/i18n";
import "@/plugins/vee-validate/rules.ts";
import "@/plugins/vee-validate/index";

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);

app.mount("#app");
