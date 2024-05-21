<script setup lang="ts">
import type InputProp from "@/types/typesInputProps";
import IconInputSuccess from "@/components/icons/IconInputSuccess.vue";

import { useField } from "vee-validate";

const props = defineProps<InputProp>();

const { checked, handleChange } = useField(() => props.name, undefined, {
  type: "checkbox",
  checkedValue: props.checkedValue,
});
</script>

<template>
  <label :for="props.name" class="flex gap-2 items-center">
    <div class="relative h-4">
      <input
        type="checkbox"
        :value="checkedValue"
        :checked="checked"
        @change="handleChange"
        class="opacity-0 w-4 h-4"
      />
      <div
        class="absolute top-0 left-0 bg-white w-full h-full rounded-sm flex items-center justify-center pointer-events-none"
      >
        <IconInputSuccess v-if="checked" />
      </div>
    </div>
    <p class="font-helvetica-400 text-base text-white">{{ $t("form.remember_me") }}</p>
  </label>
</template>
