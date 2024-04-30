import { defineRule } from "vee-validate";
import * as AllRules from "@vee-validate/rules";

type AllRulesObg = {
  [key: string]: any;
};

const rulesObj: AllRulesObg = AllRules;

Object.keys(rulesObj).forEach((rule) => {
  defineRule(rule, rulesObj[rule]);
});

defineRule("low_case_and_numeric", (value: string) => {
  // Field is empty, should pass
  if (!value || !value.length) {
    return true;
  }
  if (!/^[a-z0-9]*$/gm.test(value)) {
    return false;
  }
  return true;
});
