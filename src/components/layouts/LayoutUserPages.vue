<script setup lang="ts">
import HeaderAuthNavigation from "@/components/shared/HeaderAuthNavigation.vue";
import i18n from "@/plugins/i18n";

const { locale } = i18n.global;

const props = defineProps<{
  name?: string;
  image?: string;
}>();
</script>
<template>
  <section class="w-[14.625rem] mr-[7%] desktop:mr-[11.5rem] shrink-0">
      <HeaderAuthNavigation
        :name="props.name"
        :lang="locale"
        :image="props.image"
      />
    </section>
  <!-- <div class="hidden w-full px-16 pt-8 pb-[15rem] xl:flex bg-[#181724]">
    <section class="w-[14.625rem] mr-[7%] desktop:mr-[11.5rem] shrink-0">
      <HeaderAuthNavigation
        :name="props.name"
        :lang="props.lang"
        :image="props.image"
      />
    </section>
    <section>
      <slot name="content"></slot>
    </section>
  </div> -->
</template>
