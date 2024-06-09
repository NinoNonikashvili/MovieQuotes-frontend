<script setup lang="ts">
import IconCheckpoint from "@/components/icons/IconCheckpoint.vue";
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
    class="bg-[#BADBCC] rounded-[0.25rem] p-4 flex items-center justify-between absolute top-[10rem] left-0 right-0 mx-auto xl:mx-0 xl:right-[12rem] w-[25rem]"
  >
    <div class="flex items-center gap-2">
      <IconCheckpoint />
      <p class="text-[#0F5132] text-base font-helvetica-400">
        {{ $t(props.text_key) }}
      </p>
    </div>
    <IconCross @click="emitEvent" class="cursor-pointer" />
  </div>
</template>
