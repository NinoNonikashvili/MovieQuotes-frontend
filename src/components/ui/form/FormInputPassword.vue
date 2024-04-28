<script setup lang="ts">
import { useField } from "vee-validate";
import type InputProp from "@/types/typesInputProps";
import IconShowPassword from "@/components/icons/IconShowPassword.vue";
import IconHidePassword from "@/components/icons/IconHidePassword.vue";
import { ref } from "vue";

const props = defineProps<InputProp>();
const isPasswordVisible = ref<boolean>(false);
const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const { value, errorMessage } = useField(() => props.name);

//needs password toggle functionality
</script>

<template>
  <div>
    <label :for="props.name" class="flex flex-col gap-2">
      <p class="font-helvetica-400 text-base text-white">
        {{ $t(`form.label_${$props.name}`) }}
        <span class="text-red-400">*</span>
      </p>
      <div class="relative">
        <input
          v-model="value"
          :type="isPasswordVisible ? 'test' : 'password'"
          :id="props.name"
          class="w-full px-3 py-2 bg-gray-100 rounded-[4px] focus:outline-none font-helvetica-400 text-base text-gray-500 placeholder:text-gray-500"
          :placeholder="$t(`form.placeholder_${props.name}`)"
        />
        <IconHidePassword
          class="absolute top-3 right-2"
          v-if="isPasswordVisible"
          @click="togglePassword"
        />
        <IconShowPassword
          class="absolute top-3 right-2"
          v-if="!isPasswordVisible"
          @click="togglePassword"
        />
      </div>
    </label>

    <p class="font-helvetica-400 text-base text-red-400 mt-2">
      {{ errorMessage }}
    </p>
  </div>
</template>
