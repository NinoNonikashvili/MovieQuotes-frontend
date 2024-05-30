<script setup lang="ts">
import MovieQuotesCrud from "@/components/movies/MovieQuotesCrud.vue";
import type { SingleMovieQuote } from "@/types/types";
import IconCommentRectangular from "../icons/IconCommentRectangular.vue";
import IconHeartOutline from "../icons/IconHeartOutline.vue";

const props = defineProps<{
  quote: SingleMovieQuote;
}>();
</script>

<template>
  <div class="px-8 py-6 bg-[#11101A] rounded-[0.625rem] relative w-full mb-5">
    <div
      class="flex flex-col gap-6 xl:flex-row xl:gap-8 pb-6 border-b border-white"
    >
      <img
        :src="props.quote.image"
        alt=""
        class="w-[22.5rem] h-[8.75rem] xl:w-[14.125rem] rounded-sm object-cover"
      />
        <q class="font-helvetica-400 text-2xl text-[#CED4DA] italic my-0 xl-h-fit xl:my-auto ">{{
        props.quote.quote
      }}</q>
      
    </div>
    <!-- QUOTE REACT/COMMENTS -->
    <div class="flex gap-4 mt-5">
      <div class="flex gap-2 items-center">
        <span class="font-helvetica-400 text-xl text-white">{{
          props.quote.comment_number
        }}</span>
        <IconCommentRectangular />
      </div>
      <div class="flex gap-2 items-center">
        <span class="font-helvetica-400 text-xl text-white">{{
          props.quote.heart_number ?? "0"
        }}</span>
        <IconHeartOutline />
      </div>
    </div>
    <MovieQuotesCrud location="bottom-4 xl:top-6 right-8" />
  </div>
  
</template>
