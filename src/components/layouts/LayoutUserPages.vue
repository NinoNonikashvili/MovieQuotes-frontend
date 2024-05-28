<script setup lang="ts">
import HeaderAuthNavigation from "@/components/shared/HeaderAuthNavigation.vue";

const props = defineProps<{
  name?: string;
  lang: string;
  image?: string;
}>();
</script>
<template>
  <div class="hidden w-full px-16 pt-8 pb-[15rem] xl:flex bg-[#181724]">
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
  </div>
</template>
