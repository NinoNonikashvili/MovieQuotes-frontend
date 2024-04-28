import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json";
import ka from "@vee-validate/i18n/dist/locale/ka.json";

configure({
  generateMessage: localize({
    en: {
      ...en,
      names: {
        name: "name",
        email: "email",
        password: "password",
        password_confirmation: "confirm password",
      },
      messages: {
        ...en.messages,
        low_case_and_numeric: "only lowercase letters and numbers allowed",
      },
    },
    ka: {
      ...ka,
      names: {
        name: "სახელი",
        email: "ელ.ფოსტა",
        password: "პაროლი",
        password_confirmation: "პაროლის გამეორება",
      },
      messages: {
        ...ka.messages,
        low_case_and_numeric: "მხოლოდ დაბალი რეგისტრის ასოები და რიცხვები",
      },
    },
  }),
});
