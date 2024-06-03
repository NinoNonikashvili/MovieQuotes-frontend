<script setup lang="ts">
import IconQuote from "@/components/icons/IconQuote.vue";
import i18n from "@/plugins/i18n";

const { locale } = i18n.global;
const props = defineProps<{
  id: number;
  image: string;
  title: string;
  year: string;
  quotes_num: string;
}>();
</script>
<template>
  <RouterLink :to="{ name: 'movie', params: { lang: locale, id: props.id } }">
    <div>
      <img
        :src="props.image"
        alt=""
        class="h-[18.875rem] w-[22.375rem] xl:w-[27.5rem] xl:h-[23.25rem] object-fit rounded-[0.25rem]"
      />
      <div>
        <h3 class="mt-4 mb-5 font-helvetica-500 text-white text-2xl">
          {{ props.title }}
        </h3>
        <div class="flex gap-2 items-center">
          <span class="font-helvetica-500 text-white text-xl">{{
            props.quotes_num
          }}</span>
          <IconQuote />
        </div>
      </div>
    </div>
  </RouterLink>
</template>
