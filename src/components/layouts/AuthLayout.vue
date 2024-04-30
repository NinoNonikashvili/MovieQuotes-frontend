<script setup lang="ts">
import type { AuthLayoutType } from "@/types/types";
import IconLeftArrow from "@/components/icons/IconLeftArrow.vue";
import { useRouter } from "vue-router";

const props = defineProps<AuthLayoutType>();
const router = useRouter();
const navigate_back = () => {
  router.back();
};
</script>

<template>
  <div class="flex flex-col items-center w-full max-w-[22.5rem]">
    <h1
      class="text-white text-2xl text-center font-helvetica-500 leading-7 mb-3 xl:text-[2rem]"
    >
      {{ $t(props.header_key) }}
    </h1>
    <h2 class="font-helvetica-400 text-base text-gray-500 text-center">
      {{ $t(props.sub_header_key) }}
    </h2>

    <slot></slot>
    <p
      v-if="props.footer_link_text_key && props.footer_link"
      class="font-helvetica-400 text-base text-gray-500"
    >
      {{ $t(props.footer_text_key) }}
      <RouterLink
        :to="{ name: props.footer_link }"
        class="ml-1 font-helvetica-400 text-base text-blue-600 underline"
        >{{ $t(props.footer_link_text_key) }}</RouterLink
      >
    </p>

    <button
      v-if="props.go_back"
      @click="navigate_back"
      class="font-helvetica-400 text-base text-blue-600 flex gap-2 items-center"
    >
      <IconLeftArrow />
      <p class="font-helvetica-400 text-base text-gray-500">
        {{ $t(props.footer_text_key) }}
      </p>
    </button>
  </div>
</template>
