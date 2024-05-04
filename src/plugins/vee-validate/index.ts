import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json";
import ka from "@vee-validate/i18n/dist/locale/ka.json";
import { confirmed } from "@vee-validate/rules";

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
        required: en.messages.required,
        min: en.messages.min,
        max: en.messages.max,
        email: en.messages.email,
        confirmed: en.messages.confirmed,
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
        user: "მომხმარებელი",
      },
      messages: {
        required: ka.messages.required,
        min: ka.messages.min,
        max: ka.messages.max,
        email: ka.messages.email,
        confirmed: ka.messages.confirmed,
        low_case_and_numeric: "მხოლოდ დაბალი რეგისტრის ასოები და რიცხვები",
      },
    },
  }),
});
