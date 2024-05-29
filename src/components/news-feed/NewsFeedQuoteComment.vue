<script setup lang="ts">
const props = defineProps<{
  name: string;
  image?: string;
  comment: string;
}>();
</script>

<template>
  <div class="mb-4 xl:mb-6">
    <div class="flex gap-3 items-center w-fit">
      <img
        :src="props.image"
        alt="quote author image"
        class="w-10 xl:w-14 rounded-full"
      />
      <p class="font-helvetica-400 text-base text-white">
        {{ props.name }}
      </p>
    </div>
    <p class="pb-6 pt-3 xl:pt-0 border-b border-b-white xl:ml-[4.5rem] font-helvetica-400 text-xl text-white">
      {{ props.comment }}
    </p>
  </div>
</template>
