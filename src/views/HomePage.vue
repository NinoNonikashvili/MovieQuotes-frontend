<script setup lang="ts">
import AppHeader from "@/components/shared/AppHeader.vue";
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
    <AppHeader />
    <div
      class="flex flex-col items-center justify-center w-full pt-[14.25rem] pb-[10.25rem] xl:pb-[13.75rem] xl:pt-[17.5rem]"
    >
      <h1
        class="text-helvetica-700 text-orange-200 text-2xl xl:text-[3.75rem] xl:leading-[5.625rem] text-center"
      >
        Find any quote in <br />
        millions of movie lines
      </h1>
      <div class="w-[8.125rem] mt-4">
        <ButtonFilled text_key="general.text_get_started" link="login" />
      </div>
    </div>
  </div>
  <section
    ref="elStickySection"
    :class="stickyBgStyle"
    class="w-full flex items-center justify-center h-screen m-auto bg-no-repeat bg-center bg-cover landing1"
  >
    <div class="p-5">
      <div class="flex items-center gap-2">
        <IconCite />
        <h3 class="font-helvetica-700 text-white text-xl xl:text-[3.125rem]">
          “You have to leave somethig behind to go forward”
        </h3>
      </div>
      <p class="ml-16 font-helvetica-700 text-base text-gray-300 xl:text-3xl">
        Interstellar, 2014
      </p>
    </div>
  </section>

  <section
    class="w-full flex items-center justify-center h-screen m-auto bg-fixed bg-center bg-cover landing2"
  >
    <div class="p-5">
      <div class="flex items-center gap-2">
        <IconCite />
        <h3 class="font-helvetica-700 text-white text-xl xl:text-[3.125rem]">
          “I think we’re just gonna have to be secretly in love with earch other
          and leave it that”
        </h3>
      </div>
      <p class="ml-16 font-helvetica-700 text-base text-gray-300 xl:text-3xl">
        The Royal Tenenbaums,2001
      </p>
    </div>
  </section>
  <section
    class="w-full flex items-center justify-center h-screen m-auto bg-fixed bg-center bg-cover landing3"
  >
    <div class="p-5">
      <div class="flex items-center gap-2">
        <IconCite />
        <h3 class="font-helvetica-700 text-white text-xl xl:text-[3.125rem]">
          “I think we’re just gonna have to be secretly in love with earch other
          and leave it that”
        </h3>
      </div>
      <p class="ml-16 font-helvetica-700 text-base text-gray-300 xl:text-3xl">
        The Royal Tenenbaums,2001
      </p>
    </div>
  </section>
  <AppFooter />
</template>

<style scoped>
.landing1 {
  background-image: url("@/assets/images/landing1.png"),
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.8),
      rgba(255, 255, 255, 0.1),
      rgba(0, 0, 0, 0.8)
    );
  background-blend-mode: overlay;
}
.landing2 {
  background-image: url("@/assets/images/landing2.png"),
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.8),
      rgba(255, 255, 255, 0.1),
      rgba(0, 0, 0, 0.8)
    );
  background-blend-mode: overlay;
}
.landing3 {
  background-image: url("@/assets/images/landing3.png"),
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.8),
      rgba(255, 255, 255, 0.1),
      rgba(0, 0, 0, 0.8)
    );
  background-blend-mode: overlay;
}
</style>
