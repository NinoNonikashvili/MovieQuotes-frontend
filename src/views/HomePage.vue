<script setup lang="ts">
import HeaderApp from "@/components/shared/HeaderApp.vue";
import AppFooter from "@/components/shared/AppFooter.vue";
import ButtonFilled from "@/components/ui/buttons/ButtonFilled.vue";
import IconCite from "@/components/icons/IconCite.vue";
import { ref } from "vue";

const elStickySection = ref<HTMLElement | null>(null);
const stickyBgStyle = ref<string>("");

function myfunction(value: HTMLElement | null) {
  const item = value?.getBoundingClientRect();
  if (item) {
    return item?.top >= 0;
  }
}

window.addEventListener("scroll", () => {
  stickyBgStyle.value = myfunction(elStickySection.value)
    ? "bg-scroll"
    : "bg-fixed";
});
</script>

<template>
  <div class="w-full bg-gradient-to-b to-[#11101A] from-[#08080D]">
    <HeaderApp />
    <div
      class="flex flex-col items-center justify-center w-full pt-[14.25rem] pb-[10.25rem] xl:pb-[13.75rem] xl:pt-[17.5rem]"
    >
      <h1
        class="font-helvetica-700 text-orange-200 text-2xl xl:text-[3.75rem] xl:leading-[5.625rem] text-center"
      >
        {{ $t("landing.header_1") }} <br />
        {{ $t("landing.header_2") }}
      </h1>
      <div class="w-[8.125rem] mt-4">
        <ButtonFilled text_key="general.text_get_started" link="login" />
      </div>
    </div>
  </div>
  <section
    ref="elStickySection"
    :class="stickyBgStyle"
    class="w-full flex items-center h-screen m-auto bg-no-repeat bg-center bg-cover landing1"
  >
    <div class="pl-10 xl:pl-[10rem]">
      <div class="flex items-start gap-2 mb-4">
        <IconCite width="53" height="2" class="mt-3 xl:mt-10" />
        <h3
          class="font-helvetica-700 text-white text-xl xl:text-[3.125rem] leading-8 xl:leading-[4.75rem] max-w-[20.625rem] xl:max-w-[52rem]"
        >
          {{ $t("landing.quote_1") }}
        </h3>
      </div>
      <p class="ml-16 font-helvetica-700 text-base text-gray-300 xl:text-3xl">
        {{ $t("landing.cite_1") }}
      </p>
    </div>
  </section>

  <section
    class="w-full flex items-center h-screen m-auto bg-fixed bg-center bg-cover landing2"
  >
    <div class="pl-10 xl:pl-[10rem]">
      <div class="flex items-start gap-2 mb-4">
        <IconCite width="53" height="2" class="mt-3 xl:mt-10" />
        <h3
          class="font-helvetica-700 text-white text-xl xl:text-[3.125rem] leading-8 xl:leading-[4.75rem] max-w-[20.625rem] xl:max-w-[52rem]"
        >
          {{ $t("landing.quote_2") }}
        </h3>
      </div>
      <p class="ml-16 font-helvetica-700 text-base text-gray-300 xl:text-3xl">
        {{ $t("landing.cite_2") }}
      </p>
    </div>
  </section>
  <section
    class="w-full flex items-center h-screen m-auto bg-fixed bg-center bg-cover landing3"
  >
    <div class="pl-10 xl:pl-[10rem]">
      <div class="flex items-start gap-2 mb-4">
        <IconCite width="53" height="2" class="mt-3 xl:mt-10" />
        <h3
          class="font-helvetica-700 text-white text-xl xl:text-[3.125rem] leading-8 xl:leading-[4.75rem] max-w-[20.625rem] xl:max-w-[52rem]"
        >
          {{ $t("landing.quote_3") }}
        </h3>
      </div>
      <p class="ml-16 font-helvetica-700 text-base text-gray-300 xl:text-3xl">
        {{ $t("landing.cite_3") }}
      </p>
    </div>
  </section>
  <AppFooter />
</template>

<style scoped>
.landing1 {
  background-image: url("@/assets/images/landing1.png"),
  linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 65%),
  linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 65%);
  background-blend-mode: overlay;
}
.landing2 {
  background-image: url("@/assets/images/landing2.png"),
  linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 65%),
  linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 65%);
  background-blend-mode: overlay;
}
.landing3 {
  background-image: url("@/assets/images/landing3.png"),
  linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 65%),
  linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 65%);
  background-blend-mode: overlay;
}
</style>
