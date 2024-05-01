<script setup lang="ts">
import type Prop from "@/types/typesButtonProps";

const props = withDefaults(defineProps<Prop>(), {
  bg: "bg-red-600",
  color: "text-white",
  text_size: "text-base",
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
      class="rounded-[4px] flex w-full justify-center"
      :class="[
        props.bg,
        props.color,
        props.font,
        props.text_size,
        props.line_height,
        props.padding_x,
        props.padding_y,
      ]"
      :type="submit ? 'submit' : 'button'"
    >
      {{ $t(props.text_key) }}
    </button>
  </RouterLink>
  <button
    v-else
    class="rounded-[4px] flex w-full justify-center"
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
    {{ $t(props.text_key) }}
  </button>
</template>
