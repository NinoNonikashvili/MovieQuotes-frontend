<script setup lang="ts">
import type Prop from "@/types/typesButtonProps";
import IconPlusBoardered from "@/components/icons/IconPlusBordered.vue";

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
  redirect: false,
});

const handleRedirect = () => {
  if (props.redirect && props.link) {
    window.location.replace(props.link);
  }
};
</script>

<template>
  <RouterLink
    v-if="props.link && !redirect"
    :to="{ name: props.link }"
    class="flex w-full"
  >
    <button
      class="rounded-[4px] flex w-full justify-center items-center gap-1"
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
      <component v-if="props.icon" :is="IconPlusBoardered" class="shrink-0" />
      {{ $t(props.text_key) }}
    </button>
  </RouterLink>
  <button
    v-else
    class="rounded-[4px] flex w-full justify-center items-center gap-1"
    @click="handleRedirect"
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
    <component v-if="props.icon" :is="IconPlusBoardered" class="shrink-0" />
    {{ $t(props.text_key) }}
  </button>
</template>
