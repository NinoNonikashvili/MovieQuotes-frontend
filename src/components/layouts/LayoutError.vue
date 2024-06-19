<script setup lang="ts">
import ButtonFilled from "../ui/buttons/ButtonFilled.vue";

const props = defineProps<{
  error_type: string;
  title: string;
  text: string;
}>();
</script>

<template>
  <div
    class="bg-[#181624] w-full flex flex-col gap-8 items-center justify-center py-40 px-4 h-screen"
  >
    <img
      v-if="props.error_type === 'front'"
      src="@/assets/images/ghost.png"
      alt=""
      class="max-w-[7.5rem] object-cover"
    />
    <img
      v-if="props.error_type === 'server'"
      src="@/assets/images/Gandolf.png"
      alt=""
      class="max-w-[14rem] object-cover"
    />
    <h1 class="font-helvetica-700 text-white text-2xl text-center">{{ props.title }}</h1>
    <p class="font-helvetica-500 text-white text-base text-center">{{ props.text }}</p>
    <div class="w-[9.375rem]">
      <ButtonFilled text_key="errors.text_return_to_home" link="home" />
    </div>
  </div>
</template>
