import { createI18n } from "vue-i18n";
import en from "@/locale/en";
import ge from "@/locale/ge";

const messages = {
  en,
  ge,
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages,
});
export default i18n;
