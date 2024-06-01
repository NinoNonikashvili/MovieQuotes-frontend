<script setup lang="ts">
import type { Language } from "@/types/types";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  name: string;
  placeholder_key: string;
  lang: Language;
  required: boolean;
}>();
const error = ref<string | null>();
const { t } = useI18n();

const emit = defineEmits<{
  (e: "send-text", text: string, element: string): void;
}>();

const sendText = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target.value) {
    error.value = t("quote.quote_label") + " " + t("quote.required");
  } else if (
    props.lang === "Geo" &&
    !target.value?.match(/^[ა-ჰ0-9.,?!@#$%^&*()"" -_|]+$/gm)
  ) {
    error.value = t("quote.only_ge");
  } else if (
    props.lang === "Eng" &&
    !target.value?.match(/^[a-zA-Z0-9.,?!@#$%^&*()"" -_|]+$/gm)
  ) {
    error.value = t("quote.only_en");
  } else {
    error.value = null;
    emit("send-text", target.value, props.name);
  }
};
</script>

<template>
  <div>
    <div class="relative w-full">
      <textarea
        :name="$t(props.name)"
        :placeholder="$t(props.placeholder_key)"
        @input="sendText"
        class="w-full py-2 px-3 border border-white pr-2 bg-transparent focus:outline-none placeholder:text-[#6C757D] placeholder:italic text-white font-helvetica-400 text-2xl"
      ></textarea>
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
