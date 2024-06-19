<script setup lang="ts">
import IconCross from "@/components/icons/IconCross.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const user = useUserStore();
const { auth_user_data } = storeToRefs(user);

const props = defineProps<{
  closeModal: CallableFunction;
  header_key: string;
  hideOnMobile?: boolean;
}>();
</script>

<template>
  <div
    class="fixed h-screen overflow-y-scroll xl:h-[80vh] top-0 left-0 w-full xl:absolute xl:max-w-[60rem] xl:top-[8rem] xl:left-0 xl:right-0 xl:mx-auto z-20"
  >
    <div class="bg-[#11101A] rounded-xl w-full">
      <!-- HEADER -->
      <div class="px-10 py-11 border-b border-b-white flex items-center">
        <h2
          class="font-helvetica-500 text-2xl text-white mx-auto"
          :class="{ 'opacity-0 xl:opacity-100': props.hideOnMobile }"
        >
          {{ $t(props.header_key) }}
        </h2>
        <div @click="props.closeModal" class="p-2 cursor-pointer">
          <IconCross color="#ffffff" />
        </div>
      </div>
      <!-- USER -->
      <div class="flex gap-3 items-center w-fit px-10 py-11">
        <img
          :src="auth_user_data?.image"
          alt="quote author image"
          class="w-10 xl:w-14 rounded-full"
        />
        <p class="font-helvetica-400 text-xl text-white">
          {{ auth_user_data?.name }}
        </p>
      </div>
      <!-- FORM -->
      <div class="px-10 py-11">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
