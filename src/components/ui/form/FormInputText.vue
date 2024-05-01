<script setup lang="ts">
import { useField } from "vee-validate";
import type InputProp from "@/types/typesInputProps";
import IconInputSuccess from "@/components/icons/IconInputSuccess.vue";
import IconInputError from "@/components/icons/IconInputError.vue";
import IconRemoveInput from "@/components/icons/IconRemoveInput.vue";

const props = defineProps<InputProp>();

const removeInput = () => {
  value.value = "";
};

const { value, errorMessage, meta, handleChange, handleBlur } = useField(
  () => props.name,
  undefined,
  {
    validateOnValueUpdate: false,
  },
);

const validationListeners = {
  blur: (evt: Event) => handleBlur(evt, true),
  change: handleChange,
  input: (evt: Event) => handleChange(evt, !!errorMessage.value),
};

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
          ref="elInput"
          v-model="value"
          v-on="validationListeners"
          type="text"
          :id="props.name"
          :class="
            meta.dirty
              ? errorMessage
                ? 'ring-2 ring-red-400'
                : 'ring-2 ring-green-500'
              : ''
          "
          class="peer w-full px-3 py-2 bg-gray-100 rounded-[4px] focus:outline-none focus:ring-[#0D6EFD]/25 focus:ring-4 font-helvetica-400 text-base text-gray-500 placeholder:text-gray-500"
          :placeholder="$t(`form.placeholder_${props.name}`)"
        />

        <IconInputError
          v-if="meta.dirty && errorMessage"
          class="absolute top-3 right-2 peer-focus:hidden"
        />
        <IconInputSuccess
          v-if="meta.dirty && !errorMessage"
          class="absolute top-3 right-2 peer-focus:hidden"
        />
        <IconRemoveInput
          @mousedown="removeInput"
          class="absolute top-3 right-2 hidden peer-focus:block"
        />
      </div>
    </label>

    <p class="font-helvetica-400 text-base text-red-400 mt-2">
      {{ errorMessage }}
    </p>
  </div>
</template>
