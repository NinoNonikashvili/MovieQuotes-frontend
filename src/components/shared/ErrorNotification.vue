<script setup lang="ts">
import IconCross from "@/components/icons/IconCross.vue";

const props = defineProps<{
  text_key: string;
}>();
const emit = defineEmits<{
  (e: "close-notification"): void;
}>();

const emitEvent = () => {
  emit("close-notification");
};
</script>
<template>
  <div
    class="bg-red-200 rounded-[0.25rem] p-4 flex items-center justify-between absolute right-[12rem] mx-auto w-[25rem]"
  >
    <div class="flex items-center gap-2">
      <p class="text-red-500 text-base font-helvetica-400">
        {{ $t(props.text_key) }}
      </p>
    </div>
    <IconCross @click="emitEvent" class="cursor-pointer" />
  </div>
</template>
