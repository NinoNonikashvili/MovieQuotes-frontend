import { defineRule } from "vee-validate";
import * as AllRules from "@vee-validate/rules";

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

defineRule("low_case_and_numeric", (value) => {
  // Field is empty, should pass
  if (!value || !value.length) {
    return true;
  }
  if (!/^[a-z0-9]*$/gm.test(value)) {
    return false;
  }
  return true;
});
