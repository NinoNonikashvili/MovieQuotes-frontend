<script setup lang="ts">
import type { Language } from "@/types/types";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  name: string;
  placeholder_key?: string;
  lang?: Language;
  validate_year?: boolean;
  required: boolean;
  label?: string;
  default_value?: string;
}>();
const error = ref<string | null>();
const { t } = useI18n();

const emit = defineEmits<{
  (e: "send-text", text: string | null, element: string): void;
}>();
const inputEl = ref<string | undefined>(props?.default_value);

const sendText = (e: Event) => {
  const target = e.target as HTMLInputElement;
  // inputEl.value = target.value;
  if (!target.value) {
    error.value = t("validations.required");
    emit("send-text", null, props.name);
  } else if (
    props.lang === "Geo" &&
    !target.value?.match(/^[ა-ჰ0-9.,?!@#$%^&*()"" -_|]+$/gm)
  ) {
    error.value = t("validations.only_ge");
    emit("send-text", null, props.name);
  } else if (
    props.lang === "Eng" &&
    !target.value?.match(/^[a-zA-Z0-9.,?!@#$%^&*()"" -_|]+$/gm)
  ) {
    error.value = t("validations.only_en");
    emit("send-text", null, props.name);
  } else if (
    props.validate_year &&
    target.value?.length !== 4 &&
    !target.value?.match(/^[1-2][0-9][0-9][0-9]/gm)
  ) {
    error.value = t("validations.year_format");
    emit("send-text", null, props.name);
  } else {
    error.value = null;
    emit("send-text", target.value, props.name);
  }
};
</script>

<template>
  <div>
    <div
      class="relative w-full flex gap-1 items-start border border-white py-2 px-3 pr-2 font-helvetica-400"
    >
      <label
        v-if="props.label"
        class="shrink-0 mt-[0.125rem] w-fit bg-transparent"
        :class="inputEl ? 'text-base text-[#6C757D]' : ' text-xl text-white '"
        >{{ props.label }}
      </label>
      <span
        v-if="props.label"
        class="font-helvetica-400"
        :class="inputEl ? 'text-base text-[#6C757D]' : ' text-xl text-white '"
        >:</span
      >
      <input
        :name="$t(props.name)"
        :placeholder="props.placeholder_key ?? ''"
        v-model="inputEl"
        @input="sendText"
        class="peer w-full h-auto bg-transparent focus:outline-none placeholder:text-[#242e36] placeholder:italic text-white font-helvetica-400 text-2xl"
      />
      <span
        class="absolute top-2 right-2 text-white font-helvetica-400 text-2xl"
      >
        {{ lang }}
      </span>
    </div>
  </div>
  <p class="font-helvetica-400 text-base text-red-400 mt-2" v-if="error">
    {{ error }}
  </p>
</template>
