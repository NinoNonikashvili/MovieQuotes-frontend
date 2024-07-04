<script setup lang="ts">
const props = defineProps<{
  title: string;
  value?: string;
  callback?: CallableFunction;
}>();
</script>

<template>
  <div class="flex flex-col gap-1 w-full items-start mb-8">
    <h3 class="font-helvetica-400 text-base text-white">{{ props.title }}</h3>
    <div class="flex justify-between items-center w-full border-b border-white">
      <p class="font-helvetica-400 text-lg text-white">{{ props.value }}</p>
      <button
        v-if="props.callback"
        @click="props.callback"
        class="font-helvetica-400 text-lg text-[#CED4DA]"
      >
        {{ $t("profile.text_edit") }}
      </button>
    </div>
  </div>
</template>
