<script setup lang="ts">
import IconCross from "@/components/icons/IconCross.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const user = useUserStore();
const { auth_user_data } = storeToRefs(user);

const props = defineProps<{
  closeModal: CallableFunction;
  header_key: string;
}>();
</script>

<template>
  <div class="bg-[#11101A] rounded-xl w-full">
    <!-- HEADER -->
    <div class="px-10 py-11 border-b border-b-white flex items-center">
      <h2 class="font-helvetica-500 text-2xl text-white mx-auto">
        {{ $t(props.header_key) }}
      </h2>
      <IconCross @click="props.closeModal" color="#ffffff" />
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
</template>
