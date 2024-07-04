<script setup lang="ts">
import IconCheckpoint from "@/components/icons/IconCheckpoint.vue";
import IconCross from "@/components/icons/IconCross.vue";
import { onMounted } from "vue";

const props = defineProps<{
  text_key: string;
}>();
const emit = defineEmits<{
  (e: "close-notification"): void;
}>();

const emitEvent = () => {
  emit("close-notification");
};

onMounted(()=>{
  let timerID = setTimeout(() => {
        clearTimeout(timerID)
        emitEvent()
      }, 3000)
})
</script>
<template>
  <div
    class="bg-[#BADBCC] rounded-[0.25rem] p-4 flex items-center justify-between absolute top-[10rem] left-0 right-0 mx-auto xl:mx-0 xl:right-[12rem] xl:left-auto w-[25rem] z-30"
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
