<script setup lang="ts">
import HeaderApp from "@/components/shared/HeaderApp.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const navigateToHome = (e: Event) => {
  router.push({ name: "home" });
};
</script>

<template>
  <div>
    <!-- this div will be blured version of landing page served as background -->

    <div
      class="w-full h-screen fixed hidden xl:block bg-[#08080D] blur-sm"
      @click="navigateToHome"
    >
      <HeaderApp />
      <div class="flex justify-center w-full h-full">
        <h1
          class="text-helvetica-700 text-orange-200 text-[60px] leading-[90px] text-center mt-[17.5rem]"
        >
          Find any quote in <br />
          millions of movie lines
        </h1>
      </div>
    </div>
    <div
      class="w-full h-screen xl:w-[34rem] xl:h-fit xl:absolute top-[9.375rem] inset-x-0 mx-auto"
    >
      <slot></slot>
    </div>
  </div>
</template>
