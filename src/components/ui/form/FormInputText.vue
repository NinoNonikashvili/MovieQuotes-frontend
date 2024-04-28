<script setup lang="ts">
import { useField } from "vee-validate";
import type InputProp from "@/types/typesInputProps";

const props = defineProps<InputProp>();

const { value, errorMessage } = useField(() => props.name);
</script>

<template>
  <div>
    <label :for="props.name" class="flex flex-col gap-2">
      <p class="font-helvetica-400 text-base text-white">
        {{ $t(`form.label_${$props.name}`) }}
        <span class="text-red-400">*</span>
      </p>
      <input
        v-model="value"
        :id="props.name"
        class="w-full px-3 py-2 bg-gray-100 rounded-[4px] focus:outline-none font-helvetica-400 text-base text-gray-500 placeholder:text-gray-500"
        :placeholder="$t(`form.placeholder_${props.name}`)"
      />
    </label>
    <p class="font-helvetica-400 text-base text-red-400 mt-2">
      {{ errorMessage }}
    </p>
  </div>
</template>
