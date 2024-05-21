<script setup lang="ts">
import type Prop from "@/types/typesButtonProps";
import IconGmail from "@/components/icons/IconGmail.vue";

const props = withDefaults(defineProps<Prop>(), {
  bg: "transparent",
  color: "text-white",
  text_size: "text-[0.875rem]",
  font: "font-helvetica-400",
  padding_x: "px-4",
  padding_y: "py-2",
  line_height: "leading-6",
  link: "",
  submit: false,
});
</script>

<template>
  <RouterLink v-if="props.link" :to="{ name: props.link }" class="flex w-full">
    <button
      class="border border-white rounded-[4px] flex gap-2 items-center justify-center w-full"
      :class="[
        props.bg,
        props.color,
        props.font,
        props.line_height,
        props.padding_x,
        props.padding_y,
      ]"
      :type="submit ? 'submit' : 'button'"
    >
      <component v-if="props.icon" :is="IconGmail" />
      <p :class="[props.text_size, props.line_height]">
        {{ $t(props.text_key) }}
      </p>
    </button>
  </RouterLink>
  <button
    v-else
    class="border border-white rounded-[4px] flex gap-2 items-center justify-center w-full"
    :class="[
      props.bg,
      props.color,
      props.font,
      props.line_height,
      props.padding_x,
      props.padding_y,
    ]"
    :type="submit ? 'submit' : 'button'"
  >
    <component :is="IconGmail" />
    <p :class="[props.text_size, props.line_height]">
      {{ $t(props.text_key) }}
    </p>
  </button>
</template>
